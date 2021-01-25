import React from "react"
import Message from "./Messages"
import { TextField} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import "./styles/MessageField.css"
export default class MessageField extends React.Component{
    // console.log(props)
    state = {
        messages: [{text: "Hello", author:"bot"},{text: "I'm Bot", author:"bot"}],
        input: '',
      }
      componentDidUpdate(){
        if(this.state.messages.length %2 === 1 && this.state.input === '')
        {
          setTimeout(()=>this.setState({messages: [...this.state.messages,{text: "Hello", author:"bot"}]}),1000);
        }
      }
      handleClick = (message) =>{
        this.sendMessage()
      }
      handleChange = (event) =>{
          this.setState({input: event.target.value})
      }
      handleKeyUp = (event, message) => {
        if (event.keyCode === 13) { // Enter
            this.sendMessage(message)
        }
    };
    sendMessage = (message) =>{
        this.setState(prevState =>({
            messages: [...prevState.messages,{text: message, author:"me"}],
            input: '',
          }))
    }
    render(){

    return(
        <div className="layout">
            <div className="message-field">
                {this.state.messages.map((message) => <Message text={message.text} author={message.author} />)}
            </div>
            <div style={{ width: '100%', display: 'flex' }}>
                <TextField
                    onChange={this.handleChange}
                    value={this.state.input}
                    name="input"
                    fullWidth={true}
                    hintText="Введите сообщение"
                    style={{ fontSize: '22px' }}
                    onKeyUp={(event) => this.handleKeyUp(event, this.state.input)}
                />
                <Fab size ="small" onClick={() => this.handleClick(this.state.input)}>
                    <SendIcon />
                </Fab>
            </div>

        </div>
    )
    }
}