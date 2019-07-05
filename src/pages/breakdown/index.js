// 配电室
import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView,Picker } from '@tarojs/components'
import { AtActivityIndicator,AtTag } from 'taro-ui'
import Card from './component/card'
import api from '../../service/api'
import {addDate} from '../../utils/index';
import './index.less';
const now = addDate(new Date(),0);
var totalCount = 0,
    MaxResultCount=10,
    SkipCount=0;
export default class Mine extends Component {
    config = {
        navigationBarTitleText: '故障信息',
    }
    constructor(props) {
        super(props)
        this.state = {
            dargStyle: {//下拉框的样式
                top: 0 + 'px'
            },
            downDragStyle: {//下拉图标的样式
                height: 0 + 'px'
            },
            downText: '下拉刷新',
            upDragStyle: {//上拉图标样式
                height: 0 + 'px'
            },
            pullText: '上拉加载更多',
            start_p: {},
            scrollY:true,
            listData:[],
            dargState: 0,//刷新状态 0不做操作 1刷新 -1加载更多

            dateSel: now,
            endDate:now,//结束日期
            category:[
                { alias: '东方魅力1', active: true },
                { alias: '东方魅力2', active: false },
            ],
            dealType:[
                { alias: '已处理', active: true,IsDoWithType:1 },
                { alias: '未处理', active: false, IsDoWithType:0 },
            ],
            viltageParam:{
                ElectricityMeterInfoId:2,
                StartDate:`${now}`,
                EndData:`${now}`,
                IsDoWithType:1
            }
        }
    }
    // 跳转到详情页面
    jumpToDetail(item){
        Taro.navigateTo({
            url: `/pages/boxChangeInfoDetail/index?id=${item.id}`
        })
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
        SkipCount = 0;
        this.getListData();
    }
    handleDealtypeClick(data){
        const { dealType,viltageParam } = this.state
        const findIndex = dealType.findIndex(item => item.alias === data.name);
        if(dealType[findIndex].active) return;
        viltageParam.IsDoWithType = dealType[findIndex].IsDoWithType;
        const active = !dealType[findIndex].active
        dealType.forEach((item)=>{
            item.active = false;
        })
        dealType[findIndex].active = active;
        this.setState({ dealType,viltageParam });
        SkipCount = 0;
        this.getListData();
    }
    handleDateChange = e => {
        let viltageParam = this.state.viltageParam;
        viltageParam.StartDate = `${ e.detail.value}`;
        this.setState({
            dateSel: e.detail.value,
            viltageParam
        });
        if(!viltageParam.EndData) return;
        SkipCount = 0;
        this.getListData();
    }
    handleEndDateChange = e =>{
        let viltageParam = this.state.viltageParam;
        viltageParam.EndData = `${e.detail.value}`;
        this.setState({
            endDate: e.detail.value,
            viltageParam
        });
        if(!viltageParam.StartDate) return;
        SkipCount = 0;
        this.getListData();
    }
    reduction() {//还原初始设置
        const time = 0.5;
        this.setState({
            upDragStyle: {//上拉图标样式
                height: 0 + 'px',
                transition: `all ${time}s`
            },
            dargState: 0,
            dargStyle: {
                top: 0 + 'px',
                transition: `all ${time}s`
            },
            downDragStyle: {
                height: 0 + 'px',
                transition: `all ${time}s`
            },
            scrollY:true
        })
        setTimeout(() => {
            this.setState({
                dargStyle: {
                    top: 0 + 'px',
                },
                upDragStyle: {//上拉图标样式
                    height: 0 + 'px'
                },
                pullText: '上拉加载更多',
                downText: '下拉刷新'
            })
        }, time * 1000);
    }
    touchStart(e) {
        this.setState({
            start_p: e.touches[0]
        })
    }
    touchmove(e) {
		let that = this
        let move_p = e.touches[0],//移动时的位置
            deviationX = 0.30,//左右偏移量(超过这个偏移量不执行下拉操作)
            deviationY = 70,//拉动长度（低于这个值的时候不执行）
            maxY = 100;//拉动的最大高度

        let start_x = this.state.start_p.clientX,
            start_y = this.state.start_p.clientY,
            move_x = move_p.clientX,
            move_y = move_p.clientY;


        //得到偏移数值
        let dev = Math.abs(move_x - start_x) / Math.abs(move_y - start_y);
        if (dev < deviationX) {//当偏移数值大于设置的偏移数值时则不执行操作
            let pY = Math.abs(move_y - start_y) / 3.5;//拖动倍率（使拖动的时候有粘滞的感觉--试了很多次 这个倍率刚好）
			if (move_y - start_y > 0) {//下拉操作
				if (pY >= deviationY) {
					this.setState({ dargState: 1, downText: '释放刷新' })
				} else {
					this.setState({ dargState: 0, downText: '下拉刷新' })
				}
				if (pY >= maxY) {
					pY = maxY
				}
				this.setState({
					dargStyle: {
						top: pY + 'px',
					},
					downDragStyle: {
						height: pY + 'px'
					},
					scrollY:false//拖动的时候禁用
				})
			}
			if (start_y - move_y > 0) {//上拉操作
				console.log('上拉操作')
				if (pY >= deviationY) {
					this.setState({ dargState: -1, pullText: '释放加载更多' })
				} else {
					this.setState({ dargState: 0, pullText: '上拉加载更多' })
				}
				if (pY >= maxY) {
					pY = maxY
				}
				this.setState({
					dargStyle: {
						top: -pY + 'px',
					},
					upDragStyle: {
						height: pY + 'px'
					},
					scrollY: false//拖动的时候禁用
				})
			}

        }
    }
    pull() {//上拉
        console.log('上拉')
        if(this.state.listData.length < totalCount ){
            SkipCount = SkipCount+1;
            this.getListData();
        }
        
    }
    down() {//下拉
        console.log('下拉')
        SkipCount = 0;
        this.getListData();
    }
    ScrollToUpper() { //滚动到顶部事件
	    console.log('滚动到顶部事件')
        // this.props.Upper()
    }
    ScrollToLower() { //滚动到底部事件
	    console.log('滚动到底部事件')
        // this.props.Lower()
    }
    touchEnd(e) {
        if (this.state.dargState === 1) {
            this.down()
        } else if (this.state.dargState === -1) {
            this.pull()
        }
        this.reduction()
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
                    this.getListData();
                }
            });
        }
    }
    getListData(){
        let viltageParam = this.state.viltageParam;
        Object.assign(viltageParam,{MaxResultCount,SkipCount});
        api.get('api/services/app/PowerStatistics/GetFaultInformationAsyncForH5',viltageParam).then((res)=>{
            if(res.data.success){
                let listData  = [];
                if(SkipCount){
                    listData = this.state.listData.concat(res.data.result.items);
                    totalCount = res.data.result.totalCount
                    return this.setState({
                        listData
                    });
                }
                listData = res.data.result.items;
                totalCount = res.data.result.totalCount
                this.setState({
                    listData
                });
                
            }
        });
    }
    render () {
		let dargStyle = this.state.dargStyle;
        let downDragStyle = this.state.downDragStyle;
        let upDragStyle = this.state.upDragStyle;
        return (
            <View>

            
                <View  >
                    <View className='page picker__page'>
                            {/* 日期选择器 */}
                        <View className='panel'>
                            {/* <View className='panel__title'>日期选择器</View> */}
                            <View className='panel__content'>
                            <View className='example-item'>
                                <Picker mode='date' value={dateSel} onChange={this.handleDateChange}>
                                <View className='demo-list-item'>
                                    <View className='demo-list-item__label'>开始日期</View>
                                    <View className='demo-list-item__value'>{dateSel}</View>
                                </View>
                                </Picker>
                            </View>
                            <View className='example-item'>
                                <Picker mode='date' start={dateSel} value={endDate} onChange={this.handleEndDateChange}>
                                <View className='demo-list-item'>
                                    <View className='demo-list-item__label'>结束日期</View>
                                    <View className='demo-list-item__value'>{endDate}</View>
                                </View>
                                </Picker>
                            </View>
                            </View>
                            
                        </View>

                        
                    </View>
                    
                    <View className='tag_wrap'>
                        {this.state.category.map((item) => (
                        
                            <AtTag
                            className='tag_item'
                            key={item.alias}
                            type='primary'
                            name={item.alias}
                            active={item.active}
                            
                            onClick={this.handleCategoryClick.bind(this)}
                            >{item.alias}</AtTag>
                        ))}
                    </View>
                    <View className='tag_wrap'>
                        {this.state.dealType.map((item) => (
                        
                            <AtTag
                            className='tag_item'
                            key={item.alias}
                            type='primary'
                            name={item.alias}
                            active={item.active}
                            
                            onClick={this.handleDealtypeClick.bind(this)}
                            >{item.alias}</AtTag>
                        ))}
                    </View>
                </View>
                <View className='dragUpdataPage'>
                    <View className='downDragBox' style={downDragStyle}>
                        <AtActivityIndicator></AtActivityIndicator>
                        <Text className='downText'>{this.state.downText}</Text>
                    </View>
                    <ScrollView
                        className='main-wrap'
                        backgroundColor='#f6f6f6'
                        style={dargStyle}
                        onTouchMove={this.touchmove}
                        onTouchEnd={this.touchEnd}
                        onTouchStart={this.touchStart}
                        onScrollToUpper={this.ScrollToUpper}
                        onScrollToLower={this.ScrollToLower}
                        className='dragUpdata'
                        scrollY={this.state.scrollY}
                        scrollWithAnimation>
                        {
                            this.state.listData.length? this.state.listData.map((item,index)=>{
                                return (<View className='list-item-wrap' key={item.id} >
                                        <Card index={index+1} item={item}></Card>
                                </View>)
                            }) : (<View className='nodata'>暂无数据</View>)
                        } 
                        

                    </ScrollView>
                    <View className='upDragBox' style={upDragStyle}>
                        <AtActivityIndicator></AtActivityIndicator>
                        <Text className='downText'>{this.state.pullText}</Text>
                    </View>
                </View>
            </View>
        )
    }
}
