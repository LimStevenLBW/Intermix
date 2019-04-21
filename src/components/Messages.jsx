import {Component} from "react";
import React from "react";
import { isNullOrUndefined } from "util";

class Messages extends Component {
  render() {
    const {messages} = this.props;
    return (
      <ul className="Messages-list">
        {messages.map(
          m => this.renderMessage(m)
          )}
      </ul>
    );
  }

  renderMessage(message) {
    //props user, text are from message;

   
    let className;
       //Determine whether or not the message belongs to the current user
      const isSentByMe = (message.user.id) === (this.props.currentUser.id);
      className = isSentByMe ?
      "Messages-message currentMember" : "Messages-message";
  
      return (
        <li className={className}>
          <span
            className="avatar"
            style={{backgroundColor: message.user.clientData.color}}
            //style={{backgroundImage: "url(" + {image} + ")"}}
        
          />
            <div className="Message-content">
              <div className="username">
                {message.user.clientData.username}
              </div>
              <div className="text">{message.text}</div>
            </div>
            
          </li>
      );
    }
  }


export default Messages;