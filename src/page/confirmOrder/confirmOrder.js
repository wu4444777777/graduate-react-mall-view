import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { NavBar, Icon, Toast, Modal } from 'antd-mobile'
import api from '../server'
import util from '../../utils/index'
import './confirmOrder.less'
import { toJS } from 'mobx';
const alert = Modal.alert;

@observer
class order extends Component{
  constructor(props,context) {
    super(props,context)
    this.state= {
      preData: [],
      totalPrice: 0,
      address: {}
    }
  }

  componentWillMount() {
    document.title= "确认订单"
    let goback = util.handleQueryUrl("goback")
    let { totalPrice } = this.state
    let { orderListConfirm, address } = toJS(api.state)
    if(localStorage.getItem("fontsize")){
      let em = localStorage.getItem("fontsize")
      document.body.style.fontSize= em
    }else{
      document.body.style.fontSize= "13px"
    }
    console.log("orderListConfirm",orderListConfirm)
    console.log("address",address)
    if(!orderListConfirm) {
      this.props.history.push("/home")
    }else{
      if(goback == 'addressManage'){
        this.setState({
          address
        })
      }else{
        api.getPriorAddress({
          params: {
            userToken: localStorage.getItem("userToken")
          }
        }).then(data=>{
          if(data.resultCode == 0){
            this.setState({
              address: data.data
            })
          }else{
            alert('','您还未设置默认地址，将跳转至地址管理选择',[
              { text: "确认",onPress: ()=> this.props.history.push("/addressManage?goback=confirmOrder")}
            ])
          }
        })
      }
      orderListConfirm && orderListConfirm.length> 0 &&orderListConfirm.map((item,index) =>{
        totalPrice += item.price*item.num
      })
      this.setState({
        preData: orderListConfirm ,
        totalPrice,
      })
    }
  }

  sendOrder() {
    Toast.loading("加载中",0)
    let confirmTime = util.formatNowTime(0)
    let userToken = localStorage.getItem("userToken")
    let { preData, address } = this.state
    let order = []
    let cartId = []
    let productId = []
    let cartNum = []
    preData.map((item,index) => {
      productId.push(item.id)
      cartId.push(item.cartId)
      cartNum.push(item.num)
      delete item.cartId
      Object.assign(item,{
        userToken,
        username: address.username,
        userphone: address.userphone,
        address: address.province+ address.city+ address.district+ address.detailAddress,
        confirmTime,
      })
      order.push(Object.values(item))
    })
    api.sendOrderList({
      orderList: order,
      cartId,productId,cartNum
    }).then(data=>{
      Toast.hide()
      if(data.resultCode ==0){
        alert('','将跳转至付款',[
          {text: "取消",onPress: ()=>{
            api.setOrderStatus({
              orderList: productId,
              userToken: address.userToken,
              confirmTime,
              orderStatus: 102
            }).then(data=>{
              if(data.resultCode == 0){
                this.props.history.push("/orderList")
              }else{
                Toast.info(data.resultMsg)
              }
            })
          }},
          {text: "确认",onPress: ()=> {
            Toast.loading("Loading...",999)
            api.setOrderStatus({
              orderList: productId,
              userToken: address.userToken,
              confirmTime,
              orderStatus: 101
            }).then(data=>{
              Toast.hide()
              if(data.resultCode == 0){
                this.props.history.push("/orderList")
              }else{
                Toast.info(data.resultMsg)
              }
            })
          }}
        ])
      }else{
        Toast.fail("结算失败，请重试")
      }
    })
  }

  url(path){
    this.props.history.push(path)
  }

  render() {
    let { orderListConfirm } = toJS(api.state)
    let { totalPrice, address } = this.state
    console.log("address",address)
    return(
      <div className="order">
        <NavBar
          mode="light"
          icon={<div className="back" key="back"></div>}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={[
            <div key="edit" onClick={this.url.bind(this,"/addressManage?goback=confirmOrder")}>修改地址</div>
          ]}
        >确认订单</NavBar>
        <div className="address">
          <div className="userInfo-1">
            <div className="people"><div className="address-title">收货人：</div><span className="address-value">{address && address.username}</span></div>
          </div>
          <div className="userInfo-1">
            <div className="phone"><div className="address-title">联系方式：</div><span className="address-value">{address && address.userphone}</span></div>
          </div>
          <div className="userInfo-2">
            {/* {
              localStorage.getItem("mallModel") == 1 && (
                <span className="symbol">
                  <img src={require("../../assets/image/address.svg")} alt=""/>
                </span>
              )
            } */}
            <div className="get"><div className="address-title">收获地址：</div><span className="address-value">{address && address.province}{address && address.city}{address && address.district}{address && address.detailAddress}</span></div>
          </div>
          <div className="tip">收货不便时，可选择免费代收服务</div>
        </div>
        <div className="product">
          {
            orderListConfirm && orderListConfirm.length> 0 &&orderListConfirm.map((item,index) => (
              <div className="product-list" key={index}>
                <div className="proList">
                  <div className="pro-img">
                    <img src={item.imageUrl} alt=""/>
                  </div>
                  <div className="intro">
                    <div id="name">{item.name}</div>
                    <div className="classify">
                      <span>{item.styles.split(",")[0]+";"+item.styles.split(",")[1]}</span>
                    </div>
                    <div id="price">
                      <div className="price">￥{item.price}</div>
                      <div id="num">x{item.num}</div>
                    </div>
                  </div>
                </div>
                <div className="account">
                  <span id="sumNum">共{item.num}件商品</span>
                  <span id="sum">小计：
                    <span className="price">￥{(item.num*item.price).toFixed(2)}</span>
                  </span>
                </div>
                <div className="send"><span>邮寄方式</span><span>快递</span></div>
                {/* <div className="fee">运费险</div> */}
              </div>
            ))
          }
        </div>
        <div className="count">
          <div className="count-price">
            <span className="total-title">合计：</span>
            <span className="price">￥{totalPrice.toFixed(2)}</span>
          </div>
          <button className="submit" onClick={this.sendOrder.bind(this)}>提交订单</button>
        </div>
      </div>
    )
  }
}

export default order;