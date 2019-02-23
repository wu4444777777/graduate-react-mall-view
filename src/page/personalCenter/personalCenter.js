import React, { Component } from 'react';
import { observer } from 'mobx-react';
import BottomBar from '../common/bottomBar/bottomBar'
import { Grid } from 'antd-mobile'
// import API from '../../page/server';
import './personalCenter.less';

@observer
class personalCenter extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      iconData: [
        {
          icon: require("../../assets/image/home.png"),
          text: "待付款"
        },
        {
          icon: require("../../assets/image/home.png"),
          text: "待发货"
        },
        {
          icon: require("../../assets/image/home.png"),
          text: "待收货"
        }
      ]
    }
  }
  
  componentWillMount() {
    console.log("个人中心的参数",this.props)
  }

  url(path){
    this.props.history.push("/accountManage")
  }
  render() {
    let { iconData } = this.state
    return (
      <div className="personalCenter">
        <div className="user">
            <div className="user-logo" onClick={()=>{this.url("/accountManage")}}>
              <img src={require("../../assets/image/user.svg")} alt=""/>
            </div>
           <div className="nickName">hello</div>
           <div className="account">18148789170</div>
        </div>
        <div className="myOrder">
          <div className="title">
            <span>我的订单</span>
            <span>查看更多</span>
          </div>
          <div className="nav">
            <Grid
              data= {iconData} 
            />
          </div>
        </div>
        <div className="nav-list">
          <div className="getProduction">管理收货地址</div>
        </div>
        <BottomBar/>
      </div>
    );
  }
}

export default personalCenter;
