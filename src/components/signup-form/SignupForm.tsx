import React from 'react';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { ParagraphProps } from 'antd/lib/typography/Paragraph';
import { Link } from 'react-router-dom';
import { TEXT_GREY } from '../../colors';
import styled from 'styled-components';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/window-dimensions';

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

interface SignupFormProps {
  readonly onFinish: any;
}

interface ButtonFooterProps {
  readonly isMobile: boolean;
}

const ButtonFooter: React.FC<ButtonFooterProps> = ({ isMobile }) => {
  const SignupButton = (
    <Button type="primary" htmlType="submit" size="large">
      Sign Up
    </Button>
  );
  const FooterToLogin = (
    <Footer>
      ALREADY HAVE AN ACCOUNT?
      <br />
      LOGIN <Link to="/login">HERE!</Link>
    </Footer>
  );
  if (isMobile) {
    return (
      <>
        <Form.Item>{SignupButton}</Form.Item>
        {FooterToLogin}
      </>
    );
  }
  return (
    <>
      <Row>
        <Col>
          <Form.Item>{SignupButton}</Form.Item>
        </Col>
        <Col span={offsetSpan}></Col>
        <Col>{FooterToLogin}</Col>
      </Row>
    </>
  );
};

const SignupForm: React.FC<SignupFormProps> = ({ onFinish }) => {
  const { windowType, width } = useWindowDimensions();
  const isMobile = windowType === WindowTypes.Mobile;

  return (
    <>
      <Form
        {...formLayout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Row>
          <Col span={formHalfItemSpan}>
            <Form.Item
              name="fname"
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
          <Col
            span={formHalfItemSpan}
            style={{
              marginLeft: `${
                isMobile ? `${width > 575 ? '-7.5%' : '8%'}` : '-7.5%'
              }`,
            }}
          >
            <Form.Item
              name="lname"
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
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter a password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="cpassword"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
        <ButtonFooter isMobile={isMobile} />
      </Form>
    </>
  );
};

export default SignupForm;
