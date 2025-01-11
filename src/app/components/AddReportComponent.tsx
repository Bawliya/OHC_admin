import "react-toastify/dist/ReactToastify.css";
import "../../../public/custom.css";
import "flatpickr/dist/flatpickr.min.css";

// import { useState } from "react";
import { useEffect, useState } from "react";

// import clsx from "clsx";
// import { useFormik } from "formik";
import Flatpickr from "react-flatpickr";
// import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// import AddCouponsFunction from "../services/Coupons/coupons";
import { getRestaurantListFunction } from "../services/Restaurant/Restaurant";
import { getDeliveryBoyListFunction } from "../services/deliveryboy/DeliveryBoy";
import GetOrderReportunction from "../services/Report/Report";

type props = {
  setTable: any;
  setReportDataTable: any;
};

const AddReportCard: React.FC<props> = ({ setTable, setReportDataTable }) => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [restaurants, setResturants] = useState([]);
  const [deliveryBoy, setDeliveryBoy] = useState([]);
  const [dateState, setDateState] = useState<Date | null>(null);
  const [dateState2, setDateState2] = useState<Date | null>(null);
  const [orderStatus, setOrderStatus] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState<string | null>(
    null
  );
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(
    null
  );
  const [userPhone, setUserPhone] = useState<string>("");

  // Event handler to update the state when input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPhone(event.target.value);
  };

  // Event handler for restaurant change
  const handleRestaurantChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedRestaurant(value ? value : null);
  };

  // Event handler for delivery boy change
  const handleDeliveryBoyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedDeliveryBoy(value ? value : null);
  };

  // Event handlers for change events
  const handleOrderStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setOrderStatus(event.target.value);
  };

  const handlePaymentStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPaymentStatus(event.target.value);
  };

  const startDate = dateState?.toISOString();
  const endDate = dateState2?.toISOString();
  console.log(
    userPhone,
    selectedRestaurant,
    selectedDeliveryBoy,
    orderStatus,
    paymentStatus,
    startDate,
    endDate
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of the day

  // const specificDisabledDates = ["2023-09-18", "2023-09-19", "2023-09-20"];

  useEffect(() => {
    getRestaurantList();
    getDeliveryBoy();
  }, []);
  const getRestaurantList = async () => {
    const res = await getRestaurantListFunction();
    setResturants(res?.data?.data);
  };

  const getDeliveryBoy = async () => {
    const res = await getDeliveryBoyListFunction();
    setDeliveryBoy(res?.data?.data);
  };
  // const formik = useFormik({
  //   initialValues: {
  //     Code: "",
  //     discountType: "",
  //     Discount: "",
  //     restaurantId: "",
  //     description: "",
  //   },
  //   onSubmit: async (values, { setStatus, setSubmitting }) => {
  //     const notifySuccess = () => toast.success("Coupon added successfully");
  //     const notifyError = (errorMessage: any) => toast.error(errorMessage);
  //     setLoading(true);
  //     setTable(true)
  //     try {
  //       console.log(values);
  //       const data = {
  //         code: values.Code,
  //         discountType: values.discountType,
  //         discount: values.Discount,
  //         expiresAt: dateState,
  //         restaurant_id: values.restaurantId,
  //         description: values.description,
  //         publish: false,
  //       };
  //       console.log("data data", data);
  //       const response = await AddCouponsFunction(data);
  //       notifySuccess();
  //       // navigate  page on banner/view after 1 second
  //       setTimeout(() => {
  //         navigate("/coupons/view");
  //       }, 1000);
  //       console.log(response);
  //     } catch (error: any) {
  //       // Handle errors
  //       console.error("Error:", error);

  //       if (error.response) {
  //         // Server responded with a status code
  //         setStatus(error.response.data.message);
  //         notifyError(error.response.data.message);
  //       } else {
  //         // An unexpected error occurred
  //         setStatus("An unexpected error occurred. Please try again later.");
  //         notifyError("An unexpected error occurred. Please try again later.");
  //       }
  //     } finally {
  //       // Make sure to set loading state to false regardless of success or failure
  //       setLoading(false);
  //       setSubmitting(false);
  //     }
  //   },
  // });

  const handleSubmitForm = async (event: any) => {
    event.preventDefault();
    // Handle form submission logic here
    setLoading(true);
    setTable(true);
    // selectedRestaurant,selectedDeliveryBoy,orderStatus, paymentStatus, startDate, endDate
    const data = {
      user_phone: userPhone ?? "",
      restaurant_id: selectedRestaurant ?? "",
      delivery_boy_id: selectedDeliveryBoy ?? "",
      start_date: startDate ?? "",
      end_date: endDate ?? "",
      order_status: orderStatus ?? "",
      payment_status: paymentStatus ?? "",
    };
    const res = await GetOrderReportunction(data);
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
                      <h2>Sales Report</h2>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6 col-lg-4">
                        <label className="form-label">Order Id</label>
                        <div className="form-floating mb-7">
                          <input
                            type="text"
                            className="form-control bg-transparent"
                            name="user_phone"
                            id="user_phone"
                            placeholder="Name"
                            value={userPhone}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="floatingInput" className="text-muted">
                            Order Id
                          </label>
                        </div>
                      </div>

                      <div className="col-6 col-lg-4">
                        <label className="form-label d-block">
                          Delivery Boy
                        </label>
                        <div className="mb-7">
                          <select
                            id="delivery_boy_id"
                            className="form-select bg-transparent"
                            style={{ padding: "14px" }}
                            aria-label="Select"
                            name="delivery_boy_id"
                            value={selectedDeliveryBoy || ""}
                            onChange={handleDeliveryBoyChange}
                          >
                            <option>Open this select menu</option>
                            {deliveryBoy?.map((item: any) => (
                              <option key={item._id} value={item._id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-6 col-lg-4">
                        <label className="form-label d-block">Restaurant</label>
                        <div className="mb-7">
                          <select
                            id="business_category"
                            className="form-select bg-transparent"
                            aria-label="Select business category"
                            name="restaurantId"
                            style={{ padding: "13px" }}
                            value={selectedRestaurant || ""}
                            onChange={handleRestaurantChange}
                          >
                            <option>Open this select menu</option>
                            {restaurants?.map((item: any) => (
                              <option key={item._id} value={item._id}>
                                {item.nameEn}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6 col-lg-3">
                        <label className="form-label d-block">Start Date</label>
                        <Flatpickr
                          value={dateState ? dateState : ""} // Ensure that dateState is provided in the correct format
                          onChange={(date) => {
                            if (
                              Array.isArray(date) &&
                              date.length > 0 &&
                              date[0] instanceof Date
                            ) {
                              setDateState(date[0]);
                            } else {
                              setDateState(null);
                            }
                          }}
                          className="form-control"
                          name="start_date"
                          id="start_date"
                          style={{ padding: "14px" }}
                          placeholder="Start Date"
                        />
                      </div>
                      <div className="col-6 col-lg-3">
                        <label className="form-label d-block">End Date</label>
                        <Flatpickr
                          value={dateState2 ? dateState2 : ""} // Ensure that dateState is provided in the correct format
                          onChange={(date) => {
                            if (
                              Array.isArray(date) &&
                              date.length > 0 &&
                              date[0] instanceof Date
                            ) {
                              setDateState2(date[0]);
                            } else {
                              setDateState2(null);
                            }
                          }}
                          className="form-control"
                          name="end_date"
                          id="end_date"
                          style={{ padding: "14px" }}
                          placeholder="End Date"
                        />
                        {/* <Flatpickr
                        value={dateState.date}
                        onChange={([date]) => {
                          setDateState({ date });
                        }}
                        options={{
                          disable: specificDisabledDates,
                          minDate: today, // Ensure only today and future dates are selectable
                          enableTime: true,
                          dateFormat: "d-m-Y H:i",
                        }}
                        className="form-control"
                        name="expiresAt"
                        id="expiresAt"
                        style={{ padding: "14px" }}
                        placeholder="Expires At"
                      /> */}
                      </div>

                      <div className="col-6 col-lg-3">
                        <label className="form-label d-block">
                          Order Status
                        </label>
                        <div className="mb-7">
                          <select
                            id="orderStatus"
                            className="form-control custom-number-input bg-transparent"
                            style={{ padding: "14px" }}
                            aria-label="Select"
                            name="orderStatus"
                            onChange={handleOrderStatusChange}
                          >
                            <option>Open this select menu</option>
                            <option key="All" value="All">
                              All
                            </option>
                            <option key="Delivered" value="Delivered">
                              Delivered
                            </option>
                            <option key="Pending" value="Pending">
                              Pending
                            </option>
                            <option key="Cancelled" value="Cancelled">
                              Cancelled
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-6 col-lg-3">
                        <label className="form-label d-block">
                          Payment Status
                        </label>
                        <div className="mb-7">
                          <select
                            id="paymentStatus"
                            className="form-control custom-number-input bg-transparent"
                            style={{ padding: "14px" }}
                            aria-label="Select"
                            name="paymentStatus"
                            onChange={handlePaymentStatusChange}
                          >
                            <option>Open this select menu</option>
                            <option key="All" value="All">
                              All
                            </option>
                            <option key="Success" value="Success">
                              Success
                            </option>
                            <option key="Pending" value="Pending">
                              Pending
                            </option>
                            <option key="Failed" value="Failed">
                              Failed
                            </option>
                            <option key="Refund" value="Refund">
                              Refund
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

export default AddReportCard;
