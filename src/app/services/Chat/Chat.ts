import axios, { AxiosResponse } from 'axios';

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const ADD_ROLE: string = `${API_URL}/role/add`;
// export const EDIT_CATEGORY: string = `${API_URL}/category/update`;
export const GET_CUSTOMER_CHAT: string = `${API_URL}/chat/customer`;
// export const GET_CHAT_ONE: string = `${API_URL}/chat/customer/one`;
// export const GET_RESTAURANT_BY_ID: string = `${API_URL}/restaurant/get`;
export const GET_DELIVERY_BOY_CHAT: string = `${API_URL}/chat/driver`;
export const GET_PARTNER_CHAT: string = `${API_URL}/chat/partner`;

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

export function getCustomerChatFunction(
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;
  return axios.get(
    GET_CUSTOMER_CHAT,
    {
      headers: {
        token: token,
      },
    }
  );
}


export function getOneChatFunction(id:any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

//   const data  = " ";
  const GET_CHAT_ONE: string = `${API_URL}/chat/customer/one?chat_id=` + id;

  return axios.get(
    GET_CHAT_ONE,
    {
      headers: {
        token: token,
      },
    }
  );
}

export function getDeliveryBoyChatFunction(
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;
  return axios.get(
    GET_DELIVERY_BOY_CHAT,
    {
      headers: {
        token: token,
      },
    }
  );
}


export function getpartnerChatFunction(
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;
  return axios.get(
    GET_PARTNER_CHAT,
    {
      headers: {
        token: token,
      },
    }
  );
}


