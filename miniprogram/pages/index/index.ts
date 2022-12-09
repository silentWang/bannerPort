// index.ts

import { dataCenter } from "../../model/DataCenter";

// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    homeList:{},
  },
  onReady() {
    this.setData({homeList:dataCenter.homeBoardList});
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  }
})