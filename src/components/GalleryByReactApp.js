require('../styles/main.css');

var React=require("react");
var ReactDom=require("react-dom");

//获取图片相关数据(数组)
var imageDatas = require('../data/imageDatas.json');

//其实就是为每一条图片数据添加了一条表示图片url的数据
imageDatas = (function getImageUrl(imageDatasArr) {
    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        imageDatasArr[i].imageUrl = require("../images/" + imageDatasArr[i].fileName);
    }
    return imageDatasArr;
})(imageDatas);


//获取范围内的一个值
function getRangeRandom(low,high){
    return Math.ceil(Math.random()*(high-low)+low);
}

//获取旋转角度
function get30DegRandom(){
    return (Math.random()>0.5 ? "" : "-")+Math.ceil(Math.random()*30);
}

//单个图片组件
var ImgFigure=React.createClass({
    
    handleClick: function(e){
        if(this.props.arrange.isCenter){
            this.props.inverse();
        }else{
            this.props.center();
        }
        e.preventDefault();
        e.stopPropagation();
    },
    
    render:function(){
        
        var styleObj={};
        if(this.props.arrange.pos){
            styleObj=this.props.arrange.pos;
        }
        
        if(this.props.arrange.rotate){
            ["MozTransform","msTransform","WebkitTransform","transform"].forEach(function(value){
                styleObj[value]="rotate("+this.props.arrange.rotate+"deg)";
            }.bind(this)) 
        }
        
        if(this.props.arrange.isCenter){
            styleObj.zIndex=11;
        }
        
        var imgFigureClassName="img-figure";
        imgFigureClassName += this.props.arrange.isInverse ? " is-inverse" : "";
        
        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
                <img src={this.props.data.imageUrl} alt={this.props.data.title}/>
                <figcaption>    
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                        <p>
                            {this.props.data.des}
                        </p>
                    </div>
                </figcaption>
            </figure>
        );
    }
});

var ControlerUnit=React.createClass({
    handleClick: function(e){
        
        if(this.props.arrange.isCenter){
            this.props.inverse();
        }else{
            this.props.center();
        }
        e.preventDefault();
        e.stopPropagation();
    },
    
    render: function (){
        var controlerUnitClassName="controler-unit";
        
        if(this.props.arrange.isCenter){
            controlerUnitClassName+=" is-center";
        }
        
        if(this.props.arrange.isInverse){
            controlerUnitClassName+=" is-inverse";
        }
        
        return (
            <span className={controlerUnitClassName} onClick={this.handleClick}></span>
        );
    }
});

var GalleryByReactApp = React.createClass({
    
     getInitialState: function(){
        return {
            imgsArrangeArr: [
              
            ]
        };
    },
    
    Constant:{
          centerPos: {
              left: 0,
              right: 0
          },
        hPosRange: { //水平方向的取值范围
            leftSecX: [0,0],
            rightSecX: [0,0],
            y: [0,0]
        },
        vPosRange: {
            x: [0,0],
            topY: [0,0]
        }
    },
    
    //重新布局所有图片
    rearrange: function(centerIndex){
        var imgsArrangeArr=this.state.imgsArrangeArr,
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hposRangY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,
            
            imgsArrangeTopArr = [],
            topImgNum = Math.floor(Math.random()*2),
            topImgSpliceIndex = 0,
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);
        
            //居中图片
        imgsArrangeCenterArr[0]={
            pos: centerPos,
            rotate: 0,
            isCenter: true
        };
        
            //上侧图片
        topImgSpliceIndex=Math.ceil(Math.random()*(imgsArrangeArr.length-topImgNum));
        imgsArrangeTopArr=imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);
        
        imgsArrangeTopArr.forEach(function(value,index){
            imgsArrangeTopArr[index]={
                pos: {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0],vPosRangeX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            }
        });
        
        //两侧图片
        for(var i=0,j=imgsArrangeArr.length,k=j/2;i<j;i++){
            var hPosRangeLORX=null;
            if(i<k){
                hPosRangeLORX=hPosRangeLeftSecX;
            }else{
                hPosRangeLORX=hPosRangeRightSecX;
            }
            imgsArrangeArr[i]={
                pos: {
                    top: getRangeRandom(hposRangY[0],hposRangY[1]),
                    left: getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            }
        }
        if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
            imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
        }
        imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);
        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
            
    },
    
    center: function(index){
      return function(){
          this.rearrange(index);
      }.bind(this);  
    },
    
    inverse : function(index){
        return function(){
            var imgsArrangeArr=this.state.imgsArrangeArr;
            imgsArrangeArr[index].isInverse=!imgsArrangeArr[index].isInverse;
            this.setState({
                imgsArrangeArr: imgsArrangeArr
            });
        }.bind(this);
        
    },
    
    //组件加载后为每张图片计算位置范围
    componentDidMount: function(){
        //舞台大小
        var stageDOM=ReactDom.findDOMNode(this.refs.stage),
            stageW=stageDOM.scrollWidth,
            stageH=stageDOM.scrollHeight,
            halfStageW=Math.ceil(stageW/2),
            halfStageH=Math.ceil(stageH/2);
        //imageFigure大小
        var imgFigureDOM=ReactDom.findDOMNode(this.refs.imgFigure0),
            imgW=imgFigureDOM.scrollWidth,
            imgH=imgFigureDOM.scrollHeight,
            halfImgW=Math.ceil(imgW/2),
            halfImgH=Math.ceil(imgH/2);
        //计算中心图片位置
        this.Constant.centerPos={
            left: halfStageW-halfImgW,
            top: halfStageH-halfImgH
        };
        
        this.Constant.hPosRange.leftSecX[0]=-halfImgW;
        this.Constant.hPosRange.leftSecX[1]=halfStageW-halfImgW*3;
        this.Constant.hPosRange.rightSecX[0]=halfStageW+halfImgW;
        this.Constant.hPosRange.rightSecX[1]=stageW-halfImgW;
        this.Constant.hPosRange.y[0]=-halfImgH;
        this.Constant.hPosRange.y[1]=stageH-halfImgH;
        
        this.Constant.vPosRange.topY[0]=-halfImgH;
        this.Constant.vPosRange.topY[1]=halfStageH-halfImgH*3;
        this.Constant.vPosRange.x[0]=halfStageW-imgW;
        this.Constant.vPosRange.x[1]=halfStageW;
        
        this.rearrange(0);
    },
    
    //渲染方法
    render: function () { //垂直方向的取值范围
        var controlerUnits=[],
            imgFigures=[];
        imageDatas.forEach(function(value,index){
            if(!this.state.imgsArrangeArr[index]){
                this.state.imgsArrangeArr[index]={
                    pos: {
                        left: 0,
                         top: 0
                    },
                    rotate: 0,
                    isInverse: false,
                    isCenter: false
                }
            }
            
            imgFigures.push(<ImgFigure key={index} data={value} ref={"imgFigure"+index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
    
            controlerUnits.push(<ControlerUnit key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);

        }.bind(this));
        return ( 
            <section className = "stage" ref="stage">
                <section className = "img-sec">
                    {imgFigures}
                </section> 
                <nav className = "controler-nav">
                    {controlerUnits}
                </nav> 
            </section>
        );
    }
});

ReactDom.render(
    <GalleryByReactApp/>,
    document.getElementById("content")
);
                