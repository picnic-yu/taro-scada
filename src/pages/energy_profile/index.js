import Taro, { Component } from '@tarojs/taro'
import './index.less'
import { AtTag   } from 'taro-ui'
import { Picker } from '@tarojs/components';
import {addDate} from '../../utils/index';
import api from '../../service/api'
import energyLine from '../../component/chart/energyLine'
const now = addDate(new Date(),0);
export default class Mine extends Component {
    config = {
        navigationBarTitleText: '配变日用电趋势',
        
    }
    state = {
        dateSel: now,
        category:[
            { alias: '东方魅力1', active: true },
            { alias: '东方魅力2', active: false },
        ],
        viltageParam:{
            ElectricityMeterInfoId:'',
            StartDate:`${now} 00:00:00`,
            EndData:`${now} 23:59:59`,
        }
    }
    componentDidMount(){
        let organizationUnitId = wx.getStorageSync('organizationUnitId');
        if(organizationUnitId){
            
            api.get('api/services/app/ElectricityMeterInfo/GetCustomerElectricityMeterInfoDropdownList',{organizationUnitId}).then((res)=>{
                if(res.data.success){
                    let category =  res.data.result;
                    category.forEach((item)=>{
                        item.active = false;
                    })
                    let viltageParam = this.state.viltageParam;
                    if(category.length)  {
                        category[0].active = true;
                        viltageParam.ElectricityMeterInfoId = category[0].id;
                    }
                    this.setState({
                        category,viltageParam
                    });
                    this.getUsePowerTrendDtoForH5Async();
                }
            });
        }
    }
    getUsePowerTrendDtoForH5Async(){
        let viltageParam = this.state.viltageParam;
        api.get('api/services/app/PowerStatistics/GetUsePowerTrendDtoForH5Async',viltageParam).then((res)=>{
            if(res.data.success){
                let data =  res.data.result;
                let chartOption = {};
                let xAxis = [];
                // chartOption.title = '相电压检测';
                data.belongsTo.forEach((item) =>{
                    xAxis.push( item.slice(11,13));
                });
                chartOption.xAxis = xAxis;
                chartOption.yAxisData1 = data.tendency;
                this.addChart.refresh(chartOption);


            }
        });
    }
    handleDateChange = e => {
        let viltageParam = this.state.viltageParam;
        viltageParam.StartDate = `${ e.detail.value} 00:00:00`;
        viltageParam.EndData = `${e.detail.value} 23:59:59`;
        this.setState({
            dateSel: e.detail.value,
            viltageParam
        });
        this.getUsePowerTrendDtoForH5Async();
    }
    
    handleCategoryClick(data){
        const { category,viltageParam } = this.state
        const findIndex = category.findIndex(item => item.alias === data.name);
        if(category[findIndex].active) return;
        viltageParam.ElectricityMeterInfoId = category[findIndex].id;
        const active = !category[findIndex].active
        category.forEach((item)=>{
            item.active = false;
        })
        category[findIndex].active = active;
        this.setState({ category,viltageParam });
        this.getUsePowerTrendDtoForH5Async();
    }
    refAddChart = (node) => this.addChart = node;
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
                <View className='chart_wrap'>
                    {/* <AddChart ref={this.refAddChart} /> */}
                    <energyLine ref={this.refAddChart}/>
                </View>           
                
            </View>
        )
    }
}