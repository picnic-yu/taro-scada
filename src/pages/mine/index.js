import Taro, { Component } from '@tarojs/taro'
import './index.less'
import { AtAvatar,AtButton } from 'taro-ui'
import api from '../../service/api'
export default class Mine extends Component {
    config = {
        navigationBarTitleText: '个人中心',
        
    }
    state = {
        userInfo:{
            "userName": "dongfangadmin",
            "phoneNunber": "13958744444",
            "companyName": "苍南县东方魅力娱乐股份有限公司",
            "serviceType": "运维+抢修服务",
            "userLevel": "VIP",
            "address": "苍南县新城综合农贸市场二楼",
            "powerEquipmentNums": 1,
            "transformerNums": 0,
            "highVoltageCabinetNums": 4,
            "lowVoltageCabinetNums": 10,
            "totalCapacity": 800.000
        }
    }
    loginOut(){
        Taro.setStorage({key:'Authorization',data:''}).then(rst => {  //将用户信息存入缓存中
            Taro.redirectTo({
                url: `/pages/login/index`
            })
        })
        
    }
    setUser(){
        Taro.navigateTo({
            url: `/pages/editUser/index`
        })
    }
    componentDidMount(){
        api.get('api/services/app/User/GetUserInfoDtoForH5Async').then((res)=>{
            if(res.data.success){
                const userInfo = res.data.result;
                this.setState({
                    userInfo
                })
            }
        });
        
    }
    render () {
        const userInfo = this.state.userInfo;
        return (
            <View  className='mine'>
                <View className='mine-header'>
                    <View className='name'>{userInfo.userName}</View>
                </View>
                
                <View className='image-wrap'>
                    <AtAvatar circle className='image' image='https://jdc.jd.com/img/200'></AtAvatar>
                </View>
                <View className='phone'>{userInfo.phoneNunber}</View>
                <View className='main'>
                    
                    <View className='list'>
                        <View className='list-item' style={{
                            borderBottom:  '1px solid #EAEBEF'
                            }}>
                            <Text className='list-label'>公司名称:</Text>
                            <Text className='list-value'>{userInfo.companyName}</Text>
                        </View>
                        <View className='list-item' style={{
                            borderBottom:  '1px solid #EAEBEF' 
                            }}>
                            <Text className='list-label'>服务类型：</Text>
                            <Text className='list-value'>{userInfo.companyName}</Text>
                        </View>
                        <View className='list-item' style={{
                            borderBottom:  '1px solid #EAEBEF' 
                            }}>
                            <Text className='list-label'>用户等级：</Text>
                            <Text className='list-value'>{userInfo.userLevel}</Text>
                        </View>
                        <View className='list-item' style={{
                            borderBottom:  '1px solid #EAEBEF' 
                            }}>
                            <Text className='list-label'>单位地址：</Text>
                            <Text className='list-value'>{userInfo.address}</Text>
                        </View>
                        <View className='list-item' style={{
                            borderBottom:  '1px solid #EAEBEF' 
                            }}>
                            <Text className='list-label'>电力设备数量(台)：</Text>
                            <Text className='list-value'>{userInfo.powerEquipmentNums}</Text>
                        </View>
                        <View className='list-item' style={{
                            borderBottom:  '1px solid #EAEBEF' 
                            }}>
                            <Text className='list-label'>变压器数量(台)：</Text>
                            <Text className='list-value'>{userInfo.transformerNums}</Text>
                        </View>
                        <View className='list-item' style={{
                            borderBottom:  '1px solid #EAEBEF' 
                            }}>
                            <Text className='list-label'>高低压柜数量(台)：</Text>
                            <Text className='list-value'>{`${userInfo.highVoltageCabinetNums}/${userInfo.lowVoltageCabinetNums}`}</Text>
                        </View>
                        <View className='list-item' style={{
                            borderBottom:  '1px solid #EAEBEF' 
                            }}>
                            <Text className='list-label'>总装机容量(KVA)：</Text>
                            <Text className='list-value'>{userInfo.totalCapacity}</Text>
                        </View>
                        
                        <View className='list-item' onClick={this.setUser.bind(this)} style={{
                            borderBottom:  '1px solid #EAEBEF' 
                            }}>
                            <Text className='list-label'>设置</Text>
                            {/* <Text className='list-value'>1260</Text> */}
                        </View>
                        <View className='list-item' style={{
                            borderBottom:  '1px solid #EAEBEF' 
                            }}>
                            <Text className='list-label'>软件版本及更新说明</Text>
                            {/* <Text className='list-value'>1260</Text> */}
                        </View>
                        <View className='list-item' style={{
                            borderBottom:  '1px solid #EAEBEF' 
                            }}>
                            <Text className='list-label'>关于我们</Text>
                            {/* <Text className='list-value'>1260</Text> */}
                        </View>
                    </View>
                </View>
                <View className='button-wrap'>
                    <AtButton type='primary'  onClick={this.loginOut.bind(this)}>退出登录</AtButton>
                </View>
            </View>
        )
    }
}