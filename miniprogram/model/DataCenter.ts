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

    private testBoardList:any[] = [];

    private _homeBoardList:any[] = [];
    private _seriesList:any[] = [];

    constructor(){
        this.testBoardList = [
            {id:1,image:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.tukuppt.com%2Fbg_grid%2F00%2F24%2F26%2Fh46iPm2SWx.jpg%21%2Ffh%2F350&refer=http%3A%2F%2Fimg.tukuppt.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672540964&t=22eca1721bf9325ebb0590355c7d0b03'},
            {id:2,image:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.tukuppt.com%2Fbg_grid%2F00%2F24%2F26%2Fh46iPm2SWx.jpg%21%2Ffh%2F350&refer=http%3A%2F%2Fimg.tukuppt.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672540964&t=22eca1721bf9325ebb0590355c7d0b03'},
            {id:3,image:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.tukuppt.com%2Fbg_grid%2F00%2F24%2F26%2Fh46iPm2SWx.jpg%21%2Ffh%2F350&refer=http%3A%2F%2Fimg.tukuppt.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672540964&t=22eca1721bf9325ebb0590355c7d0b03'},
        ]
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
        let boardDetail = {
            id:1,
            code:'001',
            font:'',
            name:[
                {
                    value:'冯',
                    x:0,
                    y:0,
                    size:46,
                    rotation:20,
                    color:'#ffffff',
                    bold:true,
                },
                {
                    value:'梦',
                    x:0,
                    y:0,
                    size:46,
                    rotation:20,
                    color:'#ffffff',
                    bold:true,
                },
            ],
            age:[{
                value:26,
                size:32,
                x:200,
                y:0,
                rotation:80,
                color:'#ff0000',
                bold:true,
            }],
            background:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.tukuppt.com%2Fbg_grid%2F00%2F24%2F26%2Fh46iPm2SWx.jpg%21%2Ffh%2F350&refer=http%3A%2F%2Fimg.tukuppt.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672540964&t=22eca1721bf9325ebb0590355c7d0b03',
            headpic:{
                value:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.dtstatic.com%2Fuploads%2Fblog%2F202107%2F11%2F20210711160059_e01a0.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.dtstatic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672539096&t=397345db46d4bc0e1447f94c89219946',
                x:250,
                y:180,
                rotation:120,
                width:200,
                height:200
            }
        }
        callback(boardDetail)
        HttpUtil.get('template/info',{temp_id}).then((res:any)=>{
            if(res.code == 0){
                callback && callback(res.data)
            }
        });
    }

    public updateCurPage(){
        let pages = getCurrentPages();
        this._curPage = pages[pages.length - 1];
    }
    
}

export const dataCenter = DataCenter.instance;