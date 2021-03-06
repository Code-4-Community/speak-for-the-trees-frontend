import React from 'react';
import { LoginRequest } from '../../../auth/ducks/types';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import { WindowTypes } from '../../windowDimensions';
import { FormHalfItem, FormRow, Gap } from '../../themedComponents';
import { FormInstance } from 'antd/es/form';
import { enterEmailRules, loginPasswordRules } from '../../../utils/formRules';

interface LoginFormProps {
  readonly formInstance: FormInstance;
  readonly onFinish: (values: LoginRequest) => void;
  readonly windowType: WindowTypes;
}

const LoginButton = styled(Button)`
  width: 96px;
  margin-top: 1.5vh;
`;

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 10px;
`;

const LoginForm: React.FC<LoginFormProps> = ({
  formInstance,
  onFinish,
  windowType,
}) => {
  return (
    <>
      <Form name="basic" form={formInstance} onFinish={onFinish}>
        {(() => {
          switch (windowType) {
            case WindowTypes.Mobile:
            case WindowTypes.Tablet:
              return (
                <>
                  <Form.Item name="email" rules={enterEmailRules}>
                    <Input placeholder="Email" />
                  </Form.Item>
                  <Form.Item name="password" rules={loginPasswordRules}>
                    <Input.Password placeholder="Password" />
                  </Form.Item>

                  <Form.Item>
                    <LoginButton type="primary" htmlType="submit" size="large">
                      Log In
                    </LoginButton>
                  </Form.Item>
                </>
              );
            case WindowTypes.NarrowDesktop:
            case WindowTypes.Desktop:
              return (
                <>
                  <FormRow>
                    <FormHalfItem name="email" rules={enterEmailRules}>
                      <Input placeholder="Email" />
                    </FormHalfItem>
                    <Gap />
                    <FormHalfItem name="password" rules={loginPasswordRules}>
                      <Input.Password placeholder="Password" />
                    </FormHalfItem>
                  </FormRow>

                  <StyledFormItem>
                    <LoginButton type="primary" htmlType="submit" size="large">
                      Log In
                    </LoginButton>
                  </StyledFormItem>
                </>
              );
          }
        })()}
      </Form>
    </>
  );
};

export default LoginForm;
