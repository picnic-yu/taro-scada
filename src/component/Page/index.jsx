import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import './index.less'

class Page extends Component {

  state = {
    map: ['/pages/index/index', , '/pages/mine/index']
  }

  tabBarHandleClick = current => {
    const url = this.state.map[current]
    Taro.redirectTo({ url });
    // Taro.navigateTo({
    //   url
    // })
  }

  render() {
    const {current} = this.props
    return (
      <View className='page'>
        {this.props.children}
        <AtTabBar
          fixed
          tabList={[
            { title: '首页', iconType: 'home' },
            { title: '我的', iconType: 'user' }
          ]}
          current={current}
          onClick={this.tabBarHandleClick}
        />
      </View>
    )
  }
}

Page.defaultProps = {
  current: 0
}

export default Page