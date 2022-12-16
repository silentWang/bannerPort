import EventCenter from "./EventCenter";
import HttpUtil from "./HttpUtil";

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

    constructor(){}

    public getNextFontName(){
        this._nextIndex++;
        return 'customfont_' + this._nextIndex
    }

    public get curPage(){
        return this._curPage;
    }

    public get access_token(){
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
    public getExchangeInfo(callback:Function){
        HttpUtil.post('/user/exchange').then((res:any)=>{
            callback && callback(res.data);
        });
    }
    
    /**首页大图banner */
    public getHomeListInfo(callback:Function,page:number = 1){
        HttpUtil.post('/banner/list',{page}).then((res:any)=>{
            this._homeBoardList = res.data;
            callback && callback();
        });
    }

    public getDIYTimes(){
        
    }
    /** 系列*/
    public getSeriesList(callback:Function,page:number,code:string = ''){
        HttpUtil.post('/category/list').then((res:any)=>{
            this._seriesList = res.data;
            callback && callback();
        });
    }
    /** 系列子 */
    public getChildList(callback:Function,params:{page:number,category_id:number,code?:string}){
        HttpUtil.post('/template/list',params).then((res:any)=>{
            callback && callback(res);
        });
    }
    /**获取模板详细信息 */
    public getBoardDetailInfo(callback:Function,temp_id:number|string){
        // let boardDetail = {"code":0,"msg":"ok","data":{"id":1,"code":"1","pic":"http://192.168.31.67:8203/storage/images/4ff773900657266cad34e374d18d5474.jpg","back_pic":"http:\/\/192.168.31.55:8203\/storage\/images\/a907e3c6217413876836bd72f354950d.png","font_url":"http:\/\/192.168.31.55:8203\/storage\/files\/b350c782ab6b58dd6670cd2f8e7ee3e1.TTC","type":1,"extra":{"age":[{"w":200,"x":0,"y":0,"bold":true,"size":46,"color":"#ffffff","value":"11","rotation":20}],"pic":[{"h":100,"w":100,"x":0,"y":0,"value":"","rotation":50}],"name":[{"w":200,"x":0,"y":0,"bold":true,"size":46,"color":"#ffffff","value":"张","rotation":20},{"w":200,"x":0,"y":0,"bold":true,"size":46,"color":"#ffffff","value":"三","rotation":20}]}}}
        // callback(boardDetail.data)
        HttpUtil.post('/template/info',{temp_id,name:'王亚'}).then((res:any)=>{
            callback && callback(res)
        });
    }

    public updateCurPage(){
        let pages = getCurrentPages();
        this._curPage = pages[pages.length - 1];
    }
    
}

export const dataCenter = DataCenter.instance;