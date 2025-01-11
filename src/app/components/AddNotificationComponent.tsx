import "react-toastify/dist/ReactToastify.css";
import "../../../public/custom.css";
// import { getRestaurantListFunction } from "../services/Restaurant/Restaurant";
// import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// import { useState } from "react";
import { useState } from "react";

import clsx from "clsx";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";

import AddNotificationFunction from "../services/notification/notification";

const loginSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .required("Subject Is Required"),
  message: Yup.string().required("Message Is Required"),
  SendTo: Yup.string().required("Send To Is Required"),
});
console.log(loginSchema);

const AddNotificationDetailsCard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [restaurants, setResturants] = useState([]);
  // const [dateState, setDateState] = useState<Date | null>(null);
  // useEffect(() => {
  //   getRestaurantList();
  // }, []);
  // const getRestaurantList = async () => {
  //   const res = await getRestaurantListFunction();
  //   setResturants(res?.data?.data);
  // };
  const formik = useFormik({
    initialValues: {
      title: "",
      message: "",
      sendTo: "",
    },
    // validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const notifySuccess = () =>
        toast.success("Notification send successfully");
      const notifyError = (errorMessage: any) => toast.error(errorMessage);
      setLoading(true);
      try {
        console.log(values);
        const data = {
          title: values.title,
          message: values.message,
          sendTo: values.sendTo,
        };
        const response = await AddNotificationFunction(data);
        notifySuccess();
        // navigate  page on banner/view after 1 second
        setTimeout(() => {
          navigate("/notification/view");
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
                    <h2>Notification Details</h2>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <label className="form-label">Subject</label>
                      <div className="form-floating mb-7">
                        <input
                          type="text"
                          {...formik.getFieldProps("title")}
                          className={clsx(
                            "form-control bg-transparent",
                            {
                              "is-invalid":
                                formik.touched.title && formik.errors.title,
                            },
                            {
                              "is-valid":
                                formik.touched.title && !formik.errors.title,
                            }
                          )}
                          name="title"
                          id="title"
                          placeholder="Subject"
                        />
                        <label htmlFor="floatingInput" className="text-muted">
                          Subject
                        </label>
                        {formik.touched.title && formik.errors.title && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert">{formik.errors.title}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <label className="form-label">Message</label>
                    <div className="form-floating mb-7">
                      <textarea
                        style={{ minHeight: "150px" }}
                        {...formik.getFieldProps("message")}
                        className={clsx(
                          "form-control  bg-transparent",
                          {
                            "is-invalid":
                              formik.touched.message && formik.errors.message,
                          },
                          {
                            "is-valid":
                              formik.touched.message && !formik.errors.message,
                          }
                        )}
                        // className="form-control  bg-transparent"
                        name="message"
                        id="message"
                        placeholder="Message"
                      />
                      <label htmlFor="floatingInput" className="text-muted">
                        Enter your message
                      </label>
                      {formik.touched.message && formik.errors.message && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert" className="text-danger">
                              {formik.errors.message}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-muted fs-7 mb-7"></div>
                  <label className="form-label d-block">Send To</label>
                  <div className="mb-7">
                    <select
                      id="business_category"
                      {...formik.getFieldProps("sendTo")}
                      className={clsx(
                        "form-control  bg-transparent",
                        {
                          "is-invalid":
                            formik.touched.sendTo && formik.errors.sendTo,
                        },
                        {
                          "is-valid":
                            formik.touched.sendTo && !formik.errors.sendTo,
                        }
                      )}
                      // className="form-select bg-transparent"
                      aria-label="Select business category"
                      name="sendTo"
                    >
                      <option>Open this select menu</option>
                      <option key="Partner" value="Partner">
                        Partner
                      </option>
                      <option key="Customer" value="Customer">
                        Customer
                      </option>
                      <option key="Delivery" value="Delivery">
                        Driver
                      </option>
                    </select>
                    {formik.touched.sendTo && formik.errors.sendTo && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="text-danger">
                            {formik.errors.sendTo}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="form-floating text-end">
                    <button
                      type="submit"
                      id="kt_sign_in_submit"
                      className="btn btnRed"
                      // style={{backgroundColor:"#f90505", color:"white"}}
                      disabled={
                        formik.isSubmitting ||
                        !formik.values.title ||
                        !formik.values.message ||
                        !formik.values.sendTo
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

export default AddNotificationDetailsCard;
