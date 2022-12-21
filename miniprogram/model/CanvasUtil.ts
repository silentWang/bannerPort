import { getRpxToPx } from "../utils/util";
import DIYModel, { ItemStyleType } from "./DIYModel";

export default class CanvasUtil {
    /**save 图片 */
    public createImage(){
        
    }

    private static canvas:any;
    private static context:any;
    public static makeImage(){
        const canvasQuery = wx.createSelectorQuery()  
        //返回一个对象实例，通过实例可以获取canvas
        canvasQuery.select('#picCanvas').fields({
            node: true,
            size: true,
            rect: true
        }).exec(this.initCanvas.bind(this))  
    }

    private static initCanvas(obj:any){
        let option = obj[0];
        const canvas = option.node
        const ctx = canvas.getContext('2d')
        this.canvas = canvas;
        this.context = ctx;
        const width = option.width
        const height = option.height
        let wh = DIYModel.originWH;
        ctx.clearRect(0,0,wh.width,wh.height)
        //使canvas适应各种屏幕不至于大小不同
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = width * dpr
        canvas.height = height * dpr
        ctx.scale(dpr, dpr)
        ctx.font = `30px "${DIYModel.curFont}"`;
        this.drawBgImage(()=>{
          this.drawText(DIYModel.nameInfo);
          this.drawText(DIYModel.ageInfo);
          this.drawText(DIYModel.otherInfo);
        });
        setTimeout(() => {
            this.saveImage();
        }, 5000);
    }

    private static drawBgImage(callback:Function){
        // 绘制图片 这里要注意drawImage方法中传入的是img对象，而不是img.src
        let ctx = this.context;
        ctx.save();
        const img = this.canvas.createImage()
        const wh = DIYModel.originWH;
        img.src = DIYModel.bgImage
        img.onload = () => { 
          ctx.drawImage(img, 0, 0, wh.width, wh.height)
          ctx.restore();
          callback();
        }
    }

    // 绘制文字部分
    private static drawText(texts:ItemStyleType[]){
        let ctx = this.context;
        ctx.save();
        let len = texts.length;
        for(let i = 0;i < len;i++){
            ctx.save();
            let txt = this.getPxStyleType(texts[i]);
            ctx.font = `${txt.size}px ${DIYModel.curFont}`;
            ctx.fillStyle = txt.color;
            ctx.textAlign = txt.textAlign;
            let sw = ctx.measureText(txt.value.charAt(0)).width;
            let ww = ctx.measureText(txt.value).width;
            let pos = this.getTextXY(txt,sw,ww);
            ctx.save();
            ctx.translate(pos.px,pos.py);
            ctx.fillText(txt.value,0,0);
            ctx.restore();
            // ctx.translate(pos.rx,pos.ry);
            // ctx.rotate(txt.rotation*Math.PI/180);
            ctx.restore();
        }
        ctx.restore();
    }

    private static getTextXY(txt:ItemStyleType,singleWid:number,allWid:number){
        let px:number,py:number;
        let rx:number,ry:number;
        if(txt.textAlign == 'center'){
            px = getRpxToPx(txt.x) + getRpxToPx(txt.w)/2;
            py = txt.y;
            rx = px;
            ry = py + singleWid/2;    
        }
        else if(txt.textAlign = 'right' || txt.textAlign == 'end'){
            px = txt.x + txt.w;
            py = txt.y;
            rx = px - allWid/2;
            ry = py + singleWid/2;
        }
        else {
            px = txt.x;
            py = txt.y;
            rx = px + allWid/2;
            ry = py + singleWid/2;
        }
        return {px,py,rx,ry}
    }

