import React from 'react';
import { SignupRequest } from '../../auth/ducks/types';
import { Routes } from '../../App';
import { Button, Col, Form, Input, Row, Space, Typography } from 'antd';
import { ParagraphProps } from 'antd/lib/typography/Paragraph';
import { Link } from 'react-router-dom';
import { TEXT_GREY } from '../../utils/colors';
import styled from 'styled-components';
import useWindowDimensions, { WindowTypes } from '../windowDimensions';

const { Paragraph } = Typography;

const formHalfItemSpan = 11;
const offsetSpan = 1;

const formLayout = {
  wrapperCol: { span: 17 },
};

const Footer: typeof Paragraph = styled(Paragraph)<ParagraphProps>`
  color: ${TEXT_GREY};
  line-height: 1.5;
`;

const StyledSpace = styled(Space)`
  width: 100%;
`;

interface SignupFormProps {
  readonly onFinish: (values: SignupRequest) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onFinish }) => {
  const { windowType, width } = useWindowDimensions();

  const ColLeftMargin = `${width > 575 ? '-7.5%' : '8%'}`;

  return (
    <>
      <Form
        {...formLayout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <StyledSpace direction="vertical" size={1}>
          <Row>
            <Col span={formHalfItemSpan}>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your first name!',
                  },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={formHalfItemSpan} style={{ marginLeft: ColLeftMargin }}>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your last name!',
                  },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter a username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
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
              { required: true, message: 'Please enter a password!' },
              {
                min: 8,
                message: 'Password must be at least 8 characters long',
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const password = getFieldValue('password');
                  if (value && password !== value) {
                    return Promise.reject('Passwords do not match');
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
        </StyledSpace>
        <div>
          {(() => {
            switch (windowType) {
              case WindowTypes.Mobile:
                return (
                  <>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" size="large">
                        Sign Up
                      </Button>
                    </Form.Item>
                    <Footer>
                      ALREADY HAVE AN ACCOUNT?
                      <br />
                      LOGIN <Link to={Routes.LOGIN}>HERE!</Link>
                    </Footer>
                  </>
                );
              case WindowTypes.Tablet:
              case WindowTypes.NarrowDesktop:
              case WindowTypes.Desktop:
                return (
                  <>
                    <Row>
                      <Col>
                        <Form.Item>
                          <Button type="primary" htmlType="submit" size="large">
                            Sign Up
                          </Button>
                        </Form.Item>
                      </Col>
                      <Col span={offsetSpan} />
                      <Col>
                        <Footer>
                          ALREADY HAVE AN ACCOUNT?
                          <br />
                          LOGIN <Link to={Routes.LOGIN}>HERE!</Link>
                        </Footer>
                      </Col>
                    </Row>
                  </>
                );
            }
          })()}
        </div>
      </Form>
    </>
  );
};

export default SignupForm;
