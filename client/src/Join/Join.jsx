import React, { useState, useEffect } from "react";
import styles from "./Join.module.css";
import { Link } from "react-router-dom";
export const Join = () => {
  const [name, updateName] = useState("");
  const [room, updateRoom] = useState("");
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.title}>Join ChatRoom</div>
        <input
          placeholder="Name"
          className={styles.input}
          onChange={(event) => updateName(event.target.value)}
        ></input>
        <input
          placeholder="Room"
          className={styles.input}
          onChange={(event) => updateRoom(event.target.value)}
        ></input>
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className={styles.joinButton} type="submit">
            Join Room
          </button>
        </Link>
      </div>
    </div>
  );
};