    private static saveImage(){
        let wh = DIYModel.originWH;
        wx.canvasToTempFilePath({
            canvas: this.canvas,
            x: 0,
            y: 0,
            width: wh.width,
            height: wh.height,
            destWidth: wh.width,
            destHeight: wh.height,
            success: res => {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: res => {
                  // console.log(this.saveTempFilePath)
                  wx.showModal({
                    title: "保存成功！",
                    content: "图片已保存到本地相册",
                    showCancel: false,
                    success(res) {
                      if (res.confirm) {
                        wx.reLaunch({
                          url: '/pages/joinU/joinU'
                        })
                      }
                    }
                  })
                },
                fail: err => {
                  console.log(err)
                }
              })
            },
            fail: err => {
              console.log(err)
            }
          })
    }

    private static getPxStyleType(itemInfo:ItemStyleType){
        let result = {} as ItemStyleType;
        let lwh = DIYModel.localWH;
        let owh = DIYModel.originWH;
        let zm = owh.width/lwh.width;
        result.x = zm*itemInfo.x;
        result.y = zm*itemInfo.y;
        result.w = zm*itemInfo.w;
        result.h = zm*itemInfo.h;
        result.size = zm*itemInfo.size;
        result.rotation = itemInfo.rotation;
        result.value = itemInfo.value;
        result.color = itemInfo.color;
        result.bold = itemInfo.bold;
        result.textAlign = itemInfo.textAlign;
        result.maxlength = itemInfo.maxlength;
        return result;
    }

    static createImage() {
        // let _width = this.data._width,
        //     _heigth = this.data._heigth; //屏幕宽与高
    
        // let imgHeigth = this.data.swiperHeight, //原图片高度
        //     scale = (_width - 40) / _width, //缩小比例
        //     that = this;
        // let imgH = imgHeigth * scale; //绘制时图片显示高度  
        // let ctx = wx.createCanvasContext('mycanvas') || ;
        // // 绘制背景
        // ctx.setFillStyle("#fff");
        // ctx.fillRect(0, 0, _width - 40, imgH + 160);
        // //绘制图片
        // ctx.drawImage(this.data.localImageUrl, 10, 10, _width - 60, imgH);
    
        // // 绘制标题
        // ctx.setFontSize(18);
        // ctx.setFillStyle('#333');
    
        // let txtWidth = _width - 60 + 30 - 100 - 50; //文字的宽度
    
        // //商品名称 最多两行显示 写法有点LOW，但思路是这样的
        // let title = this.data.goods.title; //商品名称
        // let title2; //商品名称
        // if (title.length > 10) {
        //     title2 = title.slice(10, title.length);
        //     title = title.slice(0, 10);
        // }
        // if (title2.length > 10) {
        //     title2 = title2.slice(0, 9) + ' ...';
        // }
        // ctx.fillText(title, 10, imgH + 40, txtWidth);
        // ctx.fillText(title2, 10, imgH + 70, txtWidth);
        // // 绘制价格 '￥'
        // ctx.setFontSize(14);
        // ctx.setFillStyle('#d2aa68');
        // ctx.fillText('￥', 10, imgH + 110, txtWidth);
        // // 绘制价格
        // ctx.setFontSize(24);
        // ctx.fillText(this.data.goods.promotion_price, 26, imgH + 110, txtWidth);
        // // 绘制门市价
        // ctx.setFontSize(14);
        // ctx.setFillStyle('#666');
        // ctx.fillText(`门市价￥${this.data.goods.price}`, 115, imgH + 110, txtWidth);
    
        // // 绘制二维码
        // ctx.drawImage(this.data.localCodeUrl, _width - 80 + 80 - 150, imgH + 20, 100, 100);
        // // 显示绘制
        // ctx.draw();
    
        // //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
        // setTimeout(function() {
        //     wx.canvasToTempFilePath({
        //         canvasId: 'mycanvas',
        //         success: function(res) {
        //             var tempFilePath = res.tempFilePath;
        //             that.setData({
        //                 loadImagePath: tempFilePath,
        //             });
        //         },
        //         fail: function(res) {
        //             console.log(res);
        //         }
        //     });
        // }, 500);
    }


}