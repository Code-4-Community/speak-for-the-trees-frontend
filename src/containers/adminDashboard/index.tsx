import React from 'react';
import { Helmet } from 'react-helmet';
import { Typography } from 'antd';
import PageHeader from '../../components/pageHeader';
import PageLayout from '../../components/pageLayout';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { C4CState } from '../../store';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { PrivilegeLevel } from '../../auth/ducks/types';
import ChangePrivilegeForm from '../../components/forms/changePrivilegeForm';
import UploadSitesForm from '../../components/forms/uploadSitesForm';

const { Title } = Typography;

const AdminContentContainer = styled.div`
  margin: 100px auto auto;
  width: 80vw;
`;

const EditUser = styled.div`
  margin: 80px 0px 40px;
  width: 370px;
`;

const AdminDashboard: React.FC = () => {
  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) =>
    getPrivilegeLevel(state.authenticationState.tokens),
  );

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
            <Title level={4}>Edit Admins</Title>
            <ChangePrivilegeForm privilegeLevel={privilegeLevel} />
          </EditUser>

          <EditUser>
            <Title level={4}>Add Sites</Title>
            <UploadSitesForm />
          </EditUser>
        </AdminContentContainer>
      </PageLayout>
    </>
  );
};

export default AdminDashboard;
