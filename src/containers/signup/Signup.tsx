import React from 'react';
import './signup.less';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { signup } from '../../auth/ducks/thunks';
import { connect, useDispatch } from 'react-redux';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';
import { C4CState } from '../../store';

const hSpan = 8;
const fSpan = 17;

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

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <div className="body-content-container">
        <Row>
          <Col span={10} className="input-container">
            <h1>Sign Up</h1>
            <hr />
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Row>
                <Col className="leftInput" span={hSpan}>
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
                <Col span={hSpan}>
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

              <Row>
                <Col span={fSpan}>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: 'Please input your email!' },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={fSpan}>
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: 'Please enter a password!' },
                    ]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={fSpan}>
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
                </Col>
              </Row>

              <Row style={{ marginTop: '15px' }}>
                <Col style={{ marginRight: '15px' }}>
                  <Form.Item id={'loginButton'}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size={'large'}
                      style={{
                        backgroundColor: '#9AC356',
                        borderColor: '#9AC356',
                      }}
                    >
                      Log In
                    </Button>
                  </Form.Item>
                </Col>
                <Col style={{ paddingTop: '5px' }}>
                  <p>Already have an account?</p>
                  <p>
                    Log in{' '}
                    <Link
                      to="/login"
                      component={Typography.Link}
                      className="Link"
                    >
                      here!
                    </Link>
                  </p>
                </Col>
              </Row>
            </Form>
          </Col>

          <Col span={2}></Col>

          <Col span={12} className="info-container">
            <h1>Nice to meet you!</h1>
            <p>
              Dreamcatcher kogi taiyaki keytar. Swag typewriter craft beer
              cronut pok pok gentrify flannel salvia deep v pork belly
              pitchfork. Swag fashion axe fam. Occupy biodiesel jean shorts
              affogato PBR&B freegan bushwick vegan four loko pickled.
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
};

const mapStateToProps = (state: C4CState): SignupProps => {
  return {
    tokens: state.authenticationState.tokens,
  };
};

export default connect(mapStateToProps)(Signup);
