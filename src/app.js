import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss'
import Login from './pages/login'

import configStore from './store'

import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/login/index',
      'pages/index/index',
      'pages/mine/index',
      'pages/scada/index',
      'pages/voltage/index',
      'pages/electricityAnalysis/index',
      'pages/electricCurrent/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#6190e8',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: '#fff',
      pageOrientation:'landscape'
    },
    tabBar: {
      list: [{
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./images/home.png",
        selectedIconPath: "./images/home-active.png"
      },{
        pagePath: "pages/scada/index",
        text: "我的",
        iconPath: "./images/mine.png",
        selectedIconPath: "./images/mine-active.png"
      }],
      color: '#333',
      selectedColor: '#1296db',
      backgroundColor: '#fff',
      borderStyle: '#ccc'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Login />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
