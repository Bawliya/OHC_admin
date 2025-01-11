import axios, { AxiosResponse } from "axios";

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const ADD_ROLE: string = `${API_URL}/role/add`;
// export const EDIT_CATEGORY: string = `${API_URL}/category/update`;
export const GET_DASHBOARD_DATA: string = `${API_URL}api/getDashboardData`;
export const GET_ROLE_ALL: string = `${API_URL}/role/get`;
// export const GET_RESTAURANT_BY_ID: string = `${API_URL}/restaurant/get`;
export const UPDATE_DELIVERY_BOY: string = `${API_URL}/deliveryboy/verify_delivery_boy`;
// export const DELETE_CATEGORY: string = `${API_URL}/category/delete`;

export function AddRoleFunction(data: any): Promise<AxiosResponse<any>> {
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

export function getDashboardDataFunction(): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;
  return axios.get(GET_DASHBOARD_DATA, {
    headers: {
      authorization: token,
    },
  });
}

export function getAllRoleFunction(): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  const data = " ";

  return axios.post(
    GET_ROLE_ALL,
    {
      data,
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
    delivery_boy_id: delivery_boy_id,
  };

  const token: string = JSON.parse(localData).token;

  return axios.post(UPDATE_DELIVERY_BOY, obj, {
    headers: {
      token: token,
    },
  });
}

export function GetOneOrderFunction(id: any): Promise<AxiosResponse<any>> {
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
