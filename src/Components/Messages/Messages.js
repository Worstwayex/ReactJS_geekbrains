import Chip from '@material-ui/core/Chip';
import Typography from "@material-ui/core/Typography"
import "./styles/MessageField.css"
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { deleteMessageMW } from '../../Store/actions/middleware/messageMiddleware'
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";

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
             onClick = {() => props.deleteMessageMW(props.messageId, props.chatId)}>
                <CloseIcon/>
            </IconButton>
            </div>
           <div className="message-sender">{ props.author}</div>
        </div>
    )
}

Message.propTypes = {
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
}
const mapStateToProps = ({ chatReducer }) => ({
    chats: chatReducer.chats,
    messages: chatReducer.messages,
});

const mapDispatchToProps = dispatch => bindActionCreators({deleteMessageMW}, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Message);