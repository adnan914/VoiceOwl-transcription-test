"use client";
import { AppDispatch } from "../store";
import * as API from "../serverApiAction/clientApis";
import * as authReducer from "../reducers/authReducer";
import Cookies from "js-cookie";

export const addTranscription = async (body: any) => {
  try {
    return await API.post("/transcription", body);
  } catch (err) {
    console.log(err);
  }
};
