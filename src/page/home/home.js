import React, { Component } from 'react';
import { observer } from 'mobx-react'
import axios from 'axios'
import './home.less';

@observer
class home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    }
  }
  
  componentWillMount() {
    axios.get('http://localhost:4530/page/getData',{}).then((data) => {
      console.log("数据",data)
    }).catch((error)=>{
      console.log("错误",error)
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default home;
