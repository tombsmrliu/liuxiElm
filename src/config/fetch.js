/**
 * Created by liuxi on 2017/9/11.
 */


export default async(url = '', data = {}, type = 'GET') => {


    type = type.toUpperCase();

    //路径后面拼接参数
    var dataStr = '';
    var getUrl = '';
    Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&';
    });


    if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
        getUrl = url + '?' + dataStr;
    }


    if (window.fetch) {

        var requestConfig = {

            credentials : 'include',
            method: type ,
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            mode : 'cors',
            cache : 'force-cache'
        };

        switch (type) {
            case 'GET' :
                url = getUrl;
                break;
            case 'POST' :
                Object.defineProperties(
                    requestConfig,'body',{
                        value : JSON.stringify(data)
                    }
                );
                break;
        }

        try{

           const response = await fetch(url,{method: 'GET'});

           const  responseJSON = response.json();

           return responseJSON;
        } catch (error){
            console.log(error);
        }

    }else {
        console.log('不支持fetch');

        return new Promise((resolve,reject)=>{

            let requestObj;

            requestObj = new XMLHttpRequest();

            let sendData = '';

            switch (type){
                case 'GET':
                    url = getUrl;
                    break;
                case 'POST':
                    sendData = JSON.stringify(data);
                    break;
            }

            requestObj.open('GET',url,true);
            requestObj.setRequestHeader('Accept','application/json');
            requestObj.setRequestHeader('Content-Type','application/json');
            requestObj.send(sendData);

            requestObj.onreadystatechange = () =>{

                if (requestObj.readyState === 4 && requestObj.status === 200){

                    let obj = requestObj.response;
                    if  (typeof obj !== 'object'){
                        obj = JSON.parse(obj);
                    }
                }else {
                    reject(requestObj);
                }

            }
        });



    }

}