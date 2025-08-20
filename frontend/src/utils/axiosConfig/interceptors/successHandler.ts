import { AxiosResponse } from "axios"

const successHandler = (response: AxiosResponse) => {
  return {data: response.data, success: true} as any;
}

export default successHandler;