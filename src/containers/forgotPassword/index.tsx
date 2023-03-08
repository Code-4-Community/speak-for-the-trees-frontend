import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import authClient from '../../auth/authClient';
import { ForgotPasswordRequest } from '../../auth/ducks/types';
import useWindowDimensions from '../../components/windowDimensions';
import { Button, Form, Input, Typography } from 'antd';
import { site } from '../../App';
import PageHeader from '../../components/pageHeader';
import { ContentContainer } from '../../components/themedComponents';
import { isMobile } from '../../utils/isCheck';
import { enterEmailRules } from '../../utils/formRules';
import { n } from '../../utils/stringFormat';

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation(n(site, ['forgotPassword']), {
    nsMode: 'fallback',
  });

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
        <PageHeader pageTitle={t('header')} isMobile={isMobile(windowType)} />
        {email === '' ? (
          <>
            <Typography.Title level={4}>
              {t('reset_instructions')}
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
            {t('send_reset_email', { email })}
          </Typography.Title>
        )}
      </ContentContainer>
    </>
  );
};

export default ForgotPassword;
