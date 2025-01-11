import clsx from "clsx";
import { useFormik } from "formik";
// import { useState } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import "../../../public/custom.css";
import "flatpickr/dist/flatpickr.min.css";
import { getAllRoleFunction } from "../services/Role/Role";
import { AddAdminFunction } from "../services/Admin/Admin";

const loginSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .required("Code Is Required"),
  email: Yup.string()
    .email("Email not valid")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .required("Password is required"),
  c_password: Yup.string().required("Confirm Password is required"),
  RoleId: Yup.string().required("Role id is required"),
});

const AddAdminDetailsCard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [roleData, setRoleData] = useState([]);
  // const [dateState, setDateState] = useState<Date | null>(null);

  useEffect(() => {
    console.log("hello");

    getRole();
  }, []);

  const getRole = async () => {
    const res = await getAllRoleFunction();
    setRoleData(res?.data?.data);
    console.log("res res", res);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      c_password: "",
      RoleId: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const notifySuccess = () => toast.success("Admin added successfully");
      const notifyError = (errorMessage: any) => toast.error(errorMessage);
      setLoading(true);
      if (values.password != values.c_password) {
        notifyError("Password and confirm password does not match");
        setLoading(false);
        setSubmitting(false);
        return;
      }
      try {
        console.log(values);
        const obj = {
          name: values.name,
          email: values.email,
          password: values.password,
          type: "other",
          roleId: values.RoleId,
        };
        console.log(obj);

        const response = await AddAdminFunction(obj);
        notifySuccess();
        // navigate  page on banner/view after 1 second
        setTimeout(() => {
          navigate("/admin/view");
        }, 1000);
        console.log("response", response);
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
                    <h2>Admin Details</h2>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6">
                      <label className="form-label">Name</label>
                      <div className="form-floating mb-7">
                        <input
                          type="text"
                          {...formik.getFieldProps("name")}
                          className={clsx(
                            "form-control bg-transparent",
                            {
                              "is-invalid":
                                formik.touched.name && formik.errors.name,
                            },
                            {
                              "is-valid":
                                formik.touched.name && !formik.errors.name,
                            }
                          )}
                          name="name"
                          id="name"
                          placeholder="Name"
                        />
                        <label htmlFor="floatingInput" className="text-muted">
                          Enter Admin Name
                        </label>
                        {formik.touched.name && formik.errors.name && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert">{formik.errors.name}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <label className="form-label d-block">Email</label>
                      <div className="mb-7">
                        <div className="form-floating mb-7">
                          <input
                            type="text"
                            {...formik.getFieldProps("email")}
                            className={clsx(
                              "form-control bg-transparent",
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
                            placeholder="Name"
                          />
                          <label htmlFor="floatingInput" className="text-muted">
                            Enter Admin Email
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
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <label className="form-label d-block">Password</label>
                      <div className="form-floating ">
                        <input
                          type="number"
                          {...formik.getFieldProps("password")}
                          className={clsx(
                            "form-control custom-number-input bg-transparent",
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
                          placeholder="Name"
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
                    <div className="col-lg-6">
                      <label className="form-label d-block">
                        Confirm Password
                      </label>
                      <div className="form-floating ">
                        <input
                          type="number"
                          {...formik.getFieldProps("c_password")}
                          className={clsx(
                            "form-control custom-number-input bg-transparent",
                            {
                              "is-invalid":
                                formik.touched.c_password &&
                                formik.errors.c_password,
                            },
                            {
                              "is-valid":
                                formik.touched.c_password &&
                                !formik.errors.c_password,
                            }
                          )}
                          name="c_password"
                          id="c_password"
                          placeholder="Name"
                        />
                        <label htmlFor="floatingInput" className="text-muted">
                          Confirm Password
                        </label>
                        {formik.touched.c_password && formik.errors.c_password && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert">
                                {formik.errors.c_password}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-muted fs-7 mb-7"></div>
                  <label className="form-label d-block">Role</label>
                  <div className="mb-7">
                    <select
                      id="business_category"
                      {...formik.getFieldProps("RoleId")}
                      // className="form-select bg-transparent"
                      className={clsx(
                        "form-control custom-number-input bg-transparent",
                        {
                          "is-invalid":
                            formik.touched.RoleId && formik.errors.RoleId,
                        },
                        {
                          "is-valid":
                            formik.touched.RoleId && !formik.errors.RoleId,
                        }
                      )}
                      aria-label="Select business category"
                      name="RoleId"
                    >
                      <option>Open this select menu</option>
                      {roleData?.map((role: any) => (
                        <option key={role?._id} value={role?._id}>
                          {role?.name}
                        </option>
                      ))}

                      {/* <option key='admin' value='admin'>Admin</option> */}
                    </select>
                    {formik.touched.RoleId && formik.errors.RoleId && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert">{formik.errors.RoleId}</span>
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

export default AddAdminDetailsCard;
