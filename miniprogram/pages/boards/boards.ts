import { dataCenter } from "../../model/DataCenter";

// pages/boards/boards.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSeries:true,
    showDetail:false,
    boardData:{},
    seriesList:{},
    childList:{},
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
    dataCenter.getSeriesList(()=>{
      this.setData({
        isSeries:true,
        seriesList:dataCenter.seriesList
      });
    },1)
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
  showChildList(data:any){
    let info = data.currentTarget.dataset.seriesitem;
    let params = {page:1,category_id:info.id,code:''}
    dataCenter.getChildList((res:any)=>{
      this.setData({isSeries:false,childList:res.data});
    },params);
  },
  showBoardHandler(data:any){
    let info = data.detail;
    this.setData({
      boardData:info,
      showDetail:true
    })
  },

  hideBoard(){
    this.setData({showDetail:false})
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  methods:{
  }

})