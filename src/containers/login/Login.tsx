import React from 'react';
import './login.less';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { login } from '../../auth/ducks/thunks';
import { connect, useDispatch } from 'react-redux';
import { C4CState } from '../../store';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';

type LoginProps = UserAuthenticationReducerState;

const Login: React.FC<LoginProps> = ({ tokens }) => {
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    dispatch(login({ email: values.email, password: values.password }));
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <div className="body-content-container">
        <Row>
          <Col span={10} className="input-container">
            <h1>Log In</h1>
            <hr />
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Row id="inputs">
                <Col className="leftInput">
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input placeholder="Username" />
                  </Form.Item>
                </Col>
                <Col>
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

              <Form.Item id={'loginButton'} style={{ marginBottom: '10px' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  size={'large'}
                  style={{ backgroundColor: '#9AC356', borderColor: '#9AC356' }}
                >
                  Log In
                </Button>
              </Form.Item>
            </Form>

            <p id="forgotPassword">
              <Link to="/" component={Typography.Link} className="Link">
                Forgot Password?
              </Link>
            </p>

            <p>New to speak for the trees?</p>
            <p>
              Sign up{' '}
              <Link className="Link" to="/signup" component={Typography.Link}>
                here!
              </Link>
            </p>
          </Col>

          <Col span={2}></Col>

          <Col span={12} className="info-container">
            <h1>Welcome Back!</h1>
            <p>
              Dreamcatcher kogi taiyaki keytar. Swag typewriter craft beer
              cronut pok pok gentrify flannel salvia deep v pork belly
              pitchfork. Swag fashion axe fam. Occupy biodiesel jean shorts
              affogato PBR&B freegan bushwick vegan four loko pickled.
            </p>
          </Col>si
        </Row>
      </div>
    </>
  );
};

const mapStateToProps = (state: C4CState): LoginProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(Login);
