import React,{Component} from 'react'
import {BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {Button} from 'antd'

//组件
import Header from '../Header/header'
import Sidemenu from '../Sidemenu/sidemenu'
import Main from '../Main/main'
import Login from '../User/Login/login'
import Register from '../User/Register/register'

import './index.less'

class Index extends Component{
    render() {
        return (
            <div>
            <Header/>
            <Sidemenu/>
            <Router  className="Index">
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register}/>
            </Router>
            </div>
        )
    }
}

export default Index