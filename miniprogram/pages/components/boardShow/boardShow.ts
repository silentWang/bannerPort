import { dataCenter } from "../../../model/DataCenter";
import { downloadImage } from "../../../utils/util"
// pages/components/boardShow/boardShow.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tempData:{
      type:Object,
      value:{blank:true},
      id:0
    },
    isMineType:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    diyUrl:''
  },

  ready() {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    startDIY(){
      let times = dataCenter.userInfo.num;
      if(times <= 0){
        dataCenter.showPayTip();
        return;
      }
      wx.navigateTo({
        url: `../../pages/diypage/diypage?templateId=${this.data.tempData.id}`,
        complete:function(result){
          console.log(result)
        }
      })
    },
    saveToPhone(){
      downloadImage(this.data.tempData.pic)
    },
    close(){
      // if(this.data.showDIY) return;
      this.triggerEvent('hideBoardEvent')
    }
  }
})
