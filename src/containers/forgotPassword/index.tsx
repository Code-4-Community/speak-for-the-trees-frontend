import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import authClient from '../../auth/authClient';
import { ForgotPasswordRequest } from '../../auth/ducks/types';
import useWindowDimensions from '../../components/windowDimensions';
import { Button, Form, Input, Typography } from 'antd';
import PageHeader from '../../components/pageHeader';
import { ContentContainer } from '../../components/themedComponents';
import { isMobile } from '../../utils/isCheck';
import { enterEmailRules } from '../../utils/formRules';

const ForgotPassword: React.FC = () => {
  const { windowType } = useWindowDimensions();

  const [email, setEmail] = useState('');

  const onFinish = (values: ForgotPasswordRequest) => {
    setEmail(values.email);
    authClient.forgotPassword(values).catch(() => {
      return;
    });
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
        <meta
          name="description"
          content="User can request a link to reset their password."
        />
      </Helmet>
      <ContentContainer>
        <PageHeader
          pageTitle="Forgot your password?"
          isMobile={isMobile(windowType)}
        />
        {email === '' ? (
          <>
            <Typography.Title level={4}>
              Please enter your email and we will send you the password reset
              instructions to the email address for this account.
            </Typography.Title>
            <Form name="forgotPassword" onFinish={onFinish}>
              <Form.Item name="email" rules={enterEmailRules}>
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (
          <Typography.Title level={4}>
            If an account is registered under {email}, we have sent you a link
            to reset your password.
          </Typography.Title>
        )}
      </ContentContainer>
    </>
  );
};

export default ForgotPassword;
