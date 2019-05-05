import Taro, { Component } from "@tarojs/taro";
var echarts = require('echarts');
function setChartData(chart, data) {
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
        data:data.legend || ['邮件营销','联盟广告','视频广告','直接访问','搜索引擎'],
        // top: 50,
        // left: 'center',
        // backgroundColor: 'red',
        // z: 100
    },
    color:['#ffac47', '#80ef13', '#ff4a4a'],
    title : {
        show:true,//显示策略，默认值true,可选为：true（显示） | false（隐藏）
        text: data.title ||'主标题',//主标题文本，'\n'指定换行
        link:'',//主标题文本超链接,默认值true
        target: null,//指定窗口打开主标题超链接，支持'self' | 'blank'，不指定等同为'blank'（新窗口）
        // subtext: '副标题',//副标题文本，'\n'指定换行
        sublink: '',//副标题文本超链接
        subtarget: null,//指定窗口打开副标题超链接，支持'self' | 'blank'，不指定等同为'blank'（新窗口）
        x:'center',//水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
        y: '20',//垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
        textAlign: null,//水平对齐方式，默认根据x设置自动调整，可选为： left' | 'right' | 'center
        backgroundColor: 'rgba(0,0,0,0)',//标题背景颜色，默认'rgba(0,0,0,0)'透明
        borderColor: '#ccc',//标题边框颜色,默认'#ccc'
        borderWidth: 0,//标题边框线宽，单位px，默认为0（无边框）
        padding: 5,//标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
        itemGap: 10,//主副标题纵向间隔，单位px，默认为10
        textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
            fontFamily: 'Arial, Verdana, sans...',
            fontSize: 12,
            fontStyle: 'normal',
            fontWeight: 'normal',
        },
        subtextStyle: {//副标题文本样式{"color": "#aaa"}
            fontFamily: 'Arial, Verdana, sans...',
            fontSize: 12,
            fontStyle: 'normal',
            fontWeight: 'normal',
        },
        zlevel: 0,//一级层叠控制。默认0,每一个不同的zlevel将产生一个独立的canvas，相同zlevel的组件或图标将在同一个canvas上渲染。zlevel越高越靠顶层，canvas对象增多会消耗更多的内存和性能，并不建议设置过多的zlevel，大部分情况可以通过二级层叠控制z实现层叠控制。
        z: 6,//二级层叠控制，默认6,同一个canvas（相同zlevel）上z越高约靠顶层。
    },
    xAxis : [
      {
        type: 'category',
        data: data.xAxis || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis : [
      {
        name:'电压(V)',
        type : 'value'
      }
    ],
    dataZoom: [//给x轴设置滚动条  
        {  
            start:0,//默认为0  
            end: 50,  
            type: 'slider',  
            show: true,  
            xAxisIndex: [0],  
            handleSize: 0,//滑动条的 左右2个滑动条的大小  
            height: 8,//组件高度  
            left: 50, //左边的距离  
            right: 40,//右边的距离  
            bottom: 26,//右边的距离  
            handleColor: '#ddd',//h滑动图标的颜色  
            handleStyle: {  
                borderColor: "#cacaca",  
                borderWidth: "1",  
                shadowBlur: 2,  
                background: "#ddd",  
                shadowColor: "#ddd",  
            },  
            fillerColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{  
                //给颜色设置渐变色 前面4个参数，给第一个设置1，第四个设置0 ，就是水平渐变  
                //给第一个设置0，第四个设置1，就是垂直渐变  
                offset: 0,  
                color: '#1eb5e5'  
            }, {  
                offset: 1,  
                color: '#5ccbb1'  
            }]),  
            backgroundColor: '#ddd',//两边未选中的滑动条区域的颜色  
            showDataShadow: false,//是否显示数据阴影 默认auto  
            showDetail: false,//即拖拽时候是否显示详细数值信息 默认true  
            handleIcon: 'M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z',  
            filterMode: 'filter'
        },  
        //下面这个属性是里面拖到  
        {  
            type: 'inside',  
            show: true,  
            xAxisIndex: [0],  
            start: 0,//默认为1  
            end: 50
        },  
    ],
    series : [
        {
            data: data.yAxisData1 ||[120, 132, 101, 134, 90, 230, 210],
            type: 'line',
            smooth: true,
            name:data.legend[0]
        },
        {
            data: data.yAxisData2 || [220, 182, 191, 234, 290, 330, 310],
            type: 'line',
            smooth: true,
            name:data.legend[1]
        },
        {
            data: data.yAxisData3 || [150, 232, 201, 154, 190, 330, 410],
            type: 'line',
            smooth: true,
            name:data.legend[2]
        }
    ]
  };
  
  chart.setOption(option);
}

export default class LineChart extends Component {
  config = {
    usingComponents: {
      "ec-canvas": "../ec-canvas/ec-canvas"
    }
  };

  constructor(props) {
    super(props);
  }

  state = {
    ec: {
      lazyLoad: true
    }
  };

  refresh(data) {
    this.Chart.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setChartData(chart, data);
      return chart;
    });
  }

  refChart = node => (this.Chart = node);

  render() {
    return (
      <ec-canvas
        ref={this.refChart}
        canvas-id=" voltage-area"
        ec={this.state.ec}
      />
    );
  }
}
