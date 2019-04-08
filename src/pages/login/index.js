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
            checkedList:[],
            rememberClient:false,
            loading:false,
           
        }
        this.checkboxOption = [{
            value: 'list1',
            label: '自动登录',
           
        }]
    }
    componentWillMount(){
        Taro.getStorage({key:'Authorization'}).then(rst => {   //从缓存中获取用户信息
            // this.props.setBasicInfo(rst.data)
            console.log('token',rst)
            Taro.switchTab({
                url: `/pages/index/index`
            })
        })
    }
    handleChange (userNameOrEmailAddress,value) {
        this.setState({
            [userNameOrEmailAddress]:value
        })
    }
    handleCheckBoxChange (value) {
        this.setState({
          checkedList: value
        })
        let rememberClient = '';
        value.length ? rememberClient = true : rememberClient = false;
        this.setState({
            rememberClient
        })
        console.log(value,'val')
      }
    onSubmit (event) {
        console.log(event)
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
            console.log(res)
            if(res.data.success){
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
                <View className='login-icon_wrap'>11</View>
               
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
                    type='text'
                    placeholder='请输入密码'
                    value={this.state.password}
                    onChange={this.handleChange.bind(this,'password')}
                    />
                <AtCheckbox
                    options={this.checkboxOption}
                    selectedList={this.state.checkedList}
                    onChange={this.handleCheckBoxChange.bind(this)}
                />
               
                <View className='button-wrap'>
                    <AtButton type='primary' loading={this.state.loading} onClick={this.onSubmit.bind(this)}>登录</AtButton>
                </View>
               
            </View>
        )
    }
}

export default Login