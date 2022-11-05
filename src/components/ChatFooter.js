import React, { useCallback, useState } from 'react';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { sendMessageRequest } from "../store/actions/messages";

function ChatFooter(props) {
  const dispatch = useDispatch();
  const { friendId } = useParams();
  const [message, setMessage] = useState('');
  const sendMessage = useCallback(ev => {
    ev.preventDefault();
    if (!message.trim()) {
      return;
    }
    dispatch(sendMessageRequest({
      friendId,
      text: message
    }));
    setMessage('')
  }, [message])
  return (
    <div className="card-footer">
      <form onSubmit={sendMessage} className="input-group">
        <div className="input-group-append">
          <label className="input-group-text attach_btn">
            <i className="fas fa-paperclip"></i>
            <input type="file" style={{ display: 'none' }} />
          </label>
        </div>
        <textarea value={message}
                  onChange={ev => setMessage(ev.target.value)}
                  className="form-control type_msg"
                  placeholder="Type your message..." />
        <div className="input-group-append">
          <button className="input-group-text send_btn">
            <i className="fas fa-location-arrow"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatFooter;
