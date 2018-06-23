import axios from 'axios';


function paramsFormdata(params){
    if(!!params && params != ''){
      let formdata=new URLSearchParams();
      Object.keys(params).forEach(function(key){
          formdata.append(key,params[key]);
      })
      return formdata;
    }else{
        return;
    }
    
  }

function request (url,type,params){
    let requesturl='ss/'+url+'?zone='+'sa';
    params=paramsFormdata(params);
    return axios({
      method:type,
      url:requesturl,
      params:params,
    }).then((res)=>{
        return Promise.resolve({ data: res.data, res });
    })
}



// export default service
export default request