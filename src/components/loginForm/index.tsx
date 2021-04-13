import React from 'react';
import { LoginRequest } from '../../auth/ducks/types';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import useWindowDimensions, { WindowTypes } from '../windowDimensions';
import { FormHalfItem, FormRow, Gap } from '../themedComponents';

interface LoginFormProps {
  readonly onFinish: (values: LoginRequest) => void;
}

const LoginButton = styled(Button)`
  width: 96px;
  margin-top: 1.5vh;
`;

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 10px;
`;

const LoginForm: React.FC<LoginFormProps> = ({ onFinish }) => {
  const { windowType } = useWindowDimensions();

  return (
    <>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        {(() => {
          switch (windowType) {
            case WindowTypes.Mobile:
            case WindowTypes.Tablet:
              return (
                <>
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
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
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
                    <FormHalfItem
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your email!',
                        },
                        {
                          pattern: /^\S+@\S+\.\S{2,}$/,
                          message: 'Not a valid email address',
                        },
                      ]}
                    >
                      <Input placeholder="Email" />
                    </FormHalfItem>
                    <Gap />
                    <FormHalfItem
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                      ]}
                    >
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
