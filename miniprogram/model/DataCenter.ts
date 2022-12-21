import EventCenter from "./EventCenter";
import HttpUtil from "./HttpUtil";

const testMode = false;
class DataCenter {
    private static _instance:DataCenter;
    public static get instance(){
        if(!DataCenter._instance){
            DataCenter._instance = new DataCenter();
        }
        return DataCenter._instance;
    }

    public isLogin:boolean = false;
    /**当前页面 */
    private _curPage:any = {};
    private _canIUseGetUserProfile:boolean = true;
    private _userInfo:any = {};
    private _access_token:string = '';

    private _homeBoardList:any[] = [];
    private _seriesList:any[] = [];
    private _nextIndex = 0;

    private intervalID = -1;
    private queryTimes = 0;

    constructor(){}

    public getNextFontName(){
        this._nextIndex++;
        return 'customfont_' + this._nextIndex
    }

    public get curPage(){
        return this._curPage;
    }

    public get access_token(){
        if(!this._access_token){
            this._access_token = wx.getStorageSync('token');
        }
        return this._access_token;
    }

    public get userInfo(){
        return this._userInfo;
    }

    public get canIUseOpenData(){
        let bool = wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'); // 如需尝试获取用户信息可改为false
        return bool;
    }

    public get canIUseGetUserProfile(){
        return this._canIUseGetUserProfile;
    }

    public get homeBoardList(){
        return this._homeBoardList;
    }

