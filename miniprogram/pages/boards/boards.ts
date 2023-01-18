import { dataCenter } from "../../model/DataCenter";

// pages/boards/boards.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSeries:true,
    showDetail:false,
    isLoading:false,
    isBlank:false,
    boardData:{},
    seriesList:{},
    childList:[] as any[],
    categoryId:'',
    categoryCode:''
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
    this.setData({isLoading:true})
    dataCenter.getSeriesList(()=>{
      let isblank = (!dataCenter.seriesList || dataCenter.seriesList.length == 0)
      this.setData({
        isSeries:true,
        isLoading:false,
        isBlank:isblank,
        seriesList:dataCenter.seriesList
      });
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.setNavigationBarTitle({title:this.data.isSeries ? '模版分类' : '模版列表'})
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
  scrollLower(){
    this.setData({isLoading:true})
    if(this.data.isSeries){
      dataCenter.getSeriesList((ismore:boolean)=>{
        let obj:any = {isLoading:false}
        if(ismore){
          obj.seriesList = dataCenter.seriesList
        }
        this.setData(obj);
      })
    }
    else{
      dataCenter.getChildList((res:any)=>{
        let obj:any = {isLoading:false}
        if(!res){
          obj.seriesList = [...this.data.childList,...res.data]
        }
        this.setData(obj);
      },this.data.categoryId,this.data.categoryCode);
    }
  },
  showChildList(data:any){
    let info = data.currentTarget.dataset.seriesitem;
    wx.setNavigationBarTitle({title:'模版列表'})
    this.setData({
      categoryId:info.id,
      categoryCode:info.code,
      childList:[],
      isSeries:false,
      isLoading:true
    })
    dataCenter.getChildList((res:any)=>{
      let isblank = (!res.data || res.data.length == 0);
      let obj:any = {isBlank:isblank,isLoading:false}
      if(!isblank){
        obj.childList = res.data;
      }
      this.setData(obj);
    },info.id,info.code,true);
  },
  showBoardHandler(data:any){
    let info = data.detail;
    this.setData({
      boardData:info,
      showDetail:true
    })
  },
  onTapBack(){
    let isblank = (!dataCenter.seriesList || dataCenter.seriesList.length == 0)
    this.setData({
      isSeries:true,
      isBlank:isblank
    })
    wx.setNavigationBarTitle({title:'模版分类'})
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