import { dataCenter } from "../../model/DataCenter"

// pages/mine/mine.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myBoardList:[] as any[],
    isLoading:false,
    isBlank:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.loadBoardList();
  },
  scrollLower(){
    this.loadBoardList();
  },
  loadBoardList(){
    this.setData({isLoading:true})
    dataCenter.getMyTemplateList((res:any)=>{
      let obj:any = {isLoading:false};
      if(res){
        obj.myBoardList = [...this.data.myBoardList,...res.data];
      }
      obj.isBlank = (!obj.myBoardList || obj.myBoardList.length == 0);
      this.setData(obj)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})