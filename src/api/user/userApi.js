import {noAuthInstance} from "../index";

export const signup = (userData) => {
  return noAuthInstance.post("/users/signup", userData);
}

export const mailSend = (email) => {
  return noAuthInstance.post("/users/signup/email", {
    email: email
  });
}

export const codeCheck = (email, code) => {
  return noAuthInstance.patch("/users/signup/email", {
    email: email,
    code: code
  });
}
