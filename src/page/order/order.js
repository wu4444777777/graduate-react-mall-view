import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { NavBar, Icon } from 'antd-mobile'
import api from '../server'
import './order.less'
import { toJS } from 'mobx';

@observer
class order extends Component{
  constructor(props,context) {
    super(props,context)
    this.state= {
      preData: []
    }
  }

  componentWillMount() {
    document.title= "确认订单"
    let { orderListConfirm } = toJS(api.state)
    this.setState({
      preData: orderListConfirm 
    })
  }

  render() {
    return(
      <div className="order">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={[
            // <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >确认订单</NavBar>
        
      </div>
    )
  }
}

export default order;