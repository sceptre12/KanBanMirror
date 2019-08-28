import React, {Component} from 'react';
import openSocket from 'socket.io-client';
import QRCode from 'qrcode.react'
import './App.css';


class  App extends Component {
  constructor(props){
    super(props)
    this.state ={
      isConnected : false ,
      hasConnectionEstablished: false,
      host: '10.0.0.17:8703',
    }
    this.socket = {}
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {isConnected, hasConnectionEstablished, host} = this.state
    // const {isConnected, hasConnectionEstablished, connectionPort, serverIP} = this.state
    if(isConnected && !hasConnectionEstablished){
      console.log("REACHHH")
      this.socket = openSocket(host);
      // this.socket = openSocket(`${serverIP}:${connectionPort}`);

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
    const {host} = this.state
    console.log(host)
    // const {serverIP} = this.state
    return (
        <div className="App">
          <header className="App-header">
            <h1>
              Smart Kan
            </h1>
            <QRCode value={host.toString()} size={200} />
            {/*<QRCode value={serverIP.concat(connectionPort.toString())} size={200} />*/}
            <p>
              Scan to connect to this display
            </p>
            {/*<input type="number" value={connectionPort} onChange={this.updateConnectionPort}/>*/}
            <button onClick={this.launchSocket}>Connect</button>
          </header>
        </div>
    )
  }
}

export default App;
