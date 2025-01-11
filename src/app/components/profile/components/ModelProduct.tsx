import { useEffect, useState } from "react";

import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

import { OneProductFunction } from "../../../services/Product/Product";

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}/images/product/`;

interface ModalComponentProps {
  show: boolean;
  onHide: () => void;
  values: any;
  //   updateFunc: any;
}

const EditProductComponent: React.FC<ModalComponentProps> = (props) => {
  const [currentData, setCurrentData] = useState<any>({});

  const _id = props?.values._id;
  useEffect(() => {
    abc();
  }, [_id]);

  const abc = async () => {
    const res = await OneProductFunction(_id);
    console.log("ressssssss", res);
    setCurrentData(res?.data?.data);
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const description = currentData?.descriptionEn || "";
  const truncateLength = 50; // Number of characters to show when truncated

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const [isExpanded2, setIsExpanded2] = useState(false);
  const description2 = currentData?.descriptionAr || "";
  const truncateLength2 = 50; // Number of characters to show when truncated

  const handleToggle2 = () => {
    setIsExpanded2(!isExpanded2);
  };

  console.log("currentData", currentData);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Product</Modal.Title>
      </Modal.Header>
      <>
        <div className="app-content flex-column-fluid" id="kt_app_content">
          <div
            className="app-container container-xxl"
            id="kt_app_content_container"
          >
            <div
              id="kt_ecommerce_add_product_form"
              className="fv-plugins-bootstrap5 fv-plugins-framework"
            >
              <div className="row mb-7">
                <div className="col-lg-6">
                  <div className="row mb-7">
                    <label className="col-lg-6 fw-bold text-muted">
                      Name En
                    </label>
                    <div className="col-lg-6">
                      <span className="fw-bolder fs-6 text-gray-900">
                        {currentData?.nameEn}
                      </span>
                    </div>
                  </div>

                  <div className="row mb-7">
                    <label className="col-lg-6 fw-bold text-muted">Price</label>
                    <div className="col-lg-6 fv-row">
                      <span className="fw-bold fs-6">
                        {currentData?.price == null ? "-" : currentData.price}
                      </span>
                    </div>
                  </div>

                  <div className="row mb-7">
                    <label className="col-lg-6 fw-bold text-muted">
                      Featured
                    </label>
                    <div className="col-lg-6 d-flex align-items-center">
                      <span className="fw-bolder fs-6 me-2">
                        <span className="fw-bold fs-6">
                          <span
                            className={`badge ${
                              currentData?.featured
                                ? "badge-light-success"
                                : "badge-light-danger"
                            } ${
                              currentData.verify === false ? "disabled" : ""
                            }`}
                            style={
                              currentData.verify === false
                                ? { display: "disabled", fontSize: "14px" }
                                : { fontSize: "14px" }
                            }
                          >
                            {currentData?.featured ? "ON" : "OFF"}
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="row mb-7">
                    <label className="col-lg-6 fw-bold text-muted">
                      category
                    </label>
                    <div className="col-lg-6">
                      <a
                        href="javascript:void(0)"
                        className="fw-bold fs-6 text-gray-900 text-hover-primary"
                      >
                        {currentData?.category?.nameEn}
                      </a>
                    </div>
                  </div>

                  <div className="row mb-7">
                    <label className="col-lg-12 fw-bold text-muted">
                      Description En
                    </label>
                    <div className="col-lg-12">
                      <span className=" fs-6 text-gray-900">
                        <div>
                          <p>
                            {isExpanded
                              ? description
                              : `${description.slice(0, truncateLength)}...`}
                          </p>
                          {description.length > truncateLength && (
                            <Link to="#" onClick={handleToggle}>
                              {isExpanded ? "See less" : "See more"}
                            </Link>
                          )}
                        </div>
                      </span>
                    </div>
                  </div>

                  <div className="row mb-7">
                    <label className="col-lg-12 fw-bold text-muted">
                      Variant
                    </label>
                    <div className="col-lg-12">
                      <div className="row">
                        {currentData?.variant?.map(
                          (variant: any, index: any) => (
                            <div key={index} className="col-12">
                              <div className="row">
                                <div className="col-6 mb-3">
                                  <span className="fw-bolder fs-6 text-gray-900">
                                    {variant.name}
                                  </span>
                                </div>
                                <div className="col-6">{variant.price}</div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row mb-7">
                    <label className="col-lg-6 fw-bold text-muted">
                      Add On
                    </label>
                    <div className="col-lg-12">
                      <div className="row">
                        {currentData?.addon?.map((variant: any, index: any) => (
                          <div key={index} className="col-12">
                            <div className="row">
                              <div className="col-6 mb-3">
                                <span className="fw-bolder fs-6 text-gray-900">
                                  {variant.name}
                                </span>
                              </div>
                              <div className="col-6">{variant.price}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="row mb-7">
                    <label className="col-lg-6 fw-bold text-muted">
                      Name Ar
                    </label>
                    <div className="col-lg-6">
                      <span className="fw-bold fs-6">
                        {currentData?.nameAr}
                      </span>
                    </div>
                  </div>

                  <div className="row mb-7">
                    <label className="col-lg-6 fw-bold text-muted">Index</label>
                    <div className="col-lg-6">
                      <span className="fw-bold fs-6">
                        {currentData?.position}
                      </span>
                    </div>
                  </div>

                  <div className="row mb-7">
                    <label className="col-lg-6 fw-bold text-muted">
                      Publish
                    </label>
                    <div className="col-lg-6">
                      <span className="fw-bold fs-6">
                        <span
                          className={`badge ${
                            currentData?.publish
                              ? "badge-light-success"
                              : "badge-light-danger"
                          } ${currentData.verify === false ? "disabled" : ""}`}
                          style={
                            currentData.verify === false
                              ? { display: "disabled", fontSize: "14px" }
                              : { fontSize: "14px" }
                          }
                        >
                          {currentData?.publish ? "Active" : "Inactive"}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="row mb-7">
                    <label className="col-lg-6 fw-bold text-muted">
                      Category Name Ar
                    </label>
                    <div className="col-lg-6">
                      <span className="fw-bold fs-6">
                        {currentData?.category?.nameAr}
                      </span>
                    </div>
                  </div>

                  <div className="row mb-7">
                    <label className="col-lg-12 fw-bold text-muted">
                      Description Ar
                    </label>
                    <div className="col-lg-12">
                      <span className=" fs-6">
                        <div>
                          <p>
                            {isExpanded2
                              ? description2
                              : `${description2.slice(0, truncateLength2)}...`}
                          </p>
                          {description2.length > truncateLength2 && (
                            <Link to="#" onClick={handleToggle2}>
                              {isExpanded2 ? "عرض أقل" : "عرض المزيد"}
                            </Link>
                          )}
                        </div>
                      </span>
                    </div>
                  </div>

                  <div className="row mb-7">
                    <label className="col-lg-12 fw-bold text-muted">
                      Images
                    </label>
                    <div className="col-lg-12">
                      {currentData?.images?.length > 0 ? (
                        <div className="row">
                          {currentData.images.map((image: any, index: any) => (
                            <div className="col-lg-6 mb-5" key={index}>
                              <div className="image-container">
                                <img
                                  src={`${BASE_URL}/${image}`}
                                  alt={`Image ${index + 1}`}
                                  className="image-thumbnail"
                                  style={{ height: "125px" }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="fw-bold fs-6">
                          No images available
                        </span>
                      )}
                    </div>
                  </div>

                  {/* <div className="row mb-7">
                    <label className="col-lg-6 fw-bold text-muted">
                      Region Id
                    </label>
                    <div className="col-lg-6">
                      <span className="fw-bold fs-6">
                        {props?.values?.nameEn}
                      </span>
                    </div>
                  </div>

                  <div className="row mb-7">
                    <label className="col-lg-6 fw-bold text-muted">
                      City Id
                    </label>
                    <div className="col-lg-6">
                      <span className="fw-bold fs-6">
                        {props?.values?.nameEn}
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* <Modal.Footer>
       <button
          type="button"
          className="btn btn-light"
          data-bs-dismiss="modal"
        >
          Close
        </button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default EditProductComponent;
