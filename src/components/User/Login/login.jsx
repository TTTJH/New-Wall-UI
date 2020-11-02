import React,{Component} from 'react'
import Cookies from 'js-cookie'
import { Form, Input, Button } from 'antd';
import './login.css'

class Login extends Component{
constructor(props){
    super(props)

}
    layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    onFinish = values => {

    };

    onFinishFailed = errorInfo => {
         console.log('Failed:', errorInfo);
    };
    render() {
        return (
            <div className="login-box">

            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item >
                    <Button className="login-box-btn" type="primary" htmlType="submit">
                        登入
                    </Button>
                </Form.Item>
            </Form>

            </div>
        )
    }
}

export default Login