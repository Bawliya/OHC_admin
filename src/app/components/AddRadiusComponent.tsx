import "react-toastify/dist/ReactToastify.css";
import "../../../public/custom.css";

// import { useState } from "react";
import { useEffect, useState } from "react";

import clsx from "clsx";
import { useFormik } from "formik";
// import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";

import {
  AddRadiusFunction,
  getSettingFunction,
} from "../services/setting/setting";

// import { getRestaurantListFunction } from "../services/Restaurant/Restaurant";

const loginSchema = Yup.object().shape({
  restaurantNearby: Yup.string().required("Driver nearby radius is required"),
  driverNearby: Yup.string().required("Driver nearby radius is required"),
  driverDuration: Yup.string().required("Driver nearby radius is required"),
  deliveryFee: Yup.string().required("Delivery fee is required"),
});

const RadiusDetailsCard: React.FC = () => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState({
    restaurantNearby: "",
    driverNearby: "",
    driverDuration: "",
    deliveryFee: "",
  });
  useEffect(() => {
    getRestaurantList();
  }, []);
  const getRestaurantList = async () => {
    const res = await getSettingFunction();
    setInitialFormValues({
      driverNearby: res?.data?.data?.delivery_boy_redius || "",
      restaurantNearby: res?.data?.data?.restaurant_redius || "",
      driverDuration: res?.data?.data?.order_accept_duration || "",
      deliveryFee: res?.data?.data?.deliveryFee || "",
    });
  };
  const formik = useFormik({
    initialValues: initialFormValues,
    enableReinitialize: true,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const notifySuccess = () => toast.success("Radius Update successfully");
      // const notifyError = (errorMessage: any) => toast.error(errorMessage);
      setLoading(true);
      try {
        console.log(values);
        const obj = {
          restaurant_redius: values.restaurantNearby,
          delivery_boy_redius: values.driverNearby,
          order_accept_duration: values.driverDuration,
          VAT: values.deliveryFee,
        };
        const response = await AddRadiusFunction(obj);
        notifySuccess();
        console.log(response);
      } catch (error) {
        console.error("Error:", error);
        // if (error.response) {
        //   setStatus(error.response.data.message);
        // } else {
        //   setStatus("An unexpected error occurred. Please try again later.");
        // }
      } finally {
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
      id="AddBannerFrom"
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
                    <h2>Radius Configuration Details</h2>
                  </div>
                </div>
                <div className="card-body">
                  <label className="form-label">Restaurant nearby radius</label>
                  <div className="input-group mb-7">
                    <input
                      type="number"
                      {...formik.getFieldProps("restaurantNearby")}
                      className={clsx(
                        "form-control bg-transparent",
                        {
                          "is-invalid":
                            formik.touched.restaurantNearby &&
                            formik.errors.restaurantNearby,
                        },
                        {
                          "is-valid":
                            formik.touched.restaurantNearby &&
                            !formik.errors.restaurantNearby,
                        }
                      )}
                      name="restaurantNearby"
                      id="restaurantNearby"
                      placeholder="Restaurant nearby radius"
                      aria-describedby="basic-addon2"
                    />
                    <span className="input-group-text" id="basic-addon2">
                      KM
                    </span>
                    {/* <label htmlFor="floatingInput" className="text-muted">
                    Restaurant nearby radius
                    </label> */}
                    {/* {formik.touched.restaurantNearby && formik.errors.restaurantNearby && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert">{formik.errors.restaurantNearby}</span>
                        </div>
                      </div>
                    )} */}
                  </div>
                  <div className="text-muted fs-7 mb-7"></div>

                  <div className="text-muted fs-7 mb-7"></div>
                  <label className="form-label d-block">
                    Driver nearby radius
                  </label>
                  <div className="input-group mb-7">
                    <input
                      type="number"
                      {...formik.getFieldProps("driverNearby")}
                      className={clsx(
                        "form-control custom-number-input bg-transparent",
                        {
                          "is-invalid":
                            formik.touched.driverNearby &&
                            formik.errors.driverNearby,
                        },
                        {
                          "is-valid":
                            formik.touched.driverNearby &&
                            !formik.errors.driverNearby,
                        }
                      )}
                      name="driverNearby"
                      id="driverNearby"
                      placeholder="Driver nearby radius"
                      aria-describedby="basic-addon2"
                    />
                    <span className="input-group-text" id="basic-addon2">
                      KM
                    </span>
                    {/* <label htmlFor="floatingInput" className="text-muted">
                    Driver nearby radius
                    </label>
                    {formik.touched.driverNearby &&
                      formik.errors.driverNearby && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert">
                              {formik.errors.driverNearby}
                            </span>
                          </div>
                        </div>
                      )} */}
                  </div>
                  <label className="form-label d-block">
                    Driver Order Accept Reject Duration
                  </label>
                  <div className="input-group mb-7">
                    <input
                      type="number"
                      {...formik.getFieldProps("driverDuration")}
                      className={clsx(
                        "form-control custom-number-input bg-transparent",
                        {
                          "is-invalid":
                            formik.touched.driverDuration &&
                            formik.errors.driverDuration,
                        },
                        {
                          "is-valid":
                            formik.touched.driverDuration &&
                            !formik.errors.driverDuration,
                        }
                      )}
                      name="driverDuration"
                      id="driverDuration"
                      placeholder="Driver Order Accept Reject Duration"
                      aria-describedby="basic-addon2"
                    />
                    <span className="input-group-text" id="basic-addon2">
                      Second
                    </span>
                    {/* <label htmlFor="floatingInput" className="text-muted">
                    Driver nearby radius
                    </label>
                    {formik.touched.driverNearby &&
                      formik.errors.driverNearby && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert">
                              {formik.errors.driverNearby}
                            </span>
                          </div>
                        </div>
                      )} */}
                  </div>

                  <label className="form-label d-block">
                    VAT(value added tax)
                  </label>
                  <div className="input-group mb-7">
                    <input
                      type="number"
                      {...formik.getFieldProps("deliveryFee")}
                      className={clsx(
                        "form-control custom-number-input bg-transparent",
                        {
                          "is-invalid":
                            formik.touched.deliveryFee &&
                            formik.errors.deliveryFee,
                        },
                        {
                          "is-valid":
                            formik.touched.deliveryFee &&
                            !formik.errors.deliveryFee,
                        }
                      )}
                      name="deliveryFee"
                      id="deliveryFee"
                      placeholder="Delivery Fee"
                      aria-describedby="basic-addon2"
                    />
                    <span className="input-group-text" id="basic-addon2">
                      %
                    </span>
                    {/* <label htmlFor="floatingInput" className="text-muted">
                    Driver nearby radius
                    </label>
                    {formik.touched.driverNearby &&
                      formik.errors.driverNearby && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert">
                              {formik.errors.driverNearby}
                            </span>
                          </div>
                        </div>
                      )} */}
                  </div>

                  <div className="text-muted fs-7 mb-7"></div>

                  {/* <label className="form-label d-block">Restaurant</label>
                  <div className="mb-7">
                  <select
                          id="business_category"
                          {...formik.getFieldProps("restaurantId")}
                          className='form-select bg-transparent'
                          aria-label="Select business category"
                          name="restaurantId"
                        >
                          <option>Open this select menu</option>
                          {restaurants?.map((item: any) => (
                            <option key={item._id} value={item._id}>
                              {item.nameEn}
                            </option>
                          ))}
                        </select>
                          
                  </div> */}

                  <div className="form-floating text-end">
                    <button
                      type="submit"
                      id="kt_sign_in_submit"
                      className="btn btnRed"
                      // style={{backgroundColor:"#f90505", color:"white"}}
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

export default RadiusDetailsCard;
