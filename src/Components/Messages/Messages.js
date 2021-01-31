import Chip from '@material-ui/core/Chip';
import Typography from "@material-ui/core/Typography"
import "./styles/MessageField.css"
import PropTypes from 'prop-types';

export default function Message(props){
    return(
        <div className="Message"
            style={{
                alignSelf: props.author === 'bot' ?
                    'flex-start' : 'flex-end'
            }}
        >
            <div>{props.text}</div>
           <div className="message-sender">{ props.author}</div>
        </div>
    )
}

Message.propTypes = {
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
}