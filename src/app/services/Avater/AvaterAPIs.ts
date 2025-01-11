import axios, { AxiosResponse } from "axios";

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const ADD_AVATER: string = `${API_URL}/avtar/add`;
export const GET_CATEGORY_LIST: string = `${API_URL}/avtar/get`;

export default function AddAvaterFunction(
  data: FormData
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(ADD_AVATER, data, {
    headers: {
      authorization: token,
    },
  });
}

export function getAvaterList(
  pageNumber: any,
  limit: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");

  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.get(`${GET_CATEGORY_LIST}?pageNo=${pageNumber}&limit=${limit}`, {
    headers: {
      authorization: token,
    },
  });
}
