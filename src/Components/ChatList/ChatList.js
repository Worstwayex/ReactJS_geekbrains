import { Link } from 'react-router-dom'
import { useState } from 'react'
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import MessageField from '../Messages/MessageField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// import Divider from '@material-ui/core/Divider';


import "./styles/ChatList.css"

export default function Chatlist(props){
    const [chats, setChats] = useState(['Chat 1', 'Chat 2', 'Chat 3']);
    const handleAddChat = (chat) => {
        setChats([...chats, chat]);
    }
    return (
        <>
            <div className="ChatList">
                <div style={{ direction: 'rtl', marginTop: "5px", position: "fixed", width: "inherit", zIndex: 1200 }}>
                    <div style={{ marginRight: "20px" }}>
                        <Fab style={{height: "6px", width: "36px", boxShadow: 'none'}}
                            onClick={() => { handleAddChat(`Chat ${chats.length + 1}`) }}>
                            <AddIcon className={"Button"}/>
                        </Fab>
                        {/* <Divider style ={{marginTop:"5px"}}/> */}
                    </div>
                </div>
                <List style={{ marginTop: "46px" }}>
                    {chats.map((text, index) => (
                        <Link to={`/chat/${index + 1}/`} key={text}>
                            <ListItem button key={text}>
                                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                                <ListItemIcon><MailIcon /></ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </div>
            <MessageField chatId={props.chatId} chats={chats} />
        </>

    )
}