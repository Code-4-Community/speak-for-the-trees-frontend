import React from 'react';
import './signup.less';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { signup } from '../../auth/authAPI';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import GreetingContainer from '../../components/greeting-container/GreetingContainer';

const { Paragraph, Title } = Typography;

const hSpan = 8;
const fSpan = 17;

const Signup: React.FC = () => {
  const onFinish = (values: any) => {
    // TODO: what if backend says the values are invalid? need to handle this
    signup({
      username: values.username,
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    });
  };

  const greetingHeader = 'Welcome Back!';

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <div className="body-content-container">
        <Row>
          <Col span={10} className="input-container">
            <Title level={2} style={{ color: '#000000' }}>
              Sign Up
            </Title>
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
                    <Button type="primary" htmlType="submit" size={'large'}>
                      Log In
                    </Button>
                  </Form.Item>
                </Col>
                <Col>
                  <Paragraph className="footer">
                    ALREADY HAVE AN ACCOUNT?
                    <br />
                    LOGIN <Link to="/login">HERE!</Link>
                  </Paragraph>
                </Col>
              </Row>
            </Form>
          </Col>

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
      </div>
    </>
  );
};

export default Signup;
