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
import confirmOrder from './page/confirmOrder/confirmOrder'
import classify from './page/classify/classify'
import orderList from './page/orderList/orderList'
import mySave from './page/mySave/mySave'
import addressManage from './page/addressManage/addressManage'
import addAddress from './page/addAddress/addAddress'

class RouteConfig extends Component { 
  constructor(props,context) {
    super(props,context)
    this.state = {

    }
  }

  componentWillMount() {
  }
  render () {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component= {home}/>
          <Route path="/personalCenter" component={personalCenter}/>
          <Route path="/accountManage" component={accountManage} />
          <Route path="/login" component={login}/>
          <Route path="/register" component={register}/>
          <Route path="/shoppingCart" component={shoppingCart}/>
          <Route path="/search" component={search}/>
          <Route path="/productDetail/:id" component={productDetail}/>
          <Route path="/confirmOrder" component={confirmOrder}/>
          <Route path="/classify/:type" component={classify}/>
          <Route path="/orderList" component={orderList}/>
          <Route path="/mySave" component={mySave}/>
          <Route path="/addressManage" component={addressManage}/>
          <Route path="/addAddress" component={addAddress}/>
        </Switch>
      </HashRouter>
    )
  }
}

export default RouteConfig;