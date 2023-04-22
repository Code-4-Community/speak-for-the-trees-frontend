import React from 'react';
import { LoginRequest } from '../../../auth/ducks/types';
import { Form, Input } from 'antd';
import styled from 'styled-components';
import { WindowTypes } from '../../windowDimensions';
import { FormInstance } from 'antd/es/form';
import { enterEmailRules, loginPasswordRules } from '../../../utils/formRules';
import { GreenButton } from '../../themedComponents';
import { useTranslation } from 'react-i18next';
import { n } from '../../../utils/stringFormat';
import { site } from '../../../constants';

interface LoginFormProps {
  readonly formInstance: FormInstance;
  readonly onFinish: (values: LoginRequest) => void;
  readonly windowType: WindowTypes;
}

const LoginButton = styled(GreenButton)`
  width: 96px;
  margin-top: 1.5vh;
`;

interface StyledFormItemProps {
  readonly windowtype: WindowTypes;
}

const StyledFormItem = styled(Form.Item)`
  margin-bottom: ${(props: StyledFormItemProps) =>
    [WindowTypes.Mobile, WindowTypes.Tablet].includes(props.windowtype)
      ? '20px'
      : '10px'};
`;

const LoginForm: React.FC<LoginFormProps> = ({
  formInstance,
  onFinish,
  windowType,
}) => {
  const { t } = useTranslation(n(site, ['forms']), { nsMode: 'fallback' });

  return (
    <>
      <Form name="basic" form={formInstance} onFinish={onFinish}>
        <Form.Item name="email" rules={enterEmailRules}>
          <Input placeholder={t('email')} />
        </Form.Item>
        <Form.Item name="password" rules={loginPasswordRules}>
          <Input.Password placeholder={t('password')} />
        </Form.Item>
        <StyledFormItem windowtype={windowType}>
          <LoginButton type="primary" htmlType="submit" size="large">
            {t('log_in')}
          </LoginButton>
        </StyledFormItem>
      </Form>
    </>
  );
};

export default LoginForm;
