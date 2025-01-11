import axios, { AxiosResponse } from "axios";

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const ADD_CATEGORY: string = `${API_URL}api/categoryadd`;
export const EDIT_CATEGORY: string = `${API_URL}api/categoryupdate/`;
export const GET_CATEGORY: string = `${API_URL}api/categoryget`;
export const GET_CATEGORY_LIST: string = `${API_URL}/get_category_list`;
// export const DELETE_CATEGORY: string = `${API_URL}/category/delete`;



export default function AddCategoryFunction(
  data: FormData // Updated to accept FormData for name and image
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");

  // if (!localData) {
  //   // Throw an error if the token is not found in local storage
  //   throw new Error("User is not authenticated. Please log in.");
  // }

  // const token: string = JSON.parse(localData).token;

  // Debugging token
  // console.log("Authorization Token:", token);

  // Return an axios POST request with proper headers for multipart/form-data
  return axios.post(ADD_CATEGORY, data, {
    headers: {
      // Authorization: `Bearer ${token}`, // Bearer token format
      "Content-Type": "multipart/form-data", // Required for file uploads
    },
  });
}

export function getCategoryFunction(
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

export function getCategoryList(): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.get(GET_CATEGORY_LIST, {
    headers: {
      token: token,
    },
  });
}

export function EditCategoryFunction(
  data: FormData
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.put(EDIT_CATEGORY+data.get("id"), data, {
    headers: {
      // authorization: token,
    },
  });
}

export function deleteCategoryFunction(
  id: string
): Promise<AxiosResponse<any>> {
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

export function verifyCategoryFunction(id: any): Promise<AxiosResponse<any>> {
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