    public get seriesList(){
        return this._seriesList;
    }
    // 授权登录
    private authAction(){
        wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              HttpUtil.post('/wechat/login',{code:res.code}).then((rep:any)=>{
                  wx.setStorageSync('token',rep.token + '');
                  this._access_token = rep.token;
                  this.getUserInfo();
              });
            },
            complete:(res)=>{
                console.log(res)
            }
        })
    }
    /**获取用户信息 */
    public getUserInfo(){
        if(testMode){
            let testobj = {"code":0,"msg":"ok","data":{"id":3,"nickname":"silence","avatarurl":"https:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/zuwkz0iaVAZKicRUslSibQiaUoAex5ntC6u08cWJic8kuAhI4cNAqwOswJro09Cr94Fn1ibP6OtFXJ1dMFJSXGAdXnIg\/132","num":147,"is_auth":1}}
            dataCenter.isLogin = true;
            this._userInfo = testobj.data;
            EventCenter.dispatch(EventCenter.GET_USER_INFO_EVENT)
            return;
        }

        HttpUtil.post('/user/info','',false).then((res:any)=>{
            if(res.code == 401){
                this.authAction();
                return;
            }
            dataCenter.isLogin = true;
            this._userInfo = res.data;
            EventCenter.dispatch(EventCenter.GET_USER_INFO_EVENT)
        });
    }

    /**更新信息 */
    public checkIsHaveInfo(){
        if(this._userInfo && this._userInfo.is_auth == 1) return true;
        wx.getUserProfile({
            desc: '展示用户信息',
            success: (res) => {
                console.log('授权成功')
                let params = {
                    nickname:res.userInfo.nickName,
                    avatarurl:res.userInfo.avatarUrl,
                    gender:res.userInfo.gender
                }
                this._userInfo.nickname = params.nickname;
                this._userInfo.avatarurl = params.avatarurl;
                this._userInfo.gender = params.gender;
                if(this._curPage){
                    this._curPage.onReady();
                }
                this.updateUserInfo(params);
            },
            complete:(res)=>{
                console.log('getUserProfile -- complete',res)
            }
        })
        return false;
    }

    /**更新数据 */
    private updateUserInfo(params:any){
        HttpUtil.post('/user/update',params).then((res:any)=>{
            console.log('用户信息更新成功！')
        });
    }
    /**兑换 */
    public getExchangeInfo(no:string){
        HttpUtil.post('/user/exchange',{no}).then((res:any)=>{
            console.log(res)
            this.getUserInfo();
        });
    }
    
    /**首页大图banner */
    public getHomeListInfo(callback:Function,page:number = 1){
        if(testMode){
            let testobj = {"code":0,"msg":"ok","data":{"current_page":1,"data":[{"pic":"http:\/\/postermanage2.oss-cn-hangzhou.aliyuncs.com\/images\/2732077eba526850f31723a23a520b22.jpg"},{"pic":"http:\/\/postermanage2.oss-cn-hangzhou.aliyuncs.com\/images\/33f4e46d98c00c641fed298f0af526c7.jpg"}],"first_page_url":"http:\/\/192.168.31.67:8203\/api\/banner\/list?page=1","from":1,"last_page":1,"last_page_url":"http:\/\/192.168.31.67:8203\/api\/banner\/list?page=1","next_page_url":null,"path":"http:\/\/192.168.31.67:8203\/api\/banner\/list","per_page":15,"prev_page_url":null,"to":2,"total":2}}
            this._homeBoardList = testobj.data.data;
            callback && callback();
            return;
        }
        HttpUtil.post('/banner/list',{page}).then((res:any)=>{
            this._homeBoardList = res.data;
            callback && callback();
        });
    }

    public getDIYTimes(){
        
    }
    /** 系列*/
    public getSeriesList(callback:Function,page:number,code:string = ''){
        if(testMode){
            let testobj = {"code":0,"msg":"ok","data":{"current_page":1,"data":[{"id":2,"code":"10086","name":"分类1","pic":"http:\/\/postermanage2.oss-cn-hangzhou.aliyuncs.com\/images\/7b142a95031cd62e9067f2dfd80f11e3.jpg"}],"first_page_url":"http:\/\/192.168.31.67:8203\/api\/category\/list?page=1","from":1,"last_page":1,"last_page_url":"http:\/\/192.168.31.67:8203\/api\/category\/list?page=1","next_page_url":null,"path":"http:\/\/192.168.31.67:8203\/api\/category\/list","per_page":15,"prev_page_url":null,"to":1,"total":1}}
            this._seriesList = testobj.data.data;
            callback && callback();
            return;
        }
        HttpUtil.post('/category/list').then((res:any)=>{
            this._seriesList = res.data;
            callback && callback();
        });
    }
    /** 系列子 */
    public getChildList(callback:Function,params:{page:number,category_id:number,code?:string}){
        if(testMode){
            let testobj = {"code":0,"msg":"ok","data":{"current_page":1,"data":[{"id":4,"code":"10086","type":1,"pic":"http:\/\/postermanage2.oss-cn-hangzhou.aliyuncs.com\/images\/5889ebccdc904cd0b5309fbe143b55b4.jpg"}],"first_page_url":"http:\/\/192.168.31.67:8203\/api\/template\/list?page=1","from":1,"last_page":1,"last_page_url":"http:\/\/192.168.31.67:8203\/api\/template\/list?page=1","next_page_url":null,"path":"http:\/\/192.168.31.67:8203\/api\/template\/list","per_page":15,"prev_page_url":null,"to":1,"total":1}}
            callback && callback(testobj.data);
            return;
        }
        HttpUtil.post('/template/list',params).then((res:any)=>{
            callback && callback(res);
        });
    }
    /**我的模板 */
    public getMyTemplateList(callback:Function){
        HttpUtil.post('/user/template/list').then((res:any)=>{
            callback && callback(res);
        });
    }
    /**获取模板详细信息 */
    public getBoardDetailInfo(callback:Function,temp_id:number|string){
        if(testMode){
            let testobj = {"code":0,"msg":"ok","data":{"id":4,"code":"10086","pic":"http:\/\/postermanage2.oss-cn-hangzhou.aliyuncs.com\/images\/5889ebccdc904cd0b5309fbe143b55b4.jpg","back_pic":"http:\/\/postermanage2.oss-cn-hangzhou.aliyuncs.com\/images\/2f82ab56e68162f7256c239e1680d5b5.jpg","font_url":"http:\/\/postermanage2.oss-cn-hangzhou.aliyuncs.com\/files\/107f1b8039f3af9cfbe117344220cdcd.TTF","extra":{"age":[{"w":100,"x":427,"y":68,"bold":true,"size":50,"color":"#095AF1","value":"13","rotation":0,"maxlength":2,"textAlign":"center"}],"pic":[{"h":100,"w":100,"x":614,"y":284,"value":null,"rotation":0}],"name":[{"w":279,"x":143,"y":68,"bold":true,"size":50,"color":"#EA1616","value":"我是你爸爸","rotation":0,"maxlength":"5","textAlign":"center"}],"title":"模板标题","other_text":[{"w":279,"x":310,"y":228,"bold":true,"size":50,"color":"#9A0AED","value":"的爸爸的爸","rotation":0,"maxlength":"5","textAlign":"center"}]}}}
            callback && callback(testobj.data)
            return;
        }
        HttpUtil.post('/template/info',{temp_id,name:'王亚'}).then((res:any)=>{
            callback && callback(res)
        });
    }

    public updateCurPage(){
        let pages = getCurrentPages();
        this._curPage = pages[pages.length - 1];
    }

    public showPayTip(){
        wx.showModal({
            content:'DIY次数已用完，请点击界面右上角获得次数\n若无订单号，可直接购买',
            confirmText:'购买次数',
            cancelText:'确定',
            success:(res)=>{
                if(res.confirm){
                    HttpUtil.post('/trade/pay').then((res:any)=>{
                        let data = res.wechat_data;
                        let trade_no = res.trade_no;
                        data['success'] = function(rep:any){
                            console.log('success',rep);
                            DataCenter.instance.startManyQueryPay(trade_no)
                        }
                        data['fail'] = function(rep:any){
                            console.log('fail',rep);
                        }
                        wx.requestPayment(data)
                    });
                }
            }
        })
    }

    private startManyQueryPay(trade_no:string){
        clearInterval(this.intervalID);
        this.queryTimes = 0;
        this.intervalID = setInterval(()=>{
            this.getPayDetail(trade_no);
            this.queryTimes++;
            if(this.queryTimes >= 10){
                clearInterval(this.intervalID);
            }
        },3000);
    }

    private getPayDetail(trade_no:string){
        HttpUtil.post('/trade/info',{trade_no}).then((res:any)=>{
            if(res.status == 1){
                this.getUserInfo();
                clearInterval(this.intervalID);
                this.queryTimes = 0;
            }
        })
    }
    
}

export const dataCenter = DataCenter.instance;