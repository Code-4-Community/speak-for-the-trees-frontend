import React from 'react';
import { Helmet } from 'react-helmet';
import './signup.less';
import {Button, Col, Form, Input, Row, Typography} from 'antd';
import { signup } from '../../auth/authAPI';
import {Link} from 'react-router-dom';
/*const {  } = Typography;*/

// Span of Form Input Fields
const rSpan = 8;
const passSpan = 17;

const Signup: React.FC = () => {
    const onFinish = (values: any) => {
        signup({ email: values.username, password: values.password })
    };

    return (
        <>
            <Helmet>
                <title>Speak for The Trees</title>
                <meta name="description" content="Speak for The Trees Login" />
            </Helmet>

            <div className="body-content-container">
                <Row>
                    <Col>

                        <div className="input-container">
                            <h1>Sign Up</h1>
                            <hr/>
                            <Form
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                            >
                                <Row>
                                    <Col className="leftInput" span={rSpan}>
                                        <Form.Item
                                            name="fname"
                                            rules={[{ required: true, message: 'Please input your first name!' }]}
                                        >
                                            <Input placeholder="First Name"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={rSpan}>
                                        <Form.Item
                                            name="lname"
                                            rules={[{ required: true, message: 'Please input your last name!' }]}
                                        >
                                            <Input placeholder="Last Name"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="leftInput" span={rSpan}>
                                        <Form.Item
                                            name="email"
                                            rules={[{ required: true, message: 'Please input your email!' }]}
                                        >
                                            <Input placeholder="Email"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={rSpan}>
                                        <Form.Item
                                            name="cemail"
                                            rules={[{ required: true, message: 'Please confirm your email!' }]}
                                        >
                                            <Input placeholder="Confirm Email"/>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={passSpan}>
                                        <Form.Item
                                            name="password"
                                            rules ={[{ required: true, message: 'Please enter a password!' }]}
                                        >
                                            <Input.Password placeholder="Password"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={passSpan}>
                                        <Form.Item
                                            name="cpassword"
                                            rules ={[{ required: true, message: 'Please confirm your password!' }]}
                                        >
                                            <Input.Password placeholder="Confirm Password"/>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: '15px' }}>
                                    <Col style={{ marginRight: '15px' }}>
                                        <Form.Item id={'loginButton'}>
                                            <Button type="primary" htmlType="submit"
                                                    size={'large'} style={{ backgroundColor: '#9AC356' , borderColor: '#9AC356' }}>
                                                Log In
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                    <Col style={{ paddingTop: '5px' }}>
                                        <p>Already have an account?</p>
                                        <p>Log in <Link to="/login" component={Typography.Link} className="Link">here!</Link></p>
                                    </Col>
                                </Row>
                            </Form>
                        </div>

                        <div className="info-container">
                            <h1>Nice to meet you!</h1>
                            <p>Dreamcatcher kogi taiyaki keytar. Swag typewriter craft beer cronut pok pok gentrify flannel salvia
                                deep v pork belly pitchfork. Swag fashion axe fam. Occupy biodiesel jean shorts affogato PBR&B freegan
                                bushwick vegan four loko pickled.</p>
                        </div>

                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Signup;
