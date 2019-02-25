import React, {Component} from 'react'
import {HashRouter, Switch, Route} from 'react-router-dom'

//模板路径
import home from './page/home/home'
import personalCenter from './page/personalCenter/personalCenter'
import accountManage from './page/accountManage/accountManage'
import login from './page/login/login'
import register from './page/register/register'
import shoppingCart from './page/shoppingCart/shoppingCart'
import search from './page/search/search'
import productDetail from './page/productDetail/productDetail'
// var routerList = [{
//   path: '/',
//   componentPath: home,
//   title: '首页'
// },
// {
//   path: '/personalCenter',
//   componentPath: personalCenter,
//   title: "个人中心"
// }]

// const setTitle = (title) => {
//   document.title = title
// };

class RouteConfig extends Component { 
  constructor(props,context) {
    super(props,context)
    this.state = {

    }
  }

  componentWillMount() {
    console.log("参数",this.props)
  }
  render () {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component= {home} onEnter={(nextState,replaceState)=> console.log("路由",nextState)}/>
          <Route path="/personalCenter" component={personalCenter} onEnter={(nextState,replaceState)=> console.log("路由",nextState)}/>
          <Route path="/accountManage" component={accountManage} onEnter={()=> document.title ="账号管理"} />
          <Route path="/login" component={login} onEnter={()=> document.title= "登录"}/>
          <Route path="/register" component={register} onEnter={document.title= "注册"}/>
          <Route path="/shoppingCart" component={shoppingCart}/>
          <Route path="/search" component={search}/>
          <Route path="/productDetail/:id" component={productDetail}/>
        </Switch>
      </HashRouter>
    )
  }
}

export default RouteConfig;