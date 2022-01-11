// import { useDispatch } from "react-redux";
import axios from "axios";

import { loginFailure, loginStart, loginSuccess } from "../features/user";

export const login = async (dispatch, userInfo) => {
  dispatch(loginStart());

  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/auth/login",
      userInfo
    );
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
