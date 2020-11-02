import React,{Component} from 'react'
import {
    message,

} from 'antd'
import Cookies from 'js-cookie'

import Userbox from '../Userbox/userbox'
import Card from '../Card/card'
import RecommendCard from '../Recommendcard/recommendcard'
import Textarea from '../Textarea/textarea'

import {
    UserInfoAjax,//只需传递token
    GetCardAjax,
    SetCardAjax, 
    SetCardLike
} from '../../api/index'
import {
    changeUserInfo,
} from '../../redux/action'
import store from '../../redux/store'

import "./main.css"

class Main extends Component{
    state = {
     userInfo:{},
     cardList:[]
    }
    componentDidMount(){
        //通过判断cookie的token
        let token = Cookies.get()
        if(token){
            //已经登入
            UserInfoAjax(token.token)
                .then(val => {
                    let {user} = val.data.data
                    this.state=store.getState();
                    store.subscribe(this.storeChange)
                    // dispatch()
                    let action = changeUserInfo(user)
                    store.dispatch(action)
                    console.log(this.state)

                    //get card list
                    this.mainGetCard()
                })
                .catch(err => {
                    this.props.history.push("/login")
                })
        }else{
            //未登入
            this.props.history.push("/login")
        }
    }

    storeChange = () => {
        this.setState(store.getState())
    }

    mainGetCard = () => {
        console.log("getCard执行了！")
        //获取card list
        GetCardAjax(1,Cookies.get("token").token)
        .then(val => {
            console.log(val)
            // let {cardList} = this.state
            // console.log(cardList)
            // cardList.push(val.data.data.cardList)
            this.setState({
                cardList:val.data.data.cardList
            })
        })
        .catch(err => {
            console.log(err)
            message.error("服务器出错请重试！")
        })
    }    

    like = (cardId) => {
        console.log(cardId)
        console.log(":::::::")
        SetCardLike(cardId,Cookies.get("token").token)
            .then(val => {
                console.log(val)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="main clearfix">
                <div className="main-container">
                    <div className="main-left-box">
                      <Userbox 
                        userInfo = {this.state.userInfo}
                      />
                      <div className="recommend-box">
                        <p className="recommend-box-title">Classmate:</p>
                        {
                            new Array(1,2,3,4,5,6,7,8).map((item,index) => {
                                return <RecommendCard/>
                            })
                        }
                      </div>
                    </div>
                   
                    <div className="main-card-box">
                        <p className="main-card-box-textarea-title">Textarea:</p>
                        <Textarea
                            mainGetCard={this.mainGetCard}
                        />
                        {/* <div className="card-box"> */}
                        <p className="main-card-box-title">Card:</p>
                        {
                            // new Array(1,2,3,4,5,6,7,8,9,10).map((item,index) => {
                            //     return (
                            //         <Card/>
                            //     )
                            // })
                            this.state.cardList.length >= 1
                            ?
                            this.state.cardList.map((item,index) => {
                                    return (
                                        <Card
                                        like = {() => this.like(item.cardId)}
                                        cardId={item.cardId}
                                        cardContext={item.cardContext}
                                        cardImgsArray={item.cardImgsArray}
                                        commentCount={item.commentCount}
                                        likeCount={item.likeCount}
                                        createTime={item.createTime}
                                        user={item.user}
                                        />
                                    )
                            })
                            :
                            <img className="loading" src="loading.gif" / >
                        }
                        {/* </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Main