import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Col, Row, Button, Form, Input, Typography } from 'antd';
import PageHeader from '../../components/pageHeader';
import PageLayout from '../../components/pageLayout';
import styled from 'styled-components';
import { MID_GREEN } from '../../utils/colors';
import ProtectedApiClient from '../../api/protectedApiClient';
import { C4CState } from '../../store';
import { UserDataReducerState } from '../home/ducks/types';
import { getUserEmail, getUserFullName } from '../home/ducks/selectors';
const { Paragraph } = Typography;

const cSpan = 10;

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

const UserInformationText = styled(Paragraph)`
  font-size: 15px;
`;

type SettingsProps = UserDataReducerState;

const Settings: React.FC<SettingsProps> = (userData) => {
  const userFullName = useSelector((state: C4CState) =>
    getUserFullName(state.userDataState.userData),
  );
  const userEmail = useSelector((state: C4CState) =>
    getUserEmail(state.userDataState.userData),
  );

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
              <UserInformationText>{userFullName}</UserInformationText>
              <Form name="change-username">
                <Form.Item {...formLayout} name="username">
                  <Input placeholder="Username" />
                </Form.Item>
              </Form>
              <FormTitle>Change Email</FormTitle>
              <UserInformationText>{userEmail}</UserInformationText>
              <Form
                {...formLayout}
                name="change-email"
                onFinish={onFinishChangeEmail}
              >
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
                <Form.Item
                  {...formLayout}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your current password!',
                    },
                  ]}
                >
                  <Input placeholder="Password" />
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

const mapStateToProps = (state: C4CState): SettingsProps => {
  return {
    userData: state.userDataState.userData,
  };
};

export default connect(mapStateToProps)(Settings);
