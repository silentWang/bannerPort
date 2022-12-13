import { dataCenter } from "../../../model/DataCenter";

// pages/components/headItem/HeadItem.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {},
  /**
   * 组件的初始数据
   */
  data: {
    isLogin:false,
    canIUseGetUserProfile:false,
    canIUseOpenData:false,
    myTimes: '模板DIY次数：0次',
    showAlert:false
  },
  ready(){
    this.setData({
      isLogin:dataCenter.isLogin,
      canIUseGetUserProfile:dataCenter.canIUseGetUserProfile,
      canIUseOpenData:dataCenter.canIUseOpenData,
      myTimes:`模板DIY次数：${dataCenter.userInfo.num}次`
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getUserProfile() {
      dataCenter.checkIsHaveInfo();
    },
    getDIYTimes(){
      this.setData({showAlert:true})
      console.log("获取次数")
    },
    close(){
      this.setData({showAlert:false})
    }
  }
})
