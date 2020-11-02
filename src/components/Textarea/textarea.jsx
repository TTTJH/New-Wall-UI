import React,{Component} from 'react'
import Cookies from 'js-cookie'
import { 
        Input,
        Upload,
        Modal,
        Button,
        message,

       } from 'antd';
import {
    OssImgAjax,
    SetCardAjax,
    GetCardAjax
} from '../../api/index'
import { PlusOutlined } from '@ant-design/icons';
import './textarea.css'

const { TextArea } = Input;
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}

class Textarea extends Component{
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
        fileName:"",
        type:"",
        uploadUrl:"",
        img:"",
        url:""
      };
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
        previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    componentDidMount(){
        console.log(":)")
    }
    handleAction = (file) => {
        let cutIndex = file.name.lastIndexOf(".")
        let fileName = file.name.slice(0,cutIndex)
        let type = file.name.slice(cutIndex+1,file.name.length)
        this.setState({
            img:fileName+"."+type
        })
        return new Promise((resolve,reject) => {
            OssImgAjax(fileName,type,Cookies.get("token").token)
            .then(val => {
                let {URL} = val.data.data
                console.log(URL)
                resolve(URL)
            })
            .catch(err => {
            console.log(err)
                reject(err)
            })
        })
    }
    handleChange = ({ fileList }) => {
        this.setState({ fileList })
        console.log(fileList)
    };

    submit = () => {
        let data = {
            cardCircleId:5,
            context:this.state.content,
            imgsArray:this.state.img ? [this.state.img] : []
        }
        SetCardAjax(data,Cookies.get("token").token)
            .then(val => {
                if(val.data.code == 200){
                    message.success("发布成功🤗")
                    this.setState({
                        content:""
                    })
                    this.props.mainGetCard()
                }
            })
            .catch(err => {
                message.error("发布失败，请重试😐")
            })
    }
    handleUpload = (file) => {
        let fileName = file.name.slice(0,file.name.lastIndexOf("."))
        let type = file.name.slice(file.name.lastIndexOf(".")+1,file.name.length)
        this.setState({
            fileName,
            type,
            img:fileName+"."+type
        })
    }
    textareaChange = (e) => {
        this.setState({
            content:e.target.value
        })
    }
    myUploadChange = (e) => {
        console.log(e.target.value)
        let fileStr = e.target.value.slice(e.target.value.lastIndexOf("\\")+1,e.target.value.length)
        console.log(fileStr)
        let cutIndex = fileStr.lastIndexOf(".")
        let fileName = fileStr.slice(0,cutIndex)
        let type = fileStr.slice(cutIndex+1,fileStr.length)
        console.log(fileName,type)
        OssImgAjax(fileName,type,Cookies.get("token").token)
        .then(val => {
            let {URL} = val.data.data
            this.setState({URL})
        })
        .catch(err => {
        console.log(err)
        })
    }
    // myFormSubmit = () => {
    //     if(this.state.url){

    //     }
    // }
    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>图片🚀</div>
            </div>
            );
        return (
            <div className="textarea-box">
                {/* <form action={this.state.url} method="put">
                    <input type="file" onChange={this.myUploadChange}/>
                    <input onClick={this.myFormSubmit} value="submit"/>
                </form> */}
            <>
                <Upload
                // headers={
                //     {
                //     "Content-Type":'image/jpeg',
                //     "x-oss-meta-author":"ekij",
                //     }
                // }
                ref="upload"
                name="file"
                method="post"
                className="textarea-box-upload-btn"
                action={`http://192.168.43.52:8080/ekij/oss/upload/${this.state.fileName}/${this.state.type}`}
                // action={this.handleAction}
                listType="picture-card"
                fileList={fileList}
                beforeUpload={this.handleUpload}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                
                >
                {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={this.handleCancel}
                >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
            <TextArea value={this.state.content} ref="textarea" onChange={this.textareaChange}  className="textarea" rows={4} placeholder="在此输入内容发布你的卡片吧😝"/>
            <Button onClick={this.submit} className="textarea-box-btn" type="primary">发布🚀</Button>
            </div>
        )
    }
}

export default Textarea