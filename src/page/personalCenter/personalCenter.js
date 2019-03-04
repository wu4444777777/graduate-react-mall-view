import React, { Component } from 'react';
import { observer } from 'mobx-react';
import BottomBar from '../common/bottomBar/bottomBar'
import { Grid, Toast } from 'antd-mobile'
import API from '../server';
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
    document.title = "个人中心"
    let userFlag = localStorage.getItem("userFlag")
    let userphone = localStorage.getItem("userInfo")
    if(userFlag == 1) {
      if(userphone) {
        API.getUserInfo({
          params: {
            phone: userphone
          }
        }).then(data => {
          this.setState({
            userInfo: data
          })
        })
      }
    }else{
      Toast.info("请先登录",5,()=>{
        this.url("/login")
      })
    }
  }

  url(path){
    this.props.history.push(path)
  }

  checkIsLogin() {
    let loginFlag = localStorage.getItem("userFlag")
    if(loginFlag == 1) {
      this.url("/accountManage")
    }else{
      Toast.info("请先登录",5,()=>{
        this.url("/login")
      })
    }
  }
  render() {
    let { iconData, userInfo } = this.state
    return (
      <div className="personalCenter">
        <div className="user">
            <div className="user-logo" onClick={()=>{this.checkIsLogin()}}>
              <img src={require("../../assets/image/user.svg")} alt=""/>
            </div>
           <div className="nickName">{userInfo && userInfo.username}</div>
           <div className="account">{userInfo && userInfo.phone}</div>
        </div>
        <div className="myOrder">
          <div className="title">
            <span>我的订单</span>
            <span onClick={this.url.bind(this,"/orderList")}>查看更多</span>
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
        <div className="nav-list">
          <div className="getProduction" onClick={this.url.bind(this,"/mySave")}>我的收藏</div>
        </div>
        <BottomBar/>
      </div>
    );
  }
}

export default personalCenter;
