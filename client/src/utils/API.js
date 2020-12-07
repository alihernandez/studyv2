import axios from "axios";

export default {
  sendReset: function (email) {
    return axios.post('/sendReset', email)
  },
  
  // sendWelcome: function (email) {
  //   return axios.post('/sendWelcome', email)
  // },

  reset: function (data) {
    console.log(data)
    return axios.post('/api/users/resetPass', data)
  },

  login: function (loginInfo) {
    return axios.post("/api/users/login", loginInfo);
  },

  signup: function (signupInfo) {
    return axios.post("/api/users/signup", signupInfo);
  },

  sendMail: function (email) {
    return axios.post('/sendMail', email)
  },
  

  isLoggedIn: function () {
    return axios.get("/api/users/profile");
  },

  logout: function () {
    return axios.get("/api/users/logout");
  },
  getUserData: function (id) {
    console.log(id);
    return axios.get("/api/login/" + id);
  },
  postPost: function (data) {
    return axios.post("/api/post", data);
  },
  newsfeed: function () {
    console.log("front end api");
    return axios.get("/api/newsfeed");
  },
  deletePost: function (id) {
    return axios.delete("/api/post/" + id);
  },
  getPost: function (id) {
    return axios.get("/api/post/" + id);
  },
  postComment: function (data) {
    return axios.post("/api/comments", data);
  },
  postProfilePic: function (data) {
    return axios.post("/api/profilePic", data);
  },

  getComments: function (id) {
    return axios.get("/api/comments/" + id);
  },

  getSearch: function (data) {
    return axios.get("/api/search/" + data);
  },

  searchSubject: function () {
    return axios.get("/api/search/");
  },
};
