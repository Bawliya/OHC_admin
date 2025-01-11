/* eslint-disable @typescript-eslint/no-unused-vars */
import "react-toastify/dist/ReactToastify.css";
import "../../../public/custom.css";
import "flatpickr/dist/flatpickr.min.css";

// import { useState } from "react";
import { useEffect, useState } from "react";

// import clsx from "clsx";
// import { useFormik } from "formik";
import Flatpickr from "react-flatpickr";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getBrowseAllList } from "../services/browse/Browse";

// import AddCouponsFunction from "../services/Coupons/coupons";
import { getRestaurantListFunction } from "../services/Restaurant/Restaurant";
import { getDeliveryBoyListFunction } from "../services/deliveryboy/DeliveryBoy";
import GetOrderReportunction from "../services/Report/Report";
import Select from "react-select";
import { updateZoonFunction } from "../services/Zoon/Zoon";

type props = {
  setTable: any;
  setReportDataTable: any;
  setIsPopup: any;
  id: any;
};

interface SelectedCategory {
  value: string;
  label: string;
  minOrderAmount: number;
  maxCODAmount: number;
}

const AddZoonSettingCard: React.FC<props> = ({
  setTable,
  setReportDataTable,
  setIsPopup,
  id,
}) => {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState({
    cash_on_delivery: false,
    digital_payment: false,
    offline_payment: false,
  });
  const [loading, setLoading] = useState(false);
  const [restaurants, setResturants] = useState([]);
  const [deliveryBoy, setDeliveryBoy] = useState([]);
  const [dateState, setDateState] = useState<Date | null>(null);
  const [dateState2, setDateState2] = useState<Date | null>(null);
  const [orderStatus, setOrderStatus] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const [increaseDeliveryCharge, setincreaseDeliveryCharge] = useState<any>(
    null
  );
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState<string | null>(
    null
  );
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(
    null
  );
  const [userPhone, setUserPhone] = useState<string>("");
  const [BrowseData, setBrowseData] = useState<any>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    SelectedCategory[]
  >([]);
  const [item, setItem] = useState([]);
  const { cash_on_delivery, digital_payment, offline_payment } = paymentMethods;

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
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of the day

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

  const handleSubmitForm = async (event: any) => {
    event.preventDefault();

    if (cash_on_delivery == false && digital_payment == false) {
      toast.error("Please select at least one payment method.");
      return;
    }

    if (selectedCategories?.length === 0) {
      toast.error("Please select at least one category.");
      return;
    }

    for (const category of selectedCategories) {
      if (
        !category?.minOrderAmount ||
        !category?.maxCODAmount ||
        category?.minOrderAmount < 0 ||
        category?.maxCODAmount < 0
      ) {
        toast.error(
          "Please ensure all selected categories have non-negative min and max amounts."
        );
        return;
      }
    }

    const data = {
      id,
      offline_payment,
      cash_on_delivery,
      digital_payment,
      browse_type: null,
      browse: selectedCategories,
      increaseDeliveryCharge: increaseDeliveryCharge,
    };

    console.log("data", data);

    const res = await updateZoonFunction(data);
    // setLoading(false);
    if (res?.data?.status) {
      setIsPopup(false);
      toast.success(res?.data?.message);
      navigate("/zone-management/view");
    } else {
      toast.error(res?.data?.message);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setincreaseDeliveryCharge(value ? value : null);
  };

  useEffect(() => {
    getBrowse();
  }, []);

  const getBrowse = async () => {
    const resp = await getBrowseAllList();
    if (resp?.data.status) {
      const options = await resp?.data?.data?.map((item: any) => ({
        value: item._id,
        label: item.nameEn,
      }));
      setBrowseData(options);
    } else {
      setBrowseData([]);
    }
  };

  const options = BrowseData;

  const handleAmountChange = (index: number, field: string, value: string) => {
    setSelectedCategories((prevCategories: any) => {
      const updatedCategories: any = [...prevCategories];
      updatedCategories[index] = {
        ...updatedCategories[index],
        [field]: value,
      };
      return updatedCategories;
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setPaymentMethods((prevMethods) => ({
      ...prevMethods,
      [name]: checked,
    }));
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
              <div className="d-flex flex-column ">
                <div className="card card-flush ">
                  <div className="card-header">
                    <div className="card-title">
                      <h2>Zone Setting</h2>
                    </div>
                  </div>
                  <div className="separator"></div>
                  <div className="card-body">
                    <div className="row">
                      {/* <div className="col-6 col-lg-4">
                                                <label className="form-label">Cash On Delivery</label>
                                                <div className="mb-7">
                                                    <select
                                                        id="delivery_boy_id"
                                                        className="form-select bg-transparent"
                                                        style={{ padding: "14px" }}
                                                        aria-label="Select"
                                                        name="delivery_boy_id"
                                                        value={selectedDeliveryBoy || ''}
                                                        onChange={handleDeliveryBoyChange}
                                                    >
                                                        <option>Open this select menu</option>
                                                        <option key="true" value="true">ON</option>
                                                        <option key="false" value="false">OFF</option>
                                                    </select>
                                                </div>
                                            </div> */}

                      <div className="col-12 col-lg-4">
                        <div className="mb-10">
                          <div className="form-check form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              onChange={handleCheckboxChange}
                              id="cash_on_delivery"
                              name="cash_on_delivery"
                              checked={cash_on_delivery}
                            />
                            <label className="form-check-label text-dark">
                              Cash on delivery
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-lg-4">
                        <div className="mb-10">
                          <div className="form-check form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              onChange={handleCheckboxChange}
                              id="digital_payment"
                              name="digital_payment"
                              checked={digital_payment}
                            />
                            <label className="form-check-label text-dark">
                              Digital payment
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* <div className="col-12 col-lg-4">
                        <div className="mb-10">
                          <div className="form-check form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              onChange={handleCheckboxChange}
                              id="offline_payment"
                              name="offline_payment"
                              checked={offline_payment}
                            />
                            <label className="form-check-label text-dark">
                              Offline payment
                            </label>
                          </div>
                        </div>
                      </div> */}
                    </div>

                    <div>
                      <div className="row mb-5">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label">
                              Increase Delivery Charge (%)
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              name="increaseDeliveryCharge"
                              placeholder="EX:100"
                              value={increaseDeliveryCharge}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-5">
                      <div className="col-12 col-lg-12">
                        <label className="form-label d-block">
                          Choose Business Module
                        </label>
                        <Select
                          className="react-select-styled react-select-solid react-select-lg"
                          classNamePrefix="react-select"
                          options={options}
                          placeholder="Select an option"
                          isMulti
                          onChange={(selectedOptions: any) => {
                            // const selectedValues = selectedOptions?.map(
                            //     (option: any) => option.value
                            // );
                            console.log("selectedOptions", selectedOptions);
                            const updatedCategories = selectedOptions.map(
                              (option: any) => {
                                const existingOption = selectedCategories.find(
                                  (item: any) => item.value === option.value
                                );
                                return (
                                  existingOption || {
                                    ...option,
                                    minOrderAmount: "",
                                    maxCODAmount: "",
                                  }
                                );
                              }
                            );
                            setSelectedCategories(updatedCategories);
                            setItem(updatedCategories);
                            // formik.setFieldValue("product", selectedValues);
                          }}
                          value={selectedCategories}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div>
                        <div className="form-group  row">
                          <div className="col-md-5">
                            <label className="form-label">
                              Business Module Name
                            </label>
                          </div>
                          <div className="col">
                            <label className="form-label">
                              Minimum order amount
                            </label>
                          </div>
                          <div className="col">
                            <label className="form-label">
                              Maximum COD order amount
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mb-5">
                      <div>
                        {selectedCategories?.map((item: any, index) => (
                          <div key={index} className="form-group mt-4 row">
                            <div className="col-md-5">
                              {/* <label className="form-label">Module Name</label> */}
                              <input
                                type="text"
                                className="form-control mb-2 mb-md-0"
                                placeholder="Enter Variant"
                                name="name"
                                value={item?.label}
                                disabled
                                // onChange={(e) => handleChanges(index, e)}
                              />
                            </div>
                            <div className="col">
                              <input
                                type="number"
                                className="form-control mb-2 mb-md-0"
                                placeholder="Minimum order amount"
                                value={item.minOrderAmount}
                                onChange={(e) =>
                                  handleAmountChange(
                                    index,
                                    "minOrderAmount",
                                    e.target.value
                                  )
                                }
                                min={0}
                              />
                            </div>
                            <div className="col">
                              <input
                                type="number"
                                className="form-control mb-2 mb-md-0"
                                placeholder="Maximum COD order amount"
                                value={item.maxCODAmount}
                                onChange={(e) =>
                                  handleAmountChange(
                                    index,
                                    "maxCODAmount",
                                    e.target.value
                                  )
                                }
                                min={0}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="form-floating text-end">
                      <button
                        id="kt_sign_in_submit"
                        className="btn btn-secondary me-3"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsPopup(false);
                          navigate("/zone-management/view");
                        }}
                      >
                        Skip
                      </button>
                      <button
                        type="submit"
                        id="kt_sign_in_submit"
                        className="btn btnRed"
                      >
                        {!loading && (
                          <span
                            className="indicator-label"
                            onClick={handleSubmitForm}
                          >
                            Submit
                          </span>
                        )}
                        {loading && (
                          <span
                            className="indicator-progress"
                            style={{ display: "block" }}
                          >
                            Please wait...
                            <span className="spinner spinner-border-sm align-middle ms-2"></span>
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

export default AddZoonSettingCard;
