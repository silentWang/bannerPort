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
    myTimes: '模板DIY次数：2次',
    showAlert:false
  },
  ready(){
    this.setData({
      isLogin:dataCenter.isLogin,
      canIUseGetUserProfile:dataCenter.canIUseGetUserProfile,
      canIUseOpenData:dataCenter.canIUseOpenData
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getUserProfile() {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log('授权成功')
          dataCenter.isLogin = true;
          dataCenter.userInfo = res.userInfo;
          this.setData({isLogin:true});
        }
      })
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
