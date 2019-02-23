import React, { Component } from 'react';
import { observer } from 'mobx-react';

import './shoppingCart.less'

@observer
class shoppingCart extends Component{
  constructor(props,context) {
    super(props,context)
    this.state= {

    }
  }

  render() {
    return(
      <div className="shoppingCart"></div>
    )
  }
}

export default shoppingCart;