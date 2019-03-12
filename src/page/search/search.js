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
      searchValue: ""
    }
  }

  componentWillMount() {
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
        Toast.info(data.resultMsg)
      }
    })
  }

  cancel(val){
    this.setState({
      searchValue: "",
      searchResult: []
    })
  }

  change(val){
    this.setState({
      searchValue: val
    })
  }
  render() {
    let { searchResult, searchValue } = this.state
    return(
      <div className="search">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={[
            // <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
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
                  <div className="pro-img">
                    <img src={require("../../assets/image/"+item.imageUrl)} alt=""/>
                  </div>
                  <div className="intro">
                    <div id="name">{item.name}</div>
                    <div id="price">
                      <div className="price">￥{item.price}</div>
                    </div>
                  </div>
                </div>
              </div>
            )):
            <div className="empty">
              <img src={require("../../assets/image/empty_cart.png")} alt=""/>
              <div className="tip">您还未搜索任何商品！</div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default search;