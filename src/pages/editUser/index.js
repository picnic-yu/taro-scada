import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtButton,AtCheckbox,AtMessage     } from 'taro-ui'
import api from '../../service/api'

import './index.less'
class Login extends Component {
    config = {
        navigationBarTitleText:'修改帐号和密码'
    }
    constructor () {
        super(...arguments)
        this.state = {
            password: '',
            userName:'',
            emailAddress:'',
            surname:'',
            phoneNumber:'',
            name:'',
            loading:false,
            isActive:true
           
        }
        this.params = {

        }
        this.checkboxOption = [{
            value: 'list1',
            label: '自动登录',
           
        }]
    }
    componentWillMount(){
        let userId = wx.getStorageSync('userId')
        api.get('api/services/app/User/GetUserForEdit',{Id:userId}).then((res)=>{
            if(res.data.success){
                const password = res.data.result.user.password;
                const userName = res.data.result.user.userName;
               
                this.params = res.data.result.user;
                this.setState({
                    password,
                    userName
                });
            }
        });
        
    }
    handleChange (userName,value) {
        this.setState({
            [userName]:value
        })
    }
    
    onSubmit (event) {
        let {password,userName} = this.state;
        if(!userName){
            Taro.atMessage({
                'message': '用户名不能为空',
                'type': 'warning',
            })
            return
        }
        
        this.setState({
            loading:true
        });
        
        this.params['userName'] = userName;
        this.params['password'] = password;
        api.put('api/services/app/User/UpdateUserAsyncForH5',this.params).then((res)=>{
            if(res.data.success){
                Taro.switchTab({
                    url: `/pages/mine/index`
                })
                // Taro.setStorage({key:'Authorization',data:res.data.result.accessToken}).then(rst => {  //将用户信息存入缓存中
                    
                // })
            }else{
                Taro.atMessage({
                    'message': '保存失败',
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
            <View className='edit_user'>
                <AtMessage />
               
                <AtInput
                    name='name'
                    title='账户'
                    type='text'
                    placeholder='请输入账户'
                    value={this.state.userName}
                    onChange={this.handleChange.bind(this,'userName')}
                    />
                <AtInput
                    name='password'
                    title='新密码'
                    type='password'
                    placeholder='请输入新密码'
                    value={this.state.password}
                    onChange={this.handleChange.bind(this,'password')}
                    />
               
               
                <View className='button-wrap'>
                    <AtButton type='primary' loading={this.state.loading} onClick={this.onSubmit.bind(this)}>确认提交</AtButton>
                </View>
               
            </View>
        )
    }
}

export default Login