import axios, { AxiosResponse } from 'axios';

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const ADD_ROLE: string = `${API_URL}/role/add`;
// export const EDIT_CATEGORY: string = `${API_URL}/category/update`;
export const GET_ROLE_LIST: string = `${API_URL}/permission/get`;
export const GET_ORDER_REPORT: string = `${API_URL}/get_orders_report`;
export const GET_CREDIT_REPORT: string = `${API_URL}/get_report`;
export const UPDATE_DELIVERY_BOY: string = `${API_URL}/deliveryboy/verify_delivery_boy`;
// export const DELETE_CATEGORY: string = `${API_URL}/category/delete`;

export  function AddRoleFunction(
  data: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(ADD_ROLE, data, {
    headers: {
      token: token,
    },
  });
}

export function getRoleListFunction(
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
    GET_ROLE_LIST,
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



export default function GetOrderReportunction(
  Obj: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }
  
  const token: string = JSON.parse(localData).token;

  return axios.post(GET_ORDER_REPORT, Obj, {
    headers: {
      token: token,
    },
  });
}

export  function GetCreditBalanceReportunction(
  Obj: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }
  
  const token: string = JSON.parse(localData).token;

  return axios.post(GET_CREDIT_REPORT, Obj, {
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


