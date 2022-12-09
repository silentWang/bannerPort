import { getImageStyle, getTextStyle } from "../../../utils/util";

// pages/components/boardShow/boardShow.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tempData:{
      type:Object,
      value:{blank:true}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    nameStyle:'',
    ageStyle:'',
    headStyle:'',
    showDIY:false
  },

  ready() {
    let namestyle = getTextStyle(this.data.tempData,'name');
    let agestyle = getTextStyle(this.data.tempData,'age');
    let headstyle = getImageStyle(this.data.tempData,'headicon');
    this.setData({
      nameStyle:namestyle,
      ageStyle:agestyle,
      headStyle:headstyle
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    startDIY(){
      wx.showModal({
        content:'请确定是否消耗1次DIY次数？保存后不可修改',
        success:(res)=>{
          if(res.confirm){
            this.setData({showDIY:true})
          }
        }
      })
    },
    close(){
      // if(this.data.showDIY) return;
      this.triggerEvent('hideBoardEvent')
    }
  }
})
