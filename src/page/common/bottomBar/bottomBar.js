import React, { Component } from 'react';
import { observer } from 'mobx-react'
import { Flex, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import './bottomBar.less'

@observer
class bottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: 0,//登录状态，0未登录，1已登录
    };
  }

  componentWillMount(){
    let userFlag = localStorage.getItem("userFlag")
    if(localStorage.getItem("fontsize")){
      let em = localStorage.getItem("fontsize")
      document.body.style.fontSize= em
    }
    if(userFlag == 1){
      this.setState({
        loginStatus: 1
      })
    }else{
      this.setState({
        loginStatus: 0
      })
    }
  }

  checkIsLogin(e) {
    let { loginStatus } = this.state
    if(loginStatus != 1) {
      e.preventDefault()
      Toast.info("请先登录",5,()=>{
        this.props.props.history.push("/login")
      })
    }
  }

  render() {
    return (
      <div className="bottom-bar">
        <Flex>
          <Flex.Item>
            <Link to='/'>
              <div className="img">
                <img src={require("../../../assets/image/home.png")} alt=""/>
              </div>
              <p>首页</p>
            </Link>
          </Flex.Item>
          <Flex.Item>
            <Link to='/search'>
              <div className="img">
                <img src={require("../../../assets/image/search.png")} alt=""/>
              </div>
              <p>搜索</p>
            </Link>
          </Flex.Item>
          <Flex.Item>
            <Link to='/shoppingCart'>
              <div className="img">
                <img src={require("../../../assets/image/shoppingCart.png")} alt=""/>
              </div>
              <p>购物车</p>
            </Link>
          </Flex.Item>
          <Flex.Item>
            <Link to='/personalCenter' onClick={this.checkIsLogin.bind(this)}>
              <div className="img">
                <img src={require("../../../assets/image/my.png")} alt=""/>
              </div>
              <p>我的</p>
            </Link>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}

export default bottomBar;