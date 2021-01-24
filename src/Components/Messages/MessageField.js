import React from "react"
import Message from "./Messages"
export default class MessageField extends React.Component{
    // console.log(props)
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

    return(
        <div className="App">
            {this.state.messages.map((message) => <Message message={message} author = {this.state.author}/>)}
            <button onClick = {this.handleClick}>Send</button>
        </div>
    )
    }
}