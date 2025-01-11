import axios, { AxiosResponse } from "axios";

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
// export const ADD_RESTAURANT: string = `${API_URL}/restaurant/add`;
// export const EDIT_CATEGORY: string = `${API_URL}/category/update`;
export const GET_DELIVERY_BOY: string = `${API_URL}/deliveryboy/list`;
export const GET_DELIVERY_BOY_LIST: string = `${API_URL}/get_delivery_boy`;
export const Dispatch_management: string = `${API_URL}/Dispatch_management`;
export const UPDATE_DELIVERY_BOY: string = `${API_URL}/deliveryboy/verify_delivery_boy`;


export function getDeliveryBoyFunction(
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
    GET_DELIVERY_BOY,
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

export function getFunction(
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(
    Dispatch_management,
    {},
    {
      headers: {
        token: token,
      },
    }
  );
}

export function getDeliveryBoyOneFunction(
  id: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  const GET_DELIVERY_BOY_ONE: string = `${API_URL}/deliveryboy/list/${id}`;
  const obj = ""
  return axios.post(
    GET_DELIVERY_BOY_ONE, obj,
    {
      headers: {
        token: token,
      },
    }
  );
}

export function AddWallet(
  obj: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;
  const id: string = JSON.parse(localData).data._id;
  obj.adminId = id
  const ADD_WALLET: string = `${API_URL}/addPaymentInDeliveryBoyWallet`;
  return axios.post(
    ADD_WALLET, obj,
    {
      headers: {
        token: token,
      },
    }
  );
}





export function getDeliveryBoyListFunction(
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.get(
    GET_DELIVERY_BOY_LIST,
    {
      headers: {
        token: token,
      },
    }
  );
}

export default function verifyDeliveryBoyFunction(
  delivery_boy_id: any,
  verify:any,
  date:any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }
  const obj = {
    "delivery_boy_id": delivery_boy_id,
    "admin_verify": verify,
    "expiryDate": date


  }

  const token: string = JSON.parse(localData).token;

  return axios.post(UPDATE_DELIVERY_BOY, obj, {
    headers: {
      token: token,
    },
  });
}


