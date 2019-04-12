import Taro, { Component } from '@tarojs/taro'
import './index.less'
import { AtTag   } from 'taro-ui'
import { Picker } from '@tarojs/components';
import {addDate} from '../../utils/index';
import api from '../../service/api'
const now = addDate(new Date(),0);
console.log(now,'noewwwwwww')
export default class Mine extends Component {
    config = {
        navigationBarTitleText: '用电分析',
        
    }
    state = {
        dateSel: now,
        category:[
            { alias: '东方魅力1', active: true },
            { alias: '东方魅力2', active: false },
        ]
    }
    componentWillMount(){
        let organizationUnitId = wx.getStorageSync('organizationUnitId');
        if(organizationUnitId){
            api.get('api/services/app/ElectricityMeterInfo/GetCustomerElectricityMeterInfoDropdownList',{organizationUnitId}).then((res)=>{
                console.log(res)
                if(res.data.success){
                    let category =  res.data.result;
                    category.forEach((item)=>{
                        item.active = false;
                    })
                    console.log(category,'category')
                    if(category.length)  category[0].active = true;
                    this.setState({
                        category
                    });
                }
            });
        }
    }
    handleDateChange = e => {
        this.setState({
            dateSel: e.detail.value
        })
    }
    
    handleCategoryClick(data){
        const { category } = this.state
        const findIndex = category.findIndex(item => item.alias === data.name);
        console.log(findIndex,'find')
        if(category[findIndex].active) return;
        const active = !category[findIndex].active
        category.forEach((item)=>{
            item.active = false;
        })
        category[findIndex].active = active;
        this.setState({ category })
    }
    render () {
        
        return (
            <View  className='electricityAnalysis'>
                <View className='page picker__page'>
                        {/* 日期选择器 */}
                    <View className='panel'>
                        {/* <View className='panel__title'>日期选择器</View> */}
                        <View className='panel__content'>
                        <View className='example-item'>
                            <Picker mode='date' value={dateSel} onChange={this.handleDateChange}>
                            <View className='demo-list-item'>
                                <View className='demo-list-item__label'>请选择日期</View>
                                <View className='demo-list-item__value'>{dateSel}</View>
                            </View>
                            </Picker>
                        </View>
                        </View>
                        
                    </View>

                    
                </View>
                
                <View className='tag_wrap'>
                    {this.state.category.map((item, index) => (
                    
                        <AtTag
                        className='tag_item'
                        key={index}
                        type='primary'
                        name={item.alias}
                        active={item.active}
                        
                        onClick={this.handleCategoryClick.bind(this)}
                        >{item.alias}</AtTag>
                    ))}
                </View>
                            
            </View>
        )
    }
}