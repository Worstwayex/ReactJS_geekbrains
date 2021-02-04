import { Link } from 'react-router-dom'
import { useState } from 'react'
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
import { addChat,blinkChat } from '../../Store/actions/chatActions';

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
    const handleChange = (event) =>{
        setInput(event.target.value)
    }
    const handleKeyUp = (event) => {
      if (event.keyCode === 13) { // Enter
          handleAddChat()
      }
    };
    const handleNavigate = (link) => {
        console.log(link)
        props.push(link);
        if(props.chats[props.chatId].blink === true)
            props.blinkChat(props.chatId)
    };
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
                    {console.log(props.chats)}
                    {Object.values(props.chats).map((obj, index) => (      
                            <ListItem button key={obj.title} 
                            onClick={()=> {return handleNavigate(`/chat/${index+1}/`)}}
                            >
                                {/* handleBlink */ }
                                <ListItemIcon>
                                    <Badge badgeContent={(props.chats[index+1].blink === true&&
                                       props.chats[props.chatId].title !== obj.title)? 1 : null} color="primary">
                                        <MailIcon />
                                    </Badge>  
                                </ListItemIcon>
                                <ListItemText primary={obj.title} />
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
 });
 
 const mapDispatchToProps = dispatch => 
    bindActionCreators({ addChat,blinkChat,push }, dispatch);
 
 export default connect(mapStateToProps, mapDispatchToProps)(ChatList);