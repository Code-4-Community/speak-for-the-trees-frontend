import React from 'react';
import './login.less';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { login } from '../../auth/authAPI';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import GreetingContainer from '../../components/greeting-container/GreetingContainer';

const { Paragraph, Title } = Typography;

const Login: React.FC = () => {
  const onFinish = (values: any) => {
    login({ email: values.username, password: values.password });
  };

  const greetingHeader = "Welcome Back!";

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <div className="body-content-container">
        <Row>
          <Col span={10} className="input-container">
            <Title level={2} style={{'color': '#000000'}}>Log In</Title>
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
                >
                  Log In
                </Button>
              </Form.Item>
            </Form>

            <Paragraph>
              <Link to="/">
                Forgot Password?
              </Link>
            </Paragraph>

            <Paragraph type="success">NEW TO SPEAK FOR THE TREES?
              <br />
              SIGN UP{' '}
              <Link to="/signup">
                HERE!
              </Link>
            </Paragraph>
          </Col>

          <Col span={2}></Col>

          <Col span={12}>
            <GreetingContainer 
              header={greetingHeader}
              body='Dreamcatcher kogi taiyaki keytar. Swag typewriter craft beer
              cronut pok pok gentrify flannel salvia deep v pork belly
              pitchfork. Swag fashion axe fam. Occupy biodiesel jean shorts
              affogato PBR&B freegan bushwick vegan four loko pickled.'
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
