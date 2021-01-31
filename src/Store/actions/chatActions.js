export const ADD_CHAT = '@@chat/ADD_CHAT';

export const addChat = (title) => ({
   type: ADD_CHAT,
   title,
});

// export default function ddChat(){
//    if(chat.input !=="")
//        setChat({chats:{...chat.chats,[Object.keys(chat.chats).length+1]:
//            {title: chat.input, messageList:[]}}
//            , input:''});
// }