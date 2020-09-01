import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import styles from "./Chat.module.css";
import cx from "classnames";

let socket;

export const Chat = ({ location: { search } }) => {
  const [name, updateName] = useState("");
  const [room, updateRoom] = useState("");
  const [input, updateInput] = useState("");
  const [messages, updateMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(search);
    const ENDPOINT = "localhost:5000";
    socket = io(ENDPOINT);
    updateName(name);
    updateRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      updateMessages([...messages, message]);
    });
  }, [messages]);

  const handleKeyPress = (event) => {
    event.preventDefault();
    if (input) socket.emit("sendMessage", input, () => updateInput(""));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>{room}</div>
      <div className={styles.messageContainer}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.name === name ? styles.messageRight : styles.messageLeft
            }
            className={styles.message}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <input
          onChange={(event) => updateInput(event.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? handleKeyPress(event) : null
          }
          value={input}
          type="text"
        />
      </div>
    </div>
  );
};
