import { getImageStyle, getTextStyle } from "../../../utils/util"

// pages/components/boardItem/boardItemM.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    boardInfo1:{
      type:Object,
      value:{image:'',name:'无'}
    },
    boardInfo2:{
      type:Object,
      value:{image:'',name:''}
    },
    showSaveBtn:{
      type:Boolean,
      value:false
    }
  },

  ready(){
    let nameStyle1 = getTextStyle(this.data.boardInfo1,'name',0.5);
    let ageStyle1 = getTextStyle(this.data.boardInfo1,'age',0.5);
    let headStyle1 = getImageStyle(this.data.boardInfo1,'headicon',0.5);
    let nameStyle2 = getTextStyle(this.data.boardInfo2,'name',0.5);
    let ageStyle2 = getTextStyle(this.data.boardInfo2,'age',0.5);
    let headStyle2 = getImageStyle(this.data.boardInfo2,'headicon',0.5);
    this.setData({
      nameStyle1,
      ageStyle1,
      headStyle1,
      nameStyle2,
      ageStyle2,
      headStyle2
    })
  },

  /**
   * 组件的初始数据
   */
  data: {
    nameStyle1:'',
    ageStyle1:'',
    headStyle1:'',
    nameStyle2:'',
    ageStyle2:'',
    headStyle2:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clkToShow1(){
      console.log('clkToShow1')
      this.triggerEvent('showBoardEvent',this.properties.boardInfo1)
    },
    clkToShow2(){
      console.log('clkToShow2')
      this.triggerEvent('showBoardEvent',this.properties.boardInfo2)
    },
    clkToSave1(){

    },
    clkToSave2(){
      
    }
  }
})
