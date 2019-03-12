import React, { Component } from 'react'
import { observer } from 'mobx-react'
import api from '../server'
import { Toast } from 'antd-mobile'
import './login.less'

@observer
class login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loginData: {}
    }
  }
  componentWillMount() {
    document.title = "登录"
  }

  setLoginData() {
    api.setLoginData({
      ...this.state.loginData
    }).then((data)=>{
      if(data.resultCode === 0){
        Toast.success(data.resultMsg,3,()=> {
          localStorage.setItem("userInfo", data.data.phone)
          localStorage.setItem("userFlag","1")
          localStorage.setItem("userToken",data.data.userToken)
          this.props.history.push("/")
        })
      }else if(data.resultCode === 1) {
        Toast.info(data.resultMsg)
      }else{
        Toast.fail("登录失败")
      }
    })
  }

  getLoginData(name,value) {
    this.setState({
      loginData: Object.assign(this.state.loginData,{
        [name]: value
      })
    })
  }

  clearData() {
    this.setState({
      loginData: {
        phone: "",
        password: ""
      }
    })
  }

  render() {
    let { loginData } = this.state
    return(
      <div className="login-page">
        <div className="phone-preview">
          <div className="form">
            <input className="iptBox" type="text" placeholder="手机号" name="phone" id="userBox" value={loginData.phone||""} onChange={(e)=>{this.getLoginData("phone",e.target.value)}}/>
            <input className="iptBox" type="password" placeholder="密码" value={loginData.password||""} name="pass" onChange={(e)=>{this.getLoginData("password",e.target.value)}}/>
            <button className="btn" onClick={()=>this.setLoginData()}>登录</button>
            <button className="btn" onClick={()=>this.clearData()}>重置</button>
            <div className="forget">
              <a href="/">忘记密码？</a>
              <a href="/#/register">注册</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default login; 