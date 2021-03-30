import React from 'react';
import { Helmet } from 'react-helmet';
import authClient from '../../auth/authClient';
import { ForgotPasswordRequest } from '../../auth/ducks/types';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/window-dimensions';
import { Button, Form, Input } from 'antd';
import PageHeader from '../../components/pageHeader';
import { ContentContainer } from '../../components';
import MobilePageHeader from '../../components/mobileComponents/mobilePageHeader';

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
          name="Forgot Password Request"
          content="User can request a link to reset their password."
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
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              {
                pattern: /^\S+@\S+\.\S{2,}$/,
                message: 'Not a valid email address',
              },
            ]}
          >
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
