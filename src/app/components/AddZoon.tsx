import "react-toastify/dist/ReactToastify.css";
import "../../../public/custom.css";
import "flatpickr/dist/flatpickr.min.css";

// import { useState } from "react";
import { useState } from "react";

// import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import ZoonMapComponent from "./ZoonMap";
import { AddZoonFunction } from "../services/Zoon/Zoon";
import { Link } from "react-router-dom";

type props = {
  setTable: any;
  setReportDataTable: any;
  setIsPopup: any;
  setUpdateId: any;
};

const AddZoonCard: React.FC<props> = ({
  setTable,
  setIsPopup,
  setUpdateId,
}) => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [ZoonName, setZoonName] = useState<string>("");
  const [ZoonAddress, setZoneAddress] = useState<any[]>([]);

  // Event handler to update the state when input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZoonName(event.target.value);
  };

  // const notifySuccess = () =>
  //   toast.success("Zoon added successfully");
  const notifyError = (errorMessage: any) => toast.error(errorMessage);

  const handleSubmitForm = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setTable(true);
    const data = {
      zoon_name: ZoonName ?? "",
      path: ZoonAddress ?? "",
    };
    if (ZoonAddress.length === 0) {
      notifyError("Create a valid zoon");
      setLoading(false);
      return;
    }
    if (ZoonName == "") {
      notifyError("Zoon name is required");
      setLoading(false);
      return;
    }
    const res = await AddZoonFunction(data);
    setLoading(false);
    if (res?.data?.status) {
      setIsPopup(true);
      setUpdateId(res?.data?.data?._id);
      setZoonName("");
      setZoneAddress([]);
    } else {
      alert(res?.data?.message);
    }
  };

  return (
    <>
      <form
        className="form w-100"
        // onSubmit={formik.handleSubmit}
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
                      <h2>Add New Business Zone</h2>
                    </div>
                    <div
                      className="page-title d-flex flex-column justify-content-center flex-wrap"
                      style={{ marginRight: "75px" }}
                    >
                      <Link
                        to="/zone-management/view"
                        style={{ textDecoration: "underline" }}
                        className="position-absolute text-danger"
                      >
                        <b>View Zone</b>
                      </Link>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12">
                        <ZoonMapComponent setZoneAddress={setZoneAddress} />
                      </div>
                    </div>
                    <div className="row mt-5">
                      <div className="col-12 col-lg-12">
                        <label className="form-label">Business Zone Name</label>
                        <div className="form-floating mb-7">
                          <input
                            type="text"
                            className="form-control bg-transparent"
                            name="zoon_name"
                            id="zoon_name"
                            placeholder="Name"
                            value={ZoonName}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="floatingInput" className="text-muted">
                            Business Zone Name
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-floating text-end">
                      <button
                        type="submit"
                        id="kt_sign_in_submit"
                        className="btn btnRed"
                        onClick={handleSubmitForm}
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
    </>
  );
};

export default AddZoonCard;
