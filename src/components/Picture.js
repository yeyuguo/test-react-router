require('normalize.css/normalize.css');
require('../styles/less/style.less')
import React from 'react';


// less start
var imageDatas = require('../data/imageData.json')


imageDatas = (function genImageURL(imageDatasArr) {
    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        var singleImageData = imageDatasArr[i];
        singleImageData.imageURL = require('../images/' + singleImageData.fileName);
        imageDatasArr[i] = singleImageData;
    }

    return imageDatasArr;
})(imageDatas);

// 单张图片的组件
var ImgFigure = React.createClass({
    render:function(){
        return (
            <figure className='img-figure'>
                <img  src={this.props.data.imageURL} alt={this.props.data.title}/>
                <figcaption>
                    <h2 className='img-title'>{this.props.data.title}</h2>
                </figcaption>
            </figure>
        )
    }
})

// 多张图片的组件
var PicApp = React.createClass({
    getInitialState : {
        imgsArrangeArr:[
            /*
            {
                pos:{
                    left:0,
                    top:0
                }
            }
            */
        ]
    },
    Constant:{
        centerPos:{ // 中间图片的位置
            left:0,
            top:0
        },
        hPosRange:{ // 左右区域的 宽高范围
            leftSecX:[0,0], // 横轴 范围
            rightSecX:[0,0], // 横轴 范围
            y:[0,0] // 纵轴 范围
        },
        vPosRange:{ // 中上位置的区域 宽高范围
            x:[0,0], // 横轴 范围
            topY:[0,0] // 纵轴 范围
        }
    },
    // 指定 居中的图片
    rearrange:function(centerImgIndex){
        var imgsArrangeArr = this.state.imgsArrangeArr
        
        // return 
    },
    // 组件加载后才执行的函数
    componentDidMount:function(){
        // 获取舞台大小
        var stageDOM = React.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2 ),
        halfStageH = Math.ceil(stageH / 2 )

        // 获取图片大小
        var imgFigureDOM = React.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW /2 ),
        halfImgH = Math.ceil(imgH /2 )

        // 设置 位置点
        this.Constant.centerPos = {
            left:halfStageW - halfImgW,
            top:halfStageH - halfImgH
        }
        // 左侧区域 // 横轴 范围
        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW*3;
        // 右侧区域 // 横轴 范围
        this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW -halfImgW;
        // 左右两个区域的 // 纵轴 范围
        this.Constant.y[0] = -halfImgH;
        this.Constant.y[1] = stageH - halfImgH;

        // 中间上面部分的 // 横轴 范围
        this.Constant.vPosRange.x[0] = -halfImgW
        this.Constant.vPosRange.x[1] = halfImgW;
        // 中间上面部分的 // 纵轴 范围
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH - halfImgH*3;

        this.rearrange(0)

    },
    
    render:function(){
        var controllerUnits = [],
        imgFigures = []
        
        // 单图片组成多图片
        imageDatas.forEach(function(value,index){
            if(!this.state.imgsArrangeArr[index]){
                this.state.imgsArrangeArr[index]={
                    pos:{
                        left:0,
                        top:0
                    }
                }
            }
            // TODO 这里的this 不太明白用意
            imgFigures.push(<ImgFigure data={value} ref={'imgFigure'+index} />)

        }.bind(this)) // 这里的 this 是为了把 this.state 传入forEach回调函数里

        return (
            <section className='stage' ref='stage'>
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>

            </section>
        )
    }
})

module.exports = PicApp