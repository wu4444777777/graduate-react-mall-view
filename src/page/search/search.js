import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { NavBar, SearchBar, Icon, Toast } from 'antd-mobile';
import api from '../server'

import './search.less'

@observer
class search extends Component{
  constructor(props,context) {
    super(props,context)
    this.state= {
      searchResult: [],
      searchValue: "",
      searchMsg: ""
    }
  }

  componentWillMount() {
    if(localStorage.getItem("fontsize")){
      let em = localStorage.getItem("fontsize")
      document.body.style.fontSize= em
    }else{
      document.body.style.fontSize= "14px"
    }
  }

  submit(value){
    api.sendSearchProduct({
      params:{
        name: value
      }
    }).then(data=> {
      if(data.resultCode == 0) {
        this.setState({
          searchResult: data.data
        })
      }else{
        // Toast.info(data.resultMsg)
        this.setState({
          searchMsg: data.resultMsg,
          searchResult: []
        })
      }
    })
  }

  cancel(val){
    this.setState({
      searchValue: "",
      searchResult: [],
      searchMsg: ""
    })
  }

  change(val){
    this.setState({
      searchValue: val
    })
  }

  url(path){
    this.props.history.push(path)
  }
  render() {
    let { searchResult, searchValue, searchMsg } = this.state
    return(
      <div className="search">
        <NavBar
          mode="light"
          icon={<div className="back" key="back"></div>}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={[
            <div className="home" key="home" onClick={()=> this.props.history.push("/home")}></div>
          ]}
        >搜索</NavBar>
        <div className="SearchBar">
          <SearchBar 
            placeholder="请输入您要搜索的内容"
            onSubmit={this.submit.bind(this)}
            onCancel={this.cancel.bind(this)}
            value={searchValue}
            onChange={this.change.bind(this)}
            onClear={this.cancel.bind(this)}
           />
        </div>
        <div className="searchResult">
          {
            searchResult && searchResult.length>0 ?searchResult.map((item,index) => (
              <div className="product-list" key={index}>
                <div className="proList">
                  <div className="pro-img" onClick={this.url.bind(this,"/productDetail/"+item.id+"/"+item.type)}>
                    <img src={item.imageUrl} alt=""/>
                  </div>
                  <div className="intro">
                    <div id="name" onClick={this.url.bind(this,"/productDetail/"+item.id+"/"+item.type)}>{item.name}</div>
                    <div id="price">
                      <div className="price">￥{item.price}</div>
                    </div>
                  </div>
                </div>
              </div>
            )):
            <div className="empty">
              <img src={require("../../assets/image/empty_cart.png")} alt=""/>
              <div className="tip">{searchMsg ? searchMsg: "您还未搜索任何商品！"}</div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default search;