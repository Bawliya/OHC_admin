import clsx from "clsx";
import { useFormik } from "formik";
import "/public/custom.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import AddBrowseFunction from "../services/browse/Browse";
import { getCategoryFunction } from "../services/category/Category";

const loginSchema = Yup.object().shape({
  nameEn: Yup.string()
    .min(3, "Too Short!")
    .required("Browse Name In English Is Required"),
  nameAr: Yup.string()
    .min(3, "Too Short!")
    .required("Browse Name In Arabic Is Required"),
});

interface types {
  file: any;
}

const BrowseDetailsCard: React.FC<types> = ({ file }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      nameEn: "",
      nameAr: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const notifySuccess = () => toast.success("Breed added successfully");
      const notifyError = (errorMessage: any) => toast.error(errorMessage);

      if (!categoryId) {
        notifyError("Please select a Pet Type!");
        return;
      }

      setLoading(true);
      try {
        const name = {
          en: values.nameEn,
          ar: values.nameAr,
        };
        const response = await AddBrowseFunction({
          categoryId,
          name,
        });
        notifySuccess();

        setTimeout(() => {
          navigate("/browse/view");
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

  const [categories, setCategories] = useState<any[]>([]); // State to hold categories

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resp = await getCategoryFunction(1, 100, ""); // Fetch categories
        if (resp?.data?.status) {
          setCategories(resp?.data?.data); // Update the categories state with fetched data
          // console.log(resp?.data?.data); // Update the categories state with fetched data
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // const formik = useFormik({
  //   initialValues: {
  //     nameEn: "",
  //     nameAr: "",
  //   },
  //   validationSchema: loginSchema,
  //   onSubmit: async (values, { setStatus, setSubmitting }) => {
  //     const notifySuccess = () => toast.success("Category added successfully");
  //     const notifyError = (errorMessage: any) => toast.error(errorMessage);

  //     setLoading(true);
  //     try {
  //       const name = {
  //         en: values.nameEn,
  //         ar: values.nameAr,
  //       };
  //       const response = await AddBrowseFunction({
  //         name,
  //       });
  //       notifySuccess();

  //       setTimeout(() => {
  //         navigate("/category/view");
  //       }, 1000);

  //       console.log(response);
  //     } catch (error) {
  //       console.error("Error:", error);
  //       notifyError("An error occurred while adding the category.");
  //     } finally {
  //       setLoading(false);
  //       setSubmitting(false);
  //     }
  //   },
  // });

  // Check if both fields are filled to enable the submit button
  const isSubmitEnabled = formik.values.nameEn && formik.values.nameAr;

  return (
    <form
      className="form w-100"
      onSubmit={formik.handleSubmit}
      noValidate
      id="AddBrowseFrom"
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
                    <h2>Breeds Details</h2>
                  </div>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column">
                    <label className="form-label" htmlFor="">
                      --Select Pet Type--
                    </label>
                    <select
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="px-3 py-3 rounded-2  form-control"
                      name=""
                      id=""
                    >
                      <option value="--Selcet Category--">
                        --Selcet Pet Type--
                      </option>
                      {categories?.length > 0 ? (
                        categories.map((category: any) => (
                          <option key={category._id} value={category._id}>
                            {category.name.en} ({category.name.ar})
                          </option>
                        ))
                      ) : (
                        <option value="">No categories available</option>
                      )}
                    </select>
                  </div>
                  <label className="form-label mt-4 pt-4">
                    Name In English
                  </label>
                  <div className="form-floating mb-7">
                    <input
                      type="text"
                      {...formik.getFieldProps("nameEn")}
                      className={clsx("form-control", {
                        "is-invalid":
                          formik.touched.nameEn && formik.errors.nameEn,
                      })}
                      id="nameEn"
                      placeholder="Name"
                    />
                    <label htmlFor="floatingInput" className="text-muted">
                      Category Name In English
                    </label>
                    {formik.touched.nameEn && formik.errors.nameEn && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert">{formik.errors.nameEn}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <label className="form-label">Name In Arabic</label>
                  <div className="form-floating mb-7">
                    <input
                      type="text"
                      {...formik.getFieldProps("nameAr")}
                      className={clsx("form-control", {
                        "is-invalid":
                          formik.touched.nameAr && formik.errors.nameAr,
                      })}
                      id="nameAr"
                      placeholder="Name"
                    />
                    <label htmlFor="floatingInput" className="text-muted">
                      Category Name In Arabic
                    </label>
                    {formik.touched.nameAr && formik.errors.nameAr && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert">{formik.errors.nameAr}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="form-floating text-end">
                    <button
                      type="submit"
                      id="kt_sign_in_submit"
                      className="btn text-white fw-bold"
                      style={{ backgroundColor: "#1a6896" }}
                      disabled={!isSubmitEnabled || formik.isSubmitting}
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

export default BrowseDetailsCard;
