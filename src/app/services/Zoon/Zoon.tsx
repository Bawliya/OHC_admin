import axios, { AxiosResponse } from 'axios';

const API_URL: string = 'http://localhost:3333' // import.meta.env.VITE_APP_API_URL as string;
export const ADD_ZOON: string = `${API_URL}/zoon/add`;
export const UPDATE_ZOON: string = `${API_URL}/zoon/update`;
// export const EDIT_CATEGORY: string = `${API_URL}/category/update`;
export const GET_ZOON: string = `${API_URL}/zoon/get`;
export const LIST_ZONE: string = `${API_URL}/zoon/List`;
export const GET_ORDER_REPORT: string = `${API_URL}/get_orders_report`;
export const GET_CREDIT_REPORT: string = `${API_URL}/get_report`;
export const UPDATE_DELIVERY_BOY: string = `${API_URL}/deliveryboy/verify_delivery_boy`;
// export const DELETE_CATEGORY: string = `${API_URL}/category/delete`;

export  function AddZoonFunction(
  data: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(ADD_ZOON, data, {
    headers: {
      token: token,
    },
  });
}

export function getZoneAllList(): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(LIST_ZONE, {},{
    headers: {
      token: token
    }
  });
}

export function getZoonFunction(pageNumber : any , limit : any,search:any): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(GET_ZOON,{
    pageNumber : pageNumber,
    limit : limit,
    search:search

  }, {
    headers: {
      token: token
    }
  });
}

export  function updateZoonFunction(
  data: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(UPDATE_ZOON, data, {
    headers: {
      token: token,
    },
  });
}