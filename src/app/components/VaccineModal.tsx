// import { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import ProductThumbnail from "./ImageComponent";
// const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
// export const BASE_URL: string = `${API_URL}/images/category/`;

// interface ModalComponentProps {
//   show: boolean;
//   onHide: () => void;
//   values: any;
//   updateFunc: any;
// }

// const VaccineModal: React.FC<ModalComponentProps> = (props) => {
//   const [file, setFile] = useState<any>("");
//   const [loading, setLoading] = useState(false);
//   const [showAlert, setShowAlert] = useState<boolean>(false);
//   const [data, setData] = useState<any>({
//     nameEn: props?.values?.nameEn,
//     nameAr: props?.values?.nameAr,
//     index: props?.values?.position,
//     categoryImage: props?.values?.image,
//     id: props.values._id,
//   });
//   const handleChange = (e: any) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("id", data.id);
//     formData.append("nameEn", data.nameEn);
//     formData.append("nameAr", data.nameAr);
//     formData.append("position", String(data.index));
//     file && formData.append("categoryImage", file);
//     formData.append("type", "admin");
//     const response = await props.updateFunc(formData);
//     setShowAlert(true);
//     if (response.data.status) {
//       setTimeout(() => {
//         handleClose();
//       }, 2000);
//     }
//   };

//   useEffect(() => {
//     console.log(file);
//     if (props.values) {
//       setData({
//         nameEn: props?.values?.nameEn,
//         nameAr: props?.values?.nameAr,
//         index: props?.values?.position,
//         categoryImage: props?.values?.image,
//         id: props.values._id,
//       });
//     }
//   }, [props.values]);
//   const handleClose = () => {
//     props.onHide();
//     setLoading(false);
//     setShowAlert(false);
//     setData({ nameEn: "", nameAr: "", index: "", categoryImage: "" });
//   };

//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           Vaccine Category
//         </Modal.Title>
//       </Modal.Header>
//       <>
//         <div className="app-content flex-column-fluid" id="kt_app_content">
//           <div
//             className="app-container container-xxl"
//             id="kt_app_content_container"
//           >
//             <div
//               id="kt_ecommerce_add_product_form"
//               className="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework"
//             >
//               <ProductThumbnail
//                 setFile={setFile}
//                 src={BASE_URL + data?.categoryImage}
//               />
//               <form
//                 className="form w-100"
//                 //   onSubmit={formik.handleSubmit}
//                 noValidate
//                 id="AddCategoryFrom"
//               >
//                 <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
//                   <div className="tab-content">
//                     <div
//                       className="tab-pane fade show active"
//                       id="kt_ecommerce_add_product_general"
//                       role="tab-panel"
//                     >
//                       <div className="d-flex flex-column gap-7 gap-lg-10">
//                         <div className="card card-flush py-2">
//                           <div className="card-header">
//                             <div className="card-title">
//                               <h2>Vaccine Details</h2>
//                             </div>
//                           </div>
//                           <div className="card-body">
//                             <label className="form-label">
//                               Name In English
//                             </label>
//                             <div className="form-floating mb-7">
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 name="nameEn"
//                                 id="nameEn"
//                                 placeholder="Name"
//                                 value={data.nameEn}
//                                 onChange={handleChange}
//                               />
//                               <label
//                                 htmlFor="floatingInput"
//                                 className="text-muted"
//                               >
//                                 Category Name In English
//                               </label>
//                             </div>

//                             <div className="text-muted fs-7 mb-7"></div>
//                             <label className="form-label">Name In Arabic</label>
//                             <div className="form-floating mb-7">
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 name="nameAr"
//                                 id="nameAr"
//                                 placeholder="Name"
//                                 value={data.nameAr}
//                                 onChange={handleChange}
//                               />
//                               <label
//                                 htmlFor="floatingInput"
//                                 className="text-muted"
//                               >
//                                 Category Name In Arabic
//                               </label>
//                             </div>
//                             <div className="text-muted fs-7 mb-7"></div>
//                             <label className="form-label d-block">Index</label>
//                             <div className="form-floating mb-7">
//                               <input
//                                 type="number"
//                                 className="form-control"
//                                 name="index"
//                                 id="index"
//                                 placeholder="Name"
//                                 value={data.index}
//                                 onChange={handleChange}
//                               />
//                               <label
//                                 htmlFor="floatingInput"
//                                 className="text-muted"
//                               >
//                                 Category Index
//                               </label>
//                             </div>

//                             <div className="text-muted fs-7 mb-7"></div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>

//             {showAlert && (
//               <div className="alert alert-dismissible text-success bg-light-success   alert-success d-flex align-items-center p-5">
//                 {/* Icon */}
//                 <i className="ki-duotone ki-shield-tick fs-2hx text-success me-4">
//                   <span className="path1"></span>
//                   <span className="path2"></span>
//                 </i>
//                 <div className="d-flex text-success flex-column">
//                   <h4 className="mb-1 text-success">Success!</h4>
//                   <span className="text-success">
//                     Vaccine has been updated successfully.
//                   </span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </>
//       <Modal.Footer>
//         {/*  <button onClick={handleUpdate}>Update</button> */}
//          <button
//           type="submit"
//           id="kt_sign_in_submit"
//           className="btn btnRed"
//           onClick={handleUpdate}
//           //   disabled={}
//         >
//           {!loading && <span className="indicator-label">Submit</span>}
//           {loading && (
//             <span className="indicator-progress" style={{ display: "block" }}>
//               Please wait...
//               <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
//             </span>
//           )}
//         </button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default VaccineModal;

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface ModalComponentProps {
  show: boolean;
  onHide: () => void;
  values: any;
  updateFunc: any;
}

