import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { NavBar, Icon, Modal, Toast } from 'antd-mobile'
import API from '../server'
import util from '../../utils/index'
// import BottomBar from '../common/bottomBar/bottomBar'
import './accountManage.less'
const prompt = Modal.prompt;
const alert = Modal.alert;

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
    console.log("this.props",this.props)
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
  }
  url(path){
    this.props.history.push(path)
  }

  loginOut() {
    localStorage.removeItem("userInfo")
    localStorage.setItem("userFlag","0")
    this.url("/login")
  }

  updateUserInfo(name,value){
    Toast.loading("Loading",999)
    API.updateUserInfo({
      editName: name,
      editValue: value,
      userToken: localStorage.getItem("userToken")
    }).then(data => {
      Toast.hide()
      if(data.resultCode == 0) {
        this.setState({
          userInfo: data.data
        })
        Toast.success("修改成功")
      }else{
        Toast.fail("修改失败")
      }
    })
  }

  openModal(name,paramName) {
    alert(`绑定${name}`, `您确定要修改${name}？`, [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: () => prompt(
        `修改${name}`,'请填写清楚',email => this.updateUserInfo(paramName,email)
      )},
    ])
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
          <div className="nickName line" onClick={()=>this.openModal("昵称","username")}>
            <div className="title">昵称</div>
            <div className="info">{userInfo.username}</div>
          </div>
          <div className="account line" onClick={()=>this.openModal("手机号","phone")}>
            <div className="title">手机号</div>
            <div className="info">{userInfo.phone}</div>
          </div>
          <div className="password line" onClick={() => this.openModal("密码","password")}>
            <div className="title">修改密码</div>
            {/* <div>></div> */}
          </div>
          <div className="line" onClick={()  =>this.openModal("邮箱","email")}>
            <div className="title">绑定邮箱</div>
            <div>{userInfo.email}</div>
          </div>
          <div className="line" onClick={() => this.openModal("qq","qq")}>
            <div className="title">绑定qq</div>
            <div>{userInfo.qq}</div>
          </div>
        </div>
        <div className="loginOut" onClick={()=>this.loginOut()}>退出当前账号</div>
      </div>
    )
  }
}

export default  accountManage