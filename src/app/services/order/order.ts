import axios, { AxiosResponse } from 'axios';

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
// export const ADD_RESTAURANT: string = `${API_URL}/restaurant/add`;
// export const EDIT_CATEGORY: string = `${API_URL}/category/update`;
export const GET_ORDER_LIST: string = `${API_URL}/getOrderList`;
// export const GET_RESTAURANT_BY_ID: string = `${API_URL}/restaurant/get`;
export const UPDATE_DELIVERY_BOY: string = `${API_URL}/deliveryboy/verify_delivery_boy`;
export const REFUND_API: string = `${API_URL}/order_refund`;
export const GET_LIST: string = `${API_URL}/deliveryboy/transactions`;
export const GET_USER_LIST: string = `${API_URL}/user/wallet_history`;
export const GET_ORDER_LIST_USER: string = `${API_URL}/getOrderListUser`;

// export default function AddRestaurantFunction(
//   data: FormData
// ): Promise<AxiosResponse<any>> {
//   const localData: string | null = localStorage.getItem("kt-auth-react-v");
//   if (!localData) {
//     // Handle case where localData is null
//     throw new Error("Local data not found");
//   }

//   const token: string = JSON.parse(localData).token;

//   return axios.post(ADD_RESTAURANT, data, {
//     headers: {
//       token: token,
//     },
//   });
// }

export function getOrderListFunction(
  pageNumber: any,
  limit: any,
  search: any,
  delivery_boy_id:any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(
    GET_ORDER_LIST,
    {
      pageNumber: pageNumber,
      limit: limit,
      search: search,
      delivery_boy_id:delivery_boy_id
    },
    {
      headers: {
        token: token,
      },
    }
  );
}

export function getOrderListFunctionUser(
  pageNumber: any,
  limit: any,
  search: any,
  user_id:any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(
    GET_ORDER_LIST_USER,
    {
      pageNumber: pageNumber,
      limit: limit,
      search: search,
      user_id:user_id
    },
    {
      headers: {
        token: token,
      },
    }
  );
}


  export function getFunction(
    pageNumber: any,
    limit: any,
    search: any,
    delivery_boy_id:any
  ): Promise<AxiosResponse<any>> {
    const localData: string | null = localStorage.getItem("kt-auth-react-v");
    if (!localData) {
      // Handle case where localData is null
      throw new Error("Local data not found");
    }
  
    const token: string = JSON.parse(localData).token;
  
    return axios.post(
      GET_LIST,
      {
        pageNumber: pageNumber,
        limit: limit,
        search: search,
        delivery_boy_id:delivery_boy_id
      },
      {
        headers: {
          token: token,
        },
      }
    );
  }

  export function getUserFunction(
    pageNumber: any,
    limit: any,
    search: any,
    user_id:any
  ): Promise<AxiosResponse<any>> {
    const localData: string | null = localStorage.getItem("kt-auth-react-v");
    if (!localData) {
      // Handle case where localData is null
      throw new Error("Local data not found");
    }
  
    const token: string = JSON.parse(localData).token;
  
    return axios.post(
      GET_USER_LIST,
      {
        pageNumber: pageNumber,
        limit: limit,
        search: search,
        user_id:user_id
      },
      {
        headers: {
          token: token,
        },
      }
    );
  }

export default function RefundFunction(
  id: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }
  const obj = {
    "order_id":id
  }
  
  console.log("obj",obj);
  
  const token: string = JSON.parse(localData).token;

  return axios.post(REFUND_API, obj, {
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


