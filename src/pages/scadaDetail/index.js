import Taro, { Component } from '@tarojs/taro'
export default class Mine extends Component {
    config = {
        navigationBarTitleText: 'scada明细',
        
    }
    
    
    componentDidMount(){
        let name = this.$router.params.name
        wx.setNavigationBarTitle({
            title: name
        })
    }
    render () {
        
        return (
            <View>
                
                <web-view  src={this.$router.params.url} className='scada_page'>
                
                </web-view>
                
            </View>
            
        )
    }
}