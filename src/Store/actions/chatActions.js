// import chats_api from '../../api/chats.json'
// import {api} from '../../api/constants'
export const ADD_CHAT = '@@chat/ADD_CHAT';
export const BLINK = "@@chat/BLINK";
export const DELETE_CHAT = "@@chat/DELETE_CHAT";

const apii = process.env.PUBLIC_URL + '/api/chats.json'

export const blinkChat = (chatId) =>({
   type:BLINK,
   chatId
})
export const addChat = (title) => ({
   type: ADD_CHAT,
   title,
});

export const deleteChat = (chatId)=>({
   type: DELETE_CHAT,
   chatId
})

export const START_CHATS_LOADING = '@@chats/START_CHATS_LOADING';
export const SUCCESS_CHATS_LOADING = '@@chats/SUCCESS_CHATS_LOADING';
export const ERROR_CHATS_LOADING = '@@chats/ERROR_CHATS_LOADING';

const startChatsLoading =() =>({
   type:START_CHATS_LOADING
})

const successChatsLoading = (data) =>({
   type:SUCCESS_CHATS_LOADING,
   payload:{
      data
   }
})

const errorChatsLoading = (error) =>({
   type:ERROR_CHATS_LOADING,
   payload:{
      error
   }
})

export const chatsLoading = () => (dispatch) =>{
   dispatch(startChatsLoading());
   console.log(apii)
   fetch(apii)
      .then(response => response.json())
      .then(data => dispatch(successChatsLoading(data)))
      .catch(err => dispatch(errorChatsLoading(err)))
}
