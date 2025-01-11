import axios, { AxiosResponse } from "axios";

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const ADD_BANNER: string = `${API_URL}api/banneradd`;
export const EDIT_BANNER: string = `${API_URL}api/bannerupdate`;
export const GET_BANNERS: string = `${API_URL}api/bannerget`;

export default function AddBannerFunction(data: FormData): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(ADD_BANNER, data, {
    headers: {
      token: token
    }
  });
}


export function EditBannerFunction(data: FormData): Promise<AxiosResponse<any>> {
  // Retrieve token from local storage
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    throw new Error("User is not authenticated. Please log in.");
  }

  const token: string = JSON.parse(localData).token;

  // Extract the banner ID from FormData
  const bannerId = data.get("id");
  if (!bannerId) {
    throw new Error("Banner ID is missing in the request data.");
  }

  // Construct the endpoint dynamically
  const endpoint = `${EDIT_BANNER}/${bannerId}`;

  // Send the PUT request with FormData
  return axios.put(endpoint, data, {
    headers: {
      Authorization: `Bearer ${token}`, // Use Bearer token for authorization
      "Content-Type": "multipart/form-data", // Required for FormData
    },
  });
}


export function getBannersFunction(pageNumber : any , limit : any): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.get(GET_BANNERS);
}


export function deleteBannerFunction(bannerId: string): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  const DELETE_BANNER_URL = `${API_URL}api/bannerdelete/${bannerId}`;
  console.log(DELETE_BANNER_URL);
  
  return axios.delete(DELETE_BANNER_URL, {
    headers: {
      token: token
    }
  });
}


export function verifyBannerFunction(
  id:any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }
  
  const  VERIFY_API_URL = `${API_URL}/banner/publish/${id}`
  const token: string = JSON.parse(localData).token;

  return axios.get(VERIFY_API_URL, {
    headers: {
      token: token,
    },
  });
}