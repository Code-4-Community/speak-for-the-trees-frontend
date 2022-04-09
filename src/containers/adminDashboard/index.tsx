import React from 'react';
import { Helmet } from 'react-helmet';
import { Form, message, Row, Typography, Divider } from 'antd';
import PageHeader from '../../components/pageHeader';
import PageLayout from '../../components/pageLayout';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
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

const AdminDashboard: React.FC = () => {
  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) =>
    getPrivilegeLevel(state.authenticationState.tokens),
  );

  const [editSiteForm] = Form.useForm();
  const [updateSiteForm] = Form.useForm();

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
            <EditSiteForm formInstance={editSiteForm} />
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

export default AdminDashboard;
