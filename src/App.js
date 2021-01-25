import React from 'react';
import './App.css';
import MessageField from './Components/Messages/MessageField';
import ChatList from './Components/ChatList/ChatList'
import Header from './Components/Header/Header'

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div style={{ width: '100%', display: 'flex', marginTop: "10px" }}>
          <ChatList />
          <MessageField />
        </div>
      </div>
    );
  };
}

export default Layout;
