import React, { Component } from 'react';
import Chat from './components/Chat.jsx'

class App extends Component {
  constructor(){
    super();
  };

  componentDidMount() {};
  

  render() {
    return (
      <React.Fragment>
         <Chat />
      </React.Fragment>
    );
  }
}

export default App;
