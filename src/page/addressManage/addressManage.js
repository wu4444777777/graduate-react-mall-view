import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { NavBar, Icon, Checkbox, Toast, Radio, List } from 'antd-mobile';
import api from '../server'
import util from '../../utils/index'
import './addressManage.less'
import { toJS } from 'mobx';
const RadioItem = Radio.RadioItem;


@observer
class addressManage extends Component{
  constructor(props,context) {
    super(props,context)
    this.state= {
      addressList: [],
      type: 0 ,//两种模式，0是查看模式，1是选择模式
      checkedAddress: {},
      value: 0
    }
    this.goback = util.handleQueryUrl("goback")
  }

  componentWillMount(){
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
    if(this.goback == 'confirmOrder'){
      this.setState({
        type: 1
      })
    }else{
      this.setState({
        type: 0
      })
    }
    api.getAddressList({
      params:{
        userToken: localStorage.getItem("userToken")
      }
    }).then(data =>{
      this.setState({
        addressList: data.data,
        checkedAddress: data.data[0]
      })
    })
  }

  edit(id){
    if(this.goback == "confirmOrder"){
      this.props.history.push("/addAddress?goback=confirmOrder&id="+id)
    }else{
      this.props.history.push("/addAddress?id="+id)
    }
  }

  deleteAddress(id){
    api.deleteAddress({
      params: {
        id,
        userToken: localStorage.getItem("userToken")
      }
    }).then(data => {
      if(data.resultCode == 0){
        this.setState({
          addressList: data.data
        })
      }
    })
  }

  addNewAddress(){
    if(this.goback == 'confirmOrder'){
      this.props.history.push("/addAddress?goback=confirmOrder")
    }else{
      this.props.history.push("/addAddress")
    }
  }
  
  changeCheck(e,item,index){
    let { checkedAddress } = this.state
    console.log("选中",e.target.checked)
    if(e.target.checked){
      checkedAddress = item
    }else{
      checkedAddress = {}
    }
    console.log("checkedAddress",checkedAddress)
    this.setState({
      checkedAddress,
      value: index
    })
  }

  ok(){
    let { checkedAddress } = this.state
    let { orderListConfirm } = toJS(api.state)
    if(checkedAddress) {
      api.setStoreData("address",checkedAddress)
      api.setStoreData("orderListConfirm",orderListConfirm)
      this.props.history.push("/confirmOrder?goback=addressManage")
    }else{
      Toast.info("请选择地址",3)
    }
  }

  onChange = (value) => {
    console.log('checkbox');
    this.setState({
      value,
    });
  };

  render(){
    let { addressList, type, value, fontsize } = this.state
    return (
      <div className="addressName">
        <NavBar
          mode="light"
          icon={<div className="back" key="back"></div>}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={[
            <div className="addNewAddress" key="add" onClick={this.addNewAddress.bind(this)}>新增地址</div>
          ]}
        >地址管理</NavBar>
        {
          type === 0 && (
            <div className="addressList">
              {
                addressList.map((item,index) => (
                  <div className="address-detail" key={index}>
                    <div className="xing">
                      <div><span>{item.username && item.username.substring(0,1)}</span></div>
                    </div>
                    <div className="user-content">
                      <div className="userInfo">
                        <div className="username">{item.username}</div>
                        <div className="userphone">{item.userphone}</div>
                      </div>
                      <div className="user-address">
                        {
                          item.prior==1 && (
                            <span className="moren">默认</span>
                          )
                        }
                        {item.province+item.city+item.district+item.detailAddress}</div>
                    </div>
                    <div className="operation">
                      <span onClick={this.edit.bind(this,item.id)}>编辑</span>
                      <span className="shuxian">|</span>
                      <span onClick={this.deleteAddress.bind(this,item.id)}>删除</span>
                    </div>
                  </div>
                ))
              }
            </div>
          )
        }
        {
          type === 1 && (
            <div className="addressList edit">
              <List>
              {
                addressList.map((item,index) => (
                  <RadioItem key={index} key={index} checked={value === index} onChange={(e) => this.changeCheck(e,item,index)}>
                    <div className="address-detail" key={index} style={{fontSize: fontsize}}>
                      <div className="xing">
                        <div><span>{item.username && item.username.substring(0,1)}</span></div>
                      </div>
                      <div className="user-content">
                        <div className="userInfo">
                          <div className="username">{item.username}</div>
                          <div className="userphone">{item.userphone}</div>
                        </div>
                        <div className="user-address">
                          {
                            item.prior==1 && (
                              <span className="moren">默认</span>
                            )
                          }
                          {item.province+item.city+item.district+item.detailAddress}</div>
                      </div>
                      <div className="operation">
                        <span onClick={this.edit.bind(this,item.id)}>编辑</span>
                        <span className="shuxian">|</span>
                        <span onClick={this.deleteAddress.bind(this,item.id)}>删除</span>
                      </div>
                    </div>
                  </RadioItem>  
                ))
              }
              </List>
              <div className="confirmButton" onClick={this.ok.bind(this)}>确认</div>
            </div>
          )
        }
      </div>  
    )
  }
}

export default addressManage;