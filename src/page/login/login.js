import React, { Component } from 'react'
import { observer } from 'mobx-react'

import './login.less'

@observer
class login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    }
  }

  render() {
    return(
      <div className="login-page">
        <div className="banner">
          <div className="phone-preview">
            <form action="/login" method="post">
              <div className="title">Login in</div>
              <input className="iptBox" type="text" placeholder="用户名" name="user" id="userBox"/>
              <input className="iptBox" type="password" placeholder="密码" name="pass"/>
              <input className="btn" type="submit"/>
              <input className="btn" type="reset"/>
              <div className="forget">
                <a href="#">忘记密码？</a>
                <a href="register">注册</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default login; 