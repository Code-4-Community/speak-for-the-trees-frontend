import React from 'react';
import { Col, Row, Button, Form, Input, Typography } from 'antd';
import PageHeader from '../../components/pageHeader';
import PageLayout from '../../components/pageLayout';
import styled from 'styled-components';
import { MID_GREEN } from '../../utils/colors';
import ProtectedApiClient from '../../api/protectedApiClient';
const { Paragraph } = Typography;

const cSpan = 10;
const formHalfItemSpan = 8;
const offsetSpan = 1;

const formLayout = {
  wrapperCol: { span: 17 },
};

const passwordRules = 'Your new password must be at least 8 characters.';

const SettingsContainer = styled.div`
  min-width: 80vw;
  margin: 100px auto auto;
`;

const SubmitButton = styled(Button)`
  width: 96px;
  height: 40px;
  font-size: 16px;
`;

const FormTitle = styled(Paragraph)`
  margin-top: 45px;
  font-size: 20px;
  font-weight: bold;
  color: ${MID_GREEN};
  line-height: 28px;
`;

const Settings: React.FC = () => {
  const onFinishChangePassword = (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    ProtectedApiClient.changePassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    })
      .then((res) => res)
      .catch((e) => e);
  };

  const onFinishChangeEmail = (values: {
    newEmail: string;
    password: string;
  }) => {
    ProtectedApiClient.changeEmail(values)
      .then((res) => res)
      .catch((e) => e);
  };

  const onFinishDeleteUser = (value: { password: string }) => {
    ProtectedApiClient.deleteUser(value)
      .then((res) => res)
      .catch((e) => e);
  };

  return (
    <>
      <PageLayout>
        <SettingsContainer>
          <PageHeader pageTitle="Account Settings" />

          <Row>
            <Col span={cSpan}>
              <FormTitle>Profile</FormTitle>
              <Form name="edit-profile">
                <Row>
                  <Col span={formHalfItemSpan}>
                    <Form.Item name="first-name">
                      <Input placeholder="First Name" />
                    </Form.Item>
                  </Col>
                  <Col span={offsetSpan}></Col>
                  <Col span={formHalfItemSpan}>
                    <Form.Item name="last-name">
                      <Input placeholder="Last Name" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item {...formLayout} name="username">
                  <Input placeholder="Username" />
                </Form.Item>
              </Form>
              <FormTitle>Change Email</FormTitle>
              <Form
                {...formLayout}
                name="change-email"
                onFinish={onFinishChangeEmail}
              >
                <Form.Item {...formLayout} name="current-email">
                  <Input
                    placeholder="Current Address"
                    defaultValue="currentemail@email.com"
                  />
                </Form.Item>
                <Form.Item
                  {...formLayout}
                  name="new-email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input a new email address!',
                    },
                    {
                      pattern: /^\S+@\S+\.\S{2,}$/,
                      message: 'Not a valid email address',
                    },
                  ]}
                >
                  <Input placeholder="New Address" />
                </Form.Item>
                <Form.Item {...formLayout} name="confirm-new-email">
                  <Input placeholder="Confirm New Address" />
                </Form.Item>
                <Form.Item>
                  <SubmitButton type="primary" htmlType="submit">
                    Save
                  </SubmitButton>
                </Form.Item>
              </Form>
            </Col>

            <Col span={cSpan}>
              <FormTitle>Change Password</FormTitle>
              <Form
                {...formLayout}
                name="change-password"
                onFinish={onFinishChangePassword}
              >
                <Form.Item
                  name="currentPassword"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your current password!',
                    },
                  ]}
                >
                  <Input placeholder="Current Password" />
                </Form.Item>
                <Form.Item
                  name="newPassword"
                  help={passwordRules}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your new password!',
                    },
                    {
                      min: 8,
                      message: passwordRules,
                    },
                  ]}
                >
                  <Input placeholder="New Password" />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your new password!',
                    },
                  ]}
                >
                  <Input placeholder="Confirm Password" />
                </Form.Item>
                <Form.Item>
                  <SubmitButton type="primary" htmlType="submit">
                    Save
                  </SubmitButton>
                </Form.Item>
              </Form>

              <FormTitle>Deactivate or Delete Account</FormTitle>
              <Form name="delete-account" onFinish={onFinishDeleteUser}>
                <Form.Item>
                  <SubmitButton type="primary" htmlType="submit">
                    Continue
                  </SubmitButton>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </SettingsContainer>
      </PageLayout>
    </>
  );
};

export default Settings;
