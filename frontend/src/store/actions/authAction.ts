"use client";
import { AppDispatch } from "../store";
import * as API from "../serverApiAction/clientApis";
import * as authReducer from "../reducers/authReducer";
import Cookies from "js-cookie";
import { API_PATH } from "@/utils/apiPath";

export const refreshToken = async (dispatch: AppDispatch) => {
  const res: any = await API.get(API_PATH.REFRESH_TOKEN);

  if (res?.accessToken) {
    Cookies.set('token', res.accessToken)
    dispatch(authReducer.refreshToken(res.accessToken));
    return res.data;
  } else if (res === "token has expired") {
    dispatch({ type: "auth/logout" });
  } else {
    dispatch({ type: "auth/logout" });
  }
  return {
    access_token: "asdasdd",
  };
};


export const login = (formData: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await API.post(API_PATH.LOGIN, formData);
    if (res.success) {
      dispatch(
        authReducer.login({ user: res.data.user, access_token: res.data.accessToken, refresh_token: res.data.refreshToken })
      );
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const signUp = async (formData: any) => {
  try {
    const res = await API.post(API_PATH.SIGNUP, formData);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const logOut = () => async (dispatch: AppDispatch) => {
  try {
    const res = await API.post(API_PATH.LOGOUT, {});
    if (res.success) {
      dispatch(authReducer.logout());
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const res = await API.post(API_PATH.FORGOT_PASSWORD, { email });
    return res;
  } catch (err) {
    console.log(err);
  }
};


export const verifyResetToken = async (token: string) => {
  try {
    const res = await API.post(API_PATH.VERIFY_RESET_TOKEN, { token });
    return res;
  } catch (err) {
    console.log(err);
  }
};



export const restPassword = async (newPassword: string, id: string) => {
  try {
    const res = await API.post(API_PATH.RESET_PASSWORD, { newPassword, id });
    return res;
  } catch (err) {
    console.log(err);
  }
};
