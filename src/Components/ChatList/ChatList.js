import { Link } from 'react-router-dom'
import { useState } from 'react'
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
// import List from '@material-ui/core/List';
import { TextField} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import MessageField from '../Messages/MessageField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import { addChat } from '../../Store/actions/chatActions';

import "./styles/ChatList.css"

function ChatList(props){
    // let [chat, setChat] = useState({
    //     // chats:['Chat 1', 'Chat 2', 'Chat 3'],
    //     // chats: {
    //     //     1: {title: 'Чат 1', messageList: [1]},
    //     //     2: {title: 'Чат 2', messageList: [2]},
    //     //     3: {title: 'Чат 3', messageList: []},
    //     // },
    //     input:'',
    // });
    const [input, setInput] =  useState('')
    // console.log(Object.values(chat.chats)['title'])
    const handleAddChat = (event) => {
        if(input !=="")
            {
                props.addChat(input);
                setInput('')
            }
            // setChat({chats:{...chat.chats,[Object.keys(chat.chats).length+1]:
            //     {title: input, messageList:[]}}
            //     , input:''});      
    }
    // const addMessagetoChat = (chatId,messageId) => {
    //     setChat({chats:{...chat.chats,
    //             [chatId]: { ...chat.chats[chatId],
    //             messageList: [...chat.chats[chatId]['messageList'], messageId]
    //         }}})
    // }
    const handleChange = (event) =>{
        
        setInput(event.target.value)
        // console.log(chat)
    }
    const handleKeyUp = (event) => {
      if (event.keyCode === 13) { // Enter
          handleAddChat()
      }
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
                        {/* <Divider style ={{marginTop:"5px"}}/> */}
                    </div>
                </div>
                <List>
                    {Object.values(props.chats).map((obj, index) => (
                        // {console.log(index)}
                        <Link to={`/chat/${index + 1}/`} key={obj.title}>
                            <ListItem button key={obj.title}>
                                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                                <ListItemIcon><MailIcon /></ListItemIcon>
                                <ListItemText primary={obj.title} />
                            </ListItem>
                        </Link>
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
    bindActionCreators({ addChat }, dispatch);
 
 export default connect(mapStateToProps, mapDispatchToProps)(ChatList);