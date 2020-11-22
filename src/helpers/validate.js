import axios from "axios";
import { BASE_API_URL } from "../utils/constants";

let JWT;

// Process
export default async (valid, failed, network) => {

  let local = localStorage.getItem("token");
  let session = sessionStorage.getItem("token");
  if (local) {
    JWT = local;
  } else if (session) {
    JWT = session;
  } else {
    failed();
  }
  if (JWT) {
    try {
      let res = await axios.get(`${BASE_API_URL}/account`, {
        headers: { "auth-token": JWT },
      });
      if (res.status === 200) {
        valid();
      } else {
        failed();
        local
        ? localStorage.removeItem("token")
        : sessionStorage.removeItem("token");
      }
    } catch (err) {
      if (err.message === "Network Error") {
        network();
      } else if (err.message === "Request failed with status code 400") {
        failed();
      } else {
        console.log("Error :");
        console.log(err.message);
      }
    }
  }
};
