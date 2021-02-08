import React from "react"
import Message from "./Messages"
import { TextField } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import "./styles/MessageField.css"
import CircularProgress from '@material-ui/core/CircularProgress';


import { bindActionCreators } from "redux";
import { sendMessage, messageLoading } from '../../Store/actions/messageActions'
import {sendMessageMW,deleteMessageMW } from '../../Store/actions/middleware/messageMiddleware'
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";


class MessageField extends React.Component {

    state = {
        input: '',
    }
    componentDidMount(){
        this.props.messageLoading()
    }

    sendMessage = (message, author) => {
        const { input } = this.state;
        const { chats, chatId, messages } = this.props;

        if (input.length > 0) {
            let messageId;
            if(Object.keys(messages).length-1 < 0)
                messageId = 0;
            else
                {messageId = Number(Object.keys(messages)[Object.keys(messages).length-1]) + 1;}
            this.props.sendMessageMW(messageId, message, author, chatId);
        }
        if (author === 'me') {
            this.setState({ input: '' })
        }
    };
    handleChange = (event) => {
        this.setState({ input: event.target.value })
    }
    handleKeyUp = (event) => {
        if (event.keyCode === 13) { // Enter
            this.sendMessage(this.state.input, 'me')
        }
    };
    handleDeleteMessage = (messageId, chatId) =>{
        this.props.deleteMessageMW(messageId,chatId);
    }
    render() {
        const { chatId, chats, messages } = this.props;
        if (this.props.isLoading) {
            return <CircularProgress />
        } 
        if (this.props.chats[chatId] !== undefined) {
            return (
                <div className="layout">
                    <div className="message-field">
                        {chats[this.props.chatId].messageList.map((messageId, index) =><Message 
                            key={`id${messageId}`} text={messages[messageId].text} delete = {this.handleDeleteMessage}
                            author={messages[messageId].author} messageId ={messageId} chatId = {chatId}/>)}
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
                        <Fab style={{ marginLeft: "5px" }} size="small" onClick={() => this.sendMessage(this.state.input, 'me')}>
                            <SendIcon />
                        </Fab>
                    </div>

                </div>
            )
        }
        else if (chatId === undefined)
            return (
                <div className={"empty"}>
                    <div className={"empty-text"}>
                        <span className={"text"}>
                            Chat not Selected
            </span>
                    </div>
                </div>
            )
        else {
            return (<Redirect to="/" />)
        }
    }
}

const mapStateToProps = ({ chatReducer, messageReducer }) => ({
    chats: chatReducer.chats,
    messages: messageReducer.messages,
    isLoading: messageReducer.isLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({ sendMessageMW, 
    sendMessage, deleteMessageMW,messageLoading}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);
