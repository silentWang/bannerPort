import { dataCenter } from "../../../model/DataCenter";

// pages/components/headItem/HeadItem.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    canIUseGetUserProfile:dataCenter.canIUseGetUserProfile,
    canIUse:dataCenter.canIUse,
    userInfo:dataCenter.userInfo
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
