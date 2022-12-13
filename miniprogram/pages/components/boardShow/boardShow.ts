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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
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
            wx.navigateTo({
              url:'../../pages/boarddiy/boardDIY?id=' + this.data.tempData.id,
              complete:function(result){
                console.log(result)
              }
            })
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
