import React from 'react';
import { Helmet } from 'react-helmet';
import './signup.less';
import { Button, Form, Input, Typography } from 'antd';
import { signup } from '../../auth/authAPI';
import { Link } from 'react-router-dom';
const { Title, Paragraph } = Typography;

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

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <div className="content-container">
        {/*
          Place relevant components in here
        */}
        <Title>Sign Up</Title>
        <Form name="basic" onFinish={onFinish}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input.Password />
          </Form.Item>

          <Paragraph>
            Already have an account? Log in{' '}
            <Link to="/login" component={Typography.Link}>
              here
            </Link>
            !
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

export default Signup;
