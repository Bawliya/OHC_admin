import "/public/custom.css";
import "react-toastify/dist/ReactToastify.css";

// import { useState } from "react";
import {
  ChangeEvent,
  //   ChangeEvent,
  useEffect,
  useState,
} from "react";

import clsx from "clsx";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import Select from "react-select";

// import { getBrowseAllList } from '../../../services/browse/Browse';
import {
  getCityList,
  getRegionsList,
} from "../../../services/Restaurant/Restaurant";
// import MapComponent from "../../../components/MapComponent";
import { getProductLists } from "../../../services/Restaurant/Restaurant";
import MapComponent from "../../MapComponent";
// import AddRestaurantFunction from "@/app/services/Product/Product";
import AddRestaurantFunction from "../../../services/Restaurant/Restaurant";
import { getZoneAllList } from "../../../services/Zoon/Zoon";

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
  ZoneId: Yup.string().required("Zone Is Required"),
});

interface types {
  file: any;
  //   file2: any;
  // Add other properties as needed
}

const BranchDetailsCard: React.FC<types> = ({ file }) => {
  const navigate = useNavigate();
  const param = useParams();
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState<any>("");
  const [longitude, setLongitude] = useState<any>("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  //   const [browseData, setBrowseData] = useState<any[]>([]);
  //   const [catData, setCatData] = useState<any[]>([]);
  //   const [authoritiesData, setAuthoritiesData] = useState<any[]>([]);
  const [ZoneData, setZoneData] = useState<any[]>([]);
  const [regionData, setRegionData] = useState<any[]>([]);
  const [cityData, setCityData] = useState<any[]>([]);
  const [restaurantId, setRestaurantId] = useState<any>("");
  console.log(longitude);
  console.log(latitude);

  useEffect(() => {
    const currentPageUrl = window.location.href;
    const parts = currentPageUrl.split("/"); // Split the URL by '/'
    const id = parts[parts.length - 1];
    setRestaurantId(id);
  }, []);

  useEffect(() => {
    if (param.id) {
      const fetchCategories = async () => {
        try {
          const data = await getProductLists(param.id);
          // Transform the data to fit the dropdown's expected format
          const options = await data?.data?.data?.map((item: any) => ({
            value: item._id,
            label: item.nameEn,
          }));
          console.log("options", options);
          setCategoryOptions(options);

          // setCategoryOptions(data?.data?.data);
        } catch (error) {
          console.error("Error fetching categories", error);
        }
      };

      fetchCategories();
    }
  }, [param.id]);

  useEffect(() => {
    console.log("categoryOptions", categoryOptions);
  }, [categoryOptions]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
    console.log("event.target.value", event.target.value);
    const [regionid, regionnameEn] = event.target.value.split(",");
    const resp = await getCityList(regionid);
    if (resp?.data.status) {
      setCityData(resp?.data?.data);
      formik.setFieldValue("regionId", `${regionid},${regionnameEn}`);
    } else {
      setCityData([]);
    }
  };

  useEffect(() => {
    // getBrowse();
    // getCategories()
    // getAuthorities()
    getRegions();
    getZone();
  }, []);

  const getZone = async () => {
    const resp = await getZoneAllList();
    if (resp?.data.status) {
      setZoneData(resp?.data?.data);
    } else {
      setZoneData([]);
    }
  };

  //   const getBrowse = async () => {
  //     const resp = await getBrowseAllList();
  //     if (resp?.data.status) {
  //       setBrowseData(resp?.data?.data);
  //     } else {
  //       setBrowseData([]);
  //     }
  //   };

  //   const getCategories = async ()=> { //getCatList
  //     const resp = await getCatList();
  //     if (resp?.data) {
  //       setCatData(resp?.data.data);
  //     } else {
  //       setCatData([]);
  //     }
  //   }

  const getRegions = async () => {
    //getCatList
    const resp = await getRegionsList();
    if (resp?.data) {
      setRegionData(resp?.data.data);
    } else {
      setRegionData([]);
    }
  };

  //   const getAuthorities = async ()=> { //getCatList
  //     const resp = await getAuthoritiesList();
  //     if (resp?.data) {
  //       setAuthoritiesData(resp?.data.data);
  //     } else {
  //       setAuthoritiesData([]);
  //     }
  //   }
  //   console.log("catData", catData);

  const handleLatLngChange = (lat: any, lng: any) => {
    console.log(lat, lng);
    setLatitude(lat);
    setLongitude(lng);
  };

  const formik = useFormik({
    initialValues: {
      nameEn: "",
      nameAr: "",
      index: "",
      email: "",
      phone: "",
      latitude: "",
      longitude: "",
      business_category: "",
      categories_list_id: "",
      product: "",
      password: "",
      confirmPassword: "",
      authorities_list: "",
      regionId: "",
      cityId: "",
      ZoneId: "",
    },

    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting, setErrors }) => {
      const notifySuccess = () => toast.success("Branch added successfully");
      const notifyError = (errorMessage: any) => toast.error(errorMessage);
      setLoading(true);
      console.log("latitude", latitude);
      console.log("longitude", longitude);
      const validationErrors = await formik.validateForm();

      if (values.password !== values.confirmPassword) {
        setErrors({ confirmPassword: "Passwords do not match" });
        setLoading(false);
        setSubmitting(false);
        return;
      }
      if (Object.keys(validationErrors).length > 0) {
        formik.setTouched({
          nameEn: true,
          nameAr: true,
          index: true,
          email: true,
          phone: true,
          password: true,
          confirmPassword: true,
          ZoneId: true,
        });
        setLoading(false);
        setSubmitting(false);
        return;
      }

      try {
        if (!file) {
          const message = "Background image is required";
          notifyError(message);
          return;
        }
        if (!longitude) {
          const message = "latitude/Longitude is required";
          notifyError(message);
          return;
        }

        console.log(file);

        console.log(values);
        const [
          authoritiesid,
          authoritiesnameEn,
        ] = values.authorities_list.split(",");
        const [
          categoriesid,
          categoriesnameEn,
        ] = values.categories_list_id.split(",");
        console.log(authoritiesid);
        console.log(authoritiesnameEn);
        console.log(categoriesid);
        console.log(categoriesnameEn);
        const [regionid, regionnameEn] = values.regionId.split(",");
        const [cityid, citynameEn] = values.cityId.split(",");

        const formData = new FormData();
        formData.append("nameEn", values.nameEn);
        formData.append("nameAr", values.nameAr);
        formData.append("position", String(values.index));
        formData.append("background_image", file);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("product", JSON.stringify(values.product));
        formData.append("password", values.password);
        formData.append("ZoneId", values.ZoneId);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("regionId", regionid);
        formData.append("regionName", regionnameEn);
        formData.append("cityName", citynameEn);
        formData.append("cityId", cityid);
        formData.append("restaurantId", restaurantId);
        // formData.append("categories_list_id", values._id);
        formData.append("country_code", "966");
        console.log(formData);
        const response = await AddRestaurantFunction(formData);
        notifySuccess();
        setTimeout(() => {
          navigate("/business/view");
        }, 1000);
        console.log(response);
      } catch (error) {
        // Handle errors
        console.error("Error:", error);

        // if (error.response) {
        //   setStatus(error.response.data.message);
        //   notifyError(error.response.data.message);
        // } else {
        //   setStatus("An unexpected error occurred. Please try again later.");
        //   notifyError("An unexpected error occurred. Please try again later.");
        // }
      } finally {
        setStatus("Not Valid Data");
        // notifyError("Not Valid Data")
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <form
      className="form w-100"
      onSubmit={formik.handleSubmit}
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
                    <h2>Branch Details</h2>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row  d-flex">
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                      <label className="form-label">Name In English</label>
                      <div className="form-floating mb-7">
                        <input
                          type="text"
                          {...formik.getFieldProps("nameEn")}
                          className={clsx(
                            "form-control bg-transparent",
                            {
                              "is-invalid":
                                formik.touched.nameEn && formik.errors.nameEn,
                            },
                            {
                              "is-valid":
                                formik.touched.nameEn && !formik.errors.nameEn,
                            }
                          )}
                          name="nameEn"
                          id="nameEn"
                          placeholder="Name"
                        />
                        <label htmlFor="floatingInput" className="text-muted">
                          Branch Name In English
                        </label>
                        {formik.touched.nameEn && formik.errors.nameEn && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert">{formik.errors.nameEn}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                      <label className="form-label">Name In Arabic</label>
                      <div className="form-floating mb-7">
                        <input
                          type="text"
                          {...formik.getFieldProps("nameAr")}
                          className={clsx(
                            "form-control bg-transparent",
                            {
                              "is-invalid":
                                formik.touched.nameAr && formik.errors.nameAr,
                            },
                            {
                              "is-valid":
                                formik.touched.nameAr && !formik.errors.nameAr,
                            }
                          )}
                          name="nameAr"
                          id="nameAr"
                          placeholder="Name Ar"
                        />
                        <label htmlFor="floatingInput" className="text-muted">
                          Branch Name In Arabic
                        </label>
                        {formik.touched.nameAr && formik.errors.nameAr && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert">{formik.errors.nameAr}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                      <label className="form-label d-block">Index</label>
                      <div className="form-floating mb-7">
                        <input
                          type="number"
                          {...formik.getFieldProps("index")}
                          className={clsx(
                            "form-control custom-number-input bg-transparent",
                            {
                              "is-invalid":
                                formik.touched.index && formik.errors.index,
                            },
                            {
                              "is-valid":
                                formik.touched.index && !formik.errors.index,
                            }
                          )}
                          name="index"
                          id="index"
                          placeholder="Index"
                        />
                        <label htmlFor="floatingInput" className="text-muted">
                          Branch Index
                        </label>
                        {formik.touched.index && formik.errors.index && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert">{formik.errors.index}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                      <label className="form-label d-block">Browse List</label>
                      <div className="form-floating mb-7">
                        <select
                          id="business_category"
                          {...formik.getFieldProps("business_category")}
                          className={clsx("form-select bg-transparent", {
                            "is-invalid":
                              formik.touched.business_category &&
                              formik.errors.business_category,
                            "is-valid":
                              formik.touched.business_category &&
                              !formik.errors.business_category,
                          })}
                          aria-label="Select business category"
                          name="business_category"
                        >
                          <option>Open this select menu</option>
                          {browseData?.map((item: any) => (
                            <option key={item._id} value={item._id}>
                              {item.nameEn}
                            </option>
                          ))}
                        </select>
                        {formik.touched.business_category &&
                          formik.errors.business_category && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert">
                                  {formik.errors.business_category}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                    </div> */}
                    {/* <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                      <label className="form-label d-block">Authorities</label>
                      <div className="form-floating mb-7">
                        <select
                          id="authorities_list"
                          {...formik.getFieldProps("authorities_list")}
                          className={clsx("form-select bg-transparent", {
                            "is-invalid":
                              formik.touched.authorities_list &&
                              formik.errors.authorities_list,
                            "is-valid":
                              formik.touched.authorities_list &&
                              !formik.errors.authorities_list,
                          })}
                          aria-label="Select business category"
                          name="authorities_list"
                        >
                          <option>Open this select menu</option>
                          {authoritiesData?.map((item: any) => (
                            <option key={item.id} value={`${item.id},${item.nameEn}`}>
                              {item.nameEn}
                            </option>
                          ))}
                        </select>
                        {formik.touched.authorities_list &&
                          formik.errors.authorities_list && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert">
                                  {formik.errors.authorities_list}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>  

                    <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                      <label className="form-label d-block">Categories</label>
                      <div className="form-floating mb-7">
                        <select
                          id="categories_list_id"
                          {...formik.getFieldProps("categories_list_id")}
                          className={clsx("form-select bg-transparent", {
                            "is-invalid":
                              formik.touched.categories_list_id &&
                              formik.errors.categories_list_id,
                            "is-valid":
                              formik.touched.categories_list_id &&
                              !formik.errors.categories_list_id,
                          })}
                          aria-label="Select business category"
                          name="categories_list_id"
                        >
                          <option>Open this select menu</option>
                          {catData?.map((item: any) => (
                            <option key={item.id} value={`${item.id},${item.nameEn}`}>
                              {item.nameEn}
                            </option>
                          ))}
                        </select>
                        {formik.touched.categories_list_id &&
                          formik.errors.categories_list_id && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert">
                                  {formik.errors.categories_list_id}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>


                    <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                      <label className="form-label d-block">Region</label>
                      <div className="form-floating mb-7">
                        <select
                          id="categories_list_id"
                          {...formik.getFieldProps("regionId")}
                          className={clsx("form-select bg-transparent", {
                            "is-invalid":
                              formik.touched.regionId &&
                              formik.errors.regionId,
                            "is-valid":
                              formik.touched.regionId &&
                              !formik.errors.regionId,
                          })}
                          aria-label="Select business category"
                          name="regionId"
                          value={selectedRegion}
                          onChange={handleChange}
                        >
                          <option>Open this select menu</option>
                          {regionData?.map((item: any) => (
                            <option  key={item.is} value={`${item.id},${item.nameEn}`}>
                              {item.nameEn}
                            </option>
                          ))}
                        </select>
                        {formik.touched.regionId &&
                          formik.errors.regionId && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert">
                                  {formik.errors.regionId}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>


                    <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                      <label className="form-label d-block">City</label>
                      <div className="form-floating mb-7">
                        <select
                          id="cityId"
                          {...formik.getFieldProps("cityId")}
                          className={clsx("form-select bg-transparent", {
                            "is-invalid":
                              formik.touched.cityId &&
                              formik.errors.cityId,
                            "is-valid":
                              formik.touched.cityId &&
                              !formik.errors.cityId,
                          })}
                          aria-label="Select business category"
                          name="cityId"
                        >
                          <option>Open this select menu</option>
                          {cityData?.map((item: any) => (
                            <option key={item.id} value={`${item.id},${item.nameEn}`}>
                              {item.nameEn}
                            </option>
                          ))}
                        </select>
                        {formik.touched.cityId &&
                          formik.errors.cityId && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert">
                                  {formik.errors.cityId}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                    </div> */}
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                      <label className="form-label d-block">Email</label>
                      <div className="form-floating mb-7">
                        <input
                          type="email"
                          {...formik.getFieldProps("email")}
                          className={clsx(
                            "form-control custom-number-input bg-transparent",
                            {
                              "is-invalid":
                                formik.touched.email && formik.errors.email,
                            },
                            {
                              "is-valid":
                                formik.touched.email && !formik.errors.email,
                            }
                          )}
                          name="email"
                          id="email"
                          placeholder="email"
                        />
                        <label htmlFor="floatingInput" className="text-muted">
                          Branch Email
                        </label>
                        {formik.touched.email && formik.errors.email && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert">{formik.errors.email}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                      <label className="form-label">Password</label>
                      <div className="form-floating mb-7">
                        <input
                          type="password"
                          {...formik.getFieldProps("password")}
                          className={clsx(
                            "form-control bg-transparent",
                            {
                              "is-invalid":
                                formik.touched.password &&
                                formik.errors.password,
                            },
                            {
                              "is-valid":
                                formik.touched.password &&
                                !formik.errors.password,
                            }
                          )}
                          name="password"
                          id="password"
                          placeholder="Password"
                        />
                        <label htmlFor="floatingInput" className="text-muted">
                          Password
                        </label>
                        {formik.touched.password && formik.errors.password && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert">{formik.errors.password}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Confirm Password Field */}
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                      <label className="form-label">Confirm Password</label>
                      <div className="form-floating mb-7">
                        <input
                          type="password"
                          {...formik.getFieldProps("confirmPassword")}
                          className={clsx(
                            "form-control bg-transparent",
                            {
                              "is-invalid":
                                formik.touched.confirmPassword &&
                                formik.errors.confirmPassword,
                            },
                            {
                              "is-valid":
                                formik.touched.confirmPassword &&
                                !formik.errors.confirmPassword,
                            }
                          )}
                          name="confirmPassword"
                          id="confirmPassword"
                          placeholder="Confirm Password"
                        />
                        <label htmlFor="floatingInput" className="text-muted">
                          Confirm Password
                        </label>
                        {formik.touched.confirmPassword &&
                          formik.errors.confirmPassword && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert">
                                  {formik.errors.confirmPassword}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                      <label className="form-label">Product</label>
                      <Select
                        isMulti
                        name="product"
                        options={categoryOptions}
                        classNamePrefix="select"
                        className={clsx("basic-multi-select", {
                          "is-invalid":
                            formik.touched.product && formik.errors.product,
                        })}
                        onChange={(selectedOptions: any) => {
                          const selectedValues = selectedOptions.map(
                            (option: any) => option.value
                          );
                          setSelectedCategories(selectedOptions);
                          formik.setFieldValue("product", selectedValues);
                        }}
                        value={selectedCategories}
                      />
                    </div>

                    <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                      <label className="form-label d-block">Phone</label>
                      <div className="form-floating mb-7">
                        <input
                          type="number"
                          {...formik.getFieldProps("phone")}
                          className={clsx(
                            "form-control custom-number-input bg-transparent",
                            {
                              "is-invalid":
                                formik.touched.phone && formik.errors.phone,
                            },
                            {
                              "is-valid":
                                formik.touched.phone && !formik.errors.phone,
                            }
                          )}
                          name="phone"
                          id="phone"
                          placeholder="phone"
                        />
                        <label htmlFor="floatingInput" className="text-muted">
                          Branch Phone Number
                        </label>
                        {formik.touched.phone && formik.errors.phone && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert">{formik.errors.phone}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                      <label className="form-label d-block">Region</label>
                      <div className="form-floating mb-7">
                        <select
                          id="categories_list_id"
                          {...formik.getFieldProps("regionId")}
                          className={clsx("form-select bg-transparent", {
                            "is-invalid":
                              formik.touched.regionId && formik.errors.regionId,
                            "is-valid":
                              formik.touched.regionId &&
                              !formik.errors.regionId,
                          })}
                          aria-label="Select business category"
                          name="regionId"
                          value={selectedRegion}
                          onChange={handleChange}
                        >
                          <option>Open this select menu</option>
                          {regionData?.map((item: any) => (
                            <option
                              key={item.is}
                              value={`${item.id},${item.nameEn}`}
                            >
                              {item.nameEn}
                            </option>
                          ))}
                        </select>
                        {formik.touched.regionId && formik.errors.regionId && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert">{formik.errors.regionId}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                      <label className="form-label d-block">City</label>
                      <div className="form-floating mb-7">
                        <select
                          id="cityId"
                          {...formik.getFieldProps("cityId")}
                          className={clsx("form-select bg-transparent", {
                            "is-invalid":
                              formik.touched.cityId && formik.errors.cityId,
                            "is-valid":
                              formik.touched.cityId && !formik.errors.cityId,
                          })}
                          aria-label="Select business category"
                          name="cityId"
                        >
                          <option>Open this select menu</option>
                          {cityData?.map((item: any) => (
                            <option
                              key={item.id}
                              value={`${item.id},${item.nameEn}`}
                            >
                              {item.nameEn}
                            </option>
                          ))}
                        </select>
                        {formik.touched.cityId && formik.errors.cityId && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert">{formik.errors.cityId}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12 col-lg-12 col-xxl-12">
                    <label className="form-label d-block">Zone</label>
                    <div className="form-floating mb-7">
                      <select
                        id="ZoneId"
                        {...formik.getFieldProps("ZoneId")}
                        className={clsx("form-select bg-transparent pt-0", {
                          "is-invalid":
                            formik.touched.ZoneId && formik.errors.ZoneId,
                          "is-valid":
                            formik.touched.ZoneId && !formik.errors.ZoneId,
                        })}
                        aria-label="Select business category"
                        name="ZoneId"
                      >
                        <option>Open this select menu</option>
                        {ZoneData?.map((item: any) => (
                          <option key={item._id} value={item._id}>
                            {item.zoon_name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.ZoneId && formik.errors.ZoneId && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert">{formik.errors.ZoneId}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6"></div>
                  <label className="form-label d-block">Search Location</label>
                  <div className="form-floating mb-7">
                    <MapComponent
                      onLatLngChange={handleLatLngChange}
                      setLatitude={setLatitude}
                      setLongitude={setLongitude}
                      latitude={latitude}
                      longitude={longitude}
                    />
                  </div>

                  <div className="form-floating text-end">
                    <button
                      type="submit"
                      id="kt_sign_in_submit"
                      className="btn btnRed"
                      disabled={formik.isSubmitting || !formik.isValid}
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
  );
};

export default BranchDetailsCard;
