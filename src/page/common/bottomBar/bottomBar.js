import React, { Component } from 'react';
import { Flex, TabBar } from 'antd-mobile';
import './bottomBar.less';

class bottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: [
        {
          normalColor: '#FD5C0E',
          activeColor: '#FD5C0E'
        }
      ],
      tabBarData : [
        {
          name: '首页',
          icon: require('../../../assets/image/home.png'),
          target: '/'
        },
        {
          name: '分类',
          icon: require('../../../assets/image/search.png'),
          target: '/'
        },
        {
          name: '购物车',
          icon: require('../../../assets/image/shoppingCart.png'),
          target: '/'
        },
        {
          name: '我的',
          icon: require('../../../assets/image/my.png'),
          target: '/personalCenter'
        }
      ]
    };
  }

  url(path){
    console.log("路由",this.props)
    // this.props.history.push(path)
  }
  render() {
    let { tabBarData, style} = this.state
    return (
      <div className="bottom-bar">
        <TabBar
          unselectedTintColor={style[0].normalColor}
          tintColor={style[0].activeColor}
          barTintColor="white"
        >
          {tabBarData.map((item,idx) => <TabBar.Item
            title={item.name}
            key={idx}
            icon={<div className="tab_page_icon" style={{backgroundImage: `url(${item.icon})`}} ></div>}
            // selectedIcon={<div className="tab_page_icon" style={this.getIconStyle(item, 1)} ></div>}
            // selected={selectedTab === item.activityTab}
            onPress={() => this.url(item.target)} />
          )}
        </TabBar>
      </div>
    );
  }
}

export default bottomBar;