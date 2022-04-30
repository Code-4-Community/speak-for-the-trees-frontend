import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Form, message, Row, Typography, Divider } from 'antd';
import PageHeader from '../../components/pageHeader';
import PageLayout from '../../components/pageLayout';
import styled from 'styled-components';
import { connect, useDispatch, useSelector } from 'react-redux';
import { C4CState } from '../../store';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { PrivilegeLevel } from '../../auth/ducks/types';
import ChangePrivilegeForm from '../../components/forms/changePrivilegeForm';
import { DARK_GREEN } from '../../utils/colors';
import ProtectedClient from '../../api/protectedApiClient';
import {
  AddSiteRequest,
  UpdateSiteRequest,
} from '../../components/forms/ducks/types';
import UpdateSiteForm from '../../components/forms/updateSiteForm';
import EditSiteForm from '../../components/forms/editSiteForm';
import SelectorMapDisplay from '../../components/mapComponents/mapDisplays/selectorMapDisplay';
import { MapGeoDataReducerState } from '../../components/mapComponents/ducks/types';
import { MapContainer, Block, Flex } from '../../components/themedComponents';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import { getMapGeoData } from '../../components/mapComponents/ducks/thunks';

const AdminContentContainer = styled.div`
  margin: 100px auto auto;
  width: 80vw;
`;

const EditUser = styled.div`
  margin: 80px 0px 40px;
  width: 370px;
`;

const AdminDivider = styled(Divider)`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const SectionHeader = styled(Typography.Text)`
  font-weight: bold;
  font-size: 20px;
  color: ${DARK_GREEN};
`;

const MarginBottomRow = styled(Row)`
  margin-bottom: 30px;
`;

interface AdminDashboardProps {
  readonly neighborhoods: MapGeoDataReducerState['neighborhoodGeoData'];
  readonly sites: MapGeoDataReducerState['siteGeoData'];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  neighborhoods,
  sites,
}) => {
  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) =>
    getPrivilegeLevel(state.authenticationState.tokens),
  );
  const { windowType } = useWindowDimensions();
  const dispatch = useDispatch();

  const [editSiteForm] = Form.useForm();
  const [updateSiteForm] = Form.useForm();

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
      ...request,
    };
    ProtectedClient.addSite(addSiteRequest)
      .then(() => {
        editSiteForm.resetFields();
        updateSiteForm.resetFields();
        message.success('Site added!').then();
      })
      .catch((err) => message.error(err.response.data));
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
        <meta
          name="description"
          content="The page for admin users to modify accounts and download team data."
        />
      </Helmet>
      <PageLayout>
        <AdminContentContainer>
          <PageHeader pageTitle="Admin Dashboard" />
          <EditUser>
            <Typography.Title level={4}>Edit Admins</Typography.Title>
            <ChangePrivilegeForm privilegeLevel={privilegeLevel} />
          </EditUser>
          <AdminDivider />
          <SectionHeader>Add New Site</SectionHeader>
          <MarginBottomRow>
            <Flex>
              <Block
                maxWidth={windowType === WindowTypes.Mobile ? '100%' : '45%'}
              >
                <EditSiteForm formInstance={editSiteForm} />
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
                />
              </MapContainer>
            </Flex>
            <UpdateSiteForm
              formInstance={updateSiteForm}
              onFinish={onSubmitAddSite}
            />
          </MarginBottomRow>
        </AdminContentContainer>
      </PageLayout>
    </>
  );
};

const mapStateToProps = (state: C4CState): AdminDashboardProps => {
  return {
    neighborhoods: state.mapGeoDataState.neighborhoodGeoData,
    sites: state.mapGeoDataState.siteGeoData,
  };
};

export default connect(mapStateToProps)(AdminDashboard);
