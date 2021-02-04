export const SEND_MESSAGE = '@@message/SEND_MESSAGE';
export const DELETE_MESSAGE = '@@message/DELETE_MESSAGE';

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