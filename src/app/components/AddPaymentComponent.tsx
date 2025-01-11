import "react-toastify/dist/ReactToastify.css";
import "../../../public/custom.css";

// import { useState } from "react";
import { useEffect, useState } from "react";

import clsx from "clsx";
import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";

// import AddBannerFunction from "../services/banner/Banner";
import AddKeyFunction, {
  getSettingFunction,
} from "../services/setting/setting";

// import { getRestaurantListFunction } from "../services/Restaurant/Restaurant";

const loginSchema = Yup.object().shape({
  public: Yup.string()
    .min(3, "Too Short!")
    .required("Public Key Is Required"),
  secret: Yup.string().required("Secret Key Is Required"),
});

const PaymentDetailsCard: React.FC = () => {
  // const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState({});
  const [initialFormValues, setInitialFormValues] = useState({
    public: "",
    secret: "",
  });
  useEffect(() => {
    getRestaurantList();
  }, []);
  const getRestaurantList = async () => {
    const res = await getSettingFunction();
    setKey(res?.data?.data);
    setInitialFormValues({
      public: res?.data?.data?.payment_public_key || "",
      secret: res?.data?.data?.payment_secret_key || "",
    });
  };
  console.log(key);

  const formik = useFormik({
    initialValues: initialFormValues,
    enableReinitialize: true,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const notifySuccess = () => toast.success("Key Update successfully");
      const notifyError = (errorMessage: any) => toast.error(errorMessage);
      setLoading(true);
      try {
        const obj = {
          payment_public_key: values.public,
          payment_secret_key: values.secret,
        };
        const response = await AddKeyFunction(obj);
        notifySuccess();
        // navigate  page on banner/view after 1 second
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
                    <h2>Payment Details</h2>
                  </div>
                </div>
                <div className="card-body">
                  <label className="form-label">Public Key</label>
                  <div className="form-floating mb-7">
                    <input
                      type="text"
                      {...formik.getFieldProps("public")}
                      className={clsx(
                        "form-control bg-transparent",
                        {
                          "is-invalid":
                            formik.touched.public && formik.errors.public,
                        },
                        {
                          "is-valid":
                            formik.touched.public && !formik.errors.public,
                        }
                      )}
                      name="public"
                      id="public"
                      placeholder="public"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.public}
                    />
                    <label htmlFor="floatingInput" className="text-muted">
                      Public Key
                    </label>
                    {formik.touched.public && formik.errors.public && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert">{formik.errors.public}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-muted fs-7 mb-7"></div>

                  <div className="text-muted fs-7 mb-7"></div>
                  <label className="form-label d-block">Secret Key</label>
                  <div className="form-floating mb-7">
                    <input
                      type="text"
                      {...formik.getFieldProps("secret")}
                      className={clsx(
                        "form-control custom-number-input bg-transparent",
                        {
                          "is-invalid":
                            formik.touched.secret && formik.errors.secret,
                        },
                        {
                          "is-valid":
                            formik.touched.secret && !formik.errors.secret,
                        }
                      )}
                      name="secret"
                      id="secret"
                      placeholder="Name"
                    />
                    <label htmlFor="floatingInput" className="text-muted">
                      Secret Key
                    </label>
                    {formik.touched.secret && formik.errors.secret && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert">{formik.errors.secret}</span>
                        </div>
                      </div>
                    )}
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

export default PaymentDetailsCard;
