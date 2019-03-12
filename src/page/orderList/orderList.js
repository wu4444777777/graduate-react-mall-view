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
        { title: '已付款', sub: '1' },
        { title: '待付款', sub: '2' },
        { title: '待评价', sub: '3' },
      ]
    }
  }

  componentWillMount() {
    api.getOrderList().then(data=>{
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
  
  render() {
    let { tabs, orderList } = this.state
    return(
      <div className="orderList">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={[
            // <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
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
            initialPage={0}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >
            <div>
              {
               orderList && orderList.length> 0 && orderList.map((item,index) =>(
                <div className="product-list" key={index}>
                  <div className="proList">
                    <div className="pro-img">
                      <img src={require("../../assets/image/"+item.imageUrl)} alt=""/>
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
                ))
              }
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
              未有该订单
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