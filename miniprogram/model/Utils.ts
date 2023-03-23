export default class Utils {
    static checkIsIos(){
        const info = wx.getSystemInfoSync()
        return !(info.system.indexOf('Android') > -1);
    }
}