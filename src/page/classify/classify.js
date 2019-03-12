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

  url(path){
    this.props.history.push(path)
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
              <div className="hr-detail" key={index}>
                  <div className="product-img" onClick={()=>{this.url("/productDetail/"+item.id)}}>
                    <img src={require("../../assets/image/"+item.imageUrl)} alt=""/>
                  </div>
                  <div className="name" onClick={()=>{this.url("/productDetail/"+item.id)}}>{item.name}</div>
                  <div className="pd-price">
                    <p className="price">￥{item.price}</p>
                    {/* <img src={require("../../assets/image/save.svg")} onClick={()=>this.saveProduct(item)} alt=""/> */}
                  </div>
                </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default classify;