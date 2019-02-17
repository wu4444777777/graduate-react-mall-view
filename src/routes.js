import React, {Component} from 'react'
import {HashRouter, Switch, Route} from 'react-router-dom'

//模板路径
import home from './page/home/home'

var routerList = [{
  path: '/home',
  componentPath: home,
  title: '首页'
}]


export default class RouteConfig extends Component {
  setTitle(title) {
    document.title = title
  } 

  render () {
    return (
      <HashRouter>
        <Switch>
          {
            routerList.map((item,index) => (
              <Route 
                path={item.path}
                component={item.componentPath}
                onEnter={()=> this.setTitle(item.title)}
                key={"routes"+index}
                 />
              )
            )
          }
          {/* <Route path="/home" exact component= {home} /> */}
        </Switch>
      </HashRouter>
    )
  }
}