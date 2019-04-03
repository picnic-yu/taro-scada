import Taro, { Component } from '@tarojs/taro'
import './index.less'
import { AtAvatar,AtButton } from 'taro-ui'
export default class Mine extends Component {
    config = {
        navigationBarTitleText: '个人中心',
        
    }
    state = {
        
    }
    loginOut(){

    }
    render () {
        
        return (
            <View  className='mine'>
                <View className='mine-header'>
                    <View className='name'>李四</View>
                </View>
                
                <View className='image-wrap'>
                    <AtAvatar circle className='image' image='https://jdc.jd.com/img/200'></AtAvatar>
                </View>
                <View className='phone'>15506147252</View>
                <View className='main'>
                    
                    <View className='list'>
                        <View className='list-item' style={{
                            borderBottom:  '1px solid #EAEBEF'
                            }}>
                            <Text className='list-label'>公司名称:</Text>
                            <Text className='list-value'>苍南县东方魅力娱乐股份有限公司</Text>
                        </View>
                        <View className='list-item' style={{
                            borderBottom:  '1px solid #EAEBEF' 
                            }}>
                            <Text className='list-label'>服务类型：</Text>
                            <Text className='list-value'>运维+抢修服务</Text>
                        </View>
                        <View className='list-item' style={{
                            borderBottom:  '1px solid #EAEBEF' 
                            }}>
                            <Text className='list-label'>用户等级：</Text>
                            <Text className='list-value'>VIP</Text>
                        </View>
                        <View className='list-item' style={{
                            borderBottom:  '1px solid #EAEBEF' 
                            }}>
                            <Text className='list-label'>单位地址：</Text>
                            <Text className='list-value'>苍南县东方魅力娱乐股份有限公司</Text>
                        </View>
                        <View className='list-item' style={{
                            borderBottom:  '1px solid #EAEBEF' 
                            }}>
                            <Text className='list-label'>电力设备数量(台)：</Text>
                            <Text className='list-value'>3</Text>
                        </View>
                        <View className='list-item' style={{
                            borderBottom:  '1px solid #EAEBEF' 
                            }}>
                            <Text className='list-label'>变压器数量(台)：</Text>
                            <Text className='list-value'>3</Text>
                        </View>
                        <View className='list-item' style={{
                            borderBottom:  '1px solid #EAEBEF' 
                            }}>
                            <Text className='list-label'>高低压柜数量(台)：</Text>
                            <Text className='list-value'>4/10</Text>
                        </View>
                        <View className='list-item' style={{
                            borderBottom:  '1px solid #EAEBEF' 
                            }}>
                            <Text className='list-label'>总装机容量(KVA)：</Text>
                            <Text className='list-value'>1260</Text>
                        </View>
                        
                        <View className='list-item' style={{
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