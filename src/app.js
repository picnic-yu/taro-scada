import Taro, { Component } from '@tarojs/taro'
import Login from './pages/login'
import 'taro-ui/dist/style/index.scss'
import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/login/index',//登录页面
      'pages/index/index',//首页
      'pages/mine/index',//个人中心
      'pages/boxChangeInfo/index',//箱变列表
      'pages/boxChangeInfoDetail/index',//箱变具体信息
      'pages/breakdown/index',//故障信息
      'pages/editUser/index',//设置，修改密码
      'pages/electrictyDetailPage/index',//配电室明细
      'pages/voltage/index',//线电压
      'pages/electricityAnalysis/index',//用电分析
      'pages/factor/index',//功率因素
      'pages/energy_profile/index',//用电概括
      'pages/electricityRoom/index',//配电室
      'pages/electricCurrent/index',//电流检测
      'pages/scada/index',//scada列表
      'pages/scadaDetail/index',//具体的scada图
    ],
    
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#6190e8',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white',
    },
    tabBar: {
      list: [{
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./images/home.png",
        selectedIconPath: "./images/home-active.png"
      },{
        pagePath: "pages/mine/index",
        text: "我的",
        iconPath: "./images/mine.png",
        selectedIconPath: "./images/mine-active.png"
      }],
      color: '#333',
      selectedColor: '#1296db',
      backgroundColor: 'white',
      borderStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Login />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
