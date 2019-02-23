import React, {Component} from 'react'
import {HashRouter, Switch, Route} from 'react-router-dom'

//模板路径
import home from './page/home/home'
import personalCenter from './page/personalCenter/personalCenter'

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

const setTitle = (title) => {
  document.title = title
};

export default class RouteConfig extends Component { 

  render () {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component= {home} onEnter={setTitle("首页")}/>
          <Route path="/personalCenter" component={personalCenter} onEnter={setTitle("个人中心")}/>
        </Switch>
      </HashRouter>
    )
  }
}