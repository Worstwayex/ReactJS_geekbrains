import React from 'react';
import './App.css';
import Messages from "./Messages/Messages"

class App extends React.Component{
  state = {
    messages: [],
  }
  handleClick = () =>{
    this.setState(prevState =>({
      messages: [...prevState.messages,"Normalno"]
    }))
  }
  render(){
  return (
    <div className="App">
        <Messages messages = {this.state.messages}/>
        <button onClick = {this.handleClick}>Click</button>
    </div>
  );
};
}

export default App;
