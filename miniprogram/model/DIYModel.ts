import { getFont, getImageStyle, getTextStyle } from "../utils/util";
import { dataCenter } from "./DataCenter";

export interface ItemStyleType {
    w:number,
    h:number,
    x:number,
    y:number,
    rotation:number,
    value:string,
    color:'',
    size:number,
    bold:number,
    textAlign:string
    maxlength:number
}

class DIYModel {
    private static _instance:DIYModel;
    public static get instance(){
        if(!DIYModel._instance){
            DIYModel._instance = new DIYModel();
        }
        return DIYModel._instance;
    }
    /**本地尺寸 */
    private _localWH = {width:750,height:422}
    /**原始尺寸 */
    private _originWH:{width:number,height:number} = {} as any;
    private _colorArray:string[] = [];

    private _boardID:string = '';
    private _detailInfo:{
        id?:number,
        code?:number,
        type?:number
    } = {};
    private _nameInfos:ItemStyleType[] = [];
    private _ageInfos:ItemStyleType[] = [];
    private _otherInfos:ItemStyleType[] = [];
    private _headInfo:ItemStyleType = {} as any;
    private _curFont:string = '';
    private _bgImage = '';
    private _title:string = '';

    private curSelect:number = 0;
    private curType:number = 1;// 1 name 2 age 3 other
    private sPosY:number = 0;

    public getDetailInfo(bid:string){
        this._boardID = bid;
        return new Promise((resolve,reject)=>{
            dataCenter.getBoardDetailInfo((data:any)=>{
                let extra = data.extra;
                getFont(data.font_url).then((fontName:any)=>{
                    this._curFont = fontName;
                    this._detailInfo = {id:data.id,code:data.code,type:data.type};
                    // this._originWH = {width:data.back_pic_w,height:data.back_pic_h}
                    this._originWH = {width:750,height:422}
                    this._nameInfos = extra.name;
                    this._ageInfos = extra.age;
                    this._otherInfos = extra.other_text;
                    this._headInfo = extra.pic[0];
                    this._headInfo.value = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202104%2F22%2F20210422220415_2e4bd.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673701048&t=cce166ca0033b8f18a7896c7ee65a1c5'
                    this._title = extra.title;
                    this._bgImage = data.pic;
                    this.sPosY = extra.name[0].y || 0
                    resolve(1);
                });
            },bid)
        })
    }

    public get localWH(){
        return this._localWH;
    }

    public get originWH(){
        return this._originWH;
    }

    public get colorArray(){
        if(this._colorArray.length == 0){
            this._colorArray = [
                '#0000FF',
                '#FFF000',
                '#00FFFF',
                '#FFE4B5',
                '#4EEE94',
                '#2F4F4F',
                '#483D8B',
                '#FFB90F',
                '#FF6A6A',
                '#8A2BE2',
            ];
        }
        return this._colorArray;
    }

    public get boardID(){
        return this._boardID;
    }

    public get detailInfo(){
        return this._detailInfo;
    }

    public get nameInfo(){
        return this._nameInfos;
    }

    public get ageInfo(){
        return this._ageInfos;
    }

    public get otherInfo(){
        return this._otherInfos;
    }

    public get headInfo(){
        return this._headInfo;
    }

    public get curFont(){
        return this._curFont;
    }

    public get title(){
        return this._title;
    }

    public get bgImage(){
        return this._bgImage;
    }

    public setCurSelect(index:number,type:number){
        this.curSelect = index;
        this.curType = type;
    }

    private getCurInfo(){
        let obj:ItemStyleType = null as any;
        if(this.curType == 1){
            obj = this._nameInfos[this.curSelect];
        }
        else if(this.curType == 2){
            obj = this._ageInfos[this.curSelect]
        }
        else if(this.curType == 3){
            obj = this._otherInfos[this.curSelect]
        }
        else if(this.curType == 0){
            obj = this._headInfo;
        }
        return obj;
    }

    public getSelectText(){
        let obj = this.getCurInfo();
        if(!obj) return '';
        return obj.value;
    }

    public updateValue(key:string,value:any){
        let info = this.getCurInfo();
        if(!info) return 0;
        if(key == 'value'){
            info.value = value;
        }
        else if(key == 'size'){
            info.size = value;
        }
        else if(key == 'color'){
            info.color = value;
        }
        return this.curType;
    }

    public getFontSize(){
        let info = this.getCurInfo();
        return info && info.size || 30;
    }

    public getTextByKey(){
        let info = this.getCurInfo();
        let text = ''
        if(info) text = info.value as string
        return text;
    }

    private resizeNamePos(){
        let w = 750;
        let names = this._nameInfos;
        let len = names.length;
        let size = this.getFontSize();
        let r = ~~(w/size);
        let x = (w - size*r)/2;
        let e = size;
        let y = this.sPosY;
        for(let i = 0;i < len;i++){
            names[i].x = x + e*(i%r);
            names[i].y = y + size*(~~(i/r)) + 10;
        }
    }

    public getNameStyle(){
        // this.resizeNamePos();
        let names = this._nameInfos;
        let nameStyles = [];
        for(let i = 0;i < names.length;i++){
            nameStyles.push({style:getTextStyle(names[i],this._curFont),value:names[i].value});
        }
        return nameStyles;
    }

    public getAgeStyle(){
        let ages = this._ageInfos;
        let ageStyles = [];
        for(let i = 0;i < ages.length;i++){
            ageStyles.push({style:getTextStyle(ages[i],this._curFont),value:ages[i].value});
        }
        return ageStyles;
    }
    
    public getOtherStyle(){
        let others = this._otherInfos;
        let otherStyles = [];
        for(let i = 0;i < others.length;i++){
            otherStyles.push({style:getTextStyle(others[i],this._curFont),value:others[i].value});
        }
        return otherStyles;
    }

    public getHeadStyle(){
        let headInfo = this._headInfo;
        let headStyle = null;
        if(headInfo){
            headStyle = {style:getImageStyle(headInfo),value:headInfo && headInfo.value,x:headInfo.x,y:headInfo.y};
        }
        return headStyle;
    }

}

export default DIYModel.instance;