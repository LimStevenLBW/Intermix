import {Component} from "react";
import React from "react";

/**
 * Handles User Text Input
 */
class Input extends Component {
  state = {
    text: ""
  }

  /**
   * 
   * @param {} e 
   */
  onChange(e) {
    this.setState({text: e.target.value});
  }

  onSubmit(e) {
    //Disable Default Behavior
    e.preventDefault();
    //Reset text state
    this.setState({text: ""});
    //Callback to app.onSendMessage
    this.props.onSendMessage(this.state.text);
  }

  render() {
    return (
      <div className="Input">
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            onChange={e => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Write a message~"
            autoFocus={true}
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
  
}

export default Input;