import axios from './ajax'

const baseUrl = "http://192.168.137.1:8080/ekij"
const registerUrl = baseUrl + "/user/register"
const loginUrl = baseUrl + "/user/login"
const userInfoUrl = baseUrl + "/user/info"
const ossImgUrl = baseUrl + "/oss/put"

export const RegisterAjax = (data) => {
    return axios(registerUrl,data,"POST")
}

export const LoginAjax = (data) => {
    return axios(loginUrl,data,"POST")
}

//只需传递token
export const UserInfoAjax = (token) => {
    return axios(userInfoUrl,{},"GET",token)
}

export const OssImgAjax = (fileName,type,token) => {
    return axios(`${ossImgUrl}/${fileName}/${type}`,{},"PUT",token)
}

