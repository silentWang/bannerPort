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
  onLoad(options:any) {
    console.log('options---',options)
    // const eventChannel = this.getOpenerEventChannel()
    // // 监听 acceptDataFromOpenerPage 事件，获取上一页面通过 eventChannel 传送到当前页面的数据
    // eventChannel && eventChannel.on('acceptDataFromOpenerPage', function(data) {
    //   console.log(data)
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },
  scrollLower(){
    this.loadBoardList(0);
  },
  loadBoardList(isfirst:number){
    this.setData({isLoading:true})
    dataCenter.getMyTemplateList((res:any)=>{
      let obj:any = {isLoading:false};
      if(res){
        if(isfirst == 1){
          obj.myBoardList = res.data;
        }
        else{
          obj.myBoardList = [...this.data.myBoardList,...res.data];
        }
      }
      obj.isBlank = (!obj.myBoardList || obj.myBoardList.length == 0) && this.data.myBoardList.length == 0;
      this.setData(obj)
    },isfirst)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({myBoardList:[]})
    this.loadBoardList(1);
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