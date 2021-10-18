import { Button, Form, Input } from "antd"
import axios from "axios"
import { useState } from "react";
import "./Components.css"
import { Link } from "react-router-dom";

const LoginForm = () => {
    const[loginInput, setLoginInput] = useState(null);
    const[passwordInput, setPasswordInput] = useState(null);

    const onFinish = async(values) => {
        const response = await axios.post("http://localhost:51693/api/user", {userLogin: loginInput, userPassword: passwordInput});
        console.log('response', response);
        if (response.status === 200)
        {
            <Link to="/admin"></Link>
        }
    }

    const onLoginValueChange = (e) => {
        setLoginInput(e.target.value);
    };

    const onPasswordValueChange = (e) => {
        setPasswordInput(e.target.value);
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed: ", errorInfo);
    };

    return (
        <div className="LoginForm">
            <Form name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
                <Form.Item 
                label="Username"
                name="username"
                rules={
                    [
                        {
                            required: true,
                            message: "Please input your username!"
                        }
                    ]
                }>
                    <Input onChange={onLoginValueChange}
                           value={loginInput} />
                </Form.Item>
                <Form.Item 
                label="Password"
                name="password"
                rules = {[
                    {
                        required: true,
                        message: "Please input your password!"
                    }
                ]}>
                    <Input.Password onChange={onPasswordValueChange}
                                    value={setPasswordInput} />
                </Form.Item>
                <Form.Item 
                wrapperCol={{
                    offeset: 8,
                    span: 16
                }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;