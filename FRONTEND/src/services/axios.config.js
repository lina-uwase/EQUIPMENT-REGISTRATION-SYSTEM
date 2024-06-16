import _ from "axios";
const baseUrl = "http://localhost:5000/api/v1";
const axios = _.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default axios;