import axios, { AxiosResponse } from "axios";

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
// export const ADD_RESTAURANT: string = `${API_URL}/restaurant/add`;
// export const EDIT_CATEGORY: string = `${API_URL}/category/update`;
export const GET_USER: string = `${API_URL}api/user/get`;
export const BLOCK_USER: string = `${API_URL}/user/block-unblock`;
// export const GET_RESTAURANT_BY_ID: string = `${API_URL}/restaurant/get`;
export const UPDATE_DELIVERY_BOY: string = `${API_URL}/deliveryboy/verify_delivery_boy`;
// export const DELETE_CATEGORY: string = `${API_URL}/category/delete`;

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

// export function getUserListFunction (
//     pageNumber: any,
//   limit: any
//   const localData: string | null = localStorage.getItem("kt-auth-react-v");
//   if (!localData) {
//     // Handle case where localData is null
//     throw new Error("Local data not found");
//   }

//   const token: string = JSON.parse(localData).token;

//   return axios.get(GET_USER, {
//     headers: {
//       authorization: token,
//     },
//   });
// }

export function getUserListFunction(
  pageNumber: any,
  limit: any,
  userType: any,
  search: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.get(
    `${GET_USER}?userType=${userType}&search=${search}&page=${pageNumber}&limit=${limit}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
}
export function toggleBlockUserFunction(
  userId: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(
    BLOCK_USER,
    {
      userId,
    },
    {
      headers: {
        authorization: token,
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
