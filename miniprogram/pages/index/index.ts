// index.ts

import { dataCenter } from "../../model/DataCenter";

// 获取应用实例
Page({
  data: {
    homeList:{},
  },
  onReady() {
    dataCenter.updateCurPage();
    dataCenter.getHomeListInfo(()=>{
      this.setData({homeList:dataCenter.homeBoardList});
    });
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  }
})
