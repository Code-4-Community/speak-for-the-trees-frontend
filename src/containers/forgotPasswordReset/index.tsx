import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import authClient from '../../auth/authClient';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/window-dimensions';
import { Button, Form, Input } from 'antd';
import PageHeader from '../../components/pageHeader';
import { ContentContainer } from '../../components';
import MobilePageHeader from '../../components/mobileComponents/mobilePageHeader';

export interface NewPasswords {
  readonly password: string;
  readonly confirmPassword: string;
}

const ForgotPasswordReset: React.FC = () => {
  const { key } = useParams();
  const { windowType } = useWindowDimensions();

  const onFinish = (values: NewPasswords) => {
    authClient
      .forgotPasswordReset({ secretKey: key, newPassword: values.password })
      .then(() => {
        alert('Successfully reset password!');
      })
      .catch((err) => {
        alert('Was not able to reset password.');
      });
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
        <meta
          name="Forgot Password Reset"
          content="User can reset their forgotten password."
        />
      </Helmet>
      <ContentContainer>
        {windowType === WindowTypes.Mobile ? (
          <MobilePageHeader pageTitle="Forgot Password" />
        ) : (
          <PageHeader pageTitle="Forgot Password" />
        )}
        <Form name="basic" onFinish={onFinish}>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please enter your new password!' },
              {
                min: 8,
                message: 'Password must be at least 8 characters long',
              },
            ]}
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const password = getFieldValue('password');
                  if (value && password !== value) {
                    return Promise.reject('Passwords do not match');
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ContentContainer>
    </>
  );
};

export default ForgotPasswordReset;
