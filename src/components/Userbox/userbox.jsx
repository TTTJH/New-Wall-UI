import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {
    PlusOutlined,
} from "@ant-design/icons"

import "./userbox.css"

class Userbox extends Component{
    render() {
        return (
            <div className="user-box">
            <div className="user-avatar">
                <img src="http://www.tttjh.com.cn/imgs/girl.gif" alt=""/>
            </div>
            <p className="nickName">
                爬墙的少年
            </p>
            <div className="user-tag-box">
                <span className="tag">萌新</span>
                <span className="tag">二次元</span>
                <span className="tag">zzuli</span>
                <span className="tag">萌新</span>
                <span className="tag">二次元</span>
                <span className="tag">zzuli</span>
                <span className="tag">萌新</span>
                <span className="tag">二次元</span>
                <span className="tag">zzuli</span>
                <span className="tag tag-add-btn"><PlusOutlined /></span>
            </div>
        </div>
        )
    }
}

//props验证
Userbox.propTypes = {
    userInfo:PropTypes.object
}


export default Userbox