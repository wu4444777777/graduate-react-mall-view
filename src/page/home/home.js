import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Carousel, Flex } from 'antd-mobile'
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
      ]
    }
  }
  
  componentWillMount() {
    API.getPageData()
  }
  render() {
    let { carouselImg } = this.state
    return (
      <div className="home">
        <div className="nav-bar">
          <div className="logo">
            <img src={require('../../assets/image/logo.png')} alt=""/>
          </div>
          <div className="searchBox">
            <input className="searchIpt" type="text"/>
          </div>
          <div className="user">
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
            <Flex.Item>
              <img src={require("../../assets/image/part-cloth.png")} alt=""/>
              <p>衣服</p>
            </Flex.Item>
            <Flex.Item>
              <img src={require("../../assets/image/part-food.png")} alt=""/>
              <p>食品</p>
              </Flex.Item>
            <Flex.Item>
              <img src={require("../../assets/image/part-diginal.png")} alt=""/>
              <p>数码产品</p>
            </Flex.Item>
            <Flex.Item>
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
            <div className="hr-detail">
              <img src="" alt=""/>
              <div>
                <p className="price"></p>
                <img src="" alt=""/>
              </div>
            </div>
            <div className="hr-detail">
              <img src="" alt=""/>
              <div>
                <p className="price"></p>
                <img src="" alt=""/>
              </div>
            </div>
          </div>  
        </div>
        <BottomBar/>
      </div>
    );
  }
}

export default home;
