import * as React from "react";
import { handleAuthentication } from "../auth";

export default class AuthCallback extends React.Component {
  public componentDidMount() {
    handleAuthentication();
  }

  public render() {
    return <div>AuthCallback</div>;
  }
}
