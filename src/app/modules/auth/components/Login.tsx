import clsx from "clsx";
import { useFormik } from "formik";
import { useState } from "react";
// import { Link } from "react-router-dom";
import * as Yup from "yup";
import { getUserByToken, login } from "../core/_requests";
// import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useAuth } from "../core/Auth";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import auth_image from "../../../../../public/media/logos/login.png";
// import { User } from '../../apps/user-management/users-list/core/_models';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
});

const initialValues = {
  email: "admin@gmail.com",
  password: "123456",
};

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const res: any = await login(values.email, values.password);
        if (res.data.status) {
          saveAuth({ data: { type: "Admin" }, token: res.data.token });
          const data: any = {
            name: "John Doe",
            email: "john.doe@example.com",
          };
          setCurrentUser(data);
        } else {
          alert("Incorrect Credentials!");
          saveAuth(undefined);
          setSubmitting(false);
          setLoading(false);
        }
      } catch (error) {
        // alert(error?.response?.data?.message);
        saveAuth(undefined);
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <div className="">
      <div className="col-12">
        {" "}
        <form
          className="form  w-100"
          onSubmit={formik.handleSubmit}
          noValidate
          id="kt_login_signin_form"
        >
          <div className="text-center">
            <img
              className="mx-auto w-275px w-md-50 w-xl-250px hover-scale mb-5 mb-lg-5"
              src={toAbsoluteUrl("media/logos/applogo.png")}
              alt=""
              style={{
                filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))", // Add drop shadow
              }}
            />
          </div>

          {formik.status ? (
            <div className="mb-lg-15  alert alert-danger">
              <div className="alert-text font-weight-bold">{formik.status}</div>
            </div>
          ) : (
            <div className=""></div>
          )}

          {/* begin::Form group */}
          <div className="fv-row mb-8">
            <label className="form-label fs-6 fw-bolder text-gray-900">
              Email
            </label>
            <input
              placeholder="Email"
              {...formik.getFieldProps("email")}
              className={clsx(
                "form-control bg-transparent",
                { "is-invalid": formik.touched.email && formik.errors.email },
                {
                  "is-valid": formik.touched.email && !formik.errors.email,
                }
              )}
              type="email"
              name="email"
              autoComplete="off"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="fv-plugins-message-container">
                <span role="alert">{formik.errors.email}</span>
              </div>
            )}
          </div>
          {/* end::Form group */}

          {/* begin::Form group */}
          <div className="fv-row mb-3">
            <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
              Password
            </label>
            <input
              type="password"
              autoComplete="off"
              {...formik.getFieldProps("password")}
              className={clsx(
                "form-control bg-transparent w-100",
                {
                  "is-invalid":
                    formik.touched.password && formik.errors.password,
                },
                {
                  "is-valid":
                    formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>

          <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
            <div />
          </div>
          <div className="d-grid mb-10">
            <button
              type="submit"
              id="kt_sign_in_submit"
              className="btn"
              style={{ backgroundColor: "#1a6896" }}
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {!loading && (
                <span className="indicator-label text-white">Sign In</span>
              )}
              {loading && (
                <span
                  className="indicator-progress text-white"
                  style={{ display: "block" }}
                >
                  Please wait...
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </button>
          </div>
          {/* end::Action */}
        </form>
      </div>
    </div>
  );
}
