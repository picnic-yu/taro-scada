import Taro, { Component } from '@tarojs/taro'
import './index.less'
import api from '../../service/api'
export default class Mine extends Component {
    config = {
        navigationBarTitleText: 'scada',
        pageOrientation:'landscape'
        
    }
    state = {
        
    }
    
    componentDidMount(){
        let organizationUnitId = wx.getStorageSync('organizationUnitId');
        if(organizationUnitId){
            
            api.get('api/services/app/PowerStatistics/GetHistoryDataDtoListAsync',{organizationUnitId}).then((res)=>{
                console.log(res)
                if(res.data.success){
                    
                }
            });
        }
    }
    render () {
        
        return (
            <View  className='scada_page'>
                22222
            </View>
        )
    }
}