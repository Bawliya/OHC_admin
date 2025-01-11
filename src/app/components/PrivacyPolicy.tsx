// import clsx from "clsx";
// import { useFormik } from "formik";
// import { useState } from "react";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import * as Yup from "yup";
import "../../../public/custom.css";
// import AddBannerFunction from "../services/banner/Banner";
// import { getRestaurantListFunction } from "../services/Restaurant/Restaurant";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  AddPrivacyFunction,
  getWebFunction,
} from "../services/setting/setting";
// const loginSchema = Yup.object().shape({
//   restaurantNearby: Yup.string()
//     .min(3, "Too Short!")
//     .required("Driver nearby radius is required"),
//   driverNearby: Yup.string().required("Driver nearby radius is required"),
//   driverDuration: Yup.string().required("Driver nearby radius is required"),
// });

const PrivacyPolicyCard: React.FC = () => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [newValue, setNewValue] = useState("");

  const notifySuccess = () =>
    toast.success("Privacy Policy Updated successfully");
  const notifyError = (errorMessage: any) => toast.error(errorMessage);

  useEffect(() => {
    getRestaurantList();
  }, []);
  const getRestaurantList = async () => {
    const res = await getWebFunction();
    console.log(res.data?.data);
    console.log(res.data?.data?.customer_privacy_policy);
    setNewValue(res.data?.data?.customer_privacy_policy);
  };

  async function addPrivacy(e: any) {
    e.preventDefault();
    setLoading(true);
    console.log(newValue);
    if (!newValue || newValue.trim() === "") {
      notifyError("Privacy policy is required.");
      setLoading(false);
      return;
    }
    const obj = {
      privacy_policy: newValue,
    };
    const response = await AddPrivacyFunction(obj);
    console.log(response);
    if (response.status === 200) {
      notifySuccess();
      setLoading(false);
    } else {
      notifyError("An unexpected error occurred. Please try again later.");
      setLoading(false);
    }
  }

  return (
    <form
      className="form w-100"
      // onSubmit={formik.handleSubmit}
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
                    <h2>Privacy Policy Details</h2>
                  </div>
                </div>
                <div className="card-body">
                  {/* <label className="form-label">Privacy Policy</label> */}
                  <CKEditor
                    editor={ClassicEditor}
                    data={newValue}
                    onChange={(e: any, ed: any) => {
                      const data = ed.getData();
                      setNewValue(data);
                    }}
                    onReady={(editor: any) => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                  />

                  <div className="form-floating text-end mt-7">
                    <button
                      type="submit"
                      id="kt_sign_in_submit"
                      className="btn btnRed"
                      onClick={addPrivacy}
                      // style={{backgroundColor:"#f90505", color:"white"}}
                      // disabled={formik.isSubmitting || !formik.isValid}
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

export default PrivacyPolicyCard;
