import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtButton,AtCheckbox   } from 'taro-ui'


import './index.less'
class Login extends Component {
    config = {
        navigationBarTitleText:'用户登录'
    }
    constructor () {
        super(...arguments)
        this.state = {
            password: '',
            name:'',
            checkedList:[]
        }
        this.checkboxOption = [{
            value: 'list1',
            label: '自动登录',
           
        }]
    }
    handleChange (name,value) {
        console.log(name,'name')
        console.log(value)
        this.setState({
            [name]:value
        })
    }
    handleCheckBoxChange (value) {
        this.setState({
          checkedList: value
        })
      }
    onSubmit (event) {
        console.log(event)
        Taro.switchTab({
            url: `/pages/index/index`
        })
    }
   
    render () {
        return (
            <View className='login'>
                <View className='login-icon_wrap'>11</View>
               
                <AtInput
                    name='name'
                    title='账户'
                    type='text'
                    placeholder='请输入账户'
                    value={this.state.name}
                    onChange={this.handleChange.bind(this,'name')}
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
                    <AtButton type='primary'  onClick={this.onSubmit.bind(this)}>登录</AtButton>
                </View>
            </View>
        )
    }
}

export default Login