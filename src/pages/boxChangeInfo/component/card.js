import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './card.less';
export default class Card extends Component {
    render(){
        return(
            <View className='card-wrap'>
                <View className='list-card'>
                    <View className='card-item'>
                        <Text className='title'>箱变编号:</Text>
                        <Text className='dec'>{this.props.item.boxTransformerNumber}</Text>
                    </View>
                           
                </View>
                <View className='list-card'>
                    <View className='card-item'>
                        <Text className='title'>箱变型号:</Text>
                        <Text className='dec'>{this.props.item.boxTransformerType}</Text>
                    </View>  
                           
                </View>
                <View className='list-card'>
                    <View className='card-item'>
                        <Text className='title'>箱变厂家:</Text>
                        <Text className='dec'>{this.props.item.boxTransformerManufacturer}</Text>
                    </View>      
                </View>
                <View className='list-card'>
                    <View className='card-item'>
                        <Text className='title'>箱变容量:</Text>
                        <Text className='dec'>{this.props.item.boxTransformerCapacity}</Text>
                    </View>      
                </View>
            </View>
            
        );
    }
}

