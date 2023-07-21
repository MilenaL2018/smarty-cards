import React from "react";
import { useDispatch } from "react-redux";
import { displayHandler } from "@/redux/features/snackbar-slice";

import "./snackbar.module.css";

const MessageInput = () => {
  const dispatch = useDispatch();

  

  return (
    <div className="messageContainer">
      <div className="messageCenter">
        <button className="messageButton" onClick={clickHandler}>
          Show snackbar
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
