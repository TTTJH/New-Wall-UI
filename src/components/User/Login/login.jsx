import React,{Component} from 'react'
import Cookies from 'js-cookie'
import { Form, Input, Button } from 'antd';

import {
    LoginAjax,
} from '../../../api/index'
import {
    changeUserInfo,
} from '../../../redux/action'
import store from '../../../redux/store'

import './login.css'

class Login extends Component{
constructor(props){
    super(props)
    this.state=store.getState();
    store.subscribe(this.storeChange) //订阅Redux的状态
}
    layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    storeChange = () => {
        this.setState(store.getState())
    }
    onFinish = values => {
        //执行登入ajax
        LoginAjax(values)
            .then(val => {
                let {token} = val.data.data
                //保存token至cookie中
                Cookies.set("token",token,{expires:1})
                console.log(val)
                // dispatch()
                let action = changeUserInfo(val.data.data.user)
                store.dispatch(action)
                //跳转根路由
                this.props.history.push("/")
            })  
            .catch(err => {
                console.log(err)
            })
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