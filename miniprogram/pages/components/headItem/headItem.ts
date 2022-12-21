import { dataCenter } from "../../../model/DataCenter";
import EventCenter from "../../../model/EventCenter";

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
    orderListNo:'',
    myTimes: '模板DIY次数：0次',
    showAlert:false
  },
  pageLifetimes: {
    show: function() {
      EventCenter.addListener(EventCenter.GET_USER_INFO_EVENT,this.updateUser,this)
    },
    hide: function() {
      EventCenter.removeListener(EventCenter.GET_USER_INFO_EVENT,this.updateUser)
    },
  },
  ready(){
    if(dataCenter.isLogin){
      this.updateUser();
    }
    else{
      dataCenter.getUserInfo();
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    updateUser(){
      this.setData({
        isLogin:true,
        canIUseGetUserProfile:dataCenter.canIUseGetUserProfile,
        canIUseOpenData:dataCenter.canIUseOpenData,
        myTimes:`模板DIY次数：${dataCenter.userInfo.num}次`
      });
    },
    getUserProfile() {
      dataCenter.checkIsHaveInfo();
    },
    getDIYTimes(){
      this.setData({showAlert:true})
    },
    getExchangeTimes(){
      if(!this.data.orderListNo) {
        wx.showToast({title:'请输入正确的订单号',icon:'none'})
        return;
      }
      dataCenter.getExchangeInfo(this.data.orderListNo);
      this.setData({showAlert:false})
    },
    inputTextHandler(evt:any){
      this.setData({orderListNo:evt.detail.value})
    },
    close(){
      this.setData({showAlert:false})
    }
  }
})
