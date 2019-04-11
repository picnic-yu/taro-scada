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
          "electricityConsumptionStatisticsDtoList": [{
            "electricity": 105.600,
            "belongs": 0
          }, {
            "electricity": 82.800,
            "belongs": 1
          }, {
            "electricity": 62.400,
            "belongs": 2
          }, {
            "electricity": 44.400,
            "belongs": 3
          }, {
            "electricity": 49.200,
            "belongs": 4
          }, {
            "electricity": 57.600,
            "belongs": 5
          }, {
            "electricity": 92.400,
            "belongs": 6
          }, {
            "electricity": 85.200,
            "belongs": 7
          }, {
            "electricity": 85.200,
            "belongs": 8
          }, {
            "electricity": 84.000,
            "belongs": 9
          }, {
            "electricity": 88.800,
            "belongs": 10
          }, {
            "electricity": 91.200,
            "belongs": 11
          }, {
            "electricity": 78.000,
            "belongs": 12
          }, {
            "electricity": 80.400,
            "belongs": 13
          }, {
            "electricity": 73.200,
            "belongs": 14
          }, {
            "electricity": 80.400,
            "belongs": 15
          }, {
            "electricity": 92.400,
            "belongs": 16
          }]
        },
        "month": {
          "totalConsumption": 26743.200,
          "electricityConsumptionStatisticsDtoList": [{
            "electricity": 2634.000,
            "belongs": 1
          }, {
            "electricity": 2852.400,
            "belongs": 2
          }, {
            "electricity": 2983.200,
            "belongs": 3
          }, {
            "electricity": 2332.800,
            "belongs": 4
          }, {
            "electricity": 2167.200,
            "belongs": 5
          }, {
            "electricity": 2491.200,
            "belongs": 6
          }, {
            "electricity": 2557.200,
            "belongs": 7
          }, {
            "electricity": 2271.600,
            "belongs": 8
          }, {
            "electricity": 2766.000,
            "belongs": 9
          }, {
            "electricity": 2354.400,
            "belongs": 10
          }]
        },
        "year": {
          "totalConsumption": 26743.200,
          "electricityConsumptionStatisticsDtoList": []
        }
      }
    }
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentWillMount(){
    this.getOrgInfo();
  }
  componentDidMount() {
    
    const chartData = {
      barData: [709,1917,2455,2610,1719,1433,1544,3285,5208,3372,2484,4078],
      lineData: [1036,3693,2962,3810, 2519,1915,1748, 4675, 6209,4323,2865,4298]
    };
    this.addChart.refresh(chartData);
  }
  getOrgInfo(){
    api.get('api/services/app/OrganizationUnit/GetOrganizationUnits').then((res)=>{
      console.log(res)
      if(res.data.success){
        let result = res.data.result;
        if(result.items && result.items.length){
          this.getChartData(result.items[0].id);
          wx.setNavigationBarTitle({
            title: result.items[0].displayName
          })
        }
      } 
    });
  }
  getChartData(organizationUnitId){
    api.get('api/services/app/PowerStatistics/GetPowerSummaryAsync',{organizationUnitId:'3'}).then((res)=>{
      console.log(res)
      if(res.data.success){
        let chartData =  res.data.result;
        this.setState({
          chartData
        });
      }
    });
  }
  refAddChart = (node) => this.addChart = node
  handleSelect(index){
    let selectIndex = index;
    this.setState({
      selectIndex
    });
    console.log(index);
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
          <AtGrid columnNum = '4' data={
            [
              {
                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                value: '领取中心'
              },
              {
                image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                value: '找折扣'
              },
              {
                image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                value: '领会员'
              },
              {
                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                value: '新品首发'
              },
              {
                image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
                value: '领京豆'
              },
              {
                image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
                value: '手机馆'
              }
            ]
          } />
        </View>
        

      </View>
    );
  }
}
