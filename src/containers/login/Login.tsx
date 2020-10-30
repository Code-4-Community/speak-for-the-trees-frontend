import React from 'react';
import { Helmet } from 'react-helmet';
import './login.less';
import { Button, Form, Input, Typography } from 'antd';
import { login } from '../../auth/authAPI';
import { Link } from 'react-router-dom';
const { Title, Paragraph } = Typography;

const Login: React.FC = () => {
  const onFinish = (values: any) => {
    login({ email: values.username, password: values.password });
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <div className="content-container">
        <Title>Login</Title>
        <Form name="basic" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Paragraph>
            Need an account? Sign up{' '}
            <Link to="/signup" component={Typography.Link}>
              here
            </Link>
            !
          </Paragraph>

          <Paragraph>
            Forgot your password? Click{' '}
            <Link to="/" component={Typography.Link}>
              here
            </Link>{' '}
            to reset it.
          </Paragraph>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
