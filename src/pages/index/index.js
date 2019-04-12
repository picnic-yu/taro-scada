import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.less";
import LineChart from '../../component/chart/line'
import { AtGrid } from "taro-ui"
import api from '../../service/api'
import { resolve } from "dns";
export default class Add extends Component {
  config = {
    navigationBarTitleText: "多图表结合示例"
  };
  constructor(props){
    super(props);
    this.state = {
      selectIndex:1,
      chartData: {
        "day": {
          "totalConsumption": 1333.200,
          "belongs": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
          "electricity": [105.600, 82.800, 62.400, 44.400, 49.200, 57.600, 92.400, 85.200, 85.200, 84.000, 88.800, 91.200, 78.000, 80.400, 73.200, 80.400, 92.400]
        },
        "month": {
          "totalConsumption": 26743.200,
          "belongs": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          "electricity": [2634.000, 2852.400, 2983.200, 2332.800, 2167.200, 2491.200, 2557.200, 2271.600, 2766.000, 2354.400]
        },
        "year": {
          "totalConsumption": 26743.200,
          "belongs": [],
          "electricity": []
        }
      },
      chartOption:{
        title:'日用电检测',
        xAxis:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        yAxisData:[105.600, 82.800, 62.400, 44.400, 49.200, 57.600, 92.400, 85.200, 85.200, 84.000, 88.800, 91.200, 78.000, 80.400, 73.200, 80.400, 92.400]

      }
    }
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentWillMount(){
    this.getOrgInfo();
  }
  componentDidMount() {
    
  }
  getOrgInfo(){
    api.get('api/services/app/OrganizationUnit/GetOrganizationUnits').then((res)=>{
      console.log(res)
      if(res.data.success){
        let result = res.data.result;
        if(result.items && result.items.length){
          this.getChartData(result.items[0].id);
          Taro.setStorage({key:'organizationUnitId',data:result.items[0].id}).then(rst => {  //将用户信息存入缓存中
            
          })
          wx.setNavigationBarTitle({
            title: result.items[0].displayName
          })
        }
      } 
    });
  }
  getChartData(organizationUnitId){
    api.get('api/services/app/PowerStatistics/GetPowerSummaryForH5Async',{organizationUnitId}).then((res)=>{
      console.log(res)
      if(res.data.success){
        let chartData =  res.data.result;
        this.setState({
          chartData
        });
        this.handleSelect(1);
      }
    });
  }
  refAddChart = (node) => this.addChart = node
  handleSelect(index){
    let selectIndex = index;
    var chartOption =  this.state.chartOption;
    if(index == 0){
      // year
      chartOption.title = '年用电检测';
      chartOption.xAxis = this.state.chartData['year'].belongs;
      chartOption.yAxisData = this.state.chartData['year'].electricity;
      this.addChart.refresh(chartOption);
    }else if(index == 1){
      chartOption.title = '日用电检测';
      chartOption.xAxis = this.state.chartData['day'].belongs;
      chartOption.yAxisData = this.state.chartData['day'].electricity;
      this.addChart.refresh(chartOption);
    }else{
      chartOption.title = '月用电检测';
      chartOption.xAxis = this.state.chartData['month'].belongs;
      chartOption.yAxisData = this.state.chartData['month'].electricity;
      this.addChart.refresh(chartOption);
    }
    this.setState({
      selectIndex
    });
    console.log(index);
  }
  
  handleClickGird = (value, index) => {
    console.log(value, index)
    // 跳转到目的页面，打开新页面
    Taro.navigateTo({
      url: value.url
    })
  }
  render() {
    return (
      <View className="worldCloud-chart">
        <View className='circle_wrap'>
          <View className = {this.state.selectIndex == 0 ? 'big_circle' : 'small_circle'} onClick={() => this.handleSelect(0)}>
            <View className='small_text'>本年用电量</View>
            <View className='small_text'>{this.state.chartData.year.totalConsumption}</View>
            <View className='small_text'>kwh</View>
            
          </View>
          <View className = { this.state.selectIndex == 1 ? 'big_circle' : 'small_circle'} onClick={() => this.handleSelect(1)}>
            <View className='small_text'>本日用电量</View>
            <View className='small_text'>{this.state.chartData.day.totalConsumption}</View>
            <View className='small_text'>kwh</View>
            
          </View>
          
          <View className = {this.state.selectIndex == 2 ? 'big_circle' : 'small_circle'} onClick={ () => this.handleSelect(2)}>
            <View className='small_text'>本月用电量</View>
            <View className='small_text'>{this.state.chartData.month.totalConsumption}</View>
            <View className='small_text'>kwh</View>
          </View>
        </View>
        <View className='chart_wrap'>
          {/* <AddChart ref={this.refAddChart} /> */}
          <LineChart ref={this.refAddChart}/>
        </View>
        <View className='navigator_wrap'>
          <AtGrid columnNum = '3' onClick={this.handleClickGird} data={
            [
              {
                // image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                value: 'SCADE',
                url:'/pages/electricityAnalysis/index'
              },
              {
                // image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                value: '用电概括',
                url:'/pages/electricityAnalysis/index'
              },
              {
                // image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                value: '用电分析',
                url:'/pages/electricityAnalysis/index'
              },
              {
                // image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                value: '相/线电压检测',
                url:'/pages/voltage/index'
              },
              {
                // image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
                value: '功率因素检测',
                url:'/pages/electricityAnalysis/index'
              },
              {
                // image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
                value: '电流检测',
                url:'/pages/electricityAnalysis/index'
              },
              {
                // image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
                value: '能耗分析',
                url:'/pages/electricityAnalysis/index'
              },
              {
                // image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
                value: '故障信息',
                url:'/pages/electricityAnalysis/index'
              },
            ]
          } />
        </View>
        

      </View>
    );
  }
}
