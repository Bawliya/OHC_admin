/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddWallet } from "../../../services/deliveryboy/DeliveryBoy";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}/images/banner/`;

interface ModalComponentProps {
  show: boolean;
  onHide: () => void;
  values: any;
  updateFunc: any;
  setActiveTab: any;
}

const ModalWalletComponent: React.FC<ModalComponentProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<any>();
  const [description, setDescription] = useState<any>();
  const [type, setType] = useState<any>("");

  const handleAmountChange = (e: any) => {
    setAmount(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleOrderStatusChange = (e: any) => {
    console.log(e.target.value);
    setType(e.target.value);
  };

  const notifySuccess = () => toast.success("Wallet Updated Successfully");
  const notifyError = (errorMessage: any) => toast.error(errorMessage);
  const handleSubmit = async () => {
    setLoading(true);
    if (!props.values._id || !amount || !description || !type) {
      notifyError("All fields are required.");
      setLoading(false);
      return;
    }
    try {
      const data = {
        delivery_boy_id: props.values._id,
        amount: JSON.parse(amount),
        description: description,
        type: type,
      };
      const response = await AddWallet(data);
      notifySuccess();
      props.setActiveTab(4);
      props.onHide();
      setLoading(false);
    } catch (error) {
      console.error("Error adding to wallet:", error);
      notifyError(`Error adding to wallet : ${error}`);
      setLoading(false);
      // Optionally, you can add more error handling logic here
    } finally {
      notifyError(`Error adding to wallet`);
      setLoading(false);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Balance
        </Modal.Title>
      </Modal.Header>
      <>
        <div className="app-content flex-column-fluid" id="kt_app_content">
          <div
            className="app-container container-xxl"
            id="kt_app_content_container"
          >
            <div
              id="kt_ecommerce_add_product_form"
              className="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework"
            >
              <div className="card-body">
                <label className="form-label">Amount</label>
                <div className="form-floating mb-7">
                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    id="amount"
                    placeholder="Name"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                  <label htmlFor="floatingInput" className="text-muted">
                    Amount
                  </label>
                </div>

                <div className="">
                  <label className="form-label d-block">Payment Type</label>
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
                      <option key="Credit" value="Credit">
                        Credit
                      </option>
                      <option key="Debit" value="Debit">
                        Debit
                      </option>
                    </select>
                  </div>
                </div>

                <label className="form-label">Description</label>
                <div className="form-floating mb-7">
                  <textarea
                    className="form-control h-100"
                    name="description"
                    id="description"
                    placeholder="Name"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                  <label htmlFor="floatingInput" className="text-muted">
                    Description
                  </label>
                </div>
                <button type="submit" className="btn btnRed">
                  {!loading && (
                    <span className="indicator-label" onClick={handleSubmit}>
                      Submit
                    </span>
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
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </>
      {/* <Modal.Footer>
                 <button
                    type="submit"
                    className="btn btnRed"
                >
                    {!loading && <span className=" indicator-label" onClick={handleSubmit} >Submit</span>}
                    {loading && (
                        <span className="indicator-progress" style={{ display: "block" }}>
                            Please wait...
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                    )}
                </button>
            </Modal.Footer> */}
    </Modal>
  );
};

export default ModalWalletComponent;
