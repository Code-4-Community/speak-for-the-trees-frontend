import React from 'react';
import { Helmet } from 'react-helmet';
import { Button, Form, message, Typography } from 'antd';
import PageHeader from '../../components/pageHeader';
import PageLayout from '../../components/pageLayout';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { C4CState } from '../../store';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { PrivilegeLevel } from '../../auth/ducks/types';
import ChangePrivilegeForm from '../../components/forms/changePrivilegeForm';
import SignupForm from '../../components/forms/signupForm';
import { SignupFormValues } from '../../components/forms/ducks/types';
import ProtectedApiClient from '../../api/protectedApiClient';
import { Flex } from '../../components/themedComponents';
import { AppError } from '../../auth/axios';
import { getErrorMessage } from '../../utils/stringFormat';

const AdminContentContainer = styled.div`
  width: 80vw;
  margin: 8vh auto auto;
`;

const DashboardContent = styled.div`
  width: 450px;
`;

const AdminDashboard: React.FC = () => {
  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) =>
    getPrivilegeLevel(state.authenticationState.tokens),
  );
  const [createChildForm] = Form.useForm();

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
        </AdminContentContainer>
      </PageLayout>
    </>
  );
};

export default AdminDashboard;
