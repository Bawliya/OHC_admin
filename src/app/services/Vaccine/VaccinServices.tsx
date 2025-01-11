import axios, { AxiosResponse } from "axios";

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const ADD_CATEGORY: string = `${API_URL}/vaccine/add`;
export const EDIT_CATEGORY: string = `${API_URL}/vaccine/get`;
export const GET_CATEGORY: string = `${API_URL}/vaccine/get`;
export const GET_CATEGORY_LIST: string = `${API_URL}/get_category_list`;
// export const DELETE_CATEGORY: string = `${API_URL}/category/delete`;

export default function AddVaccineFunction(
  data: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;
  console.log(token);

  return axios.post(ADD_CATEGORY, data, {
    headers: {
      authorization: token,
    },
  });
}

export function getVaccineFunction(
  pageNumber: any,
  limit: any,
  search: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.get(`${GET_CATEGORY}?pageNo=${pageNumber}&limit=${limit}`, {
    headers: {
      authorization: token,
    },
  });
}

export function getVaccineList(): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.get(GET_CATEGORY_LIST, {
    headers: {
      authorization: token,
    },
  });
}

export function EditVaccineFunction(
  data: FormData
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.put(EDIT_CATEGORY, data, {
    headers: {
      token: token,
    },
  });
}

export function deleteVaccineFunction(id: string): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  const DELETE_CATEGORY_URL = `${API_URL}/category/delete/${id}`;

  return axios.delete(DELETE_CATEGORY_URL, {
    headers: {
      token: token,
    },
  });
}

export function verifyVaccineFunction(id: any): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const VERIFY_API_URL = `${API_URL}/category/publish/${id}`;
  const token: string = JSON.parse(localData).token;

  return axios.get(VERIFY_API_URL, {
    headers: {
      token: token,
    },
  });
}
