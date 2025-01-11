import clsx from "clsx";
import { useFormik } from "formik";
import "/public/custom.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import AddVaccineFunction from "../services/Vaccine/VaccinServices";
import { useNavigate } from "react-router-dom";

const loginSchema = Yup.object().shape({
  type: Yup.string().required("Vaccine Type is required"),
  titleEn: Yup.string().required("Title in English is required"),
  titleAr: Yup.string().required("Title in Arabic is required"),
  descriptionEn: Yup.string().required("Description in English is required"),
  descriptionAr: Yup.string().required("Description in Arabic is required"),
});

interface types {
  file: any;
}

const AddVaccineType: React.FC<types> = ({ file }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      type: "",
      titleEn: "",
      titleAr: "",
      descriptionEn: "",
      descriptionAr: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const notifySuccess = () => toast.success("Vaccine added successfully");
      const notifyError = (errorMessage: any) => toast.error(errorMessage);

      setLoading(true);
      try {
        const payload = {
          type: values.type,
          title: {
            en: values.titleEn,
            ar: values.titleAr,
          },
          description: {
            en: values.descriptionEn,
            ar: values.descriptionAr,
          },
        };

        const response = await AddVaccineFunction(payload);
        notifySuccess();

        setTimeout(() => {
          navigate("/vaccine/view");
        }, 1000);

        console.log(response);
      } catch (error) {
        console.error("Error:", error);
        notifyError("An error occurred while adding the vaccine.");
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  // Check if all required fields are filled
  const areAllFieldsFilled =
    formik.values.type &&
    formik.values.titleEn &&
    formik.values.titleAr &&
    formik.values.descriptionEn &&
    formik.values.descriptionAr;

  return (
    <form
      className="form w-100"
      onSubmit={formik.handleSubmit}
      noValidate
      id="AddVaccineForm"
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
                <div className="card-header">
                  <div className="card-title">
                    <h2>Vaccine Details</h2>
                  </div>
                </div>
                <div className="card-body row">
                  {/* Vaccine Type */}
                  <div className="col-md-12 col-12">
                    <label className="form-label">Vaccine Type</label>
                    <div className="form-floating mb-4">
                      <select
                        {...formik.getFieldProps("type")}
                        className={clsx("form-control pt-0 pb-0", {
                          "is-invalid":
                            formik.touched.type && formik.errors.type,
                        })}
                      >
                        <option value="">--Select Vaccine Type--</option>
                        <option value="coreVaccine">Core Vaccine</option>
                        <option value="nonCoreVaccine">Non-Core Vaccine</option>
                      </select>
                      {formik.touched.type && formik.errors.type && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert">{formik.errors.type}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title in English */}
                  <div className="col-md-6 mt-5">
                    <label className="form-label">Title In English</label>
                    <div className="form-floating mb-4">
                      <input
                        type="text"
                        {...formik.getFieldProps("titleEn")}
                        className={clsx("form-control", {
                          "is-invalid":
                            formik.touched.titleEn && formik.errors.titleEn,
                        })}
                        placeholder="Title"
                      />
                      <label htmlFor="floatingInput" className="text-muted">
                        Title In English
                      </label>
                      {formik.touched.titleEn && formik.errors.titleEn && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert">{formik.errors.titleEn}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title in Arabic */}
                  <div className="col-md-6 mt-5 ">
                    <label className="form-label">Title In Arabic</label>
                    <div className="form-floating mb-4">
                      <input
                        type="text"
                        {...formik.getFieldProps("titleAr")}
                        className={clsx("form-control", {
                          "is-invalid":
                            formik.touched.titleAr && formik.errors.titleAr,
                        })}
                        placeholder="Title"
                      />
                      <label htmlFor="floatingInput" className="text-muted">
                        Title In Arabic
                      </label>
                      {formik.touched.titleAr && formik.errors.titleAr && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert">{formik.errors.titleAr}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description in English */}
                  <div className="col-md-6 mt-5">
                    <label className="form-label">Description In English</label>
                    <div className="form-floating mb-4">
                      <textarea
                        {...formik.getFieldProps("descriptionEn")}
                        className={clsx("form-control", {
                          "is-invalid":
                            formik.touched.descriptionEn &&
                            formik.errors.descriptionEn,
                        })}
                        placeholder="Description"
                      />
                      <label htmlFor="floatingInput" className="text-muted">
                        Description In English
                      </label>
                      {formik.touched.descriptionEn &&
                        formik.errors.descriptionEn && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert">
                                {formik.errors.descriptionEn}
                              </span>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Description in Arabic */}
                  <div className="col-md-6 mt-5 ">
                    <label className="form-label">Description In Arabic</label>
                    <div className="form-floating mb-4">
                      <textarea
                        {...formik.getFieldProps("descriptionAr")}
                        className={clsx("form-control", {
                          "is-invalid":
                            formik.touched.descriptionAr &&
                            formik.errors.descriptionAr,
                        })}
                        placeholder="Description"
                      />
                      <label htmlFor="floatingInput" className="text-muted">
                        Description In Arabic
                      </label>
                      {formik.touched.descriptionAr &&
                        formik.errors.descriptionAr && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert">
                                {formik.errors.descriptionAr}
                              </span>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Conditionally render the Submit button */}
                  {/* {areAllFieldsFilled && ( */}
                  <div className="d-flex justify-content-end mt-10 ">
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
                  {/* )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddVaccineType;
