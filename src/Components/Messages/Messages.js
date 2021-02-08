import "./styles/MessageField.css"
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

function Message(props){

    return(
        <div className="Message"
            style={{
                alignSelf: props.author === 'bot' ?
                    'flex-start' : 'flex-end'
            }}
        >
            <div style={{display:'flex'}}>
            <div>{props.text}</div>
            <IconButton style ={{marginLeft:"2px"}}size = "small"
             onClick = {() => props.delete(props.messageId, props.chatId)}>
                <CloseIcon/>
            </IconButton>
            </div>
           <div className="message-sender">{ props.author}</div>
        </div>
    )
}

export default Message ;