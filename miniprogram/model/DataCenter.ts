class DataCenter {
    private static _instance:DataCenter;
    public static instance(){
        if(!this._instance){
            this._instance = new DataCenter();
        }
        return this._instance;
    }

    private _canIUseGetUserProfile:boolean = true;
    private _userInfo:any = {};

    public set userInfo(info:any){
        this._userInfo = info;
    }

    public get userInfo(){
        return this._userInfo;
    }

    public get canIUse(){
        let canUse = wx.canIUse('button.open-type.getUserInfo');
        return canUse;
    }

    public get canIUseGetUserProfile(){
        return this._canIUseGetUserProfile;
    }
}

export let dataCenter = DataCenter.instance();