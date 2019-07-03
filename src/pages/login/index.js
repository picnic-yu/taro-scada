import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtButton,AtCheckbox,AtMessage     } from 'taro-ui'
import api from '../../service/api'

import './index.less'
class Login extends Component {
    config = {
        navigationBarTitleText:'用户登录'
    }
    constructor () {
        super(...arguments)
        this.state = {
            password: '',
            userNameOrEmailAddress:'',
            loading:false,
           
        }
        this.checkboxOption = [{
            value: 'list1',
            label: '自动登录',
           
        }]
    }
    componentWillMount(){
        console.log(222)
        let token = wx.getStorageSync('Authorization');
        if(token){
            Taro.switchTab({
                url: `/pages/index/index`
            })
        }
        
    }
    handleChange (userNameOrEmailAddress,value) {
        this.setState({
            [userNameOrEmailAddress]:value
        })
    }
    
    onSubmit (event) {
        let {userNameOrEmailAddress,password,rememberClient} = this.state;
        if(!userNameOrEmailAddress || !password){
            Taro.atMessage({
                'message': '用户名或密码不能为空',
                'type': 'warning',
            })
            return
        }
        
        this.setState({
            loading:true
        });
        
        api.post('api/TokenAuth/Authenticate',{userNameOrEmailAddress,password,rememberClient}).then((res)=>{
            if(res.data.success){
                Taro.setStorage({key:'userId',data:res.data.result.userId}).then(rst => {  //将用户信息存入缓存中
                   
                })
                Taro.setStorage({key:'Authorization',data:res.data.result.accessToken}).then(rst => {  //将用户信息存入缓存中
                    Taro.switchTab({
                        url: `/pages/index/index`
                    })
                })
            }else{
                Taro.atMessage({
                    'message': '登录失败',
                    'type': 'error',
                })
            }
            this.setState({
                loading:false
            });
        });
        
    }
  
    render () {
        return (
            <View className='login'>
                <AtMessage />
                <View className='login-icon_wrap'></View>
               
                <AtInput
                    name='name'
                    title='账户'
                    type='text'
                    placeholder='请输入账户'
                    value={this.state.userNameOrEmailAddress}
                    onChange={this.handleChange.bind(this,'userNameOrEmailAddress')}
                    />
                <AtInput
                    name='password'
                    title='密码'
                    type='password'
                    placeholder='请输入密码'
                    value={this.state.password}
                    onChange={this.handleChange.bind(this,'password')}
                    />
               
               
                <View className='button-wrap'>
                    <AtButton type='primary' loading={this.state.loading} onClick={this.onSubmit.bind(this)}>登录</AtButton>
                </View>
               
            </View>
        )
    }
}

export default Login