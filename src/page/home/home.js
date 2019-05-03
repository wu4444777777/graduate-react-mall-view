import React, { Component } from 'react';
import { toJS } from 'mobx'
import { observer } from 'mobx-react';
import { Carousel, Flex, Toast, Modal } from 'antd-mobile'
import BottomBar from '../common/bottomBar/bottomBar'
import API from '../../page/server';
import './home.less';
const alert = Modal.alert;

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
    if(!localStorage.getItem("mallModel")){
      alert('选择模式', <div>有两种选择</div>, [
        { text: '普通模式', onPress: () => {
          localStorage.setItem("mallModel","1")
          this.setState({
            mallModel: 1
          })
        }},
        { text: '老年人模式', onPress: () => {
          localStorage.setItem("mallModel","2")
          this.setState({
            mallModel: 2
          })
          alert('选择字体大小','', [
            { text: '小', style:{ fontSize: 14}, onPress: () => {
              localStorage.setItem("fontsize","0.6rem")
              this.setState({
                fontsize: "0.6rem"
              })
              document.body.style.fontSize= "0.6rem"              
            }
          },
            { text: '中', style:{ fontSize: 18}, onPress: () => {
              localStorage.setItem("fontsize","0.8rem");
              this.setState({
                fontsize: "0.8rem"
              })
              document.body.style.fontSize= "0.8rem"  
           }},
            { text: '大', style:{ fontSize: 22}, onPress: () => {
              localStorage.setItem("fontsize","1rem") ;
              this.setState({
                fontsize: "1rem"
              })
              document.body.style.fontSize= "1rem"
            }},
            { text: '特大', style:{ fontSize: 26}, onPress: () => {
              localStorage.setItem("fontsize","1.2rem");
              this.setState({
                fontsize: "1.2rem"
              })
              document.body.style.fontSize= "1.2rem"
            }},
            { text: '超大', style:{ fontSize: 30}, onPress: () => {
              localStorage.setItem("fontsize","1.4em");
              this.setState({
                fontsize: "1.4rem"
              })
              document.body.style.fontSize= "1.4rem"
            }},
          ])
        }},
      ])
    }else{
      this.setState({
        mallModel: localStorage.getItem("mallModel")
      })
    }
    if(localStorage.getItem("fontsize")){
      let em = localStorage.getItem("fontsize")
      document.body.style.fontSize= em
      // window.location.reload(true)
    }else{
      document.body.style.fontSize= "13px"
      // window.location.reload(true)
    }
  }

  url(path) {
    this.props.history.push(path)
  }

  saveProduct(data) {
    API.saveProductRecord({
      ...data,
      userToken: localStorage.getItem("userToken")
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
    let { carouselImg, mallModel } = this.state
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
            <img src={require("../../assets/image/user.jpg")} alt=""/>
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
        {
          mallModel && mallModel == 2 ? (
            <div className="disparture">
              <Flex>
                <Flex.Item onClick={this.url.bind(this,"/classify/cloth")}>
                  <img src={require("../../assets/image/part-cloth.png")} alt=""/>
                  <p>衣服</p>
                </Flex.Item>
                <Flex.Item onClick={this.url.bind(this,"/classify/food")}>
                  <img src={require("../../assets/image/part-food.png")} alt=""/>
                  <p>食品</p>
                </Flex.Item>
                <Flex.Item onClick={this.url.bind(this,"/classify/life")}>
                  <img src={require("../../assets/image/part-live.png")} alt=""/>
                  <p>日用品</p>
                </Flex.Item>
              </Flex>
              <Flex>
                <Flex.Item onClick={this.url.bind(this,"/classify/shoes")}>
                  <img src={require("../../assets/image/part-shoes.png")} alt=""/>
                  <p>鞋子</p>
                </Flex.Item>
                <Flex.Item onClick={this.url.bind(this,"/classify/pill")}>
                  <img src={require("../../assets/image/part-old-pill.png")} alt=""/>
                  <p>药品</p>
                </Flex.Item>
                <Flex.Item onClick={this.url.bind(this,"/classify/bag")}>
                  <img src={require("../../assets/image/part-case.png")} alt=""/>
                  <p>箱包</p>
                </Flex.Item>
              </Flex>
            </div>
          ):
          (
            <div className="disparture">
              <Flex>
                <Flex.Item onClick={this.url.bind(this,"/classify/cloth")}>
                  <img src={require("../../assets/image/part-cloth.png")} alt=""/>
                  <p>衣服</p>
                </Flex.Item>
                <Flex.Item onClick={this.url.bind(this,"/classify/food")}>
                  <img src={require("../../assets/image/part-food.png")} alt=""/>
                  <p>食品</p>
                  </Flex.Item>
                <Flex.Item onClick={this.url.bind(this,"/classify/digital")}>
                  <img src={require("../../assets/image/part-diginal.png")} alt=""/>
                  <p>数码产品</p>
                </Flex.Item>
                <Flex.Item onClick={this.url.bind(this,"/classify/life")}>
                  <img src={require("../../assets/image/part-live.png")} alt=""/>
                  <p>生活用品</p>
                </Flex.Item>
              </Flex>
              <Flex>
                <Flex.Item onClick={this.url.bind(this,"/classify/shoes")}>
                  <img src={require("../../assets/image/part-shoes.png")} alt=""/>
                  <p>鞋子</p>
                </Flex.Item>
                <Flex.Item onClick={this.url.bind(this,"/classify/decorate")}>
                  <img src={require("../../assets/image/part-huazhuang.png")} alt=""/>
                  <p>化妆品</p>
                </Flex.Item>
                <Flex.Item onClick={this.url.bind(this,"/classify/decorate")}>
                  <img src={require("../../assets/image/part-decorate.png")} alt=""/>
                  <p>饰品</p>
                </Flex.Item>
                <Flex.Item onClick={this.url.bind(this,"/classify/bag")}>
                  <img src={require("../../assets/image/part-case.png")} alt=""/>
                  <p>箱包</p>
                </Flex.Item>
              </Flex>
            </div>
          )
        }
        <div className="hot-recommend">
          <div className="hr-title">精彩推荐</div>
          <div className="hr-list">
            {
              product && product.length>0 && product.map((item,index) => (
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
        <BottomBar props={this.props}/>
      </div>
    );
  }
}

export default home;
