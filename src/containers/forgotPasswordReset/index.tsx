import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import authClient from '../../auth/authClient';
import useWindowDimensions from '../../components/windowDimensions';
import { Button, Form, Input } from 'antd';
import PageHeader from '../../components/pageHeader';
import { ContentContainer } from '../../components/themedComponents';
import { isMobile } from '../../utils/isCheck';
import { confirmPasswordRules, newPasswordRules } from '../../utils/formRules';

export interface NewPasswords {
  readonly password: string;
  readonly confirmPassword: string;
}

const ForgotPasswordReset: React.FC = () => {
  const { key } = useParams();
  const { windowType } = useWindowDimensions();
  const [resetPasswordForm] = Form.useForm();

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
        <PageHeader
          pageTitle="Forgot Password"
          isMobile={isMobile(windowType)}
        />

        <Form name="resetPassword" form={resetPasswordForm} onFinish={onFinish}>
          <Form.Item name="password" rules={newPasswordRules}>
            <Input.Password placeholder="New Password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={confirmPasswordRules(resetPasswordForm, 'password')}
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
