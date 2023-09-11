import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import authClient from '../../auth/authClient';
import useWindowDimensions from '../../components/windowDimensions';
import Button from 'antd/es/button';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import message from 'antd/es/message';
import { site } from '../../constants';
import PageHeader from '../../components/pageHeader';
import { ContentContainer } from '../../components/themedComponents';
import { isMobile } from '../../utils/isCheck';
import { confirmPasswordRules, newPasswordRules } from '../../utils/formRules';
import { n } from '../../utils/stringFormat';

export interface NewPasswords {
  readonly password: string;
  readonly confirmPassword: string;
}

interface ForgotPasswordResetParams {
  key: string;
}

const ForgotPasswordReset: React.FC = () => {
  const { t } = useTranslation(n(site, ['forgotPasswordReset', 'forms']), {
    nsMode: 'fallback',
  });

  const { key } = useParams<ForgotPasswordResetParams>();
  const { windowType } = useWindowDimensions();
  const [resetPasswordForm] = Form.useForm();

  const onFinish = (values: NewPasswords) => {
    authClient
      .forgotPasswordReset({ secretKey: key, newPassword: values.password })
      .then(() => {
        message.success(t('reset_success'));
      })
      .catch((err) => {
        message.error(t('reset_error'));
      });
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
        <meta
          name="description"
          content="User can reset their forgotten password."
        />
      </Helmet>
      <ContentContainer>
        <PageHeader pageTitle={t('header')} isMobile={isMobile(windowType)} />

        <Form name="resetPassword" form={resetPasswordForm} onFinish={onFinish}>
          <Form.Item name="password" rules={newPasswordRules}>
            <Input.Password placeholder={t('reset_password.new_password')} />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={confirmPasswordRules(resetPasswordForm, 'password')}
          >
            <Input.Password
              placeholder={t('reset_password.confirm_password')}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              {t('submit')}
            </Button>
          </Form.Item>
        </Form>
      </ContentContainer>
    </>
  );
};

export default ForgotPasswordReset;
