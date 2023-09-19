import React, { useState, useEffect } from "react";
import LayoutAdmin from "../../Admin/Layout/LayoutAdmin";
// import useWebSocket,{ReadyState} from 'react-use-websocket';
// import { InstanceAxiosAdmin } from '../../Helpers/InstanceAxionsAdmin';
import "./Notification.css";

export default function Notification() {
  const [username, setusername] = useState("");
  // const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // const socket = new WebSocket('ws://localhost:8000/ws/notif_admin/');
    const socket = new WebSocket("ws://localhost:8000/ws/notification/1/");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      console.log(notification);
      // setNotifications(prevNotifications => [...prevNotifications, notification]);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleTest = async (e) => {
    e.preventDefault();

    //   chatSocket.send(JSON.stringify({
    //     'message':username
    // }))
    // chatSocket.close();

    // const data={
    //   message:username
    // }

    // await axios.post('http://localhost:8000/chat_user/',data).then(res=>{
    //   console.log(res)
    // })
    //
  };

  return (
    <LayoutAdmin>
      <div className="Notification">
        <form onSubmit={handleTest}>
          <div>
            <label htmlFor="username">username</label>
            <input
              value={username}
              onChange={(e) => setusername(e.target.value)}
              type="text"
              id="username"
            />
            <button>Click</button>
          </div>
        </form>
        <div>
          {/* {notifications.map((notification, index) => (
            <div key={index}>{notification.message}</div>
          ))} */}
        </div>
      </div>
    </LayoutAdmin>
  );
}
