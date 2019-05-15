import Taro, { Component } from '@tarojs/taro'
import './index.less'
import { AtTag   } from 'taro-ui'
import { Picker } from '@tarojs/components';
import {addDate} from '../../utils/index';
import api from '../../service/api'
import ElectricityBar from '../../component/chart/electricityAnalysisBar'
const now = addDate(new Date(),0);
export default class Electricity extends Component {
    config = {
        navigationBarTitleText: '用电分析',
        
    }
    state = {
        dateSel: now,
        solidTagList: [
            { name: '过去48小时', active: false ,type:0},
            { name: '过去31天', active: true,type:1 },
            { name: '过去12月', active: false, type:2 },
        ],
        category:[
            { alias: '东方魅力1', active: true },
            { alias: '东方魅力2', active: false },
        ],
        GetUsePowerTrendDtoForH5AsyncParam:{
            ElectricityMeterInfoId:'',
            ElectricityBelongType:1
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
                    let GetUsePowerTrendDtoForH5AsyncParam = this.state.GetUsePowerTrendDtoForH5AsyncParam;
                    if(category.length)  {
                        category[0].active = true;
                        GetUsePowerTrendDtoForH5AsyncParam.ElectricityMeterInfoId = category[0].id;

                    }
                    this.setState({
                        category,
                        GetUsePowerTrendDtoForH5AsyncParam
                    });
                    this.getUsePowerTrendDto();
                }
            });
        }
    }
    getUsePowerTrendDto(){
        const GetUsePowerTrendDtoForH5AsyncParam = this.state.GetUsePowerTrendDtoForH5AsyncParam;
        api.get('api/services/app/PowerStatistics/GetUsePowerTrendDtoForH5Async',GetUsePowerTrendDtoForH5AsyncParam).then((res)=>{
            if(res.data.success){
                let data =  res.data.result;
                const chartOption = {};
                let belongsTo = [];
                chartOption.title = '用电统计';
                if(GetUsePowerTrendDtoForH5AsyncParam.ElectricityBelongType == 1){
                    data.belongsTo.forEach((item) =>{
                        belongsTo.push( item.slice(5,10));
                    });
                }else if(GetUsePowerTrendDtoForH5AsyncParam.ElectricityBelongType == 0){
                    data.belongsTo.forEach((item) =>{
                        belongsTo.push( item.slice(11,16));
                    });
                }else{
                    data.belongsTo.forEach((item) =>{
                        belongsTo.push( item.slice(5,7));
                    });
                }
                chartOption.xAxis = belongsTo;
                chartOption.yAxisData = data.tendency;
                this.addChart.refresh(chartOption);
            }
        });
    }
    handleDateChange = e => {
        
        this.setState({
            dateSel: e.detail.value
        })
    }
    refAddChart = (node) => this.addChart = node;
    handleSolidClick (data) {
        const { solidTagList,GetUsePowerTrendDtoForH5AsyncParam } = this.state
        const findIndex = solidTagList.findIndex(item => item.name === data.name);
        if(solidTagList[findIndex].active) return;
        const active = !solidTagList[findIndex].active
        solidTagList.forEach((item)=>{
            item.active = false;
        })
        solidTagList[findIndex].active = active;
        GetUsePowerTrendDtoForH5AsyncParam.ElectricityBelongType = solidTagList[findIndex].type;
        this.setState({ solidTagList,GetUsePowerTrendDtoForH5AsyncParam });
        this.getUsePowerTrendDto();
    }
    handleCategoryClick(data){
        const { category,GetUsePowerTrendDtoForH5AsyncParam } = this.state;
        const findIndex = category.findIndex(item => item.alias === data.name);
        if(category[findIndex].active) return;
        
        const active = !category[findIndex].active
        category.forEach((item)=>{
            item.active = false;
        })
        category[findIndex].active = active;

        GetUsePowerTrendDtoForH5AsyncParam.ElectricityMeterInfoId = category[findIndex].id;
        this.setState({
            category,
            GetUsePowerTrendDtoForH5AsyncParam
        });
        this.getUsePowerTrendDto();
    }
    render () {
        
        return (
            <View  className='electricityAnalysis'>
                {/* <View className='page picker__page'>
                    <View className='panel'>
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

                    
                </View> */}
                <View className='tag_wrap'>
                    {/* <Text className='title'>时间范围</Text> */}
                    {this.state.solidTagList.map((item, index) => (
                    
                        <AtTag
                        className='tag_item'
                        key={index}
                        type='primary'
                        name={item.name}
                        active={item.active}
                        
                        onClick={this.handleSolidClick.bind(this)}
                        >{item.name}</AtTag>
                    ))}
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
                    <ElectricityBar ref={this.refAddChart}/>
                </View>            
            </View>
        )
    }
}