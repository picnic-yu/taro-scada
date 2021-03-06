import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './card.less';
export default class Card extends Component {
    render(){
        return(
            <View className='card-wrap'>
                <View className='list-card'>
                    <View className='card-item'>
                        <Text className='title'>设备名称:</Text>
                        <Text className='dec'>{this.props.item.deviceName}</Text>
                    </View>
                           
                </View>
                
                
                <View className='list-card'>
                    <View className='card-item'>
                        <Text className='title'>产品型号:</Text>
                        <Text className='dec'>{this.props.item.productType}</Text>
                    </View>      
                </View>
                <View className='list-card'>
                    <View className='card-item'>
                        <Text className='title'>生产厂商:</Text>
                        <Text className='dec'>{this.props.item.manufacturer}</Text>
                    </View>  
                           
                </View>
            </View>
            
        );
    }
}

