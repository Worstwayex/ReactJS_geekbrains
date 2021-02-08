import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Badge from '@material-ui/core/Badge';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
// import List from '@material-ui/core/List';
import { TextField} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { push } from 'connected-react-router';
import MenuIcon from '@material-ui/icons/Menu';
import MessageField from '../Messages/MessageField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import { addChat,blinkChat, chatsLoading } from '../../Store/actions/chatActions';
import {deleteChatMW} from '../../Store/actions/middleware/chatMiddleware'
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
// import IconButton from '@material-ui/core/IconButton';

import "./styles/ChatList.css"

function ChatList(props){
    
    const [input, setInput] =  useState('')
    const handleAddChat = (event) => {
        if(input !=="")
            {
                props.addChat(input);
                setInput('')
            }
   
    }
    useEffect(()=>{
        props.chatsLoading()
    },[])

    const handleChange = (event) =>{
        setInput(event.target.value)
    }
    const handleKeyUp = (event) => {
      if (event.keyCode === 13) { // Enter
          handleAddChat()
      }
    };
    const handleNavigate = (link) => {
        // console.log(link)
        props.push(link);
        // console.log(link)
        // console.log(props.chatId)
        // console.log(props.chats[props.chatId])
        if(props.chatId !==undefined && props.chats[props.chatId]!==undefined){

            if(props.chats[props.chatId].blink === true)
                props.blinkChat(props.chatId)
        }
    };
    if (props.isLoading) {
        return <CircularProgress />
    } 
    return (
        <>
            <div className="ChatList">
                <div style={{ marginTop: "5px"}}>
                    <div style={{ display: 'flex' ,marginRight: "20px" }}>
                        <TextField
                                onChange={handleChange}
                                value={input}
                                name="input"
                                fullWidth={true}
                                hintText="Введите сообщение"
                                style={{ marginLeft:"10px", fontSize: '22px' }}
                                onKeyUp={handleKeyUp}
                        />
                        <Fab style={{marginLeft:"5px",height: "6px", width: "40px", boxShadow: 'none'}}
                            onClick={handleAddChat}>
                            <AddIcon className={"Button"}/>
                        </Fab>
                    </div>
                </div>
                <List>
                    {Object.keys(props.chats).map((index) => (      
                            <ListItem button key={props.chats[index]} 
                            onClick={()=> {return handleNavigate(`/chat/${index}/`)}}
                            >
                                {console.log(index)}
                                <ListItemIcon>
                                    <Badge badgeContent={(props.chats[index].blink === true&&
                                       props.chats[props.chatId].title !== props.chats[index].title)? 1 : null} color="primary">
                                        <MailIcon />
                                    </Badge>  
                                </ListItemIcon>
                            <ListItemText primary={props.chats[index].title} />
                            <IconButton style={{ marginLeft: "20px" }} size="small"
                                onClick={() => props.deleteChatMW(index)}>
                                <CloseIcon />
                            </IconButton>
                            </ListItem>
                        // </Link>
                    ))}
                </List>
            </div>
            <MessageField chatId={props.chatId} chats = {props.chats}/>
        </>

    )
}
const mapStateToProps = ({ chatReducer }) => ({
    chats: chatReducer.chats,
    isLoading:chatReducer.isLoading
 });
 
 const mapDispatchToProps = dispatch => 
    bindActionCreators({ addChat,blinkChat,push, deleteChatMW, chatsLoading}, dispatch);
 
 export default connect(mapStateToProps, mapDispatchToProps)(ChatList);