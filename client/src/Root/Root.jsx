import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Join } from "../Join/Join";
import { Chat } from "../Chat/Chat";

export const Root = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </BrowserRouter>
  );
};
