import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './card.less';
export default class Card extends Component {
    render(){
        return(
            <View className='card-wrap'>
                <View className='list-card'>
                    <View className='card-item'>
                        <Text className='title'>编号:</Text>
                        <Text className='dec'>{this.props.index}</Text>
                    </View>
                           
                </View>
                <View className='list-card'>
                    <View className='card-item'>
                        <Text className='title'>电力设施名称:</Text>
                        <Text className='dec'>{this.props.item.powerFacilityName}</Text>
                    </View>  
                           
                </View>
                <View className='list-card'>
                    <View className='card-item'>
                        <Text className='title'>采集点:</Text>
                        <Text className='dec'>{this.props.item.collectionPoint}</Text>
                    </View>      
                </View>
                <View className='list-card'>
                    <View className='card-item'>
                        <Text className='title'>故障内容:</Text>
                        <Text className='dec'>{this.props.item.faultContent}</Text>
                    </View>      
                </View>
            </View>
            
        );
    }
}

