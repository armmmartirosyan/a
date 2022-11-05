import { io } from "socket.io-client";
import Utils from "../../helpers/Utils";
import { toast } from "react-toastify";
import newMessageAudio from '../../assets/audio/new-message.mp3';

let socket;

const { REACT_APP_API_URL } = process.env;
const audio = new Audio(newMessageAudio);

export const SOCKET_NEW_MESSAGE = 'SOCKET_NEW_MESSAGE';
export const SOCKET_TYPING = 'SOCKET_TYPING';

export function socketInit(token) {
  return (dispatch) => {
    if (socket) {
      return;
    }
    console.log(REACT_APP_API_URL)
    socket = io(REACT_APP_API_URL, {
      extraHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    socket.on('connect', () => {
      console.log('connect')
    })
    socket.on('new-message', (data) => {
      const currentFriendId = Utils.getFriendId();
      if (currentFriendId === data.message.from) {
        dispatch({
          type: SOCKET_NEW_MESSAGE,
          payload: { data }
        });
      } else {
        toast.info(`New Message From ${data.message.userFrom.firstName}`);
        try {
          audio.play();
        } catch (e) {
          //
        }
      }

    })
  }
}

export function socketDisconnect() {
  return (dispatch) => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  }
}
