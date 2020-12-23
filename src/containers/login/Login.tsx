import React from 'react';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { ParagraphProps } from 'antd/lib/typography/Paragraph';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import GreetingContainer from '../../components/greeting-container/GreetingContainer';
import { login } from '../../auth/ducks/thunks';
import { connect, useDispatch } from 'react-redux';
import { C4CState } from '../../store';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';
import { BLACK, LIGHT_GREY, TEXT_GREY, WHITE } from '../../colors';
import styled from 'styled-components';

const { Paragraph, Title } = Typography;

const formHalfItemSpan = 8;
const offsetSpan = 1;

const LoginContainer = styled.div`
  padding: 8%;
`;

const InputContainer = styled(Col)`
  height: 481px;
  min-width: 250px;
  padding: 30px 20px 20px 50px;
  background: ${LIGHT_GREY};
  box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.09);
  border-radius: 6px;
`;

const Line = styled.div`
  height: 2px;
  margin: 5% -20px 15% -50px;
  background: ${WHITE};
`;

const LoginButton = styled(Button)`
  width: 96px;
  margin-top: 20px;
`;

const Footer: typeof Paragraph = styled(Paragraph)<ParagraphProps>`
  color: ${TEXT_GREY};
  line-height: 1.5;
  margin-top: 40px;
`;

type LoginProps = UserAuthenticationReducerState;

const Login: React.FC<LoginProps> = ({ tokens }) => {
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    dispatch(login({ email: values.email, password: values.password }));
  };

  const greetingHeader = 'Welcome Back!';

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <LoginContainer>
        <Row>
          <InputContainer span={10}>
            <Title level={2} style={{ color: BLACK }}>
              Log In
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
                <Col span={offsetSpan}></Col>
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

              <Form.Item style={{ marginBottom: '10px' }}>
                <LoginButton type="primary" htmlType="submit" size={'large'}>
                  Log In
                </LoginButton>
              </Form.Item>
            </Form>

            <Paragraph>
              <Link to="/">FORGOT PASSWORD?</Link>
            </Paragraph>

            <Footer>
              NEW TO SPEAK FOR THE TREES?
              <br />
              SIGN UP <Link to="/signup">HERE!</Link>
            </Footer>
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
      </LoginContainer>
    </>
  );
};

const mapStateToProps = (state: C4CState): LoginProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(Login);
