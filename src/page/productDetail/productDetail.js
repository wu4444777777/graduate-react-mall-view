import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { NavBar, Icon, Badge, Toast } from 'antd-mobile';
import API from '../server'
import './productDetail.less'

@observer
class productDetail extends Component{
  constructor(props,context) {
    super(props,context)
    this.state= {
      detail: {},
      proNum: 1,
      cartNum: 0
    }
  }

  componentWillMount() {
    document.title="详情"
    API.getDetailData({params: {
      id: this.props.match.params.id
    }}).then((data)=>{
      this.setState({
        detail: data.data,
        cartNum: data.data.cartNum
      })
    })
  }

  compute(name,val) {
    if(name == 'sub') {
      val--
      this.setState({
        proNum: val
      })
    }
    if(name == 'add') {
      val++
      this.setState({
        proNum: val
      })
    }
  }

  addCart(data) {
    Toast.loading('Loading',999)
    let { proNum } = this.state
    API.addIntoCart({
      ...data,proNum
    }).then((res) => {
      Toast.hide()
      this.setState({
        cartNum: res.data.cartNum
      })
      if(res.resultCode == 0){
        Toast.success("加入购物车成功")
      }else{
        Toast.info(res.resultMsg)
      }
    })
  }
  confirmOrder() {
    let { detail, proNum } = this.state
    let detailObj = {}
    Object.assign(detailObj,{ 
      name: detail.name,
      imageUrl: detail.imageUrl,
      id: detail.id,
      price: detail.price,
      num: proNum
    })
    API.setStoreData("orderListConfirm",[detailObj])
    this.props.history.push("/confirmOrder")
  }
  render() {
    let { detail, proNum, cartNum } = this.state
    return(
      <div className="productDetail">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={[
            // <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >详情</NavBar>
        <div className="detail">
          <div className="product-img">
            { 
              detail && detail.imageUrl && (
                <img src={require(`../../assets/image/${detail.imageUrl}`)} alt=""/>
              )
            }
          </div>
          <div className="info">
            <div className="name">{detail.name}</div>
            <div className="price">
              <span>价格</span>
              <span>￥{detail.price}</span>
            </div>
            <div className="account">
              <span>数量</span>
              <div className="count-input">
                <button onClick={()=>this.compute("sub",proNum)}>-</button>
                <input type="text" readOnly value={proNum || 1}/>
                <button onClick={()=>this.compute("add",proNum)}>+</button>
              </div>
            </div>
          </div>
          <div className="detail-info">
            <h4>宝贝详情</h4>
            <div className="di-info">{detail.birthplace}</div>
            <div className="di-info">{detail.deadline}</div>
            <div className="di-info">{detail.series}</div>
          </div>
          <div className="pro-img">
            {
              detail && detail.image1 && (
                <img src={require("../../assets/image/"+detail.image1)} alt=""/>
              )
            }
            {
              detail && detail.image2 && (
                <img src={require("../../assets/image/"+detail.image2)} alt=""/>
              )
            }
            {
              detail && detail.image3 && (
                <img src={require("../../assets/image/"+detail.image3)} alt=""/>
              )
            }
            {
              detail && detail.image4 && (
                <img src={require("../../assets/image/"+detail.image4)} alt=""/>
              )
            }
          </div>
        </div>
        <div className="bottom-btn">
          <div className="btn-nav">
            <img src={require("../../assets/image/store.svg")} alt="" onClick={()=> this.props.history.push("/")}/>
            <Badge text={cartNum}>
              <img src={require("../../assets/image/cart.svg")} onClick={()=> this.props.history.push("/shoppingCart")} alt=""/>
            </Badge>
          </div>
          <div className="addCart" onClick={this.addCart.bind(this,detail)}>加入购物车</div>
          <div className="buy" onClick={()=> this.confirmOrder()}>立即购买</div>
        </div>
      </div>
    )
  }
}

export default productDetail;