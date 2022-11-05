import { createReducer } from "@reduxjs/toolkit";
import { messagesListRequest, sendMessageRequest } from "../actions/messages";
import { SOCKET_NEW_MESSAGE } from "../actions/socket";

const initialState = {
  messagesList: [],
}

export default createReducer(initialState, {
  [messagesListRequest.fulfilled]: (state, action) => {
    console.log(action)
    state.messagesList = action.payload.messages;
  },
  [SOCKET_NEW_MESSAGE]: (state, action) => {
    state.messagesList.unshift(action.payload.data.message);
    // state.messagesList = [action.payload.data.message, ...state.messagesList];
  },
  [sendMessageRequest.fulfilled]: (state, action) => {
    state.messagesList.unshift(action.payload.message);
  }
})
