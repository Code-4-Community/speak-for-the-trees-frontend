import React from 'react';
import { Helmet } from 'react-helmet';
import './home.less';
import { Button, Form, Input, Typography } from 'antd';
import { login } from '../../auth/authAPI';
const { Title } = Typography;

const Home: React.FC = () => {
  const onFinish = (values: any) => {
    login({ email: values.username, password: values.password });
  };

  return (
    <>
      <Helmet>
        <title>Title goes here</title>
        <meta name="description" content="Description goes here." />
      </Helmet>
      <div className="content-container">
        <Title>Code4Community Frontend Scaffold</Title>
        <Title level={3}>
          Built with React.js, Typescript, and AntD components.
        </Title>
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

export default Home;
