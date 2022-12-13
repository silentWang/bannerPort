import { dataCenter } from "../../model/DataCenter"
import { getImageStyle, getTextStyle } from "../../utils/util";

// pages/boarddiy/boardDIY.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boardID:'',
    detailInfo:{},
    nameStyles:[{}],
    ageStyles:[{}],
    headStyle:{},
    bgImage:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(query) {
    this.setData({
      boardID:query.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    dataCenter.getBoardDetailInfo((data:any)=>{
      let names = data.name;
      let nameStyles = [];
      for(let i = 0;i < names.length;i++){
        nameStyles.push({style:getTextStyle(names[i]),value:names[i].value});
      }
      let ageStyles = [];
      for(let i = 0;i < data.age.length;i++){
        ageStyles.push({style:getTextStyle(data.age[i]),value:data.age[i].value});
      }
      let headStyle = {style:getImageStyle(data.headpic),value:data.headpic.value};
      this.setData({
        detailInfo:{id:data.id,code:data.code},
        bgImage:data.background,
        nameStyles:nameStyles,
        ageStyles:ageStyles,
        headStyle:headStyle
      })
    },this.data.boardID)
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