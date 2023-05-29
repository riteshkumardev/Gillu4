import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Message = ({ message }) => {
  // console.log(message)

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const date = new Date(message.timestamp);
  const formattedTime = `${date.getHours()}:${date.getMinutes()}`;

  const dateArray = Object.entries(message.date);
  // console.log(dateArray)

  const handleTimestamp = [
    dateArray[0],
    dateArray[1]
  ];

  const milliseconds = handleTimestamp[0][1] * 1000 + handleTimestamp[1][1] / 1000000;
  const messageDate = new Date(milliseconds);

  const hour = messageDate.getHours();
  const minute = messageDate.getMinutes();
  // console.log(hour + ":" + minute);
  // console.log(handleTimestamp[0][1])

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{hour + ":" + minute}</span> 
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default Message
