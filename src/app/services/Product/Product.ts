import axios, { AxiosResponse } from "axios";

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const ADD_RESTAURANT: string = `${API_URL}/restaurant/add`;
export const EDIT_CATEGORY: string = `${API_URL}/category/update`;
export const GET_PRODUCT: string = `${API_URL}/product/get`;
export const GET_RESTAURANT_BY_ID: string = `${API_URL}/restaurant/get`;
export const GET_RESTAURANT_LIST: string = `${API_URL}/get_restaurant_list`;
export const ADD_PRODUCT: string = `${API_URL}/product/add`;
export const EDIT_PRODUCT: string = `${API_URL}/product/update`;
// export const DELETE_CATEGORY: string = `${API_URL}/category/delete`;

export default function AddRestaurantFunction(
  data: FormData
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(ADD_RESTAURANT, data, {
    headers: {
      token: token,
    },
  });
}

export function getProductFunction(
  pageNumber: any,
  limit: any,
  search: any,
  id:any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(
    GET_PRODUCT,
    {
      pageNumber: pageNumber,
      limit: limit,
      search: search,
      restaurant_id: id,
    },
    {
      headers: {
        token: token,
      },
    }
  );
}


export function getRestaurantListFunction(): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.get(
    GET_RESTAURANT_LIST,

    {
      headers: {
        token: token,
      },
    }
  );
}

export function getRestaurantByIdFunction(
  id: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;
  console.log("token", token);

  const API_URL = `${GET_RESTAURANT_BY_ID}/${id}`;

  return axios({
    url: API_URL,
    method: "POST",
    headers: {
      token: token,
    },
  });
}

export function EditCategoryFunction(
  data: FormData
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.put(EDIT_CATEGORY, data, {
    headers: {
      token: token,
    },
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


export function AddProductFunction(
  data: FormData
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }
  console.log("sev",data);
  
  const token: string = JSON.parse(localData).token;
 
  return axios.post(ADD_PRODUCT, data, {
    headers: {
      token: token,
    },
  });
}

export function EditProductFunction(
  data: FormData
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }
  console.log("sev",data);
  
  const token: string = JSON.parse(localData).token;
 
  return axios.post(EDIT_PRODUCT, data, {
    headers: {
      token: token,
    },
  });
}


export function verifProductFunction(
  id:any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }
  
  const  VERIFY_API_URL = `${API_URL}/product/publish/${id}`
  const token: string = JSON.parse(localData).token;

  return axios.get(VERIFY_API_URL, {
    headers: {
      token: token,
    },
  });
}

export function OneProductFunction(
  id:any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }
  const data = ""
  
  const  VERIFY_API_URL = `${API_URL}/product/get/${id}`
  const token: string = JSON.parse(localData).token;

  return axios.post(VERIFY_API_URL,data,{
    headers: {
      token: token,
    },
  });
}

