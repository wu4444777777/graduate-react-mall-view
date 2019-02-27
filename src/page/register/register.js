import React, { Component } from 'react'
import { observer } from 'mobx-react'
import API from '../server'
import { Toast } from 'antd-mobile'
import './register.less'

@observer
class register extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      formData: {
        
      },
      username: "",
      password: "",
      confirmPwd: "",
      email: "",
      phone: "",
      qq: ""
    }
  }
  
  componentWillMount() {
    document.title= "注册"
  }

  setFormData(name,value) {
    this.setState({
    })
    this.setState({
      formData: Object.assign(this.state.formData,{
      [name]: value
      })
    })
  }

  url(path) {
    this.props.history.push(path)
  }
  
  submitData() {
    API.setRegisterData({
      ...this.state.formData
    }).then((data)=>{
      if(data.resultCode === 0) {
        Toast.success(data.resultMsg,5,()=>{
          this.url("/login")
        })
      }else if(data.resultCode === 1) {
        Toast.info(data.resultMsg)
      }else{
        Toast.fail("注册失败")
      }
    })
    API.setStoreData("formData",this.state.formData)
  }

  render() {
    return(
      <div className="register-page">
        <div className="phone-register">
          <div className="form">
            <input type="text" placeholder="手机号" name="telephone" id="telephone" onChange={(e)=>this.setFormData("phone",e.target.value)}/>
            <input type="text" placeholder="邮箱" name="email" id="email" onChange={(e)=>this.setFormData("email",e.target.value)} />
            <input type="text" placeholder="昵称" name="user" id="username" onChange={(e)=>this.setFormData("username",e.target.value)}/>
            <input type="password" placeholder="密码" name="password" id="password" onChange={(e)=>this.setFormData("password",e.target.value)}/>
            <input type="password" placeholder="再次输入密码" name="secPass" id="secPass" onChange={(e)=>this.setFormData("confirmPwd",e.target.value)}/>
            <input type="text" placeholder="qq" name="qq" id="qq" onChange={(e)=>this.setFormData("qq",e.target.value)}/>
            <button className="btn" onClick={()=>this.submitData()}>立即注册</button>
          </div>
        </div>
      </div>
    )
  }
}

export default register; 