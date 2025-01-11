import axios, { AxiosResponse } from 'axios';

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const ADD_COUPON: string = `${API_URL}/coupon/add`;
export const GET_COUPONS: string = `${API_URL}/coupon/get`;
export const EDIT_BROWSE: string = `${API_URL}/browse/update`;
export const EDIT_COUPONS: string = `${API_URL}/coupon/update`;
export const LIST_BROWSE: string = `${API_URL}/get_browse_list`;

export default function AddCouponsFunction(data: any): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(ADD_COUPON, data, {
    headers: {
      token: token
    }
  });
}

export  function EditCouponsFunction(data: FormData): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(EDIT_COUPONS, data, {
    headers: {
      token: token
    }
  });
}


export function getCouponsFunction(pageNumber : any , limit : any,search:any): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(GET_COUPONS,{
    pageNumber : pageNumber,
    limit : limit,
    search:search
  }, {
    headers: {
      token: token
    }
  });
}



export  function EditBrowseFunction(data: FormData): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.put(EDIT_BROWSE, data, {
    headers: {
      token: token
    }
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
      token: token
    }
  });
}

export function verifyCouponFunction(
  id:any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }
  
  const  VERIFY_API_URL = `${API_URL}/coupon/publish/${id}`
  const token: string = JSON.parse(localData).token;
  const obj = ""

  return axios.post(VERIFY_API_URL, {obj},{
    headers: {
      token: token,
    },
  });
}

