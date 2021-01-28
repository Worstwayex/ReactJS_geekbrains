import React from "react"
import Message from "./Messages"
import { TextField} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import "./styles/MessageField.css"
export default class MessageField extends React.Component{
    // console.log(props)
    state = {
        // messages: [{text: "Hello", author:"bot"},{text: "I'm Bot", author:"bot"}],
        // input: '',
        chats: {
            1: {title: 'Чат 1', messageList: [1]},
            2: {title: 'Чат 2', messageList: [2]},
            3: {title: 'Чат 3', messageList: []},
        },
        // chats: this.props.chats,
        messages: {
            1: { text: "Привет!", author: 'bot' },
            2: { text: "Здравствуйте!", author: 'bot' },
        },
        input: '',
 
      }
      componentDidUpdate(prevProps, prevState) {
        const {messages,chats} = this.state;
        if (Object.keys(prevState.messages).length < Object.keys(messages).length &&
            Object.values(messages)[Object.values(messages).length - 1].author === 'me')
        {
          setTimeout(()=>this.handleSendMessage('Хорошо', 'bot'),1000);
        }
        if(Object.keys(prevProps.chats).length < Object.keys(this.props.chats).length)
        {
            this.setState({chats:{...chats,[Object.keys(chats).length+1]:
                {title: `Чат ${Object.keys(chats).length+1}`, messageList:[]}}})
        }
      }
      handleSendMessage = (message, author) => {
        const { messages, chats, input } = this.state;
        const { chatId } = this.props;
 
        if (input.length > 0 || author === 'bot') {
            const messageId = Object.keys(messages).length + 1;
            this.setState({
                messages: {...messages,
                    [messageId]: {text: message, author: author}},
                chats: {...chats,
                    [chatId]: { ...chats[chatId],
                        messageList: [...chats[chatId]['messageList'], messageId]
                    }
                },
            })
        }
        if (author === 'me') {
            this.setState({ input: '' })
        }
    };
 
    //   handleClick = (message) =>{
    //     this.sendMessage(message)
    //   }
      handleChange = (event) =>{
          this.setState({input: event.target.value})
      }
      handleKeyUp = (event) => {
        if (event.keyCode === 13) { // Enter
            this.handleSendMessage(this.state.input, 'me')
        }
    };
    // sendMessage = (message) =>{
    //     this.setState(prevState =>({
    //         messages: [...prevState.messages,{text: message, author:"me"}],
    //         input: '',
    //       }))
    // }
    render(){
        const { messages, chats } = this.state;
        const { chatId } = this.props;
        console.log(chatId)
    if(this.props.chatId !== undefined)
    {return(
        <div className="layout">
            <div className="message-field">
                {chats[chatId].messageList.map((messageId,index) => <Message key = {`id${index}`} text={messages[messageId].text} 
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
                <Fab size ="small" onClick={() => this.handleSendMessage(this.state.input, 'me')}>
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