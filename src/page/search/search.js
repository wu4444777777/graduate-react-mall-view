import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { NavBar, SearchBar, Icon } from 'antd-mobile';

import './search.less'

@observer
class search extends Component{
  constructor(props,context) {
    super(props,context)
    this.state= {

    }
  }

  componentWillMount() {
    console.log("搜索参数",this.props)
  }

  render() {
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
          <SearchBar placeholder="Search" maxLength={8} />
        </div>
      </div>
    )
  }
}

export default search;