import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { NavBar, Icon } from 'antd-mobile'
// import BottomBar from '../common/bottomBar/bottomBar'
import './accountManage.less'

@observer
class accountManage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    }
  }

  render(){
    return(
      <div className="account-manage">
         <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
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
            <div className="info">fghjk</div>
          </div>
          <div className="account line">
            <div className="title">手机号</div>
            <div className="info">18148789170</div>
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
        <div className="loginOut">退出当前账号</div>
      </div>
    )
  }
}

export default  accountManage