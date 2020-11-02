import React,{Component} from 'react'
import { Card, Avatar } from 'antd';
import { EditOutlined, MessageOutlined, LikeOutlined } from '@ant-design/icons';
import "./card.css"

const { Meta } = Card;


class Mycard extends Component{
    componentDidMount(){
      // console.log(this.props)
    }
    render() {
        return (
            <Card
            
            className="card"
            style={{ borderRadius:"10px",margin:"10px" }}
            cover={
              <img
                alt="example"
                src={this.props.cardImgsArray ? this.props.cardImgsArray[0] : "http://www.tttjh.com.cn/imgs/aaa.png"}
                // src="http://www.tttjh.com.cn/imgs/aaa.png"
              />
            }
            actions={[
            <sapn><LikeOutlined onClick={() => this.props.like(this.props.cardId)} key="likes"/>&nbsp;&nbsp;{this.props.likeCount}</sapn>,
            <span><MessageOutlined key="comments" />&nbsp;&nbsp;{this.props.commentCount}</span>,
            ]}
          >
            <Meta
              avatar={<Avatar src={this.props.user.avater} />}
              title={this.props.user.nickname}
              description={this.props.cardContext}
            />
          </Card>
        )
    }
}

export default Mycard