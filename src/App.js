import React from 'react';
import './App.css';
import Messages from "./Components/Messages/MessageField"

class App extends React.Component{
  state = {
    messages: [],
    author: "Mark",
  }
  componentDidUpdate(){
    if(this.state.messages.length %2 === 1)
    {
      setTimeout(()=>this.setState({messages: [...this.state.messages,"Ok"]}),1000);
    }
  }
  handleClick = () =>{
    this.setState(prevState =>({
      messages: [...prevState.messages,"Normalno"]
    }))
  }
  render(){
  return (
    <div className="App">
        <Messages messages = {this.state.messages} author = {this.state.author}/>
        <button onClick = {this.handleClick}>Click</button>
    </div>
  );
};
}

export default App;
