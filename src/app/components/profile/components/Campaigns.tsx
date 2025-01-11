// import React, { useEffect, useRef, useState } from "react";
// import { useFormik } from "formik";
// import { ToastContainer, toast } from "react-toastify";
// import "@yaireo/tagify/dist/tagify.css";
// import Tagify from "@yaireo/tagify";
// // import { AddVariantFunction } from "../../../services/Restaurant/Restaurant";

// interface CampaignsProps {
//   data: any;
// }

// export function Campaigns({ data }: CampaignsProps) {
//   const [loading, setLoading] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);
//   console.log( data);
//   useEffect(() => {
//     if (inputRef.current) {
//       new Tagify(inputRef.current);
//     }
//   }, []);

//   const formik = useFormik({
//     initialValues: {
//       variantName: "",
//       variantType: "",
//     },
//     onSubmit: async (values) => {
//       setLoading(true);
//       try {
//         const types: string[] = JSON.parse(values.variantType).map(
//           (item: { value: string }) => item.value
//         );

//         // const response = await AddVariantFunction({
//         //   name: values.variantName,
//         //   restaurant_id: data?._id,
//         //   type: types,
//         // });

//         if (response?.data?.status === true) {
//           formik.resetForm();
//           toast.success("Variant added successfully");
//           setLoading(false);
//         } else {
//           toast.error("Something went wrong!");
//           setLoading(false);
//         }
//       } catch (error:any) {
//         console.error("Error:", error);
//         toast.error(error?.message || "An unexpected error occurred.");
//         setLoading(false);
//       }
//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit} noValidate id="AddVariantFrom">
//       <div className="card mb-5 mb-xl-10">
//         <div className="card-body pt-9 pb-0">
//           <div className="">
//             <div className="row">
//               <h2 className="fs-2 fw-bolder me-auto">Add Variant</h2>
//             </div>
//             <div className="row mt-2">
//               <div className="col-md-12 col-lg-3 col-xl-3 col-xxl-3">
//                 <label className="form-label">Variant Name</label>
//                 <div className="form-floating mb-7">
//                   <input
//                     type="text"
//                     {...formik.getFieldProps("variantName")}
//                     className="form-control"
//                     name="variantName"
//                     id="variantName"
//                     placeholder="Name"
//                   />
//                   <label htmlFor="floatingInput" className="text-muted">
//                     Variant Name
//                   </label>
//                 </div>
//               </div>

//               <div className="col-md-12 col-lg-9 col-xl-9 col-xxl-9">
//                 <div>
//                   <label className="form-label">Variant Type</label>
//                   <div className="form-group mb-7">
//                     <input
//                       className="form-control"
//                       placeholder="Variant Type"
//                       name="variantType"
//                       ref={inputRef}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       value={formik.values.variantType}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="form-group">
//                  <button
//                       type="submit"
//                       id="kt_sign_in_submit"
//                       className="btn btn-primary"
//                       disabled={formik.isSubmitting || !formik.isValid}
//                     >
//                       {!loading && (
//                         <span className="indicator-label">Submit</span>
//                       )}
//                       {loading && (
//                         <span
//                           className="indicator-progress"
//                           style={{ display: "block" }}
//                         >
//                           Please wait...
//                           <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
//                         </span>
//                       )}
//                     </button>
//                   <ToastContainer />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// }
