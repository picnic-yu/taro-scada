import Taro, { Component } from '@tarojs/taro'




export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
  
  }

  state = {
    
  }

 

  componentWillMount() {
    wx.setNavigationBarTitle({
      title: '修改后的导航栏标题',
      success: function(res) {
        // success
      }
    })
  }

  render() {
    return (
      <View>
        222
      </View>
    )
  }
}
