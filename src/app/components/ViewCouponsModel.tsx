// import Button from "react-bootstrap/Button";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}/images/banner/`;

interface ModalComponentProps {
  show: boolean;
  onHide: () => void;
  values: any;
  updateFunc: any;
}

const ModalCouponsComponent: React.FC<ModalComponentProps> = (props) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  //   const handleClose = () => {
  //     props.onHide();
  //   };
  console.log(props?.values);

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          View Coupons
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
                    <b>Coupon Code</b>{" "}
                  </div>
                  <div className="col-12 col-md-6">{props?.values.code}</div>
                </div>
                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <b>Discount</b>{" "}
                  </div>
                  <div className="col-12 col-md-6">
                    {props?.values.discount}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <b>Discount Type</b>{" "}
                  </div>
                  <div className="col-12 col-md-6">
                    {props?.values.discountType}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <b>Expires Date</b>{" "}
                  </div>
                  <div className="col-12 col-md-6">
                    {props?.values.expiresAt
                      ? `${new Date(props?.values.expiresAt)
                          .getDate()
                          .toString()
                          .padStart(2, "0")}-${(
                          new Date(props?.values.expiresAt).getMonth() + 1
                        )
                          .toString()
                          .padStart(2, "0")}-${new Date(
                          props?.values.expiresAt
                        ).getFullYear()}`
                      : null}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <b>Publish </b>{" "}
                  </div>
                  <div className="col-12 col-md-6">
                    <span
                      className={`badge ${
                        props?.values?.publish
                          ? "badge-light-success"
                          : "badge-light-danger"
                      } ${props?.values?.verify === false ? "disabled" : ""}`}
                      style={
                        props?.values?.verify === false
                          ? { display: "disabled", fontSize: "14px" }
                          : { fontSize: "14px" }
                      }
                    >
                      {props?.values?.publish ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <b>Business Name</b>{" "}
                  </div>
                  <div className="col-12 col-md-6">
                    {props?.values.business}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <b>Description</b>{" "}
                  </div>
                  <div className="col-12 col-md-6">
                    {showFullDescription
                      ? props?.values.description
                      : `${props?.values?.description?.slice(0, 50)}${
                          props?.values?.description?.length > 50 ? "..." : ""
                        }`}
                    {props?.values?.description?.length > 50 && (
                      <Link
                        to=""
                        onClick={toggleDescription}
                        className=" btn-link"
                      >
                        {showFullDescription ? "See less" : "See more"}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* <Modal.Footer>
         <button onClick={handleClose}>Close</button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default ModalCouponsComponent;
