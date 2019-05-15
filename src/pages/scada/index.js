import Taro, { Component } from '@tarojs/taro'
import './index.less'
import api from '../../service/api'
export default class Mine extends Component {
    config = {
        navigationBarTitleText: 'scada',
        // pageOrientation:'landscape'
        
    }
    state = {
        scadalist:[]
    }
    
    componentDidMount(){
        let organizationUnitId = wx.getStorageSync('organizationUnitId');
        if(organizationUnitId){
            
            api.get('api/services/app/ScadaConfig/GetScadaConfigList',{organizationUnitId}).then((res)=>{
                if(res.data.success){
                    const scadalist = res.data.result;
                    this.setState({
                        scadalist
                    });
                }
            });
        }
    }
    jumpToScadaDetail(item){
        Taro.navigateTo({
            url: `/pages/scadaDetail/index?url=${item.url}&name=${item.name}`
        })
    }
    render () {
        
        return (
            <View className='scada_list'>
                
                {/* <web-view  src='https://ep.wzscr.cn/scada/dongfang.html' className='scada_page'>
                
                </web-view> */}
                {this.state.scadalist.map((item)=>{
                    return (<View className='item' key={item.url} onClick={() => this.jumpToScadaDetail(item)}>
                        {item.name}
                    </View>)
                })}
            </View>
            
        )
    }
}