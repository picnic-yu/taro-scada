import Taro, { Component } from '@tarojs/taro'
import './index.less'
import { AtAvatar,AtButton } from 'taro-ui'
import api from '../../service/api'
import Card from './component/card'
import Title from './component/title'
import LowCard from './component/lowCard'
export default class Mine extends Component {
    config = {
        navigationBarTitleText: '箱变信息明细',
        
    }
    state = {
        highVoltageList:[],
        lowVoltageList:[],
        transformerInformations:[]
    }
    
    componentDidMount(){
        let BoxTransformerOrPowerDistributionRoomId = this.$router.params.id;
        // 高压设备分页
        api.get('api/services/app/HighVoltageInformation/GetPaged',{MaxResultCount:50,SkipCount:0,BoxTransformerOrPowerDistributionRoomId,BelongType:2}).then((res)=>{
            if(res.data.success){
                let highVoltageList  = res.data.result.items;
                this.setState({
                    highVoltageList
                });
            }
        });
        // 低压设备分页
        api.get('api/services/app/LowVoltageInformation/GetPaged',{MaxResultCount:50,SkipCount:0,BoxTransformerOrPowerDistributionRoomId,BelongType:2}).then((res)=>{
            if(res.data.success){
                let lowVoltageList  = res.data.result.items;
                this.setState({
                    lowVoltageList
                });
            }
        });
        api.get('api/services/app/TransformerInformation/GetPaged',{MaxResultCount:50,SkipCount:0,BoxTransformerOrPowerDistributionRoomId,BelongType:2}).then((res)=>{
            if(res.data.success){
                let transformerInformations  = res.data.result.items;
                this.setState({
                    transformerInformations
                });
            }
        });
    }
    render () {
        
        return (
            <View  className='detail'>
                <Title titleText='高压设备信息' ></Title>

                {this.state.highVoltageList.map((item)=>{
                    return (<View className='list-item-wrap' key={item.id} >
                        <Card item={item}></Card>
                    </View>)
                })}
                <Title titleText='低压设备信息' ></Title>

                    {this.state.lowVoltageList.map((item)=>{
                        return (<View className='list-item-wrap' key={item.id} >
                            <LowCard item={item}></LowCard>
                        </View>)
                    })}
                <Title titleText='变压设备信息' ></Title>

                    {this.state.transformerInformations.map((item)=>{
                        return (<View className='list-item-wrap' key={item.id} >
                            <Card item={item} volume='true'></Card>
                        </View>)
                    })}
            </View>
        )
    }
}