import { getImageStyle, getTextStyle } from "../../../utils/util";

// pages/components/homeItem/homeItem.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tempData:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    nameStyle:'',
    ageStyle:'',
    headStyle:''
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
    
  }
})