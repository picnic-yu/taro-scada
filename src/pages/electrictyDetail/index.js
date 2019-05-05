import Taro, { Component } from '@tarojs/taro'
import './index.less'
import { AtAvatar,AtButton } from 'taro-ui'
import api from '../../service/api'
export default class Mine extends Component {
    config = {
        navigationBarTitleText: '配电室明细',
        
    }
    state = {
       
    }
    
    componentDidMount(){
        api.get('api/services/app/User/GetUserInfoDtoForH5Async').then((res)=>{
            if(res.data.success){
                
            }
        });
    }
    render () {
        
        return (
            <View  className='detail'>
                
            </View>
        )
    }
}