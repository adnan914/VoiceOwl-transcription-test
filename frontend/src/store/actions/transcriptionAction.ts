"use client";
import { AppDispatch } from "../store";
import * as API from "../serverApiAction/clientApis";
import * as authReducer from "../reducers/authReducer";
import Cookies from "js-cookie";
import { TranscriptionInput, TranscriptionListInput } from "@/types/transcriptType";
import { forError } from "@/utils/CommonService";

export const addTranscription = async (body: TranscriptionInput) => {
  try {
    return await API.post("/transcription", body);
  } catch (err) {
    console.log(err);
  }
};

export const getTranscriptionData = async (parmas: TranscriptionListInput) => {
  try {
    const res = await API.get("/transcriptionList", parmas);
    if (res.success) return res;
    else forError(res.message);
  } catch (err) {
    console.log(err);
  }
};
