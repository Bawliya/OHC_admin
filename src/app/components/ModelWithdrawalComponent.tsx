import Modal from "react-bootstrap/Modal";

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}/images/category/`;

interface ModalComponentProps {
  show: boolean;
  onHide: () => void;
  values: any;
  updateFunc: any;
}

const ModalWithdrawalComponent: React.FC<ModalComponentProps> = (props) => {
  console.log("props.values", props.values);

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Withdrawal Request Details
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
                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <b>Amount</b>{" "}
                  </div>
                  <div className="col-12 col-md-6">{props?.values.amount}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <b>Account Number</b>{" "}
                  </div>
                  <div className="col-12 col-md-6">
                    {props?.values.account_number}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <b>IFSC Code</b>{" "}
                  </div>
                  <div className="col-12 col-md-6">
                    {props?.values.ifsc_code}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <b>Bank Name</b>{" "}
                  </div>
                  <div className="col-12 col-md-6">
                    {props?.values.bank_name}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <b>Status</b>{" "}
                  </div>
                  <div className="col-12 col-md-6">
                    <span
                      className={`badge ${
                        props?.values?.status === "Success"
                          ? "badge-light-success"
                          : "badge-light-danger"
                      } ${props?.values?.verify === false ? "disabled" : ""}`}
                      style={
                        props?.values?.verify === false
                          ? { display: "disabled", fontSize: "14px" }
                          : { fontSize: "14px" }
                      }
                    >
                      {props?.values?.status ? "Pending" : "Success"}
                    </span>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <b>Type</b>{" "}
                  </div>
                  <div className="col-12 col-md-6">{props?.values.type}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* <Modal.Footer> */}
      {/*  <button onClick={handleUpdate}>Update</button> */}

      {/* </Modal.Footer> */}
    </Modal>
  );
};

export default ModalWithdrawalComponent;
