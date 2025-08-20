"use client";
import { refreshToken } from "../actions/authAction";
import { store } from "../store";
import { AnyType } from "@/types/commonTypes";
import * as API from "./serverApis";
import clientErrorHandler from "@/utils/axiosConfig/interceptors/clientErrorHandler"

interface PromiseType { 
    success: boolean,
    message: string,
    data: AnyType<any>
}

export const post = async (url: string, body: object) => {
    const res: any  = await new Promise((resolve, reject) => {
        API.post(url, body).then(async (res: any) => {
            if(res.success) {
                resolve(res);
            } else if(res.status === 422 || res.status === 401) {
                const reFRes = await refreshToken(store.dispatch);
                if(reFRes) {
                    const recallRes = await API.post(url, body);
                    if(res.success) { 
                        resolve(recallRes);
                    } else {
                            clientErrorHandler(res);
                            reject(new Error(res.message));
                    }
                } else {
                    clientErrorHandler(reFRes);
                    reject(new Error('Token refresh failed'));
                }
            } else {
                clientErrorHandler(res);
                reject(new Error(res.message));
            }
        })
        
     })
     return res
};

export const get = async (url: string, params?:object) => {
    const res: any  = await new Promise((resolve, reject) => {
        API.get(url, params ? params : {}).then(async (res: any) => {
            if(res.success) {
                resolve(res);
            } else if(res.status === 422 || res.status === 401) {
                const reFRes = await refreshToken(store.dispatch);
                if(reFRes) {
                    const recallRes = await API.get(url, params ? params : {});
                    if(res.success) { 
                        resolve(recallRes);
                    } else {
                            clientErrorHandler(res);
                            reject(new Error(res.message));
                    }
                } else {
                    
                    reject(new Error('Token refresh failed'));
                }
            } else {
                clientErrorHandler(res);
                reject(new Error(res.message));
            }
        })
    })
    return res
}
