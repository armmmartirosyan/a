import React, { useState } from 'react';
import moment from "moment/moment";
import classNames from "classnames";
import { Link } from "react-router-dom";

function User(props) {
  const { user } = props;
  const [isOnline, setIsOnline] = useState(user.lastVisit && moment(user.lastVisit) === moment());

  return (
    <li>
      <Link to={`/user/${user.id}`}>
        <div className="d-flex bd-highlight">
          <div className="img_cont">
            <img
              src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
              className="rounded-circle user_img"
            />
            <span className={classNames(
              'online_icon',
              { offline: !isOnline })
            }>
                    </span>
          </div>
          <div className='user_info'>
            <span>{user.firstName}</span>
            <p>
              {`${user.firstName} ${isOnline ?
                'is online'
                : `was online ${user.lastVisit ? moment(user.lastVisit).fromNow() : 'long time ago'}`}`
              }
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default User;
