import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button, Form, message, Row, Typography, Divider } from 'antd';
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
import SignupForm from '../../components/forms/signupForm';
import { SignupFormValues } from '../../components/forms/ducks/types';
import ProtectedApiClient from '../../api/protectedApiClient';
import { AppError } from '../../auth/axios';
import { getErrorMessage } from '../../utils/stringFormat';

const AdminContentContainer = styled.div`
  width: 80vw;
  margin: 8vh auto auto;
`;

const DashboardContent = styled.div`
  width: 450px;
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
  const [createChildForm] = Form.useForm();
  const { windowType } = useWindowDimensions();
  const dispatch = useDispatch();

  const [marker, setMarker] = useState<google.maps.Marker>();

  const onCreateChild = (values: SignupFormValues) => {
    ProtectedApiClient.createChild({
      email: values.email,
      username: values.username,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    })
      .then(() => {
        message.success(`${values.email} successfully added!`);
        createChildForm.resetFields();
      })
      .catch((error: AppError) => message.error(getErrorMessage(error)));
  };

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
          <Flex margin={'60px 0 0 0'} gap={'50px 100px'}>
            <DashboardContent>
              <Typography.Title level={4}>Edit Admins</Typography.Title>
              <ChangePrivilegeForm privilegeLevel={privilegeLevel} />
            </DashboardContent>
            <DashboardContent>
              <Typography.Title level={4}>
                Create Child Accounts
              </Typography.Title>
              <SignupForm
                formInstance={createChildForm}
                onFinish={onCreateChild}
              >
                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large">
                    Create Child Account
                  </Button>
                </Form.Item>
              </SignupForm>
            </DashboardContent>
          </Flex>
          <AdminDivider />
          <SectionHeader>Add New Site</SectionHeader>
          <MarginBottomRow>
            <Flex margin={'0 0 40px 0'}>
              <Block
                maxWidth={windowType === WindowTypes.Mobile ? '100%' : '45%'}
              >
                <EditSiteForm
                  formInstance={editSiteForm}
                  onEdit={(formLat: number, formLng: number) =>
                    marker?.setPosition(
                      new google.maps.LatLng(formLat, formLng),
                    )
                  }
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
                  setMarker={setMarker}
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
