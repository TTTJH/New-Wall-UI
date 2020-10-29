import axios from 'axios'
export default function(url,data={},method="GET",token){
    if(token){
    axios.defaults.headers.common["token"] = token
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    if(method == "GET"){
        if(data){
            var paramStr = "?"
            Object.keys(data).forEach(item => {
                var param = item + data[item] + "?"
                paramStr += param
            })
        }
        url += paramStr.slice(0,paramStr.length-1)
        //get请求
        return axios.get(url)
    }else if(method == "POST"){
        return axios.post(url,data)
    }else if(method == "PUT"){
        return axios.put(url,data)
    }
}