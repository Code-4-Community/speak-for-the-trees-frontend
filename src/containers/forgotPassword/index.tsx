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

  const [submittedEmail, setSubmittedEmail] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: ForgotPasswordRequest) => {
    authClient
      .forgotPassword(values)
      .then(() => {
        setSubmittedEmail(true);
        setUserNotFound(false);
      })
      .catch(() => {
        setUserNotFound(true);
        form.resetFields();
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
        {!submittedEmail || userNotFound ? (
          <>
            <Typography.Title level={4}>
              Please enter your email and we will send you the password reset
              instructions to the email address for this account.
            </Typography.Title>
            <Form form={form} name="forgotPassword" onFinish={onFinish}>
              {userNotFound && (
                <Typography.Title level={4}>
                  We couldn't find an account associated with the given email.
                  Please try again.
                </Typography.Title>
              )}
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
          <>
            <Typography.Title level={4}>
              The password reset instructions have been sent to your email!
            </Typography.Title>
          </>
        )}
      </ContentContainer>
    </>
  );
};

export default ForgotPassword;
