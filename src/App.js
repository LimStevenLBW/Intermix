import React, { Component } from 'react';
import Chat from './components/Chat.jsx';
import './home.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
        isRoomCreated: false,
        inputName: "",
    }
  };

  componentDidMount() {};

  /**
   * 
   * @param {} e 
   */
  onChangeHandler(e) {
    this.setState({inputName: e.target.value});
  }

  onSubmitHandler(e){
    this.createRoom(e);
  }

  createRoom(e){
    if(this.state.inputName.length <= 3){
      alert("Please input a longer name");
    }
    else{
      this.setState({isRoomCreated: true});
    }
    
  }

  render() {
    if(!this.state.isRoomCreated){
      return (
        <React.Fragment>
          <body>
            <h1>I n t e r m i x</h1>
            <h2>Start Mixing</h2>
             
            <div id ="login">
              <form onSubmit = {(e) => this.onSubmitHandler(e)}>
                <input id="image-file" type="file" />
                  Your Name:
                  <h3>
                    <input id = "nameInput" type="text" name="firstname"
                     onChange={e => this.onChangeHandler(e)} 
                     autoFocus={true}
                     value = {this.state.inputName}/>
                  </h3>
  
                <input id = "clickInput" type="button" value="Create-A-Chat" onClick = {e => this.createRoom(e)}/>
              </form> 
            </div>
          

           </body>
        </React.Fragment>
      );
    }
    else{
      return(<Chat input = {this.state.inputName}/>)
    }
   
  }
}

export default App;





