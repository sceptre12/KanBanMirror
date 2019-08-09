import React, {Component} from 'react';
import openSocket from 'socket.io-client';
import QRCode from 'qrcode.react'
import logo from './logo.svg';
import './App.css';


class  App extends Component {
  constructor(props){
    super(props)
    this.state ={
      isConnected : false ,
      hasConnectionEstablished: false,
      connectionPort: 0
    }
    this.socket = {}
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {isConnected, hasConnectionEstablished, connectionPort} = this.state
    if(isConnected && !hasConnectionEstablished){
      console.log("REACHHH")
      this.socket = openSocket(`172.30.21.136:${connectionPort}`);

      this.socket.on('news', result =>{
        console.log(result)
      })
      this.setState({
        hasConnectionEstablished: true
      })
    }
  }

  updateConnectionPort = (e) =>{
    this.setState({
      connectionPort: e.target.value
    })
  }

  launchSocket  = ()=>{
    this.setState({
      isConnected: true
    })
  }

  render(){
    const {connectionPort} = this.state
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
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

            <QRCode value="8000" />
            <input type="number" value={connectionPort} onChange={this.updateConnectionPort}/>
            <button onClick={this.launchSocket}>Submit</button>
          </header>
        </div>
    )
  }
}

export default App;
