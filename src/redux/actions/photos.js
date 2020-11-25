import axios from "axios";
import { BASE_API_URL } from "../../utils/constants";
import { getErrors } from "./errors";
import { getResponse } from "./response";

export const beginAddPhoto = (data) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("photo", data.photo);
      let JWT,
        local = localStorage.getItem("token"),
        session = sessionStorage.getItem("token");
      if (local) {
        JWT = local;
      } else if (session) {
        JWT = session;
      }
      const res = await axios.post(`${BASE_API_URL}/upload/photos`, formData, {
        params: {
          title: data.title,
          description: data.desc,
          price: data.price,
          category: data.category,
        },
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": JWT,
          // "details-post": JSON.stringify(Data),
        },
      });
      // console.log(res.data)
      res && dispatch(getResponse(res.data));
    } catch (error) {
      console.log(error);
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};

export const startLoadPhotos = () => {
  return async (dispatch) => {
    try {
      const photos = await axios.get(`${BASE_API_URL}/upload/photos`);
      dispatch(loadPhotos(photos.data));
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};

export const loadPhotos = (photos) => ({
  type: "LOAD_PHOTOS",
  photos,
});
