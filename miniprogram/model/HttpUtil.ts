export default class HttpUtil {
    static baseUrl = 'https://';
    
    static get(path:string){
        return new Promise((resolve,reject)=>{
            let options:any = {};
            options.method = 'GET';
            options.url = this.baseUrl + path;
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

}