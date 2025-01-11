import axios, { AxiosResponse } from "axios";

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const ADD_RESTAURANT: string = `${API_URL}/restaurant/add`;
export const ADD_BRANCH: string = `${API_URL}/branch/add`;
export const ADD_IMAGE: string = `${API_URL}api/videoadd`;
export const ADD_SORT_VIDEO: string = `${API_URL}/video/shots/add`;
export const ADD_FILE: string = `${API_URL}/uploadExcelFile`;
export const GET_IMAGE: string = `${API_URL}api/videoget`;
export const GET_SORT_VIDEO: string = `${API_URL}/video/shots/get`;
export const EDIT_RESTAURANT: string = `${API_URL}/restaurant/update`;
export const EDIT_CATEGORY: string = `${API_URL}/category/update`;
export const GET_RESTAURANT: string = `${API_URL}/restaurant/get`;
export const GET_BRANCH_VIEW: string = `${API_URL}/branch/get`;
export const GET_RESTAURANT_BY_ID: string = `${API_URL}/restaurant/get`;
export const GET_BRANCH_BY_ID: string = `${API_URL}/branch/get`;
export const GET_RESTAURANT_LIST: string = `${API_URL}/get_restaurant_list`;

export const ADD_PRODUCT: string = `${API_URL}/product/add`;
export const LIST_CAT: string = `${API_URL}/categories_list`;
export const Authorities_LIST: string = `${API_URL}/authorities_list`;
export const regions_list: string = `${API_URL}/regions_list`;
export const city_list: string = `${API_URL}/city_list`;

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

export function AddBranchFunction(data: FormData): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(ADD_BRANCH, data, {
    headers: {
      token: token,
    },
  });
}

export function AddImageFunction(data: FormData): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(ADD_IMAGE, data, {
    headers: {
      authorization: token,
    },
  });
}
export function AddSortVideoFunction(
  data: FormData
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(ADD_SORT_VIDEO, data, {
    headers: {
      authorization: token,
    },
  });
}

export function AddCsvFileFunction(
  data: FormData
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(ADD_FILE, data, {
    headers: {
      token: token,
    },
  });
}

export function EditRestaurantFunction(
  data: FormData
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.put(EDIT_RESTAURANT, data, {
    headers: {
      token: token,
    },
  });
}

export function getRestaurantFunction(
  pageNumber: any,
  limit: any,
  search: any,
  restaurantID: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(
    GET_RESTAURANT,
    {
      pageNumber: pageNumber,
      limit: limit,
      search: search,
      restaurantID: restaurantID,
    },
    {
      headers: {
        token: token,
      },
    }
  );
}

export function getRestaurantOneFunction(
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
    GET_RESTAURANT,
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

export function getImageFunction(
  pageNumber: any,
  limit: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.get(`${GET_IMAGE}?pageNo=${pageNumber}&limit=${limit}`, {
    headers: {
      authorization: token,
    },
  });
}
export function getSortVideoFunction(
  pageNumber: any,
  limit: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.get(`${GET_SORT_VIDEO}?pageNo=${pageNumber}&limit=${limit}`, {
    headers: {
      authorization: token,
    },
  });
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
  console.log("id", id);

  const API_URL = `${GET_RESTAURANT_BY_ID}/${id}`;
  console.log(API_URL);

  return axios({
    url: API_URL,
    method: "POST",
    headers: {
      token: token,
    },
  });
}

export function getBranchByIdFunction(id: any): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;
  console.log("token", token);
  console.log("id", id);

  const API_URL = `${GET_BRANCH_BY_ID}/${id}`;
  console.log(API_URL);

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
  console.log("sev", data);

  const token: string = JSON.parse(localData).token;

  return axios.post(ADD_PRODUCT, data, {
    headers: {
      token: token,
    },
  });
}

export function verifyRestaurantFunction(id: any): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const VERIFY_API_URL = `${API_URL}/restaurant/publish/${id}`;
  const token: string = JSON.parse(localData).token;

  return axios.get(VERIFY_API_URL, {
    headers: {
      token: token,
    },
  });
}

export function getCatList(): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.get(LIST_CAT, {
    headers: {
      token: token,
    },
  });
}

export function getAuthoritiesList(): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.get(Authorities_LIST, {
    headers: {
      token: token,
    },
  });
}

export function getRegionsList(): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.get(regions_list, {
    headers: {
      token: token,
    },
  });
}

export function getCityList(id: any): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const obj = {
    regionId: id,
  };
  const token: string = JSON.parse(localData).token;

  return axios.post(city_list, obj, {
    headers: {
      token: token,
    },
  });
}

export function getBranchViewFunction(
  pageNumber: any,
  limit: any,
  search: any,
  restaurantID: any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;
  console.log(restaurantID, "hello");
  return axios.post(
    GET_BRANCH_VIEW,
    {
      pageNumber: pageNumber,
      limit: limit,
      search: search,
      restaurantID: restaurantID,
    },
    {
      headers: {
        token: token,
      },
    }
  );
}

// export const getProductList = async () => {
//   try {
//     const GET_PRODUCT_LIST: string = `${API_URL}/getProductList/6613aa4ca797460d4540f2e2`;
//    return axios.post(
//      GET_BRANCH_VIEW,
//      {
//        pageNumber: pageNumber,
//        limit: limit,
//        search: search,
//        restaurantID: restaurantID,
//      },
//      {
//        headers: {
//          token: token,
//        },
//      }
//    );
//   } catch (error) {
//     console.error("Error fetching product list", error);
//     throw error;
//   }
// };

export function getProductLists(id: any): Promise<AxiosResponse<any>> {
  const GET_PRODUCT_LIST: string = `${API_URL}/getProductList/${id}`;
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }
  const token: string = JSON.parse(localData).token;

  return axios.get(GET_PRODUCT_LIST, {
    headers: {
      token: token,
    },
  });
}
