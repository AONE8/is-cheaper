import { jwtDecode } from "jwt-decode";

export function getJWT() {
  const token = localStorage.getItem("token");

  if (token) {
    const decode = jwtDecode(token);

    const currentTimestamp = Math.floor(new Date().getTime() / 1000);

    if (decode.sub && decode.exp && decode.exp > currentTimestamp) {
      return token;
    }
  }

  return "";
}
