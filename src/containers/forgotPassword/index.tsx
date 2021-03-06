import React from 'react';
import { Helmet } from 'react-helmet';
import authClient from '../../auth/authClient';
import { ForgotPasswordRequest } from '../../auth/ducks/types';
import useWindowDimensions from '../../components/windowDimensions';
import { Button, Form, Input } from 'antd';
import PageHeader from '../../components/pageHeader';
import { ContentContainer } from '../../components/themedComponents';
import { isMobile } from '../../utils/isCheck';
import { enterEmailRules } from '../../utils/formRules';

const ForgotPassword: React.FC = () => {
  const { windowType } = useWindowDimensions();

  const onFinish = (values: ForgotPasswordRequest) => {
    authClient
      .forgotPassword(values)
      .then(() => {
        alert('Successfully sent forgot password request!');
      })
      .catch((err) => {
        alert('Forgot password request unsuccessful!');
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
          pageTitle="Forgot Password"
          isMobile={isMobile(windowType)}
        />
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
      </ContentContainer>
    </>
  );
};

export default ForgotPassword;
