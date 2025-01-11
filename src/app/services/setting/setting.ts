import axios, { AxiosResponse } from 'axios';

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const ADD_Key: string = `${API_URL}/update_payment_key`;
export const ADD_RADIUS: string = `${API_URL}/update_radius`;
export const ADD_PRIVACY: string = `${API_URL}/update_privacy_policy`;
export const ADD_TERM: string = `${API_URL}/update_termandcondition`;
export const EDIT_BANNER: string = `${API_URL}/banner/update`;
export const GET_SETTING: string = `${API_URL}/get_app_setting`;
export const GET_WEB: string = `${API_URL}/get_webview_data`;

export default function AddKeyFunction(data: any): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(ADD_Key, data, {
    headers: {
      token: token
    }
  });
}

export  function AddRadiusFunction(data: any): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(ADD_RADIUS, data, {
    headers: {
      token: token
    }
  });
}


export  function AddPrivacyFunction(data: any): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(ADD_PRIVACY, data, {
    headers: {
      token: token
    }
  });
}
export  function AddTERMFunction(data: any): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.post(ADD_TERM, data, {
    headers: {
      token: token
    }
  });
}


export  function EditBannerFunction(data: FormData): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.put(EDIT_BANNER, data, {
    headers: {
      token: token
    }
  });
}

export function getSettingFunction(): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.get(GET_SETTING, {
    headers: {
      token: token
    }
  });
}

export function getWebFunction(): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  return axios.get(GET_WEB, {
    headers: {
      token: token
    }
  });
}


export function deleteBannerFunction(bannerId: string): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const token: string = JSON.parse(localData).token;

  const DELETE_BANNER_URL = `${API_URL}/banner/delete/${bannerId}`;
  console.log(DELETE_BANNER_URL);
  
  return axios.delete(DELETE_BANNER_URL, {
    headers: {
      token: token
    }
  });
}


export function verifyBannerFunction(
  id:any
): Promise<AxiosResponse<any>> {
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }
  
  const  VERIFY_API_URL = `${API_URL}/banner/publish/${id}`
  const token: string = JSON.parse(localData).token;

  return axios.get(VERIFY_API_URL, {
    headers: {
      token: token,
    },
  });
}