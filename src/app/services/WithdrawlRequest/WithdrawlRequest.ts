import axios, { AxiosResponse } from "axios";

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const ADD_CATEGORY: string = `${API_URL}/category/add`;
export const EDIT_CATEGORY: string = `${API_URL}/category/update`;
export const GET_WITHDRAWL_REQUEST: string = `${API_URL}/get_withdrawl_request`;
export const GET_CATEGORY_LIST: string = `${API_URL}/get_category_list`;
// export const DELETE_CATEGORY: string = `${API_URL}/category/delete`;

export default function AddCategoryFunction(
  data: FormData
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(ADD_CATEGORY, data, {
    headers: {
      token: token,
    },
  });
}

export function getWithdrawlFunction(
  pageNumber: any,
  limit: any,
  status : any,
  type:any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(
    GET_WITHDRAWL_REQUEST,
    {
      pageNumber: pageNumber,
      limit: limit,
      status: status,
      type:type
    },
    {
      headers: {
        token: token,
      },
    }
  );
}

export function getCategoryList(
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.get(
    GET_CATEGORY_LIST,
    {
      headers: {
        token: token,
      },
    }
  );
}

export  function EditCategoryFunction(data: FormData): Promise<AxiosResponse<any>> {
    const localData: string | null = localStorage.getItem("kt-auth-react-v");
    if (!localData) {
      // Handle case where localData is null
      throw new Error("Local data not found");
    }
  
    const token: string = JSON.parse(localData).token;
  
    return axios.put(EDIT_CATEGORY, data, {
      headers: {
        token: token
      }
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


export function verifyWithdrawlFunction(
  id:any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }
  
  const  VERIFY_API_URL = `${API_URL}/proceed_withdrawl_request`
  const token: string = JSON.parse(localData).token;

  return axios.post(VERIFY_API_URL,{withdrawl_id:id},{
    headers: {
      token: token,
    },
  });
}


