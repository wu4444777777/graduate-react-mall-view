import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { NavBar, Icon } from 'antd-mobile'
import api from '../server'
import './classify.less'

@observer
class classify extends Component{
  constructor(props,context) {
    super(props,context)
    this.state= {
      classifyList: []
    }
  }

  componentWillMount() {
    document.title = "分类"
    api.getClassifyList({
      params:{
        type: this.props.match.params.type
      }
    }).then(data =>{
      this.setState({
        classifyList: data.data
      })
    })
  }

  render() {
    let { classifyList } = this.state
    return(
      <div className="classify">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={[
            // <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >分类</NavBar>
        <div className="proTr">
          {
            classifyList.map((item,index) =>(
              <div className="proMod" key={"classify"+index}>
                <a href={"#/productDetail/"+item.id}>
                  <img src={require("../../assets/image/"+item.image)} alt=""/>
                </a>
                <a href={"#/productDetail/"+item.id}>
                  <span className="proName">{item.name}</span>
                </a>
                <span className="price">￥{item.price}</span>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default classify;