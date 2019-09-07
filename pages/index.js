import React, {Component,Fragment} from 'react';
import Head from 'next/head'

import openSocket from 'socket.io-client';
import QRCode from 'qrcode.react'
import './App.css';


class  App extends Component {
  static getInitialProps({query}){
    return {query}
  }
  constructor(props){
    super(props)
    this.state ={
      hasConnectionEstablished: false,
      host: '',
    }
    this.socket = {}
  }

  componentDidMount() {
    const {ipAddress, port} = this.props.query
    const host = `${ipAddress}:${port}`
    try{
      this.socket = openSocket(host)
      this.setState({
        hasConnectionEstablished: true,
        host
      }, ()=>{
        this.__socketListeners()
      })
    }catch(e){
      console.error(e)
    }
  }

  /**
   * TODO attach more listeners here
   * @private
   */
  __socketListeners = () =>{
    this.socket.on('news', result =>{
      console.log(result)
    })
  }

  /**
   * TODO clean this up
   * @returns {*}
   */
  render(){

    const {host,hasConnectionEstablished} = this.state
    return (
        <Fragment>
          <Head>
            <title>Smart Kan</title>
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
                key="viewport"
            />
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                crossOrigin="anonymous"
            />
          </Head>
        <div className="App">
          <header className="App-header">
            <h1>
              Smart Kan
            </h1>
            {
              hasConnectionEstablished?  <QRCode value={host.toString()} size={200} />: null
            }
            {
              hasConnectionEstablished? (<p>
                Scan to connect to this display
              </p>) : (
                  <div>
                    Waiting on Connection to be established
                  </div>
              )
            }
          </header>
        </div>
        </Fragment>
    )
  }
}

export default App;
