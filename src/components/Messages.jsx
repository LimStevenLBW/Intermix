import {Component} from "react";
import React from "react";

class Messages extends Component {
  render() {
    const {messages} = this.props;
    return (
      <ul className="Messages-list">
        {messages.map(m => this.renderMessage(m))}
      </ul>
    );
  }

  renderMessage(message) {
    const {user, text} = message;
    const {currentUser} = this.props;

    const messageFromMe = user.id === currentUser.id;

    const className = messageFromMe ?
      "Messages-message currentMember" : "Messages-message";
    return (
      <li className={className}>
        <span
          className="avatar"
          style={{backgroundColor: user.clientData.color}}
        />
          <div className="Message-content">
            <div className="username">
              {user.clientData.username}
            </div>
            <div className="text">{text}</div>
          </div>
        </li>
    );
  }
}

export default Messages;