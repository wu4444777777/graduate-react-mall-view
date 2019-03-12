import React, { Component } from 'react';
import { toJS } from 'mobx'
import { observer } from 'mobx-react';
import { Carousel, Flex, Toast } from 'antd-mobile'
import BottomBar from '../common/bottomBar/bottomBar'
import API from '../../page/server';
import './home.less';

@observer
class home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      carouselImg: [
        require("../../assets/image/1.jpg"),
        require("../../assets/image/2.jpg"),
        require("../../assets/image/3.jpg")
      ],
      loginStatus: 0,
    }
  }
  
  componentWillMount() {
    let { loginStatus } = this.state
    document.title = "首页"
    API.getPageData()
    if(loginStatus == 1) {
      this.setState({
        loginStatus: 1
      })
    }else{
      this.setState({
        loginStatus: 0
      })
    }
  }

  url(path) {
    this.props.history.push(path)
  }

  saveProduct(data) {
    API.saveProductRecord({
      ...data
    }).then((res) =>{
      if(res.resultCode == 0) {
        Toast.success(res.resultMsg)
      }else{
        Toast.info(res.resultMsg)
      }
    })
  }
  checkIsLogin(){
    let userFlag = localStorage.getItem("userFlag")
    if(userFlag == 1){
      this.url("/accountManage")
    }else{
      this.url("/login")
    }
  }
  render() {
    let { carouselImg } = this.state
    let { product } = toJS(API.state)
    return (
      <div className="home">
        <div className="nav-bar">
          <div className="logo">
            <img src={require('../../assets/image/logo.png')} alt=""/>
          </div>
          <div className="searchBox">
            <input className="searchIpt" type="text" 
              onFocus={this.url.bind(this,"/search")}  
            />
          </div>
          <div className="user" onClick={this.checkIsLogin.bind(this)}>
            <img src={require("../../assets/image/user.svg")} alt=""/>
          </div>
        </div> 
        <Carousel 
          className="my-carousel"
          dots={true}
          autoplay
          infinite
        >
        {
          carouselImg.map((item,index) => (
            <img src={item} key={index} alt=""/>
          ))
        } 
        </Carousel>
        <div className="disparture">
          <Flex>
            <Flex.Item onClick={this.url.bind(this,"/classify/coffee")}>
              <img src={require("../../assets/image/part-cloth.png")} alt=""/>
              <p>衣服</p>
            </Flex.Item>
            <Flex.Item onClick={this.url.bind(this,"/classify/bean")}>
              <img src={require("../../assets/image/part-food.png")} alt=""/>
              <p>食品</p>
              </Flex.Item>
            <Flex.Item onClick={this.url.bind(this,"/classify/cookie")}>
              <img src={require("../../assets/image/part-diginal.png")} alt=""/>
              <p>数码产品</p>
            </Flex.Item>
            <Flex.Item onClick={this.url.bind(this,"/classify/bottle")}>
              <img src={require("../../assets/image/part-live.png")} alt=""/>
              <p>生活用品</p>
            </Flex.Item>
          </Flex>
          <Flex>
            <Flex.Item>
              <img src={require("../../assets/image/part-shoes.png")} alt=""/>
              <p>鞋子</p>
            </Flex.Item>
            <Flex.Item>
              <img src={require("../../assets/image/part-huazhuang.png")} alt=""/>
              <p>化妆品</p>
            </Flex.Item>
            <Flex.Item>
              <img src={require("../../assets/image/part-decorate.png")} alt=""/>
              <p>饰品</p>
            </Flex.Item>
            <Flex.Item>
              <img src={require("../../assets/image/part-case.png")} alt=""/>
              <p>箱包</p>
            </Flex.Item>
          </Flex>
        </div>
        <div className="hot-recommend">
          <div className="hr-title">精彩推荐</div>
          <div className="hr-list">
            {
              product && product.length>0 && product.map((item,index) => (
                <div className="hr-detail" key={index}>
                  <div className="product-img" onClick={()=>{this.url("/productDetail/"+item.id)}}>
                    <img src={require("../../assets/image/"+item.imageUrl)} alt=""/>
                  </div>
                  <div className="name" onClick={()=>{this.url("/productDetail/"+item.id)}}>{item.name}</div>
                  <div className="pd-price">
                    <p className="price">￥{item.price}</p>
                    <img src={require("../../assets/image/save.svg")} onClick={()=>this.saveProduct(item)} alt=""/>
                  </div>
                </div>
              ))
            }
          </div>  
        </div>
        <BottomBar props={this.props}/>
      </div>
    );
  }
}

export default home;
