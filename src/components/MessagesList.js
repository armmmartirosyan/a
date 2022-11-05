import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { messagesListRequest } from "../store/actions/messages";
import { useParams } from "react-router-dom";
import moment from "moment/moment";

function MessagesList(props) {
  const dispatch = useDispatch();
  const { friendId } = useParams();
  useEffect(() => {
    console.log(friendId)
    dispatch(messagesListRequest({ friendId }));
  }, [friendId]);
  const messagesList = useSelector(store => store.messages.messagesList);
  const messagesListStatus = useSelector(store => store.status.messagesListStatus);
  console.log(messagesList)
  return (
    <div className="card-body msg_card_body">
      {messagesListStatus === 'pending' ? 'Loading ...' : null}
      {messagesListStatus === 'success' ? [...messagesList].reverse().map(message => {
        if (+friendId === message.from) {
          return (
            <div key={message.id} className="d-flex justify-content-start mb-4">
              <div className="img_cont_msg">
                <img src={message.userFrom.avatar}
                     className="rounded-circle user_img_msg" />
              </div>
              <div className="msg_cotainer">
                {message.text}
                <span className="msg_time">{moment(message.createdAt).calendar()}</span>
              </div>
            </div>
          )
        } else {
          return (
            <div key={message.id} className="d-flex justify-content-end mb-4">
              <div className="msg_cotainer_send">
                {message.text}
                <span className="msg_time_send">{moment(message.createdAt).calendar()}</span>

              </div>
              <div className="img_cont_msg">
                <img src={message.userFrom.avatar} className="rounded-circle user_img_msg" />
              </div>
            </div>
          )
        }
      }) : null}


    </div>
  );
}

export default MessagesList;
