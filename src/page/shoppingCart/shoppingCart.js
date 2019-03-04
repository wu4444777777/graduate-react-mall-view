import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { NavBar, Icon, Checkbox } from 'antd-mobile';
import api from '../server'
import './shoppingCart.less'
const CheckboxItem = Checkbox.CheckboxItem;

@observer
class shoppingCart extends Component{
  constructor(props,context) {
    super(props,context)
    this.state= {
      cartList: [],
      emptyCart: "",
      proNum: [],
      singleCheck: [],
      priceList: [],
    }
  }

  componentWillMount() {
    let { proNum, priceList, singleCheck, totalPriceList } = this.state
    api.getCartList().then(data => {
      if(data.resultCode == 0){
        data.data.map((item,index) => {
          proNum.push(item.num)
          priceList.push(item.price)
          singleCheck.push(false)
          // totalPriceList.push(item.price*item.num)
        })
        this.setState({
          cartList: data.data,
          proNum,
          priceList,
          singleCheck,
          totalPriceList
        })
      }else{
        this.setState({
          emptyCart: data.resultMsg
        })
      }
    })
  }

  compute(name,i) {
    let { proNum } = this.state
    if(name == 'sub') {
      proNum[i] --
    }
    if(name == 'add') {
      proNum[i] ++
    }
    this.setState({
      proNum  
    })
  }

  setChange(e){
    this.setState({
      proNum: e.target.value
    })
  }

  deleteIt(id) {
    let arr = []
    console.log("data===>",id)
    api.deleteCartOne({
      params: {
        id
      }
    }).then(data => {
      if(data.resultCode == 0){
        data.data.map((item,index) => {
          arr.push(item.num)
        })
        this.setState({
          cartList: data.data,
          proNum: arr
        })
      }
    })
  }

  allCheck(e, name,i) {
    let { singleCheck } = this.state
    if(name == "allCheck") {
      singleCheck.map((item,index) => {
        singleCheck[index] = e.target.checked
      })
    }
    if(name == "singleCheck") {
      if(e.target.checked) {
        singleCheck[i] = true
      }else{
        singleCheck[i] = false
      }
    }
    this.setState({
      singleCheck
    })
  }

  confirmOrder() {
    let { singleCheck, proNum, cartList } = this.state
    let orderList = []
    singleCheck.map((item,index) => {
      if(item) {
        cartList[index].num = proNum[index]
        orderList.push(cartList[index])
      }
    })
    api.setStoreData("orderListConfirm",orderList)
    this.props.history.push("/order")
  }
  render() {
    let { cartList, emptyCart,proNum, singleCheck} = this.state
    return(
      <div className="shoppingCart">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={[
            // <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >购物车</NavBar>
        <div className="product-list">
          {
            cartList && cartList.length> 0 ?cartList.map((item,index) => (
              <CheckboxItem 
                key={index} 
                className="checkboxItem" 
                checked={ singleCheck[index]}
                onChange={(e)=> {
                  this.allCheck(e,"singleCheck",index)
                }}
                >
                <div className="product-detail">
                  <div className="image">
                    <img src={require("../../assets/image/"+item.imageUrl)} alt=""/>
                  </div>
                  <div className="detail">
                    <div className="pd-name">{item.name}</div>
                    <div className="price">￥{item.price}</div>
                    <div className="bottom">
                      <div className="count">
                        <div className="sub" onClick={this.compute.bind(this,"sub",index)}></div>
                        <input type="text" onChange={this.setChange.bind(this)} value={proNum[index]}/>
                        <div className="add" onClick={this.compute.bind(this,"add",index)}></div>
                      </div>
                      <div className="delete" onClick={this.deleteIt.bind(this,item.id)}>
                        <img src={require("../../assets/image/delete.svg")} alt=""/>
                      </div>
                    </div>
                  </div>
                </div>
              </CheckboxItem>
            )):
            <div className="empty">
              <img src={require("../../assets/image/empty_cart.png")} alt=""/>
              <div className="tip">{emptyCart}</div>
              <button>再逛逛</button>
          </div>
          }
        </div>
        <div className="allcount">
          <div className="all-check">
            <CheckboxItem 
              onChange={(e)=> {
                this.allCheck(e,"allCheck","")
              }}
              checked={singleCheck && singleCheck.length>0 && singleCheck.indexOf(false) == -1 ? true: false}
              ></CheckboxItem>
              <p>全选</p>
          </div>
          {/* <div className="all-count">
            <span>总计:</span>
            <span className="totalPrice">￥</span>
          </div> */}
          <div className="count-btn">
            <button className="delete-btn">删除</button>
            <button className="account" onClick={()=> this.confirmOrder()}>结算</button>
          </div>
        </div>
      </div>
    )
  }
}

export default shoppingCart;