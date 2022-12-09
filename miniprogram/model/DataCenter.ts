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
    private _canIUseGetUserProfile:boolean = true;
    private _userInfo:any;

    private testBoardList:any[] = [];

    private _homeBoardList:any[] = [];
    private _seriesList:any[] = [];

    constructor(){
        this.testBoardList = [
            {
                name:{
                    value:'冯梦龙',
                    x:0,
                    y:0,
                    size:46,
                    rotation:20,
                    color:'#ffffff',
                    bold:true,
                },
                age:{
                    value:26,
                    size:32,
                    x:200,
                    y:0,
                    rotation:80,
                    color:'#ff0000',
                    bold:true,
                },
                bgicon:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.tukuppt.com%2Fbg_grid%2F00%2F24%2F26%2Fh46iPm2SWx.jpg%21%2Ffh%2F350&refer=http%3A%2F%2Fimg.tukuppt.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672540964&t=22eca1721bf9325ebb0590355c7d0b03',
                headicon:{
                    value:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.dtstatic.com%2Fuploads%2Fblog%2F202107%2F11%2F20210711160059_e01a0.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.dtstatic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672539096&t=397345db46d4bc0e1447f94c89219946',
                    x:250,
                    y:180,
                    rotation:120,
                    width:200,
                    height:200
                }
            },
            {
                name:{
                    value:'李小龙',
                    x:50,
                    y:100,
                    rotation:20,
                    size:36,
                    color:'#ff00ff',
                    bold:true,
                },
                age:{
                    value:26,
                    size:28,
                    x:250,
                    y:100,
                    rotation:80,
                    color:'#ffff00',
                    bold:true,
                },
                bgicon:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.tukuppt.com%2Fbg_grid%2F00%2F24%2F26%2Fh46iPm2SWx.jpg%21%2Ffh%2F350&refer=http%3A%2F%2Fimg.tukuppt.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672540964&t=22eca1721bf9325ebb0590355c7d0b03',
                headicon:{
                    value:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.dtstatic.com%2Fuploads%2Fblog%2F202107%2F11%2F20210711160059_e01a0.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.dtstatic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672539096&t=397345db46d4bc0e1447f94c89219946',
                    x:250,
                    y:180,
                    rotation:60,
                    width:200,
                    height:200
                }
            },
            {
                name:{
                    value:'冯梦龙',
                    x:50,
                    y:150,
                    size:48,
                    rotation:20,
                    color:'#00ffff',
                    bold:true,
                },
                age:{
                    value:26,
                    x:250,
                    y:150,
                    size:36,
                    rotation:80,
                    color:'#0000ff',
                    bold:true,
                },
                bgicon:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.tukuppt.com%2Fbg_grid%2F00%2F24%2F26%2Fh46iPm2SWx.jpg%21%2Ffh%2F350&refer=http%3A%2F%2Fimg.tukuppt.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672540964&t=22eca1721bf9325ebb0590355c7d0b03',
                headicon:{
                    value:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.dtstatic.com%2Fuploads%2Fblog%2F202107%2F11%2F20210711160059_e01a0.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.dtstatic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672539096&t=397345db46d4bc0e1447f94c89219946',
                    x:548,
                    y:265,
                    rotation:180,
                    width:100,
                    height:100
                }
            },
        ]
    }

    public set userInfo(info:any){
        this._userInfo = info;
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
        this._homeBoardList = this.testBoardList
        return this._homeBoardList;
    }

    public get seriesList(){
        return this._seriesList;
    }
    // 登录
    public getLoginInfo(callback:Function){
        HttpUtil.get('/wechat/login').then((res:any)=>{
            if(res.code != 0) return;
            this.getUserInfo();
            callback && callback();
        });
    }
    /**获取用户信息 */
    public getUserInfo(){
        HttpUtil.get('/user/info').then((res:any)=>{
            if(res.code != 0) return;
            this._userInfo = res.data;
        });
    }
    /**兑换 */
    public getExchangeInfo(callback:Function){
        HttpUtil.get('/user/exchange').then((res:any)=>{
            if(res.code != 0) return;
            callback && callback(res.data);
        });
    }

    public getDIYTimes(){
        
    }

    public getSeriesList(callback:Function){
        this._seriesList = [
            {name:'系列一',image:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.youjidi.net%2Fuploadimg%2Fimage%2F20200103%2F20200103165653_79065.jpg&refer=http%3A%2F%2Fimg.youjidi.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673005035&t=b184771537821ba315a14e66efb9da8f'},
            {name:'系列二',image:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.youjidi.net%2Fuploadimg%2Fimage%2F20200103%2F20200103165653_79065.jpg&refer=http%3A%2F%2Fimg.youjidi.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673005035&t=b184771537821ba315a14e66efb9da8f'},
            {name:'系列三',image:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.youjidi.net%2Fuploadimg%2Fimage%2F20200103%2F20200103165653_79065.jpg&refer=http%3A%2F%2Fimg.youjidi.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673005035&t=b184771537821ba315a14e66efb9da8f'},
            {name:'系列四',image:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.youjidi.net%2Fuploadimg%2Fimage%2F20200103%2F20200103165653_79065.jpg&refer=http%3A%2F%2Fimg.youjidi.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673005035&t=b184771537821ba315a14e66efb9da8f'},
            {name:'系列五',image:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.youjidi.net%2Fuploadimg%2Fimage%2F20200103%2F20200103165653_79065.jpg&refer=http%3A%2F%2Fimg.youjidi.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673005035&t=b184771537821ba315a14e66efb9da8f'},
            {name:'系列六',image:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.youjidi.net%2Fuploadimg%2Fimage%2F20200103%2F20200103165653_79065.jpg&refer=http%3A%2F%2Fimg.youjidi.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673005035&t=b184771537821ba315a14e66efb9da8f'},
            {name:'系列七',image:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.youjidi.net%2Fuploadimg%2Fimage%2F20200103%2F20200103165653_79065.jpg&refer=http%3A%2F%2Fimg.youjidi.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673005035&t=b184771537821ba315a14e66efb9da8f'},
            {name:'系列八',image:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.youjidi.net%2Fuploadimg%2Fimage%2F20200103%2F20200103165653_79065.jpg&refer=http%3A%2F%2Fimg.youjidi.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673005035&t=b184771537821ba315a14e66efb9da8f'},
        ]
        callback && callback();
        // Http.get('/category/list').then(res=>{
        //     this._seriesList = []
        //     callback && callback();
        // });
    }
    
    public getChildList(){
        let list = [...this.testBoardList,...this.testBoardList,...this.testBoardList];
        // Http.get('/template/list').then(res=>{
        //     callback && callback();
        // });
        return list;
    }
    
}

export const dataCenter = DataCenter.instance;