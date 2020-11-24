import React from 'react';
import { Helmet } from 'react-helmet';
import { Col, Row, Button, Form, Input, Typography } from 'antd';
import './settings.less';
import PageHeader from '../../components/pageheader/PageHeader';
import styled from 'styled-components';
import { MID_GREEN } from '../../colors';
const { Paragraph } = Typography;

const cSpan = 10;
const formHalfItemSpan = 8;
const offsetSpan = 1;

const formLayout = {
  wrapperCol: { span: 17 },
};

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
  const onFinish = () => {
    // deleteAccount();
  };

  return (
    <>
      <Helmet>
        <title>Settings</title>
        <meta
          name="Settings"
          content="The user's account settings page, where they can change their profile information and password or deactivate/delete their account."
        />
      </Helmet>
      <div className="page-content-container">
        <PageHeader
          pageTitle="Account Settings"
          pageSubtitle=""
          subtitleColor=""
        />

        <Row>
          <Col span={cSpan}>
            <FormTitle>Profile</FormTitle>
            <Form name="edit-profile" onFinish={onFinish}>
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
              <Form.Item {...formLayout} name="phone-number">
                <Input placeholder="Phone Number" />
              </Form.Item>

              <FormTitle>Change Email</FormTitle>
              <Form.Item {...formLayout} name="current-email">
                <Input
                  placeholder="Current Address"
                  defaultValue="currentemail@email.com"
                />
              </Form.Item>
              <Form.Item {...formLayout} name="new-email">
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
            <Form {...formLayout} name="change-password" onFinish={onFinish}>
              <Form.Item
                name="current-password"
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
                name="new-password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your new password!',
                  },
                ]}
              >
                <Input placeholder="New Password" />
              </Form.Item>
              <Form.Item
                name="confirm-new-password"
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
            <Form name="delete-account" onFinish={onFinish}>
              <Form.Item>
                <SubmitButton type="primary" htmlType="submit">
                  Continue
                </SubmitButton>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Settings;
