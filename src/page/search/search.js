import React, { Component } from 'react';
import { observer } from 'mobx-react';

import './search.less'

@observer
class search extends Component{
  constructor(props,context) {
    super(props,context)
    this.state= {

    }
  }

  render() {
    return(
      <div className="search"></div>
    )
  }
}

export default search;