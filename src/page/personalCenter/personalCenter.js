import React, { Component } from 'react';
import { observer } from 'mobx-react';
import BottomBar from '../common/bottomBar/bottomBar'
import { Flex } from 'antd-mobile'
// import API from '../../page/server';
import './personalCenter.less';

@observer
class personalCenter extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      
    }
  }
  
  componentWillMount() {
  }
  render() {
    return (
      <div className="personalCenter">
        <div className="user">
           <div className="user-logo"></div>
           <div className="nickName"></div>
           <div className="account"></div>
        </div>
        <div className="myOrder">
          <div className="title">
            <span>我的订单</span>
            <span>查看更多</span>
          </div>
          <div className="nav">
            <Flex>
              <Flex.Item>待付款</Flex.Item>
              <Flex.Item>待发货</Flex.Item>
              <Flex.Item>待收货</Flex.Item>
            </Flex>
          </div>
          <div className="getProduction">管理收货地址</div>
        </div>
        <BottomBar/>
      </div>
    );
  }
}

export default personalCenter;
