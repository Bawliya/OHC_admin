import axios, { AxiosResponse } from "axios";

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const ADD_NOTIFICATION: string = `${API_URL}/notification/send`;
export const GET_NOTIFICATION: string = `${API_URL}/notification/get`;
export const GET_ORDER: string = `${API_URL}api/getOrders`;
export const EDIT_BROWSE: string = `${API_URL}/browse/update`;
export const LIST_BROWSE: string = `${API_URL}/get_browse_list`;

export default function AddNotificationFunction(
  data: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(ADD_NOTIFICATION, data, {
    headers: {
      authorization: token,
    },
  });
}

export function getOrderFunction(
  pageNumber: any,
  limit: any,
  type: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.get(`${GET_ORDER}?type=${type}`, {
    headers: {
      authorization: token,
    },
  });
}

export function deleteBrowseFunction(
  browseId: string
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  const DELETE_BROWSE_URL = `${API_URL}/browse/delete/${browseId}`;
  console.log(DELETE_BROWSE_URL);

  return axios.delete(DELETE_BROWSE_URL, {
    headers: {
      token: token,
    },
  });
}

export function EditBrowseFunction(
  data: FormData
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.put(EDIT_BROWSE, data, {
    headers: {
      token: token,
    },
  });
}

export function getBrowseAllList(): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.get(LIST_BROWSE, {
    headers: {
      token: token,
    },
  });
}

export function verifyBrowseFunction(id: any): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const VERIFY_API_URL = `${API_URL}/browse/publish/${id}`;
  const token: string = JSON.parse(localData).token;

  return axios.get(VERIFY_API_URL, {
    headers: {
      token: token,
    },
  });
}
