import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { NavBar, Icon, Toast } from 'antd-mobile'
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
    if(localStorage.getItem("fontsize")){
      let em = localStorage.getItem("fontsize")
      document.body.style.fontSize= em
    }else{
      document.body.style.fontSize= "14px"
    }
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
  saveProduct(val){
    api.saveProductRecord({
      id: val.id,
      name: val.name,
      type: val.type,
      price: val.price,
      imageUrl: val.imageUrl,
      userToken: localStorage.getItem("localStorage")
    }).then(data => {
      if(data.resultCode == 0){
        Toast.success(data.resultMsg)
      }else{
        Toast.error(data.resultMsg)
      }
    })
  }
  render() {
    let { classifyList } = this.state
    return(
      <div className="classify">
        <NavBar
          mode="light"
          icon={<div className="back" key="back"></div>}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={[
          <div className="home" key="home" onClick={()=> this.props.history.push("/home")}></div>
          ]}
        >分类</NavBar>
        <div className="proTr">
          {
            classifyList.map((item,index) =>(
              <div className="hr-detail" key={index}>
                  <div className="product-img" onClick={()=>{this.url("/productDetail/"+item.id+"/"+item.type)}}>
                    <img src={item.imageUrl} alt=""/>
                  </div>
                  <div className="name" onClick={()=>{this.url("/productDetail/"+item.id+"/"+item.type)}}>{item.name}</div>
                  <div className="pd-price">
                    <p className="price">￥{item.price}</p>
                    <img src={require("../../assets/image/save.svg")} onClick={()=>this.saveProduct(item)} alt=""/>
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