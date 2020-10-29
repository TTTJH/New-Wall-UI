import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {
    PlusOutlined,
} from "@ant-design/icons"

import "./userbox.css"

class Userbox extends Component{
    render() {
    //来自main父组件传递的数据
    const {
        username,
        nickname,
        avater,
        cardCount,
        fansCount,
        followCount,
        likeCount,
        phone,
    } = this.props.userInfo

        return (
            <div className="user-box">
            <div className="user-avatar">
                {
                    avater
                    ?
                    <img src={avater} alt=""/>
                    :
                    <img src="loading.gif" alt=""/>
                }
            </div>
            <p className="nickName">
                {
                    nickname
                    ?
                    <span>{nickname}</span>
                    :
                    <span>---</span>
                }
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
            {/* <div className="user-btn"></div> */}
        </div>
        )
    }
}

//props验证
Userbox.propTypes = {
    userInfo:PropTypes.object
}


export default Userbox