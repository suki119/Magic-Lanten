import React, { useEffect } from "react";
import { Form, Input, Button, Row, Col, Card } from 'antd';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const LoginPage = ({ setIsAuthenticated }) => {
    const [form] = Form.useForm();
    const history = useHistory();

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(null))
    }, []);

    const onFinish = (values) => {
       

        if (values.password === '1') {

            setIsAuthenticated(true)
            values.status = true;
            localStorage.setItem("user", JSON.stringify(values));
            history.push(`/add-image`);

        } else {

        }


        // Replace the URL with your actual API endpoint for login
        axios.post('https://your-api-endpoint.com/login', values)
            .then((response) => {
                // Handle successful login, e.g., redirect to the dashboard
            })
            .catch((error) => {
                // Handle login failure, e.g., show an error message
            });
    };

    return (
        <div style={{ background: 'linear-gradient(to right, #462e84, #ff7eb3)' }}>
            <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Col xs={20} sm={16} md={16} lg={12} xl={8}>
                    <Card style={{ borderRadius: 10, width: '100%', padding: '5px' }}>
                        <div style={{ marginBottom: 10}}>
                            <h2 style={{ color: 'black', textAlign: 'center',fontFamily:'math' }}>Add Colors to Your Vision</h2>
                        </div>
                        <img
                            style={{ width: '100%', marginBottom: 16 }}
                            src="https://res.cloudinary.com/colouration/image/upload/v1697583125/ideogram_3_q970bm.jpg"
                            alt="Logo"
                        />
                        <Form
                            form={form}
                            onFinish={onFinish}
                            layout="vertical"
                        >
                            <Form.Item
                                label={<span style={{ fontWeight: '500' }}>Product ID</span>}
                                name="productId"
                                rules={[{ required: true, message: 'Please enter your Product ID' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                               label={<span style={{ fontWeight: '500' }}>Password</span>}
                                name="password"
                                rules={[{ required: true, message: 'Please enter your password' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: '100%',backgroundColor:'#5b2f84',fontWeight:'500' }}>
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default LoginPage;
