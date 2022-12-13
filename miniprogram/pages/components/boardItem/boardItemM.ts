import { downloadImage } from "../../../utils/util"

// pages/components/boardItem/boardItemM.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    boardInfo1:{
      type:Object,
      value:{pic:'',id:'',code:''}
    },
    boardInfo2:{
      type:Object,
      value:{pic:'',id:'',code:''}
    },
    showSaveBtn:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    clkToShow1(){
      this.triggerEvent('showBoardEvent',this.data.boardInfo1)
    },
    clkToShow2(){
      this.triggerEvent('showBoardEvent',this.data.boardInfo2)
    },
    clkToSave1(){
      downloadImage(this.data.boardInfo1.image)
    },
    clkToSave2(){
      downloadImage(this.data.boardInfo2.image)
    }
  }
})
