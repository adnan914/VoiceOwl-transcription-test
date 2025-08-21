"use client";
import * as API from "../serverApiAction/clientApis";
import { TranscriptionInput, TranscriptionListInput } from "@/types/transcriptType";
import { API_PATH } from "@/utils/apiPath";
import { forError } from "@/utils/CommonService";

export const addTranscription = async (body: TranscriptionInput) => {
  try {
    return await API.post(API_PATH.TRANSCRIPTION, body);
  } catch (err) {
    console.log(err);
  }
};

export const getTranscriptionData = async (parmas: TranscriptionListInput) => {
  try {
    const res = await API.get(API_PATH.TRANSCRIPTION_LIST, parmas);
    if (res.success) return res;
    else forError(res.message);
  } catch (err) {
    console.log(err);
  }
};
