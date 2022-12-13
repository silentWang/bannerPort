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

export function getTextStyle(obj:any,scale:number = 1){
  if(!obj) return '';
  let sty = `color:${obj.color};`;
  sty += `left:${obj.x*scale}rpx;`;
  sty += `top:${obj.y*scale}rpx;`;
  sty += `font-size:${obj.size*scale}rpx;`;
  sty += `bold:${obj.bold};`;
  sty += `transform:rotate(${obj.rotation}deg);`;
  return sty;
}

export function getImageStyle(obj:any, scale:number = 1){
  if(!obj) return '';
  let sty = `left:${obj.x*scale}rpx;`;
  sty += `top:${obj.y*scale}rpx;`;
  sty += `width:${obj.width*scale}rpx;`;
  sty += `height:${obj.height*scale}rpx;`;
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
