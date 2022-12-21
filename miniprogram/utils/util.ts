import { dataCenter } from "../model/DataCenter"
import DIYModel from "../model/DIYModel"

export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export function copyObject(srcObj:any){
  if(typeof srcObj == 'string' 
    || typeof srcObj == 'number'
    || typeof srcObj == 'function'
    || !srcObj
    ) return srcObj;
  let jstr = JSON.stringify(srcObj);
  return JSON.parse(jstr);
}

export function getPxToRpx(px:number){
  let info = wx.getSystemInfoSync();
  let swidth = info.screenWidth;
  let rwidth = DIYModel.localWH.width;
  return px*rwidth/swidth;
}

export function getRpxToPx(rpx:number){
  let info = wx.getSystemInfoSync();
  let swidth = info.screenWidth;
  let rwidth = DIYModel.localWH.width;
  return rpx*swidth/rwidth;
}

export function getTextStyle(obj:any,font:string = '',scale:number = 1){
  if(!obj) return '';
  let sty = `color:${obj.color};`;
  sty += `left:${obj.x*scale}rpx;`;
  sty += `top:${obj.y*scale}rpx;`;
  sty += `font-size:${obj.size*scale}rpx;`;
  sty += `width:${obj.w}rpx;`;
  sty += `bold:${obj.bold};`;
  sty += `transform:rotate(${obj.rotation}deg);`;
  sty += `font-family:${font};`;
  sty += `text-align:${obj.textAlign};`;
  // sty += `tranform-origin: left top;`;
  return sty;
}

export function getImageStyle(obj:any, scale:number = 1){
  if(!obj) return '';
  // let sty = `left:${obj.x*scale}rpx;`;
  // sty += `top:${obj.y*scale}rpx;`;
  let sty = `left:0rpx;`;
  sty += `top:0rpx;`;
  sty += `width:${obj.w*scale}rpx;`;
  sty += `height:${obj.h*scale}rpx;`;
  sty += `transform:rotate(${obj.rotation}deg);`;
  return sty;
}

export function downloadImage(url:string){
  if(!url) return;
  wx.downloadFile({
    url: url,//图片的地址
    success:function(res){
      const tempFilePath = res.tempFilePath  //通过res中的tempFilePath 得到需要下载的图片地址
      wx.saveImageToPhotosAlbum({
        filePath: tempFilePath,  //设置下载图片的地址
        success:function(){
          console.log('图片保存成功')
        }
      })
    }
  })
}

export function getFont(fonturl:string){
    return new Promise((resolve,reject)=>{
      let fontName = dataCenter.getNextFontName();
      wx.loadFontFace({
        global: true, // 是否全局生效
        family: fontName, //设置一个font-family使用的名字
        source: `url('${fonturl}')`, //字体资源的地址
        scopes: ["webview", "native"],
        success: (res)=>{
          resolve(fontName);
          console.log(res)
        }
      })
    });
}
