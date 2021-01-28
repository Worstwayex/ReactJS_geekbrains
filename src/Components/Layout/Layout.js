import React from 'react';
import './styles/Layout.css';
import MessageField from '../Messages/MessageField';
import ChatList from '../ChatList/ChatList'
import Header from '../Header/Header'

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header chatId = {this.props.chatId}/>
        <div className={"Layout-chat"}>
          <ChatList chatId ={this.props.chatId} />
        </div>
      </div>
    );
  };
}

export default Layout;
