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
      totalPrice: 0
    }
    this.userToken = localStorage.getItem("userToken")
  }

  componentWillMount() {
    document.title = "购物车"
    let { proNum, priceList, singleCheck, totalPriceList } = this.state
    Toast.loading("Loading",999)
    if(localStorage.getItem("fontsize")){
      let em = localStorage.getItem("fontsize")
      document.body.style.fontSize= em
      this.setState({
        fontsize: localStorage.getItem("fontsize")
      })
    }else{
      document.body.style.fontSize= "13px"
      this.setState({
        fontsize: "13px"
      })
    }
    api.getCartList({
      params: {
        userToken: this.userToken
      }
    }).then(data => {
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

  compute(name,i,item) {
    let { proNum, totalPrice, singleCheck } = this.state
    if(name == 'sub' && proNum[i] >1) {
      proNum[i] --
      if(singleCheck[i]){
        totalPrice-= item.price
      }
    }
    if(name == 'add') {
      proNum[i] ++
      if(singleCheck[i]){
        totalPrice+= item.price
      }
    }
    api.updateCartNum({
      params: {
        cartId: item.cartId,
        num: proNum[i]
      }
    })
    this.setState({
      proNum ,
      totalPrice 
    })
  }

  setChange(e){
    this.setState({
      proNum: e.target.value
    })
  }

  deleteIt(id,i) {
    Toast.loading("loading...",999)
    let arr = []
    let checkedArr = []
    let { singleCheck, totalPrice, proNum, priceList } = this.state
    if(singleCheck[i]){
      totalPrice-= proNum[i] * priceList[i]
    }
    delete singleCheck[i]
    singleCheck.map((item,index)=>{
      if(typeof(item) !== "undefined"){
        checkedArr.push(singleCheck[index])
      }
    })
    api.deleteCartOne({
      params: {
        id,
        userToken: localStorage.getItem("userToken")
      }
    }).then(data => {
      Toast.hide()
      if(data.resultCode == 0){
        data.data.map((item,index) => {
          arr.push(item.num)
        })
        this.setState({
          cartList: data.data,
          proNum: arr,
          singleCheck: checkedArr,
          totalPrice
        })
      }
    })
  }

  allCheck(e, name,i,item) {
    let { singleCheck, proNum,totalPrice, priceList } = this.state
    console.log("singleCheck",singleCheck)
    console.log("proNum",proNum)
    if(name == "allCheck") {
      console.log("e==>",e)  
      totalPrice =0
      if(e.target.checked ){
        singleCheck.map((item,index) => {
          singleCheck[index] = true
          totalPrice+= priceList[index]*proNum[index]
        })
      }else{
        singleCheck.map((item,index) => {
          singleCheck[index] = false
          totalPrice=0
        })
      }
    }
    if(name == "singleCheck") {
      if(e.target.checked) {
        singleCheck[i] = true
        totalPrice += item.price * proNum[i]
      }else{
        singleCheck[i] = false
        totalPrice -= item.price * proNum[i]
      }
    }
    this.setState({
      singleCheck,
      totalPrice
    })
  }

  confirmOrder() {
    let { singleCheck, proNum, cartList, priceList } = this.state
    let orderList = []
    console.log(cartList)
    singleCheck.map((item,index) => {
      if(item) {
        delete cartList[index].userToken
        cartList[index].num = proNum[index]
        orderList.push({
          id: cartList[index].id,
          name: cartList[index].name,
          price: cartList[index].price,
          imageUrl: cartList[index].imageUrl,
          num: proNum[index],
          totalPrice: priceList[index] * proNum[index],
          styles: cartList[index].styles
        })
      }
    })
    api.setStoreData("orderListConfirm",orderList)
    this.props.history.push("/confirmOrder")
  }

  deleteMore() {
    Toast.loading("loading...",999)
    let { singleCheck, cartList, proNum } = this.state
    let numArr = []
    let checkedArr = []
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
        deleteArr,
        userToken: localStorage.getItem("userToken")
      }
    }).then(data=>{
      Toast.hide()
      if(data.resultCode == 0){
        deleteCheckIndex.map((item,index)=>{
          delete singleCheck[item]
          delete proNum[index]
        })
        singleCheck.map((item,index)=>{
          if(typeof(item) !== undefined) {
            checkedArr.push(singleCheck[index])
          }
        })
        proNum.map((item,index)=>{
          if(typeof(item) !== undefined) {
            numArr.push(proNum[index])
          }
        })
        this.setState({
          cartList: data.data,
          singleCheck: checkedArr,
          totalPrice: 0,
          proNum: numArr
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
    let { cartList, emptyCart,proNum, singleCheck, totalPrice, fontsize} = this.state
    console.log("totalPrice=======>",totalPrice)
    return(
      <div className="shoppingCart">
        <NavBar
          mode="light"
          icon={<div className="back" key="back"></div>}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={[
            <div className="home" key="home" onClick={()=> this.props.history.push("/home")}></div>
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
                  this.allCheck(e,"singleCheck",index,item)
                }}
                >
                <div className="product-detail">
                  <div className="image">
                    <img src={item.imageUrl} alt=""/>
                  </div>
                  <div className="detail"  style={{fontSize: fontsize}}>
                    <div className="pd-name">{item.name}</div>
                    <div className="classify">
                      <span>{item.styles.split(",")[0]+";"+item.styles.split(",")[1]}</span>
                    </div>
                    <div className="price">￥{item.price}</div>
                    <div className="bottom">
                      <div className="count">
                        <div className="sub" onClick={this.compute.bind(this,"sub",index,item)}></div>
                        <input type="text" onChange={this.setChange.bind(this)} value={proNum[index]}/>
                        <div className="add" onClick={this.compute.bind(this,"add",index,item)}></div>
                      </div>
                      <div className="delete" onClick={this.deleteIt.bind(this,item.id,index)}>
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
                <button onClick={this.url.bind(this,"/home")}>再逛逛</button>
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
          <div className="all-count">
            <span>总计:</span>
            <span className="totalPrice">￥{totalPrice.toFixed(2)}</span>
          </div>
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