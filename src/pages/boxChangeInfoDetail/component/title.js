import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './title.less';
export default class Title extends Component {
    render(){
        return(
            <View className='title-wrap'>
                {this.props.titleText}
            </View>
            
        );
    }
}

