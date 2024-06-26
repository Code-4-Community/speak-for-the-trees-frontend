import React, { useState, useEffect } from 'react';
import { C4CState } from '../../store';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { connect, useDispatch } from 'react-redux';
import { ArrowLeftOutlined } from '@ant-design/icons';

import UpdateSiteForm from '../../components/forms/updateSiteForm';
import EditSiteForm from '../../components/forms/editSiteForm';
import SelectorMapDisplay from '../../components/mapComponents/mapDisplays/selectorMapDisplay';
import UploadSitesForm from '../../components/forms/uploadSitesForm';
import { DARK_GREEN } from '../../utils/colors';
import ProtectedClient from '../../api/protectedApiClient';
import {
  AddSiteRequest,
  UpdateSiteRequest,
} from '../../components/forms/ducks/types';
import { getMapGeoData } from '../../components/mapComponents/ducks/thunks';
import { MapGeoDataReducerState } from '../../components/mapComponents/ducks/types';
import { Typography, Row, Form, Divider, message } from 'antd';
import {
  MapContainer,
  Block,
  Flex,
  ReturnButton,
  PaddedPageContainer,
} from '../../components/themedComponents';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import { round } from 'lodash';
import { LAT_LNG_PRECISION } from '../../components/forms/constants';
import { MapTypes } from '../../context/types';
import { MapTypeContext } from '../../context/mapTypeContext';
import PageLayout from '../../components/pageLayout';
import PageHeader from '../../components/pageHeader';
import { Routes } from '../../App';
import { site } from '../../constants';
import { n } from '../../utils/stringFormat';
import { useTranslation } from 'react-i18next';

const SectionHeader = styled(Typography.Text)`
  font-weight: bold;
  font-size: 20px;
  color: ${DARK_GREEN};
`;

const MarginBottomRow = styled(Row)`
  margin-bottom: 30px;
`;

const DashboardContent = styled.div`
  width: 450px;
`;

const MarginDivider = styled(Divider)`
  margin: 20px 0px;
`;

interface AddSitesProps {
  readonly neighborhoods: MapGeoDataReducerState['neighborhoodGeoData'];
  readonly sites: MapGeoDataReducerState['siteGeoData'];
}

const AddSites: React.FC<AddSitesProps> = ({ neighborhoods, sites }) => {
  const { windowType } = useWindowDimensions();
  const dispatch = useDispatch();

  const [mapSearchMarker, setMapSearchMarker] = useState<google.maps.Marker>();

  const [mapTypeId, setMapTypeId] = useState<MapTypes>(MapTypes.ROADMAP);

  const [editSiteForm] = Form.useForm();
  const [updateSiteForm] = Form.useForm();

  const { t } = useTranslation(n(site, ['admin']), { nsMode: 'fallback' });

  useEffect(() => {
    dispatch(getMapGeoData());
  }, [dispatch]);

  const onSubmitAddSite = (request: UpdateSiteRequest) => {
    editSiteForm.validateFields().then();
    const addSiteRequest: AddSiteRequest = {
      blockId: editSiteForm.getFieldValue('blockId'),
      lat: editSiteForm.getFieldValue('lat'),
      lng: editSiteForm.getFieldValue('lng'),
      city: editSiteForm.getFieldValue('city'),
      zip: editSiteForm.getFieldValue('zip'),
      address: editSiteForm.getFieldValue('address'),
      neighborhoodId: editSiteForm.getFieldValue('neighborhoodId'),
      owner: editSiteForm.getFieldValue('owner'),
      ...request,
      plantingDate: updateSiteForm.getFieldValue('plantingDate')?.format('L'),
    };
    ProtectedClient.addSite(addSiteRequest)
      .then(() => {
        editSiteForm.resetFields();
        updateSiteForm.resetFields();
        message.success(t('add_sites.add_site_success')).then();
      })
      .catch((err) =>
        message.error(
          t('add_sites.add_site_error', { error: err.response.data }),
        ),
      );
  };

  return (
    <>
      <Helmet>
        <title>{t('add_sites.helmet_title')}</title>
        <meta
          name="description"
          content="The page for admin users add and update site information"
        />
      </Helmet>
      <PageLayout>
        <PaddedPageContainer>
          <ReturnButton to={Routes.ADMIN}>
            <ArrowLeftOutlined /> {t('back')}
          </ReturnButton>
          <PageHeader pageTitle="Add Sites" />
          <DashboardContent>
            <Typography.Title level={4}>
              {t('add_sites.bulk_add_header')}
            </Typography.Title>
            <UploadSitesForm />
          </DashboardContent>
          <MarginDivider />
          <SectionHeader>{t('add_sites.add_header')}</SectionHeader>
          <MarginBottomRow>
            <Flex margin={'0 0 40px 0'}>
              <Block
                maxWidth={windowType === WindowTypes.Mobile ? '100%' : '45%'}
              >
                <EditSiteForm
                  formInstance={editSiteForm}
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
                    setMarker={setMapSearchMarker}
                  />
                </MapContainer>
              </MapTypeContext.Provider>
            </Flex>
            <UpdateSiteForm
              formInstance={updateSiteForm}
              onFinish={onSubmitAddSite}
            />
          </MarginBottomRow>
        </PaddedPageContainer>
      </PageLayout>
    </>
  );
};

const mapStateToProps = (state: C4CState): AddSitesProps => {
  return {
    neighborhoods: state.mapGeoDataState.neighborhoodGeoData,
    sites: state.mapGeoDataState.siteGeoData,
  };
};

export default connect(mapStateToProps)(AddSites);
