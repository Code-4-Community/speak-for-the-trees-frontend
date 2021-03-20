import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Row, Typography, Select, Button, Form, Input } from 'antd';
import PageHeader from '../../components/pageHeader';
import PageLayout from '../../components/pageLayout';
import styled from 'styled-components';
import ProtectedApiClient from '../../api/protectedApiClient';
import { FormInstance } from 'antd/lib/form';
import { SelectValue } from 'antd/lib/select';

const { Title } = Typography;
const { Option } = Select;

const AdminContentContainer = styled.div`
  margin: 100px auto auto;
  width: 80vw;
`;

const EditUser = styled.div`
  margin: 80px 0px 40px;
  width: 370px;
`;

const RoleDropdown = styled(Select)`
  width: 100%;
  height: 36px;
`;

const AdminDashboard: React.FC = () => {
  const isSuperAdmin = true;

  const formRef = useRef<FormInstance>(null);

  const onRoleChange = (role: SelectValue) => {
    if (formRef.current !== null) {
      formRef.current.setFieldsValue({ newLevel: role });
    }
  };

  const onFinishChangePrivilege = (value: {
    targetUserEmail: string;
    newLevel: string;
    password: string;
  }) => {
    ProtectedApiClient.changePrivilegeLevel(value)
      .then((res) => res)
      .catch((e) => e);
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
        <meta
          name="Admin Dashboard"
          content="The page for admin users to modify accounts and download team data."
        />
      </Helmet>
      <PageLayout>
        <AdminContentContainer>
          <PageHeader pageTitle="Admin Dashboard" />

          {isSuperAdmin && (
            <EditUser>
              <Row>
                <Title level={4}>Edit Admins</Title>
              </Row>

              <Form
                name="change-privilege"
                onFinish={onFinishChangePrivilege}
                ref={formRef}
              >
                <Form.Item name="targetUserEmail">
                  <Input placeholder="User Email" />
                </Form.Item>

                <Form.Item name="newLevel">
                  <RoleDropdown placeholder="New Role" onChange={onRoleChange}>
                    <Option value="STANDARD">standard</Option>
                    <Option value="ADMIN">admin</Option>
                  </RoleDropdown>
                </Form.Item>

                <Form.Item name="password">
                  <Input placeholder="Password" />
                </Form.Item>

                <Form.Item className="row">
                  <Button type="primary" htmlType="submit">
                    Confirm
                  </Button>
                </Form.Item>
              </Form>
            </EditUser>
          )}

          <Row>
            <Title level={4}>Download All Team Data</Title>
          </Row>
          <Row className="row">
            <Button type="primary">Download</Button>
          </Row>
        </AdminContentContainer>
      </PageLayout>
    </>
  );
};

export default AdminDashboard;
