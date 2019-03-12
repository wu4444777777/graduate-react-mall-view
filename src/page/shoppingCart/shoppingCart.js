import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { NavBar, Icon, Checkbox, Toast } from 'antd-mobile';
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
    document.title = "购物车"
    let { proNum, priceList, singleCheck, totalPriceList } = this.state
    Toast.loading("Loading",999)
    api.getCartList().then(data => {
      Toast.hide()
      this.setState({
        isLoadig: false
      })
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
      }else if(data.resultCode==1){
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
    Toast.loading("loading...",999)
    let arr = []
    api.deleteCartOne({
      params: {
        id
      }
    }).then(data => {
      Toast.hide()
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
    this.props.history.push("/confirmOrder")
  }

  deleteMore() {
    Toast.loading("loading...",999)
    let { singleCheck, cartList } = this.state
    let deleteArr = []
    let deleteCheckIndex = []
    singleCheck.map((item,index) =>{
      if(item){
        deleteArr.push(cartList[index].cartId)
        deleteCheckIndex.push(index)
      }
    })
    api.deleteMore({
      params:{
        deleteArr
      }
    }).then(data=>{
      Toast.hide()
      if(data.resultCode == 0){
        deleteCheckIndex.map((item,index)=>{
          delete singleCheck[item]
        })
        this.setState({
          cartList: data.data,
          singleCheck
        })
      }else{
        Toast.fail(resultMsg)
      }
    })
  }

  url(path){
    this.props.history.push(path)
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
            cartList && cartList.length> 0 && cartList.map((item,index) => (
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
            ))
          }
          {
            emptyCart && (
              <div className="empty">
                <img src={require("../../assets/image/empty_cart.png")} alt=""/>
                <div className="tip">{emptyCart}</div>
                <button onClick={this.url.bind(this,"/")}>再逛逛</button>
              </div>
            )
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
            <button className="delete-btn" onClick={this.deleteMore.bind(this)}>删除</button>
            <button className="account" onClick={()=> this.confirmOrder()}>结算</button>
          </div>
        </div>
      </div>
    )
  }
}

export default shoppingCart;