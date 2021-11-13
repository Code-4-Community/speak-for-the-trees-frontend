import React, { useCallback, useEffect, useState } from 'react';
import SelectorMap from '../../components/mapComponents/maps/selectorMap';
import { MapGeoDataReducerState } from '../../components/mapComponents/ducks/types';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
import PageLayout from '../../components/pageLayout';
import { Col, Form, message, Row, Typography } from 'antd';
import styled from 'styled-components';
import { DARK_GREEN } from '../../utils/colors';
import PageHeader from '../../components/pageHeader';
import { useParams } from 'react-router-dom';
import { SiteProps } from '../treePage/ducks/types';
import Client from '../../api/apiClient';
import ProtectedClient from '../../api/protectedApiClient';
import { C4CState } from '../../store';
import { connect } from 'react-redux';
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

const { Text } = Typography;

const SitePageContainer = styled.div`
  width: 90%;
  margin: 8vh auto;
`;

const SectionHeader = styled(Text)`
  font-weight: bold;
  font-size: 20px;
  color: ${DARK_GREEN};
`;

const MobileMapContainer = styled.div`
  margin: 15px 0;
  height: 300px;
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

  const [editSiteForm] = Form.useForm();
  const [updateSiteForm] = Form.useForm();

  const getSite = () => {
    // TODO: BUG - getSite isn't getting neighborhood id
    Client.getSite(id)
      .then((s) => setSite(s))
      .catch((err) => message.error(err.response.data));
  };

  const updateEditSiteFormLatLng = (pos: google.maps.LatLng) => {
    editSiteForm.setFieldsValue({
      lat: pos.lat(),
      lng: pos.lng(),
    });
  };

  const onSubmitEditSite = (request: EditSiteRequest) => {
    ProtectedClient.editSite(id, request)
      .then(() => getSite())
      .catch((err) => message.error(err.response.data));
  };

  const onSubmitUpdateSite = (request: UpdateSiteRequest) => {
    ProtectedClient.updateSite(id, request)
      .then(() => getSite())
      .catch((err) => message.error(err.response.data));
  };

  const callGetSite = useCallback(getSite, [id]);

  useEffect(() => {
    callGetSite();
  }, [callGetSite]);

  return (
    <PageLayout>
      {site && (
        <SitePageContainer>
          {windowType === WindowTypes.Desktop ? (
            <Row gutter={[16, 8]}>
              <Col span={15}>
                <PageHeader pageTitle={`Site #${site?.siteId}`} />
                <SectionHeader>Site Features</SectionHeader>
                <SiteFeatures
                  site={site}
                  editSiteForm={editSiteForm}
                  onSubmit={onSubmitEditSite}
                />
              </Col>
              <Col span={9}>
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
              </Col>
            </Row>
          ) : (
            <>
              <PageHeader pageTitle={`Site #${site?.siteId}`} />
              <SectionHeader>Site Features</SectionHeader>
              <SiteFeatures
                site={site}
                editSiteForm={editSiteForm}
                onSubmit={onSubmitEditSite}
              />
              <MobileMapContainer>
                {asyncRequestIsComplete(neighborhoods) &&
                  asyncRequestIsComplete(sites) && (
                    <SelectorMap
                      neighborhoods={neighborhoods.result}
                      sites={sites.result}
                      onMove={updateEditSiteFormLatLng}
                      site={site}
                    />
                  )}
              </MobileMapContainer>
            </>
          )}
          <Row>
            <SectionHeader strong>Site Entries</SectionHeader>
            <SiteEntryTable siteEntries={site.entries} />
          </Row>
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
