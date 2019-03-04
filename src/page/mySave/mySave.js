import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { NavBar, Icon, Toast } from 'antd-mobile';
import api from '../server'
import './mySave.less'

@observer
class mySave extends Component{
  constructor(props,context) {
    super(props,context)
    this.state= {
      saveList: []
    }
  }

  componentWillMount() {
    api.getSaveList().then(data =>{
      if(data.resultCode == 0){
        this.setState({
          saveList: data.data
        })
      }
    })
  }

  deleteIt(id) {
    Toast.loading("Loading...",999)
    api.deleteSaveProduct({
      params:{
        id
      }
    }).then(data=>{
      if(data.resultCode == 0){
        this.setState({
          saveList: data.data
        })
        Toast.hide()
      }
    })
  }

  render(){
    let { saveList } = this.state
    return (
      <div className="mysave">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={[
            // <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >收藏清单</NavBar>
        <div className="save-list">
          {
            saveList && saveList.length>0 ?saveList.map((item,index) => (
              <div className="hr-detail" key={index}>
                <div className="product-img" onClick={()=>{this.url("/productDetail/"+item.id)}}>
                  <img src={require("../../assets/image/"+item.imageUrl)} alt=""/>
                </div>
                <div className="name" onClick={()=>{this.url("/productDetail/"+item.id)}}>{item.name}</div>
                <div className="pd-price">
                  <p className="price">￥{item.price}</p>
                  <img src={require("../../assets/image/delete.svg")} onClick={()=>this.deleteIt(item.id)} alt=""/>
                </div>
              </div>
            )):
            <div className="empty">
              <img src={require("../../assets/image/empty_cart.png")} alt=""/>
              <div className="tip">您还未收藏任何东西</div>
              <button>再逛逛</button>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default mySave;