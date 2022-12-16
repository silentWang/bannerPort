import DIYModel from "../../model/DIYModel";

// pages/boarddiy/boardDIY.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boardID:'',
    nameStyles:[] as any[],
    ageStyles:[] as any[],
    otherStyles:[] as any[],
    headStyle:{},
    colorArray:[] as any[],
    colorIndex:0,
    iconTouch:false,
    bgImage:'',
    showEditText:false,
    sNameText:'',
    inputText:'',
    sFontSize:30,
    showChangeTextDialog:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(query) {
    this.setData({
      boardID:query.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    DIYModel.getDetailInfo(this.data.boardID).then(()=>{
        let sarray = DIYModel.colorArray;
        this.setData({
            bgImage:DIYModel.bgImage,
            nameStyles:DIYModel.getNameStyle(),
            ageStyles:DIYModel.getAgeStyle(),
            otherStyles:DIYModel.getOtherStyle(),
            headStyle:DIYModel.getHeadStyle(),
            colorArray:sarray,
            sFontSize:DIYModel.getFontSize(),
            sNameText:DIYModel.getTextByKey()
        })
    });
  },
  tapSelectText(evt:any){
    let str:string = evt.currentTarget.dataset.selectindex;
    let index = ~~str.split('-')[0];
    let type = ~~str.split('-')[1];
    DIYModel.setCurSelect(index,type);
    this.setData({
      showEditText:true,
      sNameText:DIYModel.getSelectText()
    });
  },
  inputTextHandler(event:any){
    let text = event.detail.value
    let type = DIYModel.updateValue('value',text)
    this.updateStyle(type,text);
  },
  confirmChangeText(){
    let result = this.data.inputText;
    DIYModel.updateValue('value',result);
    this.setData({
      showChangeTextDialog:false,
      nameStyles:DIYModel.getNameStyle()
    })
  },
  cancelChangeText(){
    this.setData({showChangeTextDialog:false})
  },
  sliderChange(evt:any){
    let type = DIYModel.updateValue('size',evt.detail.value);
    this.updateStyle(type);
  },
  // 更改文字大小
  changeColor(evt:any){
    let value = evt.detail.value;
    let type = DIYModel.updateValue('color',value);
    this.updateStyle(type);
  },
  updateStyle(type:number,text:string = ''){
    let obj = {} as any;
    if(text) obj.text = text;
    if(type == 1){
      obj.nameStyles = DIYModel.getNameStyle()
    }
    else if(type == 2){
      obj.ageStyles = DIYModel.getAgeStyle()
    }
    else if(type == 3){
      obj.otherStyles = DIYModel.getOtherStyle()
    }
    this.setData(obj);
  },
  close(){},

})