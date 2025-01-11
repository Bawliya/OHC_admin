import axios, { AxiosResponse } from 'axios';

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const ADD_ADMIN: string = `${API_URL}/admin/signup`;
// export const EDIT_CATEGORY: string = `${API_URL}/category/update`;
export const GET_ALL_ADMIN: string = `${API_URL}/admin/get`;
export const GET_ROLE_ALL: string = `${API_URL}/role/get`;
// export const GET_RESTAURANT_BY_ID: string = `${API_URL}/restaurant/get`;
export const UPDATE_DELIVERY_BOY: string = `${API_URL}/deliveryboy/verify_delivery_boy`;
// export const DELETE_CATEGORY: string = `${API_URL}/category/delete`;

export  function AddAdminFunction(
  data: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(ADD_ADMIN, data, {
    headers: {
      token: token,
    },
  });
}

export function getAdminListFunction(
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

  return axios.post(
    GET_ALL_ADMIN,
    {
      pageNumber: pageNumber,
      limit: limit,
      search: search,
    },
    {
      headers: {
        token: token,
      },
    }
  );
}

export function getAllRoleFunction(
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  const data  = " ";

  return axios.post(
    GET_ROLE_ALL,{
      data
    },
    {
      headers: {
        token: token,
      },
    }
  );
}

export default function verifyDeliveryBoyFunction(
  delivery_boy_id: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }
  const obj = {
    "delivery_boy_id":delivery_boy_id
  }
  
  const token: string = JSON.parse(localData).token;

  return axios.post(UPDATE_DELIVERY_BOY, obj, {
    headers: {
      token: token,
    },
  });
}


export  function GetOneOrderFunction(
  id: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }
  const API_URLs = `${API_URL}/getOneOrder?id=${id}`;
  const token: string = JSON.parse(localData).token;

  return axios.get(API_URLs, {
    headers: {
      token: token,
    },
  });
}


