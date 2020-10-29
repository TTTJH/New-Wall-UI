import React,{Component} from 'react'
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import "./card.css"

const { Meta } = Card;


class Mycard extends Component{
    render() {
        return (
            <Card
            className="card"
            style={{ borderRadius:"10px",margin:"10px" }}
            cover={
              <img
                alt="example"
                src="http://www.tttjh.com.cn/imgs/mandao.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="http://www.tttjh.com.cn/imgs/girl.gif" />}
              title="Card title"
              description="这是曼达洛人，星球大战的外传剧集，已经准备出第二季了，非常期待😋"
            />
          </Card>
        )
    }
}

export default Mycard