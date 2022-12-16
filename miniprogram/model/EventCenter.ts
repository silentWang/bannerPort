export default class EventCenter {

    static GET_USER_INFO_EVENT:string = 'GET_USER_INFO_EVENT';


    private static listeners:{type:string,callback:Function,context:any,once:boolean}[];
    public static addListener(type:string,callback:Function,context:any,once = false){
        if(!this.listeners) this.listeners = [];
        this.listeners.push({type,callback,context,once});
    }

    public static removeListener(type:string,callback:Function){
        if(!this.listeners || this.listeners.length == 0) return;
        let ls = this.listeners;
        for(let i = ls.length - 1;i >= 0;i--){
            if(ls[i].type === type && ls[i].callback === callback){
                ls.splice(i,1);
                break;
            }
        }
    }

    public static dispatch(type:string,data:any = null){
        if(!this.listeners || this.listeners.length == 0) return;
        let ls = this.listeners;
        for(let i = ls.length - 1;i >= 0;i--){
            if(ls[i].type === type){
                ls[i].callback.call(ls[i].context,data);
            }
        }
    }

} 