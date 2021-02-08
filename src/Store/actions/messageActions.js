// import api from '/public/api/messages.json'
// import {api} from '../../api/constants'
export const SEND_MESSAGE = '@@message/SEND_MESSAGE';
export const DELETE_MESSAGE = '@@message/DELETE_MESSAGE';

const apii = process.env.PUBLIC_URL + '/api/messages.json'

export const sendMessage = (messageId, text, author, chatId) => ({
   type: SEND_MESSAGE,
   messageId,
   text,
   author,
   chatId,
});

export const deleteMessage = (messageId,chatId) =>({
   type: DELETE_MESSAGE,
   messageId,
   chatId,
})

export const START_MESSAGES_LOADING = '@@message/START_MESSAGES_LOADING';
export const SUCCESS_MESSAGES_LOADING = '@@message/SUCCESS_MESSAGES_LOADING';
export const ERROR_MESSAGES_LOADING = '@@message/ERROR_MESSAGES_LOADING';

const startMessageLoading =() =>({
   type:START_MESSAGES_LOADING
})

const successMessageLoading = (data) =>({
   type:SUCCESS_MESSAGES_LOADING,
   payload:{
      data
   }
})

const errorMessageLoading = (error) =>({
   type:ERROR_MESSAGES_LOADING,
   payload:{
      error
   }
})

export const messageLoading = () => (dispatch) =>{
   dispatch(startMessageLoading());
   fetch(apii)
      .then(response=> response.json())
      .then(data=>dispatch(successMessageLoading(data)))
      .catch(err =>dispatch(errorMessageLoading(err)))
}