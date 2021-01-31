import React from "react"
import Message from "./Messages"
import { TextField} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import "./styles/MessageField.css"

import { bindActionCreators } from "redux";
import {sendMessage} from '../../Store/actions/messageActions'
import connect from "react-redux/es/connect/connect";

class MessageField extends React.Component{
    // console.log(props)
    state = {
        // messages: [{text: "Hello", author:"bot"},{text: "I'm Bot", author:"bot"}],
        // input: '',
        
        // chats: this.props.chats,
        // messages: {
        //     1: { text: "Привет!", author: 'bot' },
        //     2: { text: "Здравствуйте!", author: 'bot' },
        // },
        input: '',
 
      }
      componentDidUpdate(prevProps, prevState) {
        // const {messages} = this.state;
        const {chats,messages} = this.props;
        if (Object.keys(prevProps.messages).length < Object.keys(messages).length &&
            Object.values(messages)[Object.values(messages).length - 1].author === 'me')
        {
          setTimeout(()=>this.sendMessage('Хорошо', 'bot'),1000);
        }
        if(Object.keys(prevProps.chats).length < Object.keys(this.props.chats).length)
        {
            this.setState({chats:{...chats,[Object.keys(chats).length+1]:
                {title: chats[chats.length-1], messageList:[]}}})
        }
      }
      sendMessage = (message, author) => {
        const { input } = this.state;
        const { chats, chatId,messages } = this.props;

        if (input.length > 0 || author === 'bot') {
            const messageId = Object.keys(messages).length + 1;
            // this.setState({
            //     messages: {...messages,
            //         [messageId]: {text: message, author: author}},
            // })
            this.props.sendMessage(messageId, message, author, chatId);
        }
        if (author === 'me') {
            this.setState({ input: '' })
        }
    };
      handleChange = (event) =>{
          this.setState({input: event.target.value})
      }
      handleKeyUp = (event) => {
        if (event.keyCode === 13) { // Enter
            this.sendMessage(this.state.input, 'me')
        }
    };
    render(){
        const { chatId, chats, messages} = this.props;
    if(this.props.chatId !== undefined)
    {return(
        <div className="layout">
            <div className="message-field">
                {this.props.chats[this.props.chatId].messageList.map((messageId,index) => <Message key = {`id${index}`} text={messages[messageId].text} 
                author={messages[messageId].author} />)}
            </div>
            <div style={{ width: '100%', display: 'flex' }}>
                <TextField
                    onChange={this.handleChange}
                    value={this.state.input}
                    name="input"
                    fullWidth={true}
                    hintText="Введите сообщение"
                    style={{ fontSize: '22px' }}
                    onKeyUp={this.handleKeyUp}
                />
                <Fab style ={{marginLeft:"5px"}} size ="small" onClick={() => this.sendMessage(this.state.input, 'me')}>
                    <SendIcon />
                </Fab>
            </div>

        </div>
    )}
    else
    return(
        <div className = {"empty"}>
            <div className = {"empty-text"}>
            <span className={"text"}>
                Chat not Selected
            </span>
            </div>
        </div>
    )
    }
}

const mapStateToProps = ({ chatReducer }) => ({
    chats: chatReducer.chats,
    messages: chatReducer.messages,
 });
 
 const mapDispatchToProps = dispatch => bindActionCreators({sendMessage}, dispatch);
 
 export default connect(mapStateToProps, mapDispatchToProps)(MessageField);
 