import React from 'react';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { ParagraphProps } from 'antd/lib/typography/Paragraph';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import GreetingContainer from '../../components/greeting-container/GreetingContainer';
import { signup } from '../../auth/ducks/thunks';
import { connect, useDispatch } from 'react-redux';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';
import { C4CState } from '../../store';
import { WHITE, BLACK, TEXT_GREY, LIGHT_GREY } from '../../colors';
import styled from 'styled-components';

const { Paragraph, Title } = Typography;

const SignupContainer = styled.div`
  padding: 8%;
`;

const InputContainer = styled(Col)`
  height: 481px;
  min-width: 500px;
  padding: 30px 20px 20px 50px;
  background: ${LIGHT_GREY};
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.09);
  border-radius: 6px;
`;

const Line = styled.div`
  height: 2px;
  margin: 5% -20px 7% -50px;
  background-color: ${WHITE};
`;

const Footer: typeof Paragraph = styled(Paragraph)<ParagraphProps>`
  color: ${TEXT_GREY};
  line-height: 1.5;
`;

const formHalfItemSpan = 8;
const formOffsetSpan = 1;

const formLayout = {
  wrapperCol: { span: 17 },
};

type SignupProps = UserAuthenticationReducerState;

const Signup: React.FC<SignupProps> = ({ tokens }) => {
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    dispatch(
      signup({
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      }),
    );
  };

  const greetingHeader = 'Welcome Back!';

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <SignupContainer>
        <Row>
          <InputContainer span={10}>
            <Title level={2} style={{ color: BLACK }}>
              Sign Up
            </Title>
            <Line />
            <Form
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
                <Col span={formOffsetSpan}></Col>
                <Col span={formHalfItemSpan}>
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
                {...formLayout}
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                {...formLayout}
                name="password"
                rules={[
                  { required: true, message: 'Please enter a password!' },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item
                {...formLayout}
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

              <Row>
                <Col>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" size={'large'}>
                      Sign Up
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={formOffsetSpan}></Col>
                <Col>
                  <Footer>
                    ALREADY HAVE AN ACCOUNT?
                    <br />
                    LOGIN <Link to="/login">HERE!</Link>
                  </Footer>
                </Col>
              </Row>
            </Form>
          </InputContainer>

          <Col span={2}></Col>

          <Col span={12}>
            <GreetingContainer
              header={greetingHeader}
              body="Dreamcatcher kogi taiyaki keytar. Swag typewriter craft beer
              cronut pok pok gentrify flannel salvia deep v pork belly
              pitchfork. Swag fashion axe fam. Occupy biodiesel jean shorts
              affogato PBR&B freegan bushwick vegan four loko pickled."
            />
          </Col>
        </Row>
      </SignupContainer>
    </>
  );
};

const mapStateToProps = (state: C4CState): SignupProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(Signup);
