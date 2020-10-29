import React,{Component} from 'react'
import Cookies from 'js-cookie'
import { 
        Input,
        Upload,
        Modal,
        Button,
       } from 'antd';
import {
    OssImgAjax,
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
        uploadUrl:""
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
     handleUpload = (file,fileList) => {
        // let lastIndex = fileList.length - 1
        // let cutIndex = fileList[lastIndex].name.lastIndexOf(".")
        // let fileName = fileList[lastIndex].name.slice(0,cutIndex)
        // let type = fileList[lastIndex].name.slice(cutIndex+1,fileList[lastIndex].name.length)
        // OssImgAjax(fileName,type,Cookies.get("token").token)
        //     .then(val => {
        //         let {url} = val.data.data
        //         this.setState({uploadUrl:url})
        //     })
        //     .catch(err => {
        //         console.log(err)
        // })
    }
    componentDidMount(){
        OssImgAjax("test","png",Cookies.get("token").token)
        .then(val => {
            let {url} = val.data.data
            console.log(val)
        })
        .catch(err => {
        console.log(err)
        })
    }
    handleAction = (file) => {
        let cutIndex = file.name.lastIndexOf(".")
        let fileName = file.name.slice(0,cutIndex)
        let type = file.name.slice(cutIndex+1,file.name.length)
        return new Promise((resolve,reject) => {
            OssImgAjax(fileName,type,Cookies.get("token").token)
            .then(val => {
                let {URL} = val.data.data
                console.log(URL)
                resolve("https://ekij.oss-cn-beijing.aliyuncs.com/o.jpg?Expires=1603978391&OSSAccessKeyId=STS.NV6yK6AwaaLaiv4UC6yTGSYp1&Signature=OlO7IGdi5L8vFIZWgrsmNXbLqME%3D&security-token=CAISlAJ1q6Ft5B2yfSjIr5WDMvGCrKhA1o6Ka1CFsUNjddtrvJzb0zz2IH5Ff3VtCesbt%2F0znGtX7%2Fkclq1oVo1UHaBz4wfPqMY5yxioRqackdPXhOV2kv%2FIMGyXDAGBg622Su7lTdTbV%2B6wYlTf7EFayqf7cjPQKD7FNoaS26Z6cpZ1Pw6jdmh%2BA8xKZGkCr9QBZ1TcKbTXanyMuGfLC1dysQdRkH527b%2FFoveR8R3Dllb3uJN33Y36OcqjdNI%2BfsU9Adq23e4xNIi5iXYIs0AXr%2Fko0%2FMaqG6e4OvwWQcBv0%2B0VMPP6cBqIQNDYaw3JrVJtvCUl4cj5L2Iy9mnkEsUZL0NCHuGG966rNDZCvK5wmivgWwisB0agAGIAMe99MYh%2FSWgTok2VzAVmepb5aehwxr0ThpvQMqv6Qc7PIdn5rGP2KW8%2F6jAos%2BsYABGlGkEAkEbdu4rdJ%2Fww%2B1Ck0j3WsK21gjGdNGqR7ElhUTnr6Ae8ycUs8Tu5bh0iFvttt59cc%2FBAPyRYdoj%2BUPBFMG%2BxgwXQtQG4IdCtw%3D%3D")
            })
            .catch(err => {
            console.log(err)
                reject(err)
            })
        })
    }
    handleChange = ({ fileList }) => {
        this.setState({ fileList })
        // let lastIndex = fileList.length - 1
        // if(fileList[lastIndex].status == "done"){
        //     let cutIndex = fileList[lastIndex].name.lastIndexOf(".")
        //     let fileName = fileList[lastIndex].name.slice(0,cutIndex)
        //     let type = fileList[lastIndex].name.slice(cutIndex+1,fileList[lastIndex].name.length)
        // OssImgAjax(fileName,type,Cookies.get("token").token)
        //     .then(val => {
        //         console.log(val)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
        // }
    };

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
            <>
                <Upload
                headers={
                    {"x-oss-meta-author":"ekij",
                    "Content-Type":'application/octet-stream'
                    }
                }
                method="put"
                className="textarea-box-upload-btn"
                action={this.handleAction}
                listType="picture-card"
                fileList={fileList}
                beforeUpload={this.handleUpload}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                >
                {fileList.length >= 8 ? null : uploadButton}
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
            <TextArea className="textarea" rows={4} placeholder="在此输入内容发布你的卡片吧😝"/>

            <Button className="textarea-box-btn" type="primary">发布🚀</Button>
            </div>
        )
    }
}

export default Textarea