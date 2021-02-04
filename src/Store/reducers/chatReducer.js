import update from 'react-addons-update';
import { DELETE_MESSAGE, SEND_MESSAGE } from '../actions/messageActions';
import { ADD_CHAT, BLINK } from "../actions/chatActions";

const initialStore = {
   chats: {
           1: {title: 'Чат 1', messageList: [1], blink: false},
           2: {title: 'Чат 2', messageList: [2], blink: false},
           3: {title: 'Чат 3', messageList: [],  blink: false},
       },
    messages: {
        1: { text: "Привет!", author: 'bot' },
        2: { text: "Здравствуйте!", author: 'bot' },
    },
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
               messages: {
                $merge: {
                    [action.messageId]: {
                        text: action.text,
                        author: action.author
                    }
                }
                },
        });
       }
       case ADD_CHAT: {
           const chatId = Object.keys(store.chats).length + 1;
           return update(store, {
              chats: { $merge: {
                  [chatId]: {
                      title: action.title, 
                      messageList: [], 
                      blink:false 
              } } },
           });
       }
    //    case DELETE_MESSAGE:{
    //        const arr = store.chats[action.chatId].messageList;
    //        const id1 = arr.find((id)=>arr[id] === action.messageId)
    //        arr.splice(id1,1);
    //        const mes = store.messages
    //        delete mes[action.messageId]
    //        console.log(arr)
    //        console.log(mes)
    //        return update(store,{
    //            chats:{
    //             $merge: {
    //                 [action.chatId]: {
    //                     title: store.chats[action.chatId].title,
    //                     messageList: [...arr],
    //             } } },
    //             messages:{$merge: {...mes}}
    //            });
    //     }
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