const VaccineModal: React.FC<ModalComponentProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    type: props?.values?.type || "", // New type field
    titleEn: props?.values?.title?.en || "", // Title (English)
    titleAr: props?.values?.title?.ar || "", // Title (Arabic)
    descriptionEn: props?.values?.description?.en || "", // Description (English)
    descriptionAr: props?.values?.description?.ar || "", // Description (Arabic)
    id: props.values._id,
  });

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setLoading(true);

    const payload = {
      id: data.id,
      type: data.type, // Include the type field
      title: {
        en: data.titleEn, // Title in English
        ar: data.titleAr, // Title in Arabic
      },
      description: {
        en: data.descriptionEn, // Description in English
        ar: data.descriptionAr, // Description in Arabic
      },
    };

    const response = await props.updateFunc(payload);
    setShowAlert(true);
    if (response.data.status) {
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  };

  useEffect(() => {
    if (props.values) {
      setData({
        type: props?.values?.type || "", // Update type
        titleEn: props?.values?.title?.en || "", // Update title (English)
        titleAr: props?.values?.title?.ar || "", // Update title (Arabic)
        descriptionEn: props?.values?.description?.en || "", // Update description (English)
        descriptionAr: props?.values?.description?.ar || "", // Update description (Arabic)
        id: props.values._id,
      });
    }
  }, [props.values]);

  const handleClose = () => {
    props.onHide();
    setLoading(false);
    setShowAlert(false);
    setData({
      type: "",
      titleEn: "",
      titleAr: "",
      descriptionEn: "",
      descriptionAr: "",
      id: "",
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Vaccine</Modal.Title>
      </Modal.Header>
      <>
        <div className="app-content flex-column-fluid" id="kt_app_content">
          <div
            className="app-container container-xxl"
            id="kt_app_content_container"
          >
            <form className="form w-100" noValidate id="AddCategoryFrom">
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
                            <h2>Vaccine Details</h2>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="row mb-4">
                            <div className="col-md-6">
                              <label className="form-label">Vaccine Type</label>
                              <div className="form-floating">
                                <select
                                  className="form-control"
                                  name="type"
                                  value={data.type}
                                  onChange={handleChange}
                                >
                                  <option value="">Select Vaccine Type</option>
                                  <option value="coreVaccine">
                                    Core Vaccine
                                  </option>
                                  <option value="nonCoreVaccine">
                                    Non-Core Vaccine
                                  </option>
                                </select>
                                <label
                                  htmlFor="floatingSelect"
                                  className="text-muted"
                                >
                                  Vaccine Type
                                </label>
                              </div>
                            </div>

                            <div className="col-md-6 mt-10 mt-md-0">
                              <label className="form-label">
                                Title In English
                              </label>
                              <div className="form-floating">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="titleEn"
                                  id="titleEn"
                                  placeholder="Title"
                                  value={data.titleEn}
                                  onChange={handleChange}
                                />
                                <label htmlFor="titleEn" className="text-muted">
                                  Vaccine Title In English
                                </label>
                              </div>
                            </div>

                            <div className="col-md-6 mt-10">
                              <label className="form-label">
                                Title In Arabic
                              </label>
                              <div className="form-floating">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="titleAr"
                                  id="titleAr"
                                  placeholder="Title"
                                  value={data.titleAr}
                                  onChange={handleChange}
                                />
                                <label htmlFor="titleAr" className="text-muted">
                                  Vaccine Title In Arabic
                                </label>
                              </div>
                            </div>

                            <div className="col-md-6 mt-10">
                              <label className="form-label">
                                Description In English
                              </label>
                              <div className="form-floating">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="descriptionEn"
                                  id="descriptionEn"
                                  placeholder="Description"
                                  value={data.descriptionEn}
                                  onChange={handleChange}
                                />
                                <label
                                  htmlFor="descriptionEn"
                                  className="text-muted"
                                >
                                  Vaccine Description In English
                                </label>
                              </div>
                            </div>

                            <div className="col-md-6 mt-10">
                              <label className="form-label">
                                Description In Arabic
                              </label>
                              <div className="form-floating">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="descriptionAr"
                                  id="descriptionAr"
                                  placeholder="Description"
                                  value={data.descriptionAr}
                                  onChange={handleChange}
                                />
                                <label
                                  htmlFor="descriptionAr"
                                  className="text-muted"
                                >
                                  Vaccine Description In Arabic
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {showAlert && (
              <div className="alert alert-dismissible text-success bg-light-success alert-success d-flex align-items-center p-5">
                <i className="ki-duotone ki-shield-tick fs-2hx text-success me-4"></i>
                <div className="d-flex text-success flex-column">
                  <h4 className="mb-1 text-success">Success!</h4>
                  <span className="text-success">
                    Vaccine has been updated successfully.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
      <Modal.Footer>
        <button
          type="submit"
          className=" py-3 px-5 border-0 custom_btn fw-semibold  fs-5 rounded-2"
          onClick={handleUpdate}
        >
          {!loading && <span className="indicator-label">Submit</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default VaccineModal;
