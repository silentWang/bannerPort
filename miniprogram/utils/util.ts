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

export function getTextStyle(data:any,key:string,scale:number = 1){
  if(!data || !key) return '';
  let obj = data[key];
  if(!obj) return '';
  let sty = `color:${obj.color};`;
  sty += `left:${obj.x*scale}rpx;`;
  sty += `top:${obj.y*scale}rpx;`;
  sty += `font-size:${obj.size*scale}rpx;`;
  sty += `bold:${obj.bold};`;
  sty += `transform:rotate(${obj.rotation}deg);`;
  return sty;
}

export function getImageStyle(data:any,key:string,scale:number = 1){
  if(!data || !key) return '';
  let obj = data[key];
  if(!obj) return '';
  let sty = `left:${obj.x*scale}rpx;`;
  sty += `top:${obj.y*scale}rpx;`;
  sty += `width:${obj.width*scale}rpx;`;
  sty += `height:${obj.height*scale}rpx;`;
  sty += `transform:rotate(${obj.rotation}deg);`;
  return sty;
}
