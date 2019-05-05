import Taro, { Component } from '@tarojs/taro'
import './index.less'
import { AtTag   } from 'taro-ui'
import { Picker } from '@tarojs/components';
import {addDate} from '../../utils/index';
import api from '../../service/api'
import voltageLine from '../../component/chart/voltageLine'
const now = addDate(new Date(),0);
export default class Mine extends Component {
    config = {
        navigationBarTitleText: '相/线电压检测',
        
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
                console.log(res)
                if(res.data.success){
                    let category =  res.data.result;
                    category.forEach((item)=>{
                        item.active = false;
                    })
                    console.log(category,'category');
                    let viltageParam = this.state.viltageParam;
                    if(category.length)  {
                        category[0].active = true;
                        viltageParam.ElectricityMeterInfoId = category[0].id;
                    }
                    this.setState({
                        category,viltageParam
                    });
                    this.getVoltageAnalysis();
                }
            });
        }
    }
    getVoltageAnalysis(){
        let viltageParam = this.state.viltageParam;
        api.get('api/services/app/PowerStatistics/GetVoltageAnalysisForH5Async',viltageParam).then((res)=>{
            if(res.data.success){
                let data =  res.data.result;
                let chartOption = {};
                let xAxis = [];
                chartOption.title = '相电压检测';
                data.creationTime.forEach((item) =>{
                    xAxis.push( item.slice(11,19));
                });
                // if(GetUsePowerTrendDtoForH5AsyncParam.ElectricityBelongType == 1){
                //     data.belongsTo.forEach((item) =>{
                //         belongsTo.push( item.slice(5,10));
                //     });
                // }else if(GetUsePowerTrendDtoForH5AsyncParam.ElectricityBelongType == 0){
                //     
                // }else{
                //     data.belongsTo.forEach((item) =>{
                //         belongsTo.push( item.slice(5,7));
                //     });
                // }
                chartOption.xAxis = xAxis;
                chartOption.legend = ['ab相电压','bc相电压','ca相电压'];
                chartOption.yAxisData1 = data.uabVoltage;
                chartOption.yAxisData2 = data.ubcVoltage;
                chartOption.yAxisData3 = data.ucaVoltage;
                this.addChart.refresh(chartOption);

                let voltageChartOption = {};
                voltageChartOption.title = '线电压检测';
                voltageChartOption.xAxis = xAxis;
                voltageChartOption.legend = ['ab线电压','bc线电压','ca线电压'];
                voltageChartOption.yAxisData1 = data.aPhaseVoltage;
                voltageChartOption.yAxisData2 = data.bPhaseVoltage;
                voltageChartOption.yAxisData3 = data.cPhaseVoltage;
                this.voltagChart.refresh(voltageChartOption);

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
        this.getVoltageAnalysis();
    }
    
    handleCategoryClick(data){
        const { category,viltageParam } = this.state
        const findIndex = category.findIndex(item => item.alias === data.name);
        console.log(findIndex,'find')
        if(category[findIndex].active) return;
        viltageParam.ElectricityMeterInfoId = category[findIndex].id;
        const active = !category[findIndex].active
        category.forEach((item)=>{
            item.active = false;
        })
        category[findIndex].active = active;
        this.setState({ category,viltageParam });
        this.getVoltageAnalysis();
    }
    refAddChart = (node) => this.addChart = node;
    refVoltagChart = (node) => this.voltagChart = node;
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
                    <voltageLine ref={this.refAddChart}/>
                </View>           
                <View className='chart_wrap'>
                    {/* <AddChart ref={this.refAddChart} /> */}
                    <voltageLine ref={this.refVoltagChart}/>
                </View>
            </View>
        )
    }
}