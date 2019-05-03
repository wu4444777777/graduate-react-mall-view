import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { NavBar  , Badge, Toast, Modal } from 'antd-mobile';
import API from '../server'
import './productDetail.less'

@observer
class productDetail extends Component{
  constructor(props,context) {
    super(props,context)
    this.state= {
      detail: {},
      proNum: 1,
      cartNum: 0,
      imageList: [],
      selectedClassify: "",
      selectedClassifyStatus: [],
      selectedGuige: "",
      selectedGuigeStatus: []
    }
    this.type = this.props.match.params.type
  }

  componentWillMount() {
    document.title="详情"
    let { selectedClassifyStatus, selectedGuigeStatus } = this.state
    let classify = []
    let detailparams = []
    if(localStorage.getItem("fontsize")){
      let em = localStorage.getItem("fontsize")
      document.body.style.fontSize= em
    }else{
      document.body.style.fontSize= "13px"
    }
    API.getDetailData({params: {
      id: this.props.match.params.id,
      userToken: localStorage.getItem("userToken")
    }}).then((data)=>{
      if(data.data.birthplace){
        let status = new Array(data.data.birthplace.split(",").length)
        classify = data.data.birthplace.split(",")
        for(var i=0;i<status.length;i++){
          selectedClassifyStatus.push(false);
        }
      }else{
        classify = null
      }
      if(data.data.series){
        let guigestatus = new Array(JSON.parse(data.data.series).styles.length)
        detailparams = JSON.parse(data.data.series).styles
        for(var i=0;i<guigestatus.length;i++){
          selectedGuigeStatus.push(false);
        }
      }else{
        detailparams = null
      }
      // let guigeStatus = new Array
      this.setState({ 
        checkImage: data.data.imageUrl,
        checkPrice: data.data.price,
        detail: data.data,
        cartNum: data.data.cartNum,
        imageList: data.data.images.split(","),
        classify: classify,
        detailparams: detailparams,
        selectedClassifyStatus: selectedClassifyStatus,
        selectedGuigeStatus: selectedGuigeStatus,
        fontsize: localStorage.getItem("fontsize")
      })
    })
  }

  compute(name,val) {
    if(name == 'sub') {
     if(val>1){
      val--
      this.setState({
        proNum: val
      })
     }
    }
    if(name == 'add') {
      val++
      this.setState({
        proNum: val
      })
    }
  }

