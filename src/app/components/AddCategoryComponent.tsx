import clsx from "clsx";
import { useFormik } from "formik";
import "/public/custom.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import AddCategoryFunction from "../services/category/Category";
import { useNavigate } from "react-router-dom";

const loginSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .required("Category Name is required"),
  image: Yup.mixed()
    .required("Image is required")
    // .test("fileType", "Only images are allowed", (value) =>
    //   value ? ["image/jpeg", "image/png", "image/jpg"].includes(value) : false
    // ),
});

const CategoryDetailsCard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      image: null, // Add image to initial values
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const notifySuccess = () => toast.success("Category added successfully");
      const notifyError = (errorMessage: any) => toast.error(errorMessage);

      setLoading(true);
      try {
        // Create a FormData object to handle the image upload
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("image", values.image ? values.image : "");

        // Send the form data
        const response = await AddCategoryFunction(formData);
        notifySuccess();

        setTimeout(() => {
          navigate("/category/view");
        }, 1000);

        console.log(response);
      } catch (error) {
        console.error("Error:", error);
        notifyError("An error occurred while adding the category.");
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
      id="AddCategoryForm"
    >
      <div className="d-flex flex-column gap-7 gap-lg-10">
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="kt_ecommerce_add_product_general"
            role="tabpanel"
          >
            <div className="d-flex flex-column gap-7 gap-lg-10">
              <div className="card card-flush py-2">
                <div className="card-body">
                  {/* Name Input */}
                  <label className="form-label">Category Name</label>
                  <div className="form-floating mb-7">
                    <input
                      type="text"
                      {...formik.getFieldProps("name")}
                      className={clsx("form-control", {
                        "is-invalid":
                          formik.touched.name && formik.errors.name,
                      })}
                      id="name"
                      placeholder="Category Name"
                    />
                    <label htmlFor="name" className="text-muted">
                      Enter Category Name
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
                  <label className="form-label">Category Image</label>
                  <div className="form-floating mb-7">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        formik.setFieldValue(
                          "image",
                          event.currentTarget.files ? event.currentTarget.files[0] : null
                        );
                      }}
                      className={clsx("form-control", {
                        "is-invalid":
                          formik.touched.image && formik.errors.image,
                      })}
                      id="image"
                    />
                    {formik.touched.image && formik.errors.image && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert">{formik.errors.image}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="form-floating text-end">
                    <button
                      type="submit"
                      id="kt_sign_in_submit"
                      className="btn text-white fw-bold"
                      style={{ backgroundColor: "#1a6896" }}
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

export default CategoryDetailsCard;
