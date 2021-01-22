import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import styled from 'styled-components';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/window-dimensions';

const formHalfItemSpan = 8;
const offsetSpan = 1;

const formLayout = {
  wrapperCol: { span: 17 },
};

interface LoginFormProps {
  readonly onFinish: any;
}

const LoginButton = styled(Button)`
  width: 96px;
  margin-top: 20px;
`;

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 10px;
`;

const LoginForm: React.FC<LoginFormProps> = ({ onFinish }) => {
  const { windowType } = useWindowDimensions();

  switch (windowType) {
    case WindowTypes.Mobile:
      return (
        <>
          <Form
            {...formLayout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
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
          </Form>
        </>
      );
    default:
      return (
        <>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Row>
              <Col span={formHalfItemSpan}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email!',
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
              <Col span={offsetSpan} />
              <Col span={formHalfItemSpan}>
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
              </Col>
            </Row>

            <StyledFormItem>
              <LoginButton type="primary" htmlType="submit" size={'large'}>
                Log In
              </LoginButton>
            </StyledFormItem>
          </Form>
        </>
      );
  }
};

export default LoginForm;
