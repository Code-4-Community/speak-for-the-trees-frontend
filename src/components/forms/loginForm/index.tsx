import React from 'react';
import { LoginRequest } from '../../../auth/ducks/types';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import { WindowTypes } from '../../windowDimensions';
import { FormInstance } from 'antd/es/form';
import { enterEmailRules, loginPasswordRules } from '../../../utils/formRules';
import {GreenButton} from "../../themedComponents";

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
  return (
    <>
      <Form name="basic" form={formInstance} onFinish={onFinish}>
        <Form.Item name="email" rules={enterEmailRules}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={loginPasswordRules}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <StyledFormItem windowtype={windowType}>
          <LoginButton type="primary" htmlType="submit" size="large">
            Log In
          </LoginButton>
        </StyledFormItem>
      </Form>
    </>
  );
};

export default LoginForm;
