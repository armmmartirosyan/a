import { createReducer } from "@reduxjs/toolkit";
import { contactList, loginRequest, registerRequest, setToken } from "../actions/users";
import Account from "../../helpers/Account";

const initialState = {
  token: Account.getToken(),
  contactList: [],
  contactListStatus: ''
}

export default createReducer(initialState, {
  [loginRequest.fulfilled]: (state, action) => {
    const { token } = action.payload.data;
    const { remember } = action.payload;

    Account.setToken(token, remember);

    state.token = token
  },

  [contactList.fulfilled]: (state, action) => {
    const data = action.payload.data;

    state.contactList = data.users;
  }
})
