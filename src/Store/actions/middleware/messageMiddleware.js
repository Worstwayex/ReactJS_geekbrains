import {sendMessage,deleteMessage } from '../messageActions'
import {blinkChat} from '../chatActions'

export const sendMessageMW = (messageId, text, author, chatId) => (dispatch, getState) => {
    dispatch(sendMessage(messageId, text, author, chatId))
    setTimeout(() => {
          dispatch(
             sendMessage(Object.keys(getState().chatReducer.messages).length + 1,
                'Не приставай ко мне, я робот!', 'bot', chatId))
          dispatch(
                blinkChat(chatId)
          )
       }
          , 3000);
 }
 export const deleteMessageMW = (messageId,chatId) =>(dispatch, getState) =>{
      dispatch(deleteMessage(messageId, chatId));
 }