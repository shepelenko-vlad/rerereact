import { Button, Form, Input } from "antd"
import axios from "axios"
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Components.css"
import { Link, Route } from "react-router-dom";

const LoginForm = () => {
    const[loginInput, setLoginInput] = useState(null);
    const[passwordInput, setPasswordInput] = useState(null);
    const { push } = useHistory();

    const onFinish = async() => {
        const response = await axios.post("http://localhost:51693/api/user", {userLogin: loginInput, userPassword: passwordInput});
        console.log('response', response);
        if (response)
        {
            push("/admin");
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
            <Route>
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
            </Route>
        </div>
    );
};

export default LoginForm;