export const emailValidator = email => {
    if (!email) {
      return "Email is required";
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
      return "Incorrect email format";
    }
    return "";
  };

export const usernameValidator = username => {
    if(!username){
        return "Username is required";
    }else if(username.length <= 3 || username.length >= 25){
        return "Username must contain from 3 to 25 characters"
    }
    return "";
}