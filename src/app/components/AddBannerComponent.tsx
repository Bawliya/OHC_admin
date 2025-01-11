import clsx from "clsx";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import "../../../public/custom.css";
import AddBannerFunction from "../services/banner/Banner";

const loginSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .required("Banner Name Is Required"),
  file: Yup.mixed().required("Image is required"),
});

const ProductDetailsCard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      file: null, // Include file in Formik's state
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const notifySuccess = () => toast.success("Banner added successfully");
      const notifyError = (errorMessage: string) =>
        toast.error(errorMessage);

      setLoading(true);

      try {
        if (!values.file) {
          notifyError("Image is required");
          return;
        }

        // Prepare FormData for the API
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("image", values.file);

        // Call the API
        const response = await AddBannerFunction(formData);

        notifySuccess();

        // Navigate to banner view page after success
        setTimeout(() => {
          navigate("/banner/view");
        }, 1000);

        console.log(response);
      } catch (error) {
        console.error("Error:", error);
        notifyError("An unexpected error occurred. Please try again.");
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
      id="AddBannerForm"
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
                    <h2>Banner Details</h2>
                  </div>
                </div>
                <div className="card-body">
                  {/* Name Input */}
                  <label className="form-label">Name</label>
                  <div className="form-floating mb-7">
                    <input
                      type="text"
                      {...formik.getFieldProps("name")}
                      className={clsx("form-control bg-transparent", {
                        "is-invalid":
                          formik.touched.name && formik.errors.name,
                        "is-valid":
                          formik.touched.name && !formik.errors.name,
                      })}
                      name="name"
                      id="name"
                      placeholder="Banner Name"
                    />
                    <label htmlFor="name" className="text-muted">
                      Name
                    </label>
                    {formik.touched.name && formik.errors.name && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert">{formik.errors.name}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Image Upload */}
                  <label className="form-label">Banner Image</label>
                  <div className="form-floating mb-7">
                    <input
                      type="file"
                      accept="image/*"
                      className={clsx("form-control", {
                        "is-invalid":
                          formik.touched.file && formik.errors.file,
                      })}
                      onChange={(event) => {
                        if (event.currentTarget.files?.[0]) {
                          formik.setFieldValue(
                            "file",
                            event.currentTarget.files[0]
                          );
                        }
                      }}
                    />
                    {formik.touched.file && formik.errors.file && (
                      <div className="text-danger mt-2">
                        {formik.errors.file}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="form-floating text-end">
                    <button
                      type="submit"
                      id="kt_sign_in_submit"
                      className="py-3 px-5 border-0 custom_btn fw-semibold fs-5 rounded-2"
                      disabled={formik.isSubmitting || !formik.isValid}
                    >
                      {!loading ? (
                        <span className="indicator-label">Submit</span>
                      ) : (
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

export default ProductDetailsCard;
