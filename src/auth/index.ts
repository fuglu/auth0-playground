import * as auth0 from "auth0-js";
import history from "../history";
import { AUTH_CONFIG } from "./auth0-config";

const auth = new auth0.WebAuth({
  audience: AUTH_CONFIG.audience,
  clientID: AUTH_CONFIG.clientID,
  domain: AUTH_CONFIG.domain,
  redirectUri: AUTH_CONFIG.redirectUri,
  responseType: AUTH_CONFIG.responseType,
  scope: AUTH_CONFIG.scope
});

export const login = () => {
  auth.authorize();
};

export const handleAuthentication = () => {
  auth.parseHash((err, authResult) => {
    if (
      authResult &&
      authResult.accessToken &&
      authResult.idToken &&
      authResult.expiresIn
    ) {
      const expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      );
      localStorage.setItem("access_token", authResult.accessToken);
      localStorage.setItem("id_token", authResult.idToken);
      localStorage.setItem("expires_at", expiresAt);
      history.replace("/home");
    } else if (err) {
      history.replace("/home");
      // tslint:disable-next-line:no-console
      console.log(err);
      alert(`Error: ${err.error}. Check the console for further details.`);
    }
  });
};

export const logout = () => {
  // Clear access token and ID token from local storage
  localStorage.removeItem("access_token");
  localStorage.removeItem("id_token");
  localStorage.removeItem("expires_at");
  // navigate to the home route
  history.replace("/");
};

export const isAuthenticated = () => {
  // Check whether the current time is past the
  // access token's expiry time
  const json = localStorage.getItem("expires_at");
  if (json) {
    const expiresAt = JSON.parse(json);
    return new Date().getTime() < expiresAt;
  }
  return false;
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};
