import "react-toastify/dist/ReactToastify.css";
import "/public/custom.css";

// import { useState } from "react";
import { ChangeEvent, useEffect, useState } from "react";

// import clsx from "clsx";
// import { useFormik } from "formik";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";

import { getBrowseAllList } from "../services/browse/Browse";
import {
  EditRestaurantFunction,
  getAuthoritiesList,
  getCatList,
  getCityList,
  getRegionsList,
  getRestaurantByIdFunction,
} from "../services/Restaurant/Restaurant";
import ProductThumbnail from "./ImageComponent";
// import MapComponent from "../../../components/MapComponent";
// import AddRestaurantFunction from "../services/Restaurant/Restaurant";
import MapComponent from "./MapComponent";
import { getZoneAllList } from "../services/Zoon/Zoon";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loginSchema = Yup.object().shape({
  nameEn: Yup.string()
    .min(3, "Too Short!")
    .required("Restaurant Name In English Is Required"),
  nameAr: Yup.string()
    .min(3, "Too Short!")
    .required("Restaurant Name In Arabic Is Required"),
  index: Yup.number().required("Restaurant Index Is Required"),
  phone: Yup.number().required("Restaurant Phone Is Required"),
  email: Yup.string()
    .email()
    .required("Restaurant Email is required"),
  business_category: Yup.string().required("Restaurant Browse is required"),
  delivery_fee: Yup.string().required("Delivery fee is required"),
});

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}/images/restaurant/`;

interface ModalComponentProps {
  show: boolean;
  onHide: () => void;
  values: any;
  setTableData: any;
  tableData: any;
  //   updateFunc: any;
}

const RestaurantModelDetailsCard: React.FC<ModalComponentProps> = (props) => {
  //   const [file, setFile] = useState<any>("");
  //   const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState<any>("");
  const [longitude, setLongitude] = useState<any>("");
  const [browseData, setBrowseData] = useState<any[]>([]);
  const [file, setFile] = useState<any>("");
  const [file2, setFile2] = useState<any>("");
  //   const [setData, setDatas] = useState<any>({});
  const [data, setData] = useState<any>({});
  const [catData, setCatData] = useState<any[]>([]);
  const [authoritiesData, setAuthoritiesData] = useState<any[]>([]);
  const [regionData, setRegionData] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [cityData, setCityData] = useState<any[]>([]);
  const notifySuccess = () => toast.success("Business Updated Successfully");
  const notifyError = (errorMessage: any) => toast.error(errorMessage);
  const [ZoneData, setZoneData] = useState<any[]>([]);

  console.log("props", props.values._id);

  const getBrowse = async () => {
    const resp = await getBrowseAllList();
    if (resp?.data.status) {
      setBrowseData(resp?.data?.data);
    } else {
      setBrowseData([]);
    }
  };

  const handleChangeSS = async (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
    console.log("event.target.value", event.target.value);
    setData({ ...data, [event.target.name]: event.target.value });
    console.log(data);
    const resp = await getCityList(event.target.value);
    if (resp?.data.status) {
      setCityData(resp?.data?.data);
    } else {
      setCityData([]);
    }
  };

  const idss = props?.values?._id;
  console.log(idss);

  const getRestaurant = async (id: any) => {
    const res = await getRestaurantByIdFunction(id);
    console.log(idss);
    // alert(JSON.stringify(res?.data?.data))
    console.log("res", res?.data?.data.location.coordinates[0]);
    setData({
      nameEn: res?.data?.data.nameEn,
      nameAr: res?.data?.data.nameAr,
      index: res?.data?.data.index,
      email: res?.data?.data.email,
      background_image: res?.data?.data.background_image,
      logo: res?.data?.data.logo,
      phone: res?.data?.data.phone,
      latitude: res?.data?.data.location.coordinates[0],
      longitude: res?.data?.data.location.coordinates[1],
      business_category: res?.data?.data.business_category,
      regionId: res?.data?.data.regionId,
      cityId: res?.data?.data.cityId,
      categories_list_id: res?.data?.data.categories_list_id,
      authorities_list_id: res?.data?.data.authorities_list_id,
      authorities_list: res?.data?.data.authorities_list,
      delivery_fee: res?.data?.data.delivery_fee,
      ZoneId: res?.data?.data.zone_id,
      password: res?.data?.data.password,
      confirmPassword: res?.data?.data.password,
    }); //res?.data?.data
    console.log(res?.data?.data.location);
    setLatitude(res?.data?.data.location.coordinates[1]);
    setLongitude(res?.data?.data.location.coordinates[0]);
  };

  console.log("data", data);

  //   useEffect(()=>{
  //     setLatitude(lat);
  //     setLongitude(lng);
  //   })

  useEffect(() => {
    getBrowse();
    getRestaurant(idss);
    getCategories();
    getAuthorities();
    getRegions();
    getZone();
  }, [idss]);

  const getZone = async () => {
    const resp = await getZoneAllList();
    if (resp?.data.status) {
      setZoneData(resp?.data?.data);
    } else {
      setZoneData([]);
    }
  };

  const getCategories = async () => {
    //getCatList
    const resp = await getCatList();
    if (resp?.data) {
      setCatData(resp?.data.data);
    } else {
      setCatData([]);
    }
  };

  const getAuthorities = async () => {
    //getCatList
    const resp = await getAuthoritiesList();
    if (resp?.data) {
      setAuthoritiesData(resp?.data.data);
    } else {
      setAuthoritiesData([]);
    }
  };

  const getRegions = async () => {
    //getCatList
    const resp = await getRegionsList();
    if (resp?.data) {
      setRegionData(resp?.data.data);
    } else {
      setRegionData([]);
    }
  };

  const handleLatLngChange = (lat: any, lng: any) => {
    setLatitude(lat);
    setLongitude(lng);
    console.log(lat, lng);
  };

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleClose = () => {
    props.onHide();
    setLoading(false);
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    // Define required fields
    const requiredFields = [
      { value: idss, name: "id" },
      { value: data.nameEn, name: "nameEn" },
      { value: data.nameAr, name: "nameAr" },
      { value: 1, name: "index" }, // position is hardcoded, no need to validate
      // { value: file, name: "background_image" },
      // { value: file2, name: "logo" },
      { value: data.business_category, name: "business_category" },
      { value: data.email, name: "email" },
      { value: data.phone, name: "phone" },
      { value: latitude, name: "latitude" },
      { value: longitude, name: "longitude" },
      { value: data.categories_list_id, name: "categories_list_id" },
      { value: data.authorities_list_id, name: "authorities_list_id" },
      // { value: data.regionId, name: "regionId" },
      { value: data.cityId, name: "cityId" },
      { value: data.regionId, name: "regionId" },
      { value: data.delivery_fee, name: "delivery_fee" },
      { value: data.ZoneId, name: "ZoneId" },
      { value: data.password, name: "password" },
      { value: data.confirmPassword, name: "confirmPassword" },

      // { value: "966", name: "country_code" } // country code is hardcoded, no need to validate
    ];

    // Check for missing fields
    const missingFields = requiredFields.filter(
      (field) =>
        field.value === null || field.value === undefined || field.value === ""
    );

    if (missingFields.length > 0) {
      notifyError(
        "Please fill in all required fields: " +
          missingFields.map((field) => field.name).join(", ")
      );
      setLoading(false);
      // alert("Please fill in all required fields: " + missingFields.map(field => field.name).join(", "));
      return;
    }
    if (data.password !== data.confirmPassword) {
      notifyError("Passwords do not match");
      setLoading(false);
      return;
    }
    // alert(data.ZoneId)
    const formData = new FormData();
    formData.append("id", idss);
    formData.append("nameEn", data.nameEn);
    formData.append("nameAr", data.nameAr);
    formData.append("position", "1");
    formData.append("background_image", file);
    formData.append("logo", file2);
    formData.append("business_category", data.business_category);
    formData.append("authorities_list_id", data.authorities_list_id);
    formData.append("categories_list_id", data.categories_list_id);
    formData.append("cityId", data.cityId);
    formData.append("regionId", data.regionId);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("password", data.password);
    formData.append("country_code", "966");
    formData.append("delivery_fee", data.delivery_fee);
    formData.append("ZoneId", data.ZoneId);
    const response = await EditRestaurantFunction(formData);

    console.log("EditRestaurantFunction", response);
    if (response.status === 200) {
      const index = props.tableData.findIndex((item: any) => item._id === idss);
      // alert("index" + index)
      if (index !== -1) {
        // Create a new array with the updated item
        const updatedArray = [...props.tableData];
        updatedArray[index] = response.data.data;

        console.log("Updated array:", updatedArray);
        // Update the state with the new array
        props.setTableData(updatedArray);
      }
      notifySuccess();
      setTimeout(() => {
        handleClose();
        // setLoading(false);
      }, 2000);
    } else {
      notifyError("Product Not Updated Successfully");
      setLoading(false);
    }

    // setShowAlert(true);
    if (response.data.status) {
      setTimeout(() => {
        // handleClose();
      }, 2000);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Business
        </Modal.Title>
      </Modal.Header>
      <>
        {/* <ProductThumbnail  imageName="Image" setFile={setFile} /> */}
        {/* <ProductThumbnail imageName="Logo"  setFile={setFile2}/> */}
        <form
          className="form w-100"
          //   onSubmit={formik.handleSubmit}
          noValidate
          id="AddRestaurantFrom"
        >
          <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="kt_ecommerce_add_product_general"
                role="tab-panel"
              >
                <div className="d-flex flex-column gap-7 gap-lg-10">
                  <div className="card card-flush py-2">
                    <div className="card-header">
                      <div className="card-title">
                        <h2>Business Details</h2>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="row  d-flex">
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                          <ProductThumbnail
                            imageName="Image"
                            setFile={setFile}
                            src={BASE_URL + data?.background_image}
                          />
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                          <ProductThumbnail
                            imageName="Logo"
                            setFile={setFile2}
                            src={BASE_URL + data?.logo}
                          />
                        </div>
                      </div>
                      <div className="row  d-flex">
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                          <label className="form-label">Name In English</label>
                          <div className="form-floating mb-7">
                            <input
                              type="text"
                              className="form-control bg-transparent"
                              name="nameEn"
                              value={data.nameEn}
                              onChange={handleChange}
                              id="nameEn"
                              placeholder="Name"
                            />
                            <label
                              htmlFor="floatingInput"
                              className="text-muted"
                            >
                              Restaurant Name In English
                            </label>
                          </div>
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                          <label className="form-label">Name In Arabic</label>
                          <div className="form-floating mb-7">
                            <input
                              type="text"
                              className="form-control bg-transparent"
                              name="nameAr"
                              id="nameAr"
                              value={data.nameAr}
                              onChange={handleChange}
                              placeholder="Name Ar"
                            />
                            <label
                              htmlFor="floatingInput"
                              className="text-muted"
                            >
                              Restaurant Name In Arabic
                            </label>
                          </div>
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                          <label className="form-label d-block">Index</label>
                          <div className="form-floating mb-7">
                            <input
                              type="number"
                              className="form-control custom-number-input bg-transparent"
                              name="index"
                              id="index"
                              value={2}
                              onChange={handleChange}
                              placeholder="Index"
                            />
                            <label
                              htmlFor="floatingInput"
                              className="text-muted"
                            >
                              Restaurant Index
                            </label>
                          </div>
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                          <label className="form-label d-block">
                            Browse List
                          </label>
                          <div className="form-floating mb-7">
                            <select
                              id="business_category"
                              className="form-select bg-transparent"
                              aria-label="Select business category"
                              name="business_category"
                              value={data.business_category}
                              onChange={handleChange}
                            >
                              <option>Open this select menu</option>
                              {browseData?.map((item: any) => (
                                <option key={item._id} value={item._id}>
                                  {item.nameEn}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                          <label className="form-label d-block">
                            Authorities
                          </label>
                          <div className="form-floating mb-7">
                            <select
                              id="authorities_list_id"
                              className="form-select bg-transparent"
                              aria-label="Select business category"
                              name="authorities_list_id"
                              value={data.authorities_list_id}
                              onChange={handleChange}
                            >
                              <option>Open this select menu</option>
                              {authoritiesData?.map((item: any) => (
                                <option key={item.id} value={item.id}>
                                  {item.nameEn}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                          <label className="form-label d-block">
                            Categories
                          </label>
                          <div className="form-floating mb-7">
                            <select
                              id="categories_list_id"
                              className="form-select bg-transparent"
                              aria-label="Select business category"
                              name="categories_list_id"
                              value={data.categories_list_id}
                              onChange={handleChange}
                            >
                              <option>Open this select menu</option>
                              {catData?.map((item: any) => (
                                <option key={item.id} value={item.id}>
                                  {item.nameEn}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                          <label className="form-label d-block">Region</label>
                          <div className="form-floating mb-7">
                            <select
                              id="regionId"
                              className="form-select bg-transparent"
                              aria-label="Select business category"
                              name="regionId"
                              value={data.regionId}
                              onChange={handleChangeSS}
                            >
                              <option>Open this select menu</option>
                              {regionData?.map((item: any) => (
                                <option key={item.id} value={item.id}>
                                  {item.nameEn}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                          <label className="form-label d-block">City</label>
                          <div className="form-floating mb-7">
                            <select
                              id="cityId"
                              className="form-select bg-transparent"
                              aria-label="Select business category"
                              name="cityId"
                              value={data.cityId}
                              onChange={handleChange}
                            >
                              <option>Open this select menu</option>
                              {cityData?.map((item: any) => (
                                <option key={item.id} value={item.id}>
                                  {item.nameEn}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                          <label className="form-label d-block">Email</label>
                          <div className="form-floating mb-7">
                            <input
                              type="email"
                              className="form-control custom-number-input bg-transparent"
                              name="email"
                              id="email"
                              value={data.email}
                              onChange={handleChange}
                              placeholder="email"
                            />
                            <label
                              htmlFor="floatingInput"
                              className="text-muted"
                            >
                              Restaurant Email
                            </label>
                          </div>
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                          <label className="form-label d-block">Phone</label>
                          <div className="form-floating mb-7">
                            <input
                              type="number"
                              className="form-control custom-number-input bg-transparent"
                              name="phone"
                              id="phone"
                              value={data.phone}
                              onChange={handleChange}
                              placeholder="phone"
                            />
                            <label
                              htmlFor="floatingInput"
                              className="text-muted"
                            >
                              Restaurant Phone Number
                            </label>
                          </div>
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                          <label className="form-label d-block">Password</label>
                          <div className="form-floating mb-7">
                            <input
                              type="password"
                              className="form-control custom-number-input bg-transparent"
                              name="password"
                              id="password"
                              placeholder="password"
                              value={data.password}
                              onChange={handleChange}
                            />
                            <label
                              htmlFor="floatingInput"
                              className="text-muted"
                            >
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                          <label className="form-label d-block">
                            Confirm password
                          </label>
                          <div className="form-floating mb-7">
                            <input
                              type="password"
                              className="form-control custom-number-input bg-transparent"
                              name="confirmPassword"
                              id="confirmPassword"
                              placeholder="confirmPassword"
                              value={data.confirmPassword}
                              onChange={handleChange}
                            />
                            <label
                              htmlFor="floatingInput"
                              className="text-muted"
                            >
                              Confirm password
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-12 col-md-12 col-lg-12 col-xxl-12">
                        <label className="form-label d-block">Zone</label>
                        <div className="form-floating mb-7">
                          <select
                            id="ZoneId"
                            className="form-select bg-transparent pt-0"
                            aria-label="Select business category"
                            name="ZoneId"
                            value={data.ZoneId}
                            onChange={handleChange}
                          >
                            <option>Open this select menu</option>
                            {ZoneData?.map((item: any) => (
                              <option key={item._id} value={item._id}>
                                {item.zoon_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-12 col-md-12 col-lg-12 col-xxl-12">
                        <label className="form-label d-block">
                          Delivery Fee
                        </label>
                        <div className="form-floating mb-7">
                          <input
                            type="number"
                            className="form-control custom-number-input bg-transparent"
                            name="delivery_fee"
                            id="delivery_fee"
                            placeholder="email"
                            value={data?.delivery_fee}
                            onChange={handleChange}
                          />
                          <label htmlFor="floatingInput" className="text-muted">
                            Delivery Fee
                          </label>
                        </div>
                      </div>

                      <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6"></div>
                      <label className="form-label d-block">
                        Search Location
                      </label>
                      <div className="form-floating mb-7">
                        <MapComponent
                          latitude={latitude}
                          longitude={longitude}
                          setLatitude={setLatitude}
                          setLongitude={setLongitude}
                          onLatLngChange={handleLatLngChange}
                        />
                      </div>

                      <div className="form-floating text-end">
                        <button
                          type="submit"
                          id="kt_sign_in_submit"
                          className="btn btnRed"
                          onClick={handleUpdate}
                          //   disabled={formik.isSubmitting || !formik.isValid}
                        >
                          {!loading && (
                            <span className="indicator-label">Submit</span>
                          )}
                          {loading && (
                            <span
                              className="indicator-progress"
                              style={{ display: "block" }}
                            >
                              Please wait...
                              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                          )}
                        </button>
                        <ToastContainer />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
      {/* <Modal.Footer>
         <button onClick={handleUpdate}>Update</button>
         <button
          type="submit"
          id="kt_sign_in_submit"
          className="btn btnRed"
          onClick={handleUpdate}
        //   disabled={}
        >
          {!loading && <span className="indicator-label">Submit</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default RestaurantModelDetailsCard;
