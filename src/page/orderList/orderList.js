import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { NavBar, Icon, Toast, Tabs, SearchBar } from 'antd-mobile'
import api from '../server'
import './orderList.less'
import { toJS } from 'mobx';

@observer
class orderList extends Component{
  constructor(props,context) {
    super(props,context)
    this.state= {
      tabs: [
        { title: '已付款', sub: '1', status: 101},
        { title: '待付款', sub: '2', status: 102 },
        // { title: '待评价', sub: '3' },
      ],
    }
    this.userToken = localStorage.getItem("userToken")
  }

  componentWillMount() {
    if(localStorage.getItem("fontsize")){
      let em = localStorage.getItem("fontsize")
      document.body.style.fontSize= em
    }else{
      document.body.style.fontSize= "14px"
    }
    if(location.hash.indexOf("?") != -1){
      this.setState({
        tabIndex: location.hash.split("?")[1].split("=")[1]
      })
    }else{
      this.setState({
        tabIndex: 0
      })
    }
    api.getOrderList({
      params: {
        orderStatus: 101,
        userToken: this.userToken
      }
    }).then(data=>{
      this.setState({
        orderList: data.data
      })
    })
  }

  submit(value){
    api.searchOrder({
      params:{
        name: value
      }
    }).then(data=> {
      if(data.resultCode == 0) {
        this.setState({
          orderList: data.data
        })
      }else{
        Toast.info(data.resultMsg)
      }
    })
  }

  getOrderLists(tab){
    api.getOrderList({
      params: {
        orderStatus: tab.status,
        userToken: this.userToken
      }
    }).then(data=>{
      this.setState({
        orderList: data.data
      })
    })
  }
  
  render() {
    let { tabs, orderList, tabIndex } = this.state
    return(
      <div className="orderList">
        <NavBar
          mode="light"
          icon={<div className="back" key="back"></div>}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={[
          <div className="home" key="home" onClick={()=> this.props.history.push("/home")}></div>
          ]}
        >我的订单</NavBar>
        <div className='searchBox' >
          <SearchBar
            placeholder='商品名称/订单号'
            onSubmit={this.submit.bind(this)}
          />
        </div>
        <div className='mo_orderBox'>
					<div>
          <Tabs tabs={tabs}
            initialPage={parseInt(tabIndex)}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => this.getOrderLists(tab)}
          >
            <div>
              {
               orderList && orderList.length> 0 ? orderList.map((item,index) =>(
                <div className="product-list" key={index}>
                  <div className="proList">
                    <div className="pro-img">
                      <img src={item.imageUrl} alt=""/>
                    </div>
                    <div className="intro">
                      <div id="name">{item.productName}</div>
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
                      <span className="price">￥{item.num*item.price}</span>
                    </span>
                  </div>
                </div>
                )):<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                未有该订单
                </div>
              }
            </div>
            <div >
              {
               orderList && orderList.length> 0 ? orderList.map((item,index) =>(
                <div className="product-list" key={index}>
                  <div className="proList">
                    <div className="pro-img">
                      <img src={item.imageUrl} alt=""/>
                    </div>
                    <div className="intro">
                      <div id="name">{item.productName}</div>
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
                </div>
                )):<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                未有该订单
                </div>
              }
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
            未有该订单
            </div>
          </Tabs>
					</div>
				</div>
      </div>
    )
  }

}

export default orderList;