// pages/components/boardItem/boardItem.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    seriesInfo:{
      type:Object,
      value:{name:'没有数据',image:''}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isSeries:true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showCurrentSeries(){
      console.log("显示当前系列")
      let b = this.data.isSeries;
      this.setData({isSeries:!b})
    }
  }
})
