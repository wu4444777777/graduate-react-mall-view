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
          icon: require("../../assets/image/no-pay.png"),
          text: "待付款",
          path: "/orderList?status=0"
        },
        {
          icon: require("../../assets/image/pay.png"),
          text: "已付款",
          path: "/orderList?status=1"
        },
        // {
        //   icon: require("../../assets/image/no-comment.png"),
        //   text: "待评价"
        // }
      ]
    }
  }
  
  componentWillMount() {
    document.title = "个人中心"
    let userFlag = localStorage.getItem("userFlag")
    let userphone = localStorage.getItem("userInfo")
    if(localStorage.getItem("fontsize")){
      let em = localStorage.getItem("fontsize")
      document.body.style.fontSize= em
    }else{
      document.body.style.fontSize= "14px"
    }
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

  urlPage(e,i){
    this.props.history.push(e.path)
  }
  render() {
    let { iconData, userInfo } = this.state
    return (
      <div className="personalCenter">
        <div className="user">
            <div className="user-logo" onClick={()=>{this.checkIsLogin()}}>
              <img src={require("../../assets/image/user.jpg")} alt=""/>
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
              onClick= {(e,i) =>this.urlPage(e,i)}
            />
          </div>
        </div>
        <div className="nav-list">
          <div className="getProduction" onClick={this.url.bind(this,"/addressManage")}>管理收货地址</div>
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