  addCart(data) {
    let { selectedClassify, selectedGuige, proNum } = this.state
    console.log("selectedClassify",selectedClassify)
    console.log("selectedGuige",selectedGuige)
    console.log("data",data)
    if(!selectedClassify && !selectedGuige){
      Toast.info("您还未选择分类，请先选择")
      return
    }
    Toast.loading('Loading',999)
    API.addIntoCart({
      ...data,proNum,
      userToken: localStorage.getItem("userToken"),
      styles: selectedClassify+","+selectedGuige
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
    let { detail, proNum, selectedClassify, selectedGuige } = this.state
    let detailObj = {}
    let totalPrice = detail.price * proNum
    Object.assign(detailObj,{ 
      id: detail.id,
      name: detail.name,
      price: detail.price,
      imageUrl: detail.imageUrl,
      num: proNum,
      totalPrice,
      styles: selectedClassify+","+selectedGuige
    })
    if(!selectedClassify && !selectedGuige){
      Toast.info("您还未选择分类，请先选择")
      return
    }
    API.setStoreData("orderListConfirm",[detailObj])
    this.props.history.push("/confirmOrder")
  }
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  } 
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
  selectOne(val,i,name){
    let { selectedClassifyStatus, selectedGuigeStatus } = this.state
    if(name == "classify"){
      if(selectedClassifyStatus.indexOf(true) != -1){
        for(let idx in selectedClassifyStatus){
          if(idx == i){
            selectedClassifyStatus[idx] = true
          }else{
            selectedClassifyStatus[idx] = false
          }
        }
      }else{
        selectedClassifyStatus[i] = true
      }
      this.setState({
        selectedClassify: val,
        selectedClassifyStatus
      })
    }else{
      if(selectedGuigeStatus.indexOf(true) != -1){
        for(let idx in selectedGuigeStatus){
          if(idx == i){
            selectedGuigeStatus[idx] = true
          }else{
            selectedGuigeStatus[idx] = false
          }
        }
      }else{
        selectedGuigeStatus[i] = true
      }
      this.setState({
        selectedGuige: val,
        selectedGuigeStatus
      })
    }
  }
  render() {
    let { detail, proNum, cartNum, imageList, checkImage, checkPrice, classify, detailparams, selectedClassifyStatus, selectedGuigeStatus, selectedClassify, selectedGuige, fontsize } = this.state
    console.log(fontsize)
    return(
      <div className="productDetail">
        <NavBar
          mode="light"
          icon={<div className="back" key="back"></div>}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={[
          <div className="home" key="home" onClick={()=> this.props.history.push("/home")}></div>
          ]}
        >详情</NavBar>
        <div className="detail">
          <div className="product-img">
            { 
              detail && detail.imageUrl && (
                <img src={detail.imageUrl} alt=""/>
              )
            }
          </div>
          <div className="info">
            <div className="price">￥<span className="price-size">{detail.price}</span></div>
            <div className="name">{detail.name}</div>
          </div>
         <div className="params">
          <div className="choose" onClick={this.showModal('classifyModal')}>选择
            <span className="guige">{selectedClassify || selectedGuige? selectedClassify+selectedGuige: "选择分类" }</span>
            <span className="jiantou"></span>
          </div>
            {
              this.type == "food" && (
                <div className="choose" onClick={this.showModal('guigeModal')}>参数<span className="guige">规格参数</span><span className="jiantou"></span></div>
              )
            }
         </div>
          <Modal
            popup
            visible={this.state.classifyModal}
            onClose={this.onClose('classifyModal')}
            animationType="slide-up"
            // afterClose={() => { alert('afterClose'); }}
          >
            <div className="detail-info" style={fontsize ? {fontSize: fontsize}: {fontSize: "13px"}}>
              <div className="di-info">
                <div className="di-image">
                  <div className="img">
                    <img src={checkImage} alt=""/>
                  </div>
                  <div className="prices">
                    <div className="price-info gap">￥<span>{checkPrice}</span></div>
                    <div className="stock gap">库存{detail.stock}</div>
                    <div className="choice gap">选择  分类规格</div>
                  </div>
                </div>
                <div className="close-modal" onClick={this.onClose("classifyModal")}></div>
              </div>
              {
                classify && (
                  <div className="classify">
                    <div className="cl-title">分类</div>
                    {
                      classify && classify.length>0 && classify.map((item,i) => (
                        <div className={selectedClassifyStatus[i]?"select gezi":"no-select gezi"} key={i} onClick={this.selectOne.bind(this,item,i,"classify")}>{item}</div>
                      ))
                    }
                  </div>
                )
              }
              {
                this.type != "food" && detailparams && detailparams.length>0 && (
                  <div className="classify">
                    <div className="cl-title">规格</div>
                    {
                      detailparams && detailparams.length>0 && detailparams.map((item,i)=>(
                        <div className={selectedGuigeStatus[i]?"select gezi":"no-select gezi"} key={i} onClick={this.selectOne.bind(this,item.name,i,"guige")}>{item.name}</div>
                      ))
                    }
                  </div>
                )
              }
              <div className="account">
                <span>数量</span>
                <div className="count-input">
                  <button onClick={()=>this.compute("sub",proNum)}>-</button>
                  <input type="text" readOnly value={proNum || 1}/>
                  <button onClick={()=>this.compute("add",proNum)}>+</button>
                </div>
              </div>
              <div className="modal-btn">
                <button className="addCart" onClick={this.addCart.bind(this,detail)}>加入购物车</button>
                <button className="buynow" onClick={()=> this.confirmOrder()}>立即购买</button>
              </div>
            </div>
          </Modal>
          <Modal
            popup
            visible={this.state.guigeModal}
            onClose={this.onClose('guigeModal')}
            animationType="slide-up"
            // afterClose={() => { alert('afterClose'); }}
          >
            <div className="pro-params" style={fontsize ? {fontSize: fontsize}: {fontSize: "13px"}}>
              <div className="pp-title">产品参数</div>
              <div className="list">
                {
                  detailparams && detailparams.length>0 && detailparams.map((item,i)=>(
                    <div className="params-item" key={i}>
                      <div className="pi-name">{item.name}</div>
                      <div className="pi-value">{item.value}</div>
                    </div>
                  ))
                }
              </div>
              <button className="finish" onClick={this.onClose("guigeModal")}>完成</button>
            </div>
          </Modal>
          <div className="pro-img">
            {
              imageList && imageList.length >0 && imageList.map((item,i)=>(
                <img src={item} key={i}/>
              ))
            }
          </div>
        </div>
        <div className="bottom-btn">
          <div className="btn-nav">
            <img src={require("../../assets/image/store.svg")} alt="" onClick={()=> this.props.history.push("/home")}/>
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