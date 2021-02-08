import {deleteChat} from '../chatActions'

export const deleteChatMW = (chatId)=>(dispatch,getStore)=>{
        dispatch(deleteChat(chatId))
}