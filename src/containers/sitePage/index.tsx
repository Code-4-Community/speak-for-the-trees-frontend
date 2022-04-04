import React, { useCallback, useEffect, useState } from 'react';
import { MapGeoDataReducerState } from '../../components/mapComponents/ducks/types';
import PageLayout from '../../components/pageLayout';
import { Form, message, Row, Typography } from 'antd';
import styled from 'styled-components';
import { DARK_GREEN } from '../../utils/colors';
import PageHeader from '../../components/pageHeader';
import { useParams } from 'react-router-dom';
import { SiteProps } from '../treePage/ducks/types';
import Client from '../../api/apiClient';
import ProtectedClient from '../../api/protectedApiClient';
import { C4CState } from '../../store';
import { connect, useDispatch } from 'react-redux';
import SiteFeatures from '../../components/siteFeatures';
import SiteEntryTable from '../../components/siteEntryTable';
import UpdateSiteForm from '../../components/forms/updateSiteForm';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import {
  EditSiteRequest,
  UpdateSiteRequest,
} from '../../components/forms/ducks/types';
import SelectorMapDisplay from '../../components/mapComponents/mapDisplays/selectorMapDisplay';
import { getMapGeoData } from '../../components/mapComponents/ducks/thunks';
import { Block, Flex } from '../../components/themedComponents';

const SitePageContainer = styled.div`
  width: 90%;
  margin: 8vh auto;
`;

const SectionHeader = styled(Typography.Text)`
  font-weight: bold;
  font-size: 20px;
  color: ${DARK_GREEN};
`;

const MapContainer = styled.div`
  display: block;
  flex-grow: 1;
  min-width: 35%;
  min-height: 475px;
`;

const MarginBottomRow = styled(Row)`
  margin-bottom: 30px;
`;

interface SiteParams {
  id: string;
}

interface SitePageProps {
  readonly neighborhoods: MapGeoDataReducerState['neighborhoodGeoData'];
  readonly sites: MapGeoDataReducerState['siteGeoData'];
}

const SitePage: React.FC<SitePageProps> = ({ neighborhoods, sites }) => {
  const [site, setSite] = useState<SiteProps>();
  const id = Number(useParams<SiteParams>().id);
  const { windowType } = useWindowDimensions();
  const dispatch = useDispatch();

  const [editSiteForm] = Form.useForm();
  const [updateSiteForm] = Form.useForm();

  const getSite = () => {
    Client.getSite(id)
      .then((s) => setSite(s))
      .catch((err) => message.error(err.response.data));
  };

  const onSubmitEditSite = (request: EditSiteRequest) => {
    ProtectedClient.editSite(id, request)
      .then(() => {
        editSiteForm.resetFields();
        message.success('Site edited!').then();
        getSite();
      })
      .catch((err) => message.error(err.response.data));
  };

  const onSubmitUpdateSite = (request: UpdateSiteRequest) => {
    ProtectedClient.updateSite(id, request)
      .then(() => {
        updateSiteForm.resetFields();
        message.success('Site updated!').then();
        getSite();
      })
      .catch((err) => message.error(err.response.data));
  };

  const callGetSite = useCallback(getSite, [id]);

  useEffect(() => {
    dispatch(getMapGeoData());
  }, [dispatch]);

  useEffect(() => {
    callGetSite();
  }, [callGetSite]);

  return (
    <PageLayout>
      {site && (
        <SitePageContainer>
          <Flex>
            <Block
              maxWidth={windowType === WindowTypes.Mobile ? '100%' : '45%'}
            >
              <PageHeader pageTitle={`Site #${site?.siteId}`} />
              <SectionHeader>Site Features</SectionHeader>
              <SiteFeatures
                site={site}
                editSiteForm={editSiteForm}
                onSubmit={onSubmitEditSite}
              />
            </Block>
            <MapContainer>
              <SelectorMapDisplay
                neighborhoods={neighborhoods}
                sites={sites}
                onMove={(pos: google.maps.LatLng) => {
                  editSiteForm.setFieldsValue({
                    lat: pos.lat(),
                    lng: pos.lng(),
                  });
                }}
                site={site}
              />
            </MapContainer>
          </Flex>

          <SectionHeader strong>Site Entries</SectionHeader>
          <SiteEntryTable siteEntries={site.entries} />

          <SectionHeader>Add Entry</SectionHeader>
          <MarginBottomRow>
            <UpdateSiteForm
              formInstance={updateSiteForm}
              onFinish={onSubmitUpdateSite}
            />
          </MarginBottomRow>
        </SitePageContainer>
      )}
    </PageLayout>
  );
};

const mapStateToProps = (state: C4CState): SitePageProps => {
  return {
    neighborhoods: state.mapGeoDataState.neighborhoodGeoData,
    sites: state.mapGeoDataState.siteGeoData,
  };
};

export default connect(mapStateToProps)(SitePage);
