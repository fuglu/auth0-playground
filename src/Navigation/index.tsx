import * as React from "react";
import { isAuthenticated, login, logout } from "../auth";

export default class Navigation extends React.Component {
  public render() {
    const onClick = isAuthenticated() ? logout : login;
    const text = isAuthenticated() ? "Logout" : "Login";
    return (
      <div>
        <button onClick={onClick}>{text}</button>
      </div>
    );
  }
}
