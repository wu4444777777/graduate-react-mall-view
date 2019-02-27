import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { NavBar, Icon } from 'antd-mobile'
import API from '../server'
// import BottomBar from '../common/bottomBar/bottomBar'
import './accountManage.less'

@observer
class accountManage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userInfo: {}
    }
  }

  componentWillMount() {
    document.title = "账号管理"
    let userphone = localStorage.getItem("userInfo")
    console.log("userphone",userphone)
    if(userphone) {
      API.getUserInfo({
        params: {
          phone: userphone
        }
      }).then(data => {
        this.setState({
          userInfo: data
        })
        console.log("data===>",data)
      })
    }
  }

  loginOut() {
    localStorage.removeItem("userInfo")
    localStorage.setItem("userFlag","0")
    this.props.history.push("/login")
  }

  render(){
    let { userInfo } = this.state
    return(
      <div className="account-manage">
         <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >账号设置</NavBar>
        <div className="account-detail">
          <div className="avactor line">
            <div className="title">头像</div>
            <div className="touxiang">
              <img src={require("../../assets/image/user.svg")} alt=""/>
            </div>
          </div>
          <div className="nickName line">
            <div className="title">昵称</div>
            <div className="info">{userInfo.username}</div>
          </div>
          <div className="account line">
            <div className="title">手机号</div>
            <div className="info">{userInfo.phone}</div>
          </div>
          <div className="password line">
            <div className="title">修改密码</div>
            <div>></div>
          </div>
          <div className="line">
            <div className="title">绑定邮箱</div>
            <div>></div>
          </div>
          <div className="line">
            <div className="title">绑定qq</div>
            <div>></div>
          </div>
        </div>
        <div className="loginOut" onClick={this.loginOut}>退出当前账号</div>
      </div>
    )
  }
}

export default  accountManage