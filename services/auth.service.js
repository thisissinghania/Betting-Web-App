import axios from "axios";
const API_URL = "http://localhost:3000/api/auth/";
export function login(user) {
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}
export function logout() {
  localStorage.removeItem("user");
}
export function register(user) {
  //return user;
  return axios.post(API_URL + "signup", {
    username: user.username || '',
    email: user.email || '',
    password: user.password || '',
  });
}
