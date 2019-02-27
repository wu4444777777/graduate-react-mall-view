import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { NavBar, Icon, Checkbox } from 'antd-mobile';
import './shoppingCart.less'
const CheckboxItem = Checkbox.CheckboxItem;

@observer
class shoppingCart extends Component{
  constructor(props,context) {
    super(props,context)
    this.state= {

    }
  }

  render() {
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
        <CheckboxItem>
          <div className="product-detail">
            <div className="image">
              <img src={require("../../assets/image/bean1.jpg")} alt=""/>
            </div>
            <div className="detail">
              <div className="pd-name">coffee</div>
              <div className="price">￥122.25</div>
              <div className="bottom">
                <div className="count">
                  <div className="sub"></div>
                  <input type="text" defaultValue="1"/>
                  <div className="add"></div>
                </div>
                <div className="delete">
                  <img src={require("../../assets/image/delete.svg")} alt=""/>
                </div>
              </div>
            </div>
          </div>
        </CheckboxItem>
      </div>
      <div className="count">
        
      </div>
      </div>
    )
  }
}

export default shoppingCart;