import "react-toastify/dist/ReactToastify.css";
import "../../../public/custom.css";
import "flatpickr/dist/flatpickr.min.css";

// import { useState } from "react";
import { useEffect, useState } from "react";

import clsx from "clsx";
import { useFormik } from "formik";
import Flatpickr from "react-flatpickr";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

import AddCouponsFunction from "../services/Coupons/coupons";
import { getRestaurantListFunction } from "../services/Restaurant/Restaurant";

const loginSchema = Yup.object().shape({
  Code: Yup.string()
    .min(2, "Too Short!")
    .required("Code Is Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .required("Description Is Required"),
  restaurantId: Yup.string(),
  discountType: Yup.string().required("Discount Type Is Required"),
  Discount: Yup.number().required("Discount Is Required"),
  // expiresAt: Yup.date(),
});

const AddCouponsDetailsCard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [restaurants, setResturants] = useState([]);
  // const [dateState, setDateState] = useState<Date | null>(null);
  const [dateState, setDateState] = useState<any>({
    date: new Date(),
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of the day

  const specificDisabledDates = ["2023-09-18", "2023-09-19", "2023-09-20"];

  useEffect(() => {
    getRestaurantList();
  }, []);
  const getRestaurantList = async () => {
    const res = await getRestaurantListFunction();
    setResturants(res?.data?.data);
  };
  const formik = useFormik({
    initialValues: {
      Code: "",
      discountType: "",
      Discount: "",
      // expiresAt: "",
      restaurantId: "",
      description: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const notifySuccess = () => toast.success("Coupon added successfully");
      const notifyError = (errorMessage: any) => toast.error(errorMessage);
      setLoading(true);
      try {
        console.log(values);
        const data = {
          code: values.Code,
          discountType: values.discountType,
          discount: values.Discount,
          expiresAt: dateState,
          restaurant_id: values.restaurantId,
          description: values.description,
          publish: false,
        };
        console.log("data data", data);
        const response = await AddCouponsFunction(data);
        notifySuccess();
        // navigate  page on banner/view after 1 second
        setTimeout(() => {
          navigate("/coupons/view");
        }, 1000);
        console.log(response);
      } catch (error) {
        // Handle errors
        console.error("Error:", error);

        // if (error.response) {
        //   // Server responded with a status code
        //   setStatus(error.response.data.message);
        //   notifyError(error.response.data.message);
        // } else {
        //   // An unexpected error occurred
        //   setStatus("An unexpected error occurred. Please try again later.");
        //   notifyError("An unexpected error occurred. Please try again later.");
        // }
      } finally {
        // Make sure to set loading state to false regardless of success or failure
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
      id="AddCouponsFrom"
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
                    <h2>Coupons Details</h2>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6">
                      <label className="form-label">Code</label>
                      <div className="form-floating mb-7">
                        <input
                          type="text"
                          {...formik.getFieldProps("Code")}
                          className={clsx(
                            "form-control bg-transparent",
                            {
                              "is-invalid":
                                formik.touched.Code && formik.errors.Code,
                            },
                            {
                              "is-valid":
                                formik.touched.Code && !formik.errors.Code,
                            }
                          )}
                          name="Code"
                          id="Code"
                          placeholder="Name"
                        />
                        <label htmlFor="floatingInput" className="text-muted">
                          Enter Your Code
                        </label>
                        {formik.touched.Code && formik.errors.Code && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert">{formik.errors.Code}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <label className="form-label d-block">
                        Discount Type
                      </label>
                      <div className="mb-7">
                        <select
                          id="discountType"
                          {...formik.getFieldProps("discountType")}
                          className={clsx(
                            "form-control custom-number-input bg-transparent",
                            {
                              "is-invalid":
                                formik.touched.discountType &&
                                formik.errors.discountType,
                            },
                            {
                              "is-valid":
                                formik.touched.discountType &&
                                !formik.errors.discountType,
                            }
                          )}
                          // className="form-select bg-transparent"
                          style={{ padding: "14px" }}
                          aria-label="Select"
                          name="discountType"
                        >
                          <option>Open this select menu</option>
                          <option key="Percent" value="Percent">
                            Percent
                          </option>
                          <option key="Fixed" value="Fixed">
                            Fixed
                          </option>
                          {formik.touched.discountType &&
                            formik.errors.discountType && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert">
                                    {formik.errors.discountType}
                                  </span>
                                </div>
                              </div>
                            )}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <label className="form-label d-block">Discount</label>
                      <div className="form-floating ">
                        <input
                          type="number"
                          {...formik.getFieldProps("Discount")}
                          className={clsx(
                            "form-control custom-number-input bg-transparent",
                            {
                              "is-invalid":
                                formik.touched.Discount &&
                                formik.errors.Discount,
                            },
                            {
                              "is-valid":
                                formik.touched.Discount &&
                                !formik.errors.Discount,
                            }
                          )}
                          name="Discount"
                          id="Discount"
                          placeholder="Name"
                        />
                        <label htmlFor="floatingInput" className="text-muted">
                          Discount
                        </label>
                        {formik.touched.Discount && formik.errors.Discount && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert">{formik.errors.Discount}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label d-block">Expires At</label>
                      {/* <Flatpickr
                        value={dateState ? dateState : ""} // Ensure that dateState is provided in the correct format
                        onChange={(date) => {
                          if (
                            Array.isArray(date) &&
                            date.length > 0 &&
                            date[0] instanceof Date
                          ) {
                            setDateState(date[0]);
                          } else {
                            setDateState(null);
                          }
                        }}
                        className="form-control"
                        name="expiresAt"
                        id="expiresAt"
                        style={{ padding: "14px" }}
                        placeholder="Expires At"
                      /> */}
                      <Flatpickr
                        value={dateState.date}
                        onChange={([date]) => {
                          setDateState({ date });
                        }}
                        options={{
                          disable: specificDisabledDates,
                          minDate: today, // Ensure only today and future dates are selectable
                          enableTime: true,
                          dateFormat: "d-m-Y H:i",
                        }}
                        className="form-control"
                        name="expiresAt"
                        id="expiresAt"
                        style={{ padding: "14px" }}
                        placeholder="Expires At"
                      />
                    </div>
                  </div>

                  <div className="text-muted fs-7 mb-7"></div>
                  <label className="form-label d-block">Restaurant</label>
                  <div className="mb-7">
                    <select
                      id="business_category"
                      {...formik.getFieldProps("restaurantId")}
                      className="form-select bg-transparent"
                      aria-label="Select business category"
                      name="restaurantId"
                    >
                      <option>Open this select menu</option>
                      {/* <option key="All" value="All">All</option> */}
                      {restaurants?.map((item: any) => (
                        <option key={item._id} value={item._id}>
                          {item.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="">
                    <label className="form-label">Description</label>
                    <div className="form-floating mb-7">
                      <textarea
                        style={{ minHeight: "150px" }}
                        {...formik.getFieldProps("description")}
                        className={clsx(
                          "form-control  bg-transparent",
                          {
                            "is-invalid":
                              formik.touched.description &&
                              formik.errors.description,
                          },
                          {
                            "is-valid":
                              formik.touched.description &&
                              !formik.errors.description,
                          }
                        )}
                        // className="form-control  bg-transparent"
                        name="description"
                        id="description"
                        placeholder="Description"
                      />
                      <label htmlFor="floatingInput" className="text-muted">
                        Description
                      </label>
                      {formik.touched.description && formik.errors.description && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert" className="text-danger">
                              {formik.errors.description}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-floating text-end">
                    <button
                      type="submit"
                      id="kt_sign_in_submit"
                      className="btn btnRed"
                      // style={{backgroundColor:"#f90505", color:"white"}}
                      disabled={
                        formik.isSubmitting ||
                        !formik.values.Code ||
                        !formik.values.Discount ||
                        !formik.values.description
                      }
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

export default AddCouponsDetailsCard;
