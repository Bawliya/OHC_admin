import "react-toastify/dist/ReactToastify.css";
import "../../../public/custom.css";
import "flatpickr/dist/flatpickr.min.css";

// import { useState } from "react";
import { useState } from "react";

// import clsx from "clsx";
// import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

// import AddCouponsFunction from "../services/Coupons/coupons";
import { GetCreditBalanceReportunction } from "../services/Report/Report";

type props = {
  setTable: any;
  setReportDataTable: any;
};

const AddCreditCard: React.FC<props> = ({ setTable, setReportDataTable }) => {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  // Event handler to update the state when input changes
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedType(value ? value : null);
  };

  console.log("dsfasdfasdfasd", selectedType);

  // const notifySuccess = () => toast.success("Role Create Successfully");
  const notifyError = (errorMessage: any) => {
    toast.error(errorMessage, {
      className: "custom-toast-error",
      bodyClassName: "custom-toast-error-body",
      progressClassName: "custom-toast-error-progress",
    });
  };
  const handleSubmitForm = async (event: any) => {
    event.preventDefault();
    // Handle form submission logic here
    setLoading(true);
    // selectedRestaurant,selectedDeliveryBoy,orderStatus, paymentStatus, startDate, endDate
    if (phone == "" && email == "" && name == "") {
      // alert("Please select the fildes")
      notifyError(
        "Please select at least one of the fields: Phone, Email or Name."
      );
      setLoading(false);
      return;
    }
    if (selectedType == null) {
      // alert("Please select the type")
      notifyError("Please select the role");
      setLoading(false);
      return;
    }
    setTable(true);
    const data = {
      phone: phone ?? "",
      email: email ?? "",
      name: name ?? "",
      type: selectedType ?? "",
    };
    const res = await GetCreditBalanceReportunction(data);
    setReportDataTable(res?.data?.data);
    setLoading(false);
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
                      <h2>Credit Balance Report</h2>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6 col-lg-3">
                        <label className="form-label">Name</label>
                        <div className="form-floating mb-7">
                          <input
                            type="text"
                            className="form-control bg-transparent"
                            name="name"
                            id="name"
                            placeholder="Name"
                            value={name}
                            onChange={handleNameChange}
                          />
                          <label htmlFor="floatingInput" className="text-muted">
                            Name
                          </label>
                        </div>
                      </div>

                      <div className="col-6 col-lg-3">
                        <label className="form-label">Email</label>
                        <div className="form-floating mb-7">
                          <input
                            type="text"
                            className="form-control bg-transparent"
                            name="email"
                            id="email"
                            placeholder="Name"
                            value={email}
                            onChange={handleEmailChange}
                          />
                          <label htmlFor="floatingInput" className="text-muted">
                            Email
                          </label>
                        </div>
                      </div>
                      <div className="col-6 col-lg-3">
                        <label className="form-label">Phone</label>
                        <div className="form-floating mb-7">
                          <input
                            type="text"
                            className="form-control bg-transparent"
                            name="user_phone"
                            id="user_phone"
                            placeholder="Name"
                            value={phone}
                            onChange={handlePhoneChange}
                          />
                          <label htmlFor="floatingInput" className="text-muted">
                            Phone
                          </label>
                        </div>
                      </div>

                      <div className="col-6 col-lg-3">
                        <label className="form-label d-block">Role</label>
                        <div className="mb-7">
                          <select
                            id="delivery_boy_id"
                            className="form-select bg-transparent"
                            style={{ padding: "14px" }}
                            aria-label="Select"
                            name="delivery_boy_id"
                            value={selectedType || ""}
                            onChange={handleTypeChange}
                          >
                            <option value="">Open this select menu</option>
                            <option key="users" value="user">
                              Customer
                            </option>
                            <option key="delivery_boy" value="delivery_boy">
                              Delivery Boy
                            </option>
                          </select>
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

export default AddCreditCard;
