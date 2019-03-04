import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { NavBar, Icon, Toast } from 'antd-mobile'
import api from '../server'
import './order.less'
import { toJS } from 'mobx';

@observer
class order extends Component{
  constructor(props,context) {
    super(props,context)
    this.state= {
      preData: [],
      totalPrice: 0
    }
  }

  componentWillMount() {
    document.title= "确认订单"
    let { totalPrice } = this.state
    let { orderListConfirm } = toJS(api.state)
    orderListConfirm.map((item,index) =>{
      totalPrice += item.price*item.num
    })
    this.setState({
      preData: orderListConfirm ,
      totalPrice
    })
  }

  sendOrder() {
    let { preData } = this.state
    api.sendOrderList({
      orderList: preData
    }).then(data=>{
      if(data.resultCode == 0){
        this.props.history.push("/orderList")
      }else{
        Toast.loading()
      }
    })
  }

  render() {
    let { orderListConfirm } = toJS(api.state)
    let { totalPrice } = this.state
    return(
      <div className="order">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={[
            // <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >确认订单</NavBar>
        <div className="address">
          <div className="userInfo-1">
            <span className="people">收货人：小七</span>
            <span className="phone">18148789170</span>
          </div>
          <div className="userInfo-2">
            <span className="symbol">
              <img src={require("../../assets/image/address.svg")} alt=""/>
            </span>
            <span className="get">收获地址：深圳龙岗宝南路</span>
          </div>
          <div className="tip">收货不便时，可选择免费代收服务</div>
        </div>
        <div className="product">
          {
            orderListConfirm.map((item,index) => (
              <div className="product-list" key={index}>
                <div className="proList">
                  <div className="pro-img">
                    <img src={require("../../assets/image/"+item.imageUrl)} alt=""/>
                  </div>
                  <div className="intro">
                    <div id="name">{item.name}</div>
                    <div id="price">
                      <div className="price">￥{item.price}</div>
                      <div id="num">x{item.num}</div>
                    </div>
                  </div>
                </div>
                <div className="account">
                  <span id="sumNum">共{item.num}件商品</span>
                  <span id="sum">小计：
                    <span className="price">￥{item.num*item.price}</span>
                  </span>
                </div>
                <div className="send">邮寄方式</div>
                <div className="fee">运费险</div>
              </div>
            ))
          }
          <div className="count">
            <span>合计：
              <span className="price">￥{totalPrice}</span>
            </span>
            <button className="submit" onClick={this.sendOrder.bind(this)}>提交订单</button>
          </div>
        </div>
      </div>
    )
  }
}

export default order;