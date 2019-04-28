import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './card.less';
export default class Card extends Component {
    render(){
        return(
            <View className='card-wrap'>
                <View className='list-card'>
                    <View className='card-item'>
                        <Text className='title'>配电室名称:</Text>
                        <Text className='dec'>{this.props.item.distributionRoomName}</Text>
                    </View>
                           
                </View>
                <View className='list-card'>
                    <View className='card-item'>
                        <Text className='title'>配电室编号:</Text>
                        <Text className='dec'>{this.props.item.distributionRoomNumber}</Text>
                    </View>  
                           
                </View>
                <View className='list-card'>
                    <View className='card-item'>
                        <Text className='title'>表计户号:</Text>
                        <Text className='dec'>{this.props.item.meterNumber}</Text>
                    </View>      
                </View>
            </View>
            
        );
    }
}

