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
      
    };
  }

  componentWillMount(){
    console.log("底部",this.props)
  }

  checkIsLogin(e) {
    let userFlag = localStorage.getItem("userFlag")
    if(userFlag != 1) {
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
              <img src={require("../../../assets/image/home.png")} alt=""/>
              <p>首页</p>
            </Link>
          </Flex.Item>
          <Flex.Item>
            <Link to='/search'>
              <img src={require("../../../assets/image/search.png")} alt=""/>
              <p>搜索</p>
            </Link>
          </Flex.Item>
          <Flex.Item>
            <Link to='/shoppingCart'>
              <img src={require("../../../assets/image/shoppingCart.png")} alt=""/>
              <p>购物车</p>
            </Link>
          </Flex.Item>
          <Flex.Item>
            <Link to='/personalCenter' onClick={this.checkIsLogin.bind(this)}>
              <img src={require("../../../assets/image/my.png")} alt=""/>
              <p>我的</p>
            </Link>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}

export default bottomBar;