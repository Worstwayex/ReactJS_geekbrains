import update from 'react-addons-update';
import {
    SEND_MESSAGE,
    DELETE_MESSAGE,
    START_MESSAGES_LOADING , 
    SUCCESS_MESSAGES_LOADING, 
    ERROR_MESSAGES_LOADING 
} from '../actions/messageActions'
import {
    START_CHATS_LOADING,
    SUCCESS_CHATS_LOADING,
    ERROR_CHATS_LOADING
} from '../actions/chatActions'

const initialStore = {
    messages: {},
    isLoading: false,
    error:null
 };

export default function messageReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MESSAGE: {
            return update(store, {
                messages:{
                $merge: {
                    [action.messageId]: {
                        text: action.text,
                        author: action.author
                    }
                }
            }});
        }
        case DELETE_MESSAGE:{
           const mes = store.messages
           delete mes[action.messageId]
           return update(store,{
                messages:{$set: {...mes}}
               });
        }
        case START_MESSAGES_LOADING: {
            return update(store, {
               isLoading: { $set: true },
               error:{$set: null}
            });
        }
        case SUCCESS_MESSAGES_LOADING: {
            const messages = {};
            action.payload.data.forEach(msg => {
                const { text, author } = msg;
                messages[msg.id] = { text, author };
            });
            return update(store, {
                messages: { $set: messages },
                isLoading: { $set: false },
            });
        }
        case ERROR_MESSAGES_LOADING: {
            return update(store, {
                isLoading: { $set: false },
                error:{$set: action.payload.error}
            });
        }
        case START_CHATS_LOADING: {
            return update(store, {
               isLoading: { $set: true },
            });
        }
        case SUCCESS_CHATS_LOADING: {
            return update(store, {
                messages: { $set: action.payload.data},
            });
        }
        case ERROR_CHATS_LOADING: {
            return update(store, {
                isLoading: { $set: false },
            });
        } 
        default:
            return store;
    }
 }
 