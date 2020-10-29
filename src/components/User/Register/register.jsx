import React, { useState,useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import {
  Form,
  Input,
  Tooltip,
  Button,
  message,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie'

import {
  RegisterAjax
} from '../../../api/index'

import './register.css'

const RegistrationForm = () => {
  let history = useHistory();

  const [form] = Form.useForm();

  const onFinish = values => {
    //提交注册信息
    RegisterAjax(values)
    .then(function(val){
      let {code} = val.data
      if(code == 100){
        //手机号重复
        message.error("该手机号已经被注册")
      }else if(code == 200){
        let {token} = val.data.data
        //保存token至cookie中
        Cookies.set("token",token,{expires:1})
        //自动登入(获取token就已经登入)并跳转至 根路由
        message.success("注册成功！已自动登入🤓")
        history.push("/")
      }else{
        message.error("出错!")
      }
    })
    .catch(err => {
      console.log(err)
    })
  };

  return (
  <div className="register-box">
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >

      <Form.Item
        name="username"
        label={
          <span>
            用户名&nbsp;
          </span>
        }
        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="nickname"
        label={
          <span>
            昵称&nbsp;
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="手机号码"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input  style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button className="register-box-btn" type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>

    </Form>
  </div>

  );
};

export default RegistrationForm