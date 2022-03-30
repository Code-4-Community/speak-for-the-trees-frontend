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
import AddSiteForm from '../../components/forms/addSiteForm';

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
            <Typography.Title level={4}>Edit Admins</Typography.Title>
            <ChangePrivilegeForm privilegeLevel={privilegeLevel} />
          </EditUser>
          <AddSiteForm />
        </AdminContentContainer>
      </PageLayout>
    </>
  );
};

export default AdminDashboard;
