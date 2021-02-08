import update from 'react-addons-update';
import { DELETE_MESSAGE, SEND_MESSAGE, SUCCESS_chats_LOADING } from '../actions/messageActions';
import {
    ADD_CHAT,
    BLINK,
    DELETE_CHAT,
    SUCCESS_CHATS_LOADING,
    ERROR_CHATS_LOADING,
    START_CHATS_LOADING
} from "../actions/chatActions";

const initialStore = {
   chats: {},
   isLoading:false,
   error:null,
};


export default function chatReducer(store = initialStore, action) {
   switch (action.type) {
       case SEND_MESSAGE: {
           return update(store, {
               chats: {
                   $merge: {
                       [action.chatId]: {
                           title: store.chats[action.chatId].title,
                           messageList: [...store.chats[action.chatId].messageList, action.messageId],
                           blink:false
                       }
                   }
               },
        });
       }
        case START_CHATS_LOADING:{
            return update(store, {
                isLoading: { $set: true },
                error:{ $set:null}
             });
        }
        case SUCCESS_CHATS_LOADING:{
            const chats = {};
            action.payload.data.forEach(msg => {
                const { title, messageList, blink } = msg;
                chats[msg.id] = { title, messageList, blink };
            });
            return update(store, {
                chats: { $set: chats },
                isLoading: { $set: false },
            });
        }
        case ERROR_CHATS_LOADING: {
            return update(store, {
                isLoading: { $set: false },
                error:{ $set:action.payload.error}
            });
        }
       case ADD_CHAT: {
           const chatId = Object.keys(store.chats).length + 1;
           return update(store, {
              chats: { $merge: {
                  [chatId]: {
                      title: action.title, 
                      messageList: [], 
              } } },
           });
       }
       case DELETE_CHAT:{
        const arr = store.chats;
        delete arr[action.chatId]
           return update(store,{
               chats:{$set:{
                    ...arr
               }}
           })
       }
       case DELETE_MESSAGE:{
           const arr = store.chats[action.chatId].messageList;
           const id1 = arr.findIndex((id)=>id === action.messageId)
           arr.splice(id1,1);
        //    const mes = store.chats
        //    delete mes[action.messageId]
           return update(store,{
               chats:{
                $set: {...store.chats,
                    [action.chatId]: {
                        title: store.chats[action.chatId].title,
                        messageList: [...arr],
                } } },
                // chats:{$set: {...mes}}
               });
        }
       case BLINK:{
           return update(store,{
            chats: {
                $merge: {
                    [action.chatId]: {
                        title: store.chats[action.chatId].title,
                        messageList: store.chats[action.chatId].messageList,
                        blink:!store.chats[action.chatId].blink,
                    }
                }
            },
           })
       }
       default:
           return store;
   }
}
