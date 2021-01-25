import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';

import "./styles/ChatList.css"

export default function Chatlist(){
    return(
        <div className ="ChatList">
        <List>
            {['First Chat', 'Second Chat', 'Third Chat', 'Fourth Chat'].map((text, index) => (
                <ListItem button key={text}>
                    {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
        </div>
    )
}