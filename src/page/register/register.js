import React, { Component } from 'react'
import { observer } from 'mobx-react'

import './register.less'

@observer
class register extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    }
  }

  render() {
    return(
      <div className="register-page">
        <div className="phone-register">
        <form action="/register" method="post">
          <input type="text" placeholder="用户名" name="user" id="username"/>
          <input type="password" placeholder="密码" name="password" id="password"/>
          <input type="password" placeholder="再次输入密码" name="secPass" id="secPass"/>
          <input type="text" placeholder="联系方式" name="telephone" id="telephone"/>
          <input type="text" placeholder="email" name="email" id="email"/>
          <input type="text" placeholder="qq" name="qq" id="qq"/>
          <input className="btn btn-success" type="submit" value="立即注册"/>
        </form>
      </div>
      </div>
    )
  }
}

export default register; 