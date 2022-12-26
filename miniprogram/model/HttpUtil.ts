export default class HttpUtil {
    static baseUrl = 'https://postermanage.xudian8.com/api';
    static diyUrl = "https://postermanage.h5.xudian8.com";
    
    static get(path:string,params:any = null){
        return new Promise((resolve,reject)=>{
            let options:any = {};
            options.method = 'GET';
            let urlstr = '';
            if(params){
                let str = '';
                for(let key in params){
                    if(str.length > 0){
                        str += '&'
                    }
                    str += `${key}=${params.key}`;
                }
                if(str.length > 0){
                    urlstr = `?${str}`
                }
            }
            options.url = this.baseUrl + path + urlstr;
            let token = wx.getStorageSync('token');
            wx.request({
                ...options,
                header:{
                    'content-type':'application/x-www-form-urlencoded;charset=utf-8',
                    'Cookie':wx.getStorageSync('cookieKey'),
                    token
                },
                success:(res)=>{
                    resolve(res);
                },
                fail:(error)=>{
                    reject(error);
                }
            })
        });
    }
    
    static post(path:string,params:any = null,jumperror:boolean = true){
        return new Promise((resolve,reject)=>{
            let url = this.baseUrl + path;
            let token = wx.getStorageSync('token');
            wx.request({
                url: url,
                header: {
                    'content-type':'application/x-www-form-urlencoded;charset=utf-8',
                    'Cookie':wx.getStorageSync('cookieKey'),
                    token
                },
                data: params,
                method: 'POST',
                success: function (res:any) {
                    // console.log(path,res)
                    if(jumperror){
                        if(res.data.code != 0){
                            return;
                        }
                        resolve(res.data.data);
                    }
                    else{
                        resolve(res.data);
                    }
                },
                fail:function(res:any){
                    // wx.showToast({title:'fail:' + res.errMsg,icon:'none'})
                }
            });

        })
    }

}