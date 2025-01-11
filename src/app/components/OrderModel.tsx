import "./OrderModel.css";

import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
// import { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import RefundFunction from "../services/order/order";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}/images/product/`;

interface ModalComponentProps {
  show: boolean;
  onHide: () => void;
  values: any;
}

const ModalOrderComponent: React.FC<ModalComponentProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [hideBtn, setHideBtn] = useState<any>(false);
  console.log("ssssssssssss", props?.values?.data?.data[0]);
  const data = props?.values?.data?.data[0];

  //   const handleClose = () => {
  //     props.onHide();
  //   };

  const getClassName = (step: any) => {
    switch (data?.order_status) {
      case "Pending":
        return step === 1 ? "active" : "";
      case "Accepted":
        return step <= 2 ? "active" : "";
      case "Ready":
        return step <= 2 ? "active" : "";
      case "Pickup":
        return step <= 3 ? "active" : "";
      case "Delivered":
        return "active";
      default:
        return "";
    }
  };

  const notifySuccess = () => toast.success("Order Refund Success");
  const notifyError = (errorMessage: any) => toast.error(errorMessage);
  async function refundFrom(event: any, id: any) {
    event.preventDefault();
    // alert(id)
    setLoading(true);
    const res = await RefundFunction(id);
    console.log("res", res);
    if (res?.status) {
      notifySuccess();
      setHideBtn(true);
      setLoading(false);
    } else {
      setLoading(false);
      notifyError(`Not Refund:${res?.data?.data?.message}`);
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {/* Order Summary */}

          <h2>Order ID - {data?.orderId}</h2>
        </Modal.Title>
      </Modal.Header>
      <>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="card card-custom h-200px card-flush">
                <div className=" mt-0 p-5 h-10px">
                  <h3 className="card-title p-0 mb-0">
                    {" "}
                    <b>Order Details</b>{" "}
                  </h3>
                </div>
                <div className="p-5">
                  <div className="row">
                    <div className="col-md-4">Name</div>
                    <div className="col-md-8">{data?.address?.name || "-"}</div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-4">Phone</div>
                    <div className="col-md-8">
                      {" "}
                      {data?.address?.phone || "-"}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-4">Address</div>
                    <div className="col-md-8">
                      {data?.address?.address || "-"}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-4">Landmark</div>
                    <div className="col-md-8">
                      {data?.address?.landmark || "-"}
                    </div>
                  </div>
                </div>
                {/* <div className="card-footer">Footer</div> */}
              </div>
            </div>
            <div className="col-md-6">
              <div className="card card-custom h-200px card-flush">
                <div className="mt-0 p-5 h-10px">
                  <h3 className="card-title">Restaurant Details</h3>
                  <div className="card-toolbar"></div>
                </div>
                <div className="p-5">
                  <div className="row">
                    <div className="col-md-4">Name</div>
                    <div className="col-md-8">
                      {data?.restaurant?.nameEn || "-"}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-4">Phone</div>
                    <div className="col-md-8">
                      {data?.restaurant?.phone || "-"}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-4">Email</div>
                    <div className="col-md-8">
                      {data?.restaurant?.email || "-"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-12">
              <div className="card card-flush py-4 flex-row-fluid overflow-hidden">
                <div className="card-body pt-0">
                  <div className="table-responsive">
                    {/* Table */}
                    <table className="table align-middle table-row-dashed fs-6 gy-5 mb-0">
                      <thead>
                        <tr className="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0">
                          <th className="min-w-275px">Product</th>
                          <th className="min-w-100px text-end"></th>
                          <th className="min-w-70px text-end">Qty</th>
                          <th className="min-w-100px text-end">Unit Price</th>
                          <th className="min-w-100px text-end">Total</th>
                        </tr>
                      </thead>
                      <tbody className="fw-semibold text-gray-600">
                        {data?.item?.map((item: any) => (
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                {/* Thumbnail */}
                                <span className="symbol-label">
                                  <img
                                    src={`${BASE_URL}${item?.images[0]}` || ""}
                                    alt=""
                                    className="w-50px rounded h-50px"
                                  />
                                </span>
                                <div className="ms-5">
                                  {item.nameEn}
                                  <div className="fs-7 text-muted">
                                    {/* Delivery Date: 28/12/2023 */}
                                    {item.nameAr}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="text-end"></td>
                            <td className="text-end">{item.quantity}</td>
                            <td className="text-end">{item.price}</td>
                            <td className="text-end">
                              {item.quantity * item.price}
                            </td>
                          </tr>
                        ))}

                        <tr>
                          <td colSpan={4} className="text-end">
                            Subtotal
                          </td>
                          <td className="text-end">
                            SAR{" "}
                            {data?.total_amount +
                              data?.discount -
                              data?.delivery_fee -
                              data?.tax -
                              data?.service_fee}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={4} className="text-end">
                            Discount
                          </td>
                          <td className="text-end">SAR {data?.discount}</td>
                        </tr>
                        <tr>
                          <td colSpan={4} className=" text-end">
                            Delivery Fees
                          </td>
                          <td className="text-end">SAR {data?.delivery_fee}</td>
                        </tr>
                        <tr>
                          <td colSpan={4} className=" text-end">
                            Tax
                          </td>
                          <td className="text-end">SAR {data?.tax}</td>
                        </tr>
                        <tr>
                          <td colSpan={4} className=" text-end">
                            Service Fees
                          </td>
                          <td className="text-end">SAR {data?.service_fee}</td>
                        </tr>
                        <tr>
                          <td
                            colSpan={4}
                            className="fs-3 text-gray-900 text-end"
                          >
                            Grand Total
                          </td>
                          <td className="text-gray-900 fs-3 fw-bolder text-end">
                            SAR {data?.total_amount}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {/* End of Table */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <section className="" style={{ backgroundColor: "#8c9eff" }}> */}
          <MDBContainer className="pt-5 p-0 m-0 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol size="">
                <MDBCard
                  className="card-stepper text-black"
                  style={{ borderRadius: "10px" }}
                >
                  <div className="mt-5 mx-5">
                    <h3> Order Status</h3>
                  </div>
                  <MDBCardBody className="p-5">
                    <ul
                      id="progressbar-2"
                      className="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2"
                    >
                      <li
                        className={`step0 text-center ${getClassName(1)}`}
                        id="step1"
                      ></li>
                      <li
                        className={`step0 text-center ${getClassName(2)}`}
                        id="step2"
                      ></li>
                      <li
                        className={`step0 text-center ${getClassName(3)}`}
                        id="step3"
                      ></li>
                      <li
                        className={`step0 text-center ${getClassName(4)}`}
                        id="step4"
                      ></li>
                      {/* <li className="step0 active text-center" id="step5"></li> */}
                      {/* <li className="step0  text-muted text-center" id="step5"></li> */}
                    </ul>

                    <div className="d-flex justify-content-between">
                      <div className="d-lg-flex align-items-center">
                        {/* <MDBIcon fas icon="clipboard-list me-lg-4 mb-3 mb-lg-0" size="3x" /> */}
                        <div>
                          <p className="fw-bold mb-1">Order</p>
                          <p className="fw-bold mb-0">Pending</p>
                        </div>
                      </div>
                      <div className="d-lg-flex align-items-center">
                        {/* <MDBIcon fas icon="box-open me-lg-4 mb-3 mb-lg-0" size="3x" /> */}
                        <div>
                          <p className="fw-bold mb-1">Order</p>
                          <p className="fw-bold mb-0">Accepted</p>
                        </div>
                      </div>
                      <div className="d-lg-flex align-items-center">
                        {/* <MDBIcon fas icon="shipping-fast me-lg-4 mb-3 mb-lg-0" size="3x" /> */}
                        <div>
                          <p className="fw-bold mb-1">Order</p>
                          <p className="fw-bold mb-0">Pickup</p>
                        </div>
                      </div>
                      <div className="d-lg-flex align-items-center">
                        {/* <MDBIcon fas icon="home me-lg-4 mb-3 mb-lg-0" size="3x" /> */}
                        <div>
                          <p className="fw-bold mb-1">Order</p>
                          <p className="fw-bold mb-0">Delivered</p>
                        </div>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          {/* </section> */}
          <div className="mt-3">
            {/* {data?.payment_status} */}
            {data?.order_status !== "Delivered" &&
              data?.payment_status === "Success" &&
              hideBtn === false && (
                <button className="btn btnRed">
                  {!loading && (
                    <span
                      onClick={(event) => refundFrom(event, data._id)}
                      className="indicator-label"
                    >
                      Refund
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
              )}
          </div>

          {/* <div className="row mt-5">
            <div className="col-md-12">
              <div className="card card-flush py-4 flex-row-fluid position-relative">
                
                <div className="position-absolute top-0 end-0 bottom-0 opacity-10 d-flex align-items-center me-5">
                  <i
                    className="ki-solid ki-delivery"
                    style={{ fontSize: "14em" }}
                  ></i>
                </div>
                
                <div className="card-header">
                  <div className="card-title">
                    <h2>Shipping Address</h2>
                  </div>
                </div>
                
                <div className="card-body pt-0">
                  Unit 1/23 Hastings Road,
                  <br />
                  Melbourne 3000,
                  <br />
                  Victoria,
                  <br />
                  Australia.
                </div>
              </div>
            </div>
          </div> */}
        </Modal.Body>
      </>
      <ToastContainer />
    </Modal>
  );
};

export default ModalOrderComponent;
