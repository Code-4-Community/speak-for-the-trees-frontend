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
  SiteEntriesRequest,
  UpdateSiteRequest,
} from '../../components/forms/ducks/types';
import SelectorMapDisplay from '../../components/mapComponents/mapDisplays/selectorMapDisplay';
import { getMapGeoData } from '../../components/mapComponents/ducks/thunks';
import { Block, Flex, MapContainer } from '../../components/themedComponents';
import { round } from 'lodash';
import { LAT_LNG_PRECISION } from '../../components/forms/constants';
import { MapTypes } from '../../context/types';
import { MapTypeContext } from '../../context/mapTypeContext';
import { useTranslation } from 'react-i18next';
import { n } from '../../utils/stringFormat';
import { site as website } from '../../constants';

const SitePageContainer = styled.div`
  width: 90%;
  margin: 8vh auto;
`;

const SectionHeader = styled(Typography.Text)`
  font-weight: bold;
  font-size: 20px;
  color: ${DARK_GREEN};
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
  const { t } = useTranslation(n(website, ['site', 'forms']), {
    nsMode: 'fallback',
  });

  const [site, setSite] = useState<SiteProps>();
  const [mapSearchMarker, setMapSearchMarker] = useState<google.maps.Marker>();
  const id = Number(useParams<SiteParams>().id);
  const { windowType } = useWindowDimensions();
  const dispatch = useDispatch();

  const [editSiteForm] = Form.useForm();
  const [updateSiteForm] = Form.useForm();

  const [mapTypeId, setMapTypeId] = useState<MapTypes>(MapTypes.ROADMAP);

  const getSite = () => {
    Client.getSite(id)
      .then((s) => setSite(s))
      .catch((err) => message.error(err.response.data));
  };

  const onSubmitEditSite = (request: EditSiteRequest) => {
    ProtectedClient.editSite(id, request)
      .then(() => {
        editSiteForm.resetFields();
        message.success(t('edit_site.success')).then();
        getSite();
      })
      .catch((err) => message.error(err.response.data));
  };

  const onSubmitUpdateSite = (request: UpdateSiteRequest) => {
    const entries: SiteEntriesRequest = {
      ...request,
      plantingDate: request.plantingDate?.format('L') || null,
    };
    ProtectedClient.updateSite(id, entries)
      .then(() => {
        updateSiteForm.resetFields();
        message.success(t('update_site.success')).then();
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
              <PageHeader pageTitle={`${t('title')} #${site?.siteId}`} />
              <SectionHeader>{t('header.site_features')}</SectionHeader>
              <SiteFeatures
                site={site}
                editSiteForm={editSiteForm}
                onSubmit={onSubmitEditSite}
                onEdit={(latLng: google.maps.LatLng) =>
                  mapSearchMarker?.setPosition(latLng)
                }
              />
            </Block>
            <MapTypeContext.Provider value={[mapTypeId, setMapTypeId]}>
              <MapContainer>
                <SelectorMapDisplay
                  neighborhoods={neighborhoods}
                  sites={sites}
                  onMove={(pos: google.maps.LatLng) => {
                    editSiteForm.setFieldsValue({
                      lat: round(pos.lat(), LAT_LNG_PRECISION),
                      lng: round(pos.lng(), LAT_LNG_PRECISION),
                    });
                  }}
                  site={site}
                  setMarker={setMapSearchMarker}
                />
              </MapContainer>
            </MapTypeContext.Provider>
          </Flex>

          <SectionHeader strong>{t('header.site_entries')}</SectionHeader>
          <SiteEntryTable siteEntries={site.entries} getSite={getSite} />

          <SectionHeader>{t('header.add_entry')}</SectionHeader>
          <MarginBottomRow>
            <UpdateSiteForm
              formInstance={updateSiteForm}
              onFinish={onSubmitUpdateSite}
              latestSiteEntry={
                site.entries.length ? site.entries[0] : undefined
              }
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
