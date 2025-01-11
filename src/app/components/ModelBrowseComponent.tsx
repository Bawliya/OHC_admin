// import { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import ProductThumbnail from "./ImageComponent";
// const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
// export const BASE_URL: string = `${API_URL}/images/browse/`;

// interface ModalComponentProps {
//   show: boolean;
//   onHide: () => void;
//   values: any;
//   updateFunc: any;
// }

// const BrowseModalComponent: React.FC<ModalComponentProps> = (props) => {
//   const [file, setFile] = useState<any>("");
//   const [loading, setLoading] = useState(false);
//   const [showAlert, setShowAlert] = useState<boolean>(false);
//   const [data, setData] = useState<any>({
//     nameEn: props?.values?.nameEn,
//     nameAr: props?.values?.nameAr,
//     index: props?.values?.position,
//     browseImage: props?.values?.image,
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
//     file && formData.append("browseImage", file);
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
//         browseImage: props?.values?.image,
//         id: props.values._id,
//       });
//     }
//   }, [props.values]);
//   const handleClose = () => {
//     props.onHide();
//     setLoading(false);
//     setShowAlert(false);
//     setData({ nameEn: "", nameAr: "", index: "", browseImage: "" });
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
//           Update Browse
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
//               {/* <ProductThumbnail
//                 setFile={setFile}
//                 src={BASE_URL + data?.browseImage}
//               /> */}
//               <form
//                 className="form w-100"
//                 //   onSubmit={formik.handleSubmit}
//                 noValidate
//                 id="AddBrowseFrom"
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
//                               <h2>Browse Details</h2>
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
//                                 Browse Name In English
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
//                                 Browse Name In Arabic
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
//                                 Browse Index
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
//                     Browse has been updated successfully.
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

// export default BrowseModalComponent;

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion"; // Import Accordion from Bootstrap
import { getCategoryFunction } from "../services/category/Category";

interface ModalComponentProps {
  show: boolean;
  onHide: () => void;
  values: any;
  updateFunc: any;
}

const BrowseModalComponent: React.FC<ModalComponentProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>("");
  const [categories, setCategories] = useState<any[]>([]);
  const [data, setData] = useState<any>({
    nameEn: props?.values?.name?.en,
    nameAr: props?.values?.name?.ar,
    id: props.values._id,
  });

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    // const formData = new FormData();
    // formData.append("id", data.id);
    // formData.append("nameEn", data.nameEn);
    // formData.append("nameAr", data.nameAr);
    const payload = {
      id: data.id,
      categoryId: categoryId,
      name: {
        en: data.nameEn,
        ar: data.nameAr,
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
        nameEn: props?.values?.name?.en,
        nameAr: props?.values?.name?.ar,
        id: props.values._id,
      });
    }
  }, [props.values]);

  const handleClose = () => {
    props.onHide();
    setLoading(false);
    setShowAlert(false);
    setData({ nameEn: "", nameAr: "", id: "" });
  };
  // State to hold categories

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resp = await getCategoryFunction(1, 100, ""); // Fetch categories
        if (resp?.data?.status) {
          setCategories(resp?.data?.data); // Update the categories state with fetched data
          // console.log(resp?.data?.data); // Update the categories state with fetched data
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Breeds
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
                              <h2>Breeds Details</h2>
                            </div>
                          </div>
                          <div className="card-body pt-0">
                            <label className="form-label mt-3">
                              Select Category
                            </label>
                            <select
                              onChange={(e) => setCategoryId(e.target.value)}
                              className="px-3 py-3 rounded-2  form-control"
                              name=""
                              id=""
                            >
                              <option value="--Selcet Category--">
                                --Selcet Category--
                              </option>
                              {categories?.length > 0 ? (
                                categories.map((category: any) => (
                                  <option
                                    key={category._id}
                                    value={category._id}
                                  >
                                    {category.name.en} ({category.name.ar})
                                  </option>
                                ))
                              ) : (
                                <option value="">
                                  No categories available
                                </option>
                              )}
                            </select>

                            <label className="form-label mt-5">
                              Name In English
                            </label>
                            <div className="form-floating mb-7">
                              <input
                                type="text"
                                className="form-control"
                                name="nameEn"
                                id="nameEn"
                                placeholder="Name"
                                value={data.nameEn}
                                onChange={handleChange}
                              />
                              <label
                                htmlFor="floatingInput"
                                className="text-muted"
                              >
                                Category Name In English
                              </label>
                            </div>

                            <label className="form-label">Name In Arabic</label>
                            <div className="form-floating mb-7">
                              <input
                                type="text"
                                className="form-control"
                                name="nameAr"
                                id="nameAr"
                                placeholder="Name"
                                value={data.nameAr}
                                onChange={handleChange}
                              />
                              <label
                                htmlFor="floatingInput"
                                className="text-muted"
                              >
                                Category Name In Arabic
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {showAlert && (
              <div className="alert alert-dismissible text-success bg-light-success alert-success d-flex align-items-center p-5">
                <i className="ki-duotone ki-shield-tick fs-2hx text-success me-4"></i>
                <div className="d-flex text-success flex-column">
                  <h4 className="mb-1 text-success">Success!</h4>
                  <span className="text-success">
                    Browse has been updated successfully.
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
          className="py-3 px-5 border-0 custom_btn fw-semibold  fs-5 rounded-2"
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

export default BrowseModalComponent;
