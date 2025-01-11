import "../../../../../public/plugins.bundle.css";
import "../../../../_metronic/assets/sass/_dropzone.scss?inline";
import "./Overview.css";

import { useEffect, useState } from "react";

// import { Content } from '../../../../_metronic/layout/components/content'
import clsx from "clsx";
import Dropzone from "dropzone";
import { useFormik } from "formik";
// import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";

import { getCategoryList } from "../../../services/category/Category";
import { AddProductFunction } from "../../../services/Restaurant/Restaurant";
import { Link } from "react-router-dom";
import ModalCsv from "./ModelCsv";
// import { Link } from 'react-router-dom';

// import $ from 'jquery';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface JQuery<TElement = HTMLElement> {
  repeater: any; // Adjust 'any' to the appropriate type if possible
}

interface CampaignsProps {
  data: any;
  setActiveTab: any;
}

export function Product({ data, setActiveTab }: CampaignsProps) {
  const [loading, setLoading] = useState(false);
  const [variantAvailable, setVariantAvailable] = useState(false);
  const [multipleFiles, setMultipleFiles] = useState<File[]>([]);
  const [CategoryList, CategoryLists] = useState([]);
  // const [selectedOptionss, setSelectedOption] = useState<string>("");
  const [FeaturedAvailable, setFeatured] = useState<any>(false);

  const [isModal, setIsModal] = useState<any>(false);

  console.log(variantAvailable);

  const loginSchema = Yup.object().shape({
    nameEn: Yup.string().required("Restaurant Name In English Is Required"),
    nameAr: Yup.string().required("Restaurant Name In Arabic Is Required"),

    descriptionEn: Yup.string().required("Description In English Is Required"),
    descriptionAr: Yup.string().required("Description In Arabic Is Required"),
    category_id: Yup.string().required("Category Is Required"),

    index: Yup.number().required("Restaurant Index Is Required"),
    // price: variantAvailable === false ? Yup.number().required("Price Is Required") : Yup.number(),
  });

  // const [browseData, setBrowseData] = useState<any[]>([]);
  console.log("overviewData", data.data);
  const restaurant_id = data?.data?._id;
  console.log(restaurant_id);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVariantAvailable(event.target.checked);
  };
  const handleFeaturedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeatured(event.target.checked);
  };

  console.log(FeaturedAvailable);

  console.log(variantAvailable);

  useEffect(() => {
    getCategoryLists();
  }, []);
  const getCategoryLists = async () => {
    const res = await getCategoryList();
    console.log(res);
    // eslint-disable-next-line no-var
    CategoryLists(res?.data?.data);
  };
  console.log(CategoryList);

  // eslint-disable-next-line no-var, react-hooks/exhaustive-deps
  // var multipleFiles: File[] = [];
  useEffect(() => {
    const myDropzone = new Dropzone("#kt_dropzonejs_example_1", {
      url: "https://keenthemes.com/scripts/void.php",
      paramName: "file",
      maxFiles: 10,
      maxFilesize: 0.5,
      autoProcessQueue: false, // MB
      addRemoveLinks: true,
      accept: function(file: any) {
        //

        // eslint-disable-next-line react-hooks/exhaustive-deps
        // MultipleFiles = file
        if (file.name === "wow.jpg") {
          console.log("false");
        } else {
          console.log("file", file);
          console.log("true");
          setMultipleFiles((prevFiles) => [...prevFiles, file]);
        }
      },
    });
    // Cleanup Dropzone instance when component unmounts
    return () => {
      myDropzone.destroy();
    };
  }, []);

  console.log("MultipalFiles", multipleFiles);

  const [item, setItem] = useState([{ name: "", price: "" }]);

  const addItems = () => {
    setItem([...item, { name: "", price: "" }]);
  };

  const removeItems = (index: number) => {
    const updatedItem = [...item];
    updatedItem.splice(index, 1);
    setItem(updatedItem);
  };

  const handleChanges = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    const updatedItem = [...item];
    updatedItem[index] = {
      ...updatedItem[index],
      [name]: newValue,
    };

    setItem(updatedItem);
  };

  console.log("item", item);
  const hasInvalidItems = item.some((item) => !item.name || !item.price);
  console.log(hasInvalidItems);

  const [items, setItems] = useState([{ name: "", price: "" }]);

  const addItem = () => {
    setItems([...items, { name: "", price: "" }]);
  };

  const removeItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [name]: newValue,
    };

    setItems(updatedItems);
  };

  // const handleCheckboxChanges = (value: string) => {
  //   setSelectedOption(value);
  // };

  console.log(multipleFiles.length);

  console.log(items.length);
  const addOn = items.some((item) => !item.name || !item.price);
  console.log(addOn);

  const formik = useFormik({
    initialValues: {
      nameEn: "",
      nameAr: "",
      descriptionEn: "",
      descriptionAr: "",
      index: "",
      category_id: "",
      price: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const notifySuccess = () => toast.success("Product added successfully");
      const notifyError = (errorMessage: any) => toast.error(errorMessage);
      setLoading(false);

      try {
        console.log(values);
        console.log(values.price);
        if (multipleFiles.length === 0) {
          return notifyError("Image Is Required");
        }
        // if (!selectedOptionss || selectedOptionss.trim() === "") {
        //   return notifyError("Type Is Required");
        // }
        if (variantAvailable == false) {
          if (!values.price) {
            return notifyError("Price Is Required");
          }
        } else {
          if (hasInvalidItems && hasInvalidItems == true) {
            return notifyError("Variant Is Required");
          }
        }
        const formData = new FormData();
        formData.append("nameEn", values.nameEn);
        formData.append("nameAr", values.nameAr);
        formData.append("descriptionEn", values.descriptionEn);
        formData.append("descriptionAr", values.descriptionAr);
        formData.append("category_id", values.category_id);
        formData.append("price", values.price);
        formData.append("position", values.index);
        formData.append("restaurant_id", restaurant_id);
        formData.append("type", "both");
        formData.append("featured", FeaturedAvailable);
        formData.append(
          "variant",
          hasInvalidItems === false ? JSON.stringify(item) : "[]"
        );
        formData.append(
          "addon",
          addOn === false ? JSON.stringify(items) : "[]"
        );

        multipleFiles.forEach((file) => {
          formData.append(`images`, file);
        });
        console.log("formData", formData);

        const response: any = await AddProductFunction(formData);

        notifySuccess();
        setActiveTab(1);
        setLoading(false);
        console.log(response);
      } catch (error) {
        // Handle errors
        console.error("Error:", error);

        // if (error.response) {
        //   setStatus(error.response.data.message);
        //   notifyError("message from server");
        //   setLoading(false);
        // } else {
        //   setStatus("An unexpected error occurred. Please try again later.");
        //   setLoading(false);
        // }
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  // const filePath = "../../../../../public/ProductDemoFile.xlsx"
  // const fileName = "ProductDemoFile.xlsx"

  return (
    // <Content>
    <form onSubmit={formik.handleSubmit} noValidate id="AddVariantFrom">
      <div className="card mb-5 mb-xl-10">
        <div className="card-body pt-9 pb-0">
          <div className="">
            {/* <div className="row">
              <div className='col'><h5 className="fs-2 text-muted me-auto">Product</h5></div>
              <div className="col-2 page-title d-flex flex-column justify-content-center flex-wrap" style={{marginRight:"165px" , marginTop:"20px"}}>
              <Link to='/notification' className="btn btnRed">Send Notification</Link>
            </div>
            </div> */}
            <div
              id="kt_app_toolbar_container"
              className="app-container container-xxl d-flex flex-stack"
            >
              <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">
                  Product
                </h1>
              </div>
              <div
                className="page-title d-flex flex-column justify-content-center flex-wrap"
                style={{ marginBottom: "10px" }}
              >
                {/* <Link to='../../../../../public/ProductDemoFile.xlsx' download="ProductDemoFile.xlsx" className="btn btnRed ">Download CSV File</Link> */}
                {/* <a href={filePath} download={fileName} className="btn btnRed">
                  Download CSV File
                </a> */}
                <Link
                  to=""
                  className="btn mt-2 btnRed"
                  onClick={() => {
                    setIsModal(true);
                  }}
                >
                  Import CSV
                </Link>
              </div>
            </div>
            <div className="separator mb-10"></div>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                <label className="form-label">Name In English</label>
                <div className="form-floating mb-7">
                  <input
                    type="text"
                    {...formik.getFieldProps("nameEn")}
                    className={clsx(
                      "form-control bg-transparent",
                      {
                        "is-invalid":
                          formik.touched.nameEn && formik.errors.nameEn,
                      },
                      {
                        "is-valid":
                          formik.touched.nameEn && !formik.errors.nameEn,
                      }
                    )}
                    name="nameEn"
                    id="nameEn"
                    placeholder="Name"
                  />
                  <label htmlFor="floatingInput" className="text-muted">
                    Product Name In English
                  </label>
                  {formik.touched.nameEn && formik.errors.nameEn && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        <span role="alert" className="text-danger">
                          {formik.errors.nameEn}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                <label className="form-label">Name In Arabic</label>
                <div className="form-floating mb-7">
                  <input
                    type="text"
                    {...formik.getFieldProps("nameAr")}
                    className={clsx(
                      "form-control bg-transparent",
                      {
                        "is-invalid":
                          formik.touched.nameAr && formik.errors.nameAr,
                      },
                      {
                        "is-valid":
                          formik.touched.nameAr && !formik.errors.nameAr,
                      }
                    )}
                    name="nameAr"
                    id="nameAr"
                    placeholder="Name Ar"
                  />
                  <label htmlFor="floatingInput" className="text-muted">
                    Product Name In Arabic
                  </label>
                  {formik.touched.nameAr && formik.errors.nameAr && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        <span role="alert" className="text-danger">
                          {formik.errors.nameAr}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                <label className="form-label">Description In English</label>
                <div className="form-floating mb-7">
                  <textarea
                    style={{ minHeight: "150px" }}
                    {...formik.getFieldProps("descriptionEn")}
                    className={clsx(
                      "form-control  bg-transparent",
                      {
                        "is-invalid":
                          formik.touched.descriptionEn &&
                          formik.errors.descriptionEn,
                      },
                      {
                        "is-valid":
                          formik.touched.descriptionEn &&
                          !formik.errors.descriptionEn,
                      }
                    )}
                    name="descriptionEn"
                    id="descriptionEn"
                    placeholder="Description"
                  />
                  <label htmlFor="floatingInput" className="text-muted">
                    Description Name In English
                  </label>
                  {formik.touched.descriptionEn && formik.errors.descriptionEn && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        <span role="alert" className="text-danger">
                          {formik.errors.descriptionEn}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                <label className="form-label">Description In Arabic</label>
                <div className="form-floating mb-7">
                  <textarea
                    style={{ minHeight: "150px" }}
                    {...formik.getFieldProps("descriptionAr")}
                    className={clsx(
                      "form-control bg-transparent",
                      {
                        "is-invalid":
                          formik.touched.descriptionAr &&
                          formik.errors.descriptionAr,
                      },
                      {
                        "is-valid":
                          formik.touched.descriptionAr &&
                          !formik.errors.descriptionAr,
                      }
                    )}
                    name="descriptionAr"
                    id="descriptionAr"
                    placeholder="Name Ar"
                  />
                  <label htmlFor="floatingInput" className="text-muted">
                    Description Name In Arabic
                  </label>
                  {formik.touched.descriptionAr && formik.errors.descriptionAr && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        <span role="alert" className="text-danger">
                          {formik.errors.descriptionAr}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                <label className="form-label d-block">Index</label>
                <div className="form-floating mb-7">
                  <input
                    type="number"
                    {...formik.getFieldProps("index")}
                    className={clsx(
                      "form-control custom-number-input bg-transparent",
                      {
                        "is-invalid":
                          formik.touched.index && formik.errors.index,
                      },
                      {
                        "is-valid":
                          formik.touched.index && !formik.errors.index,
                      }
                    )}
                    name="index"
                    id="index"
                    placeholder="Index"
                  />
                  <label htmlFor="floatingInput" className="text-muted">
                    Index
                  </label>
                  {formik.touched.index && formik.errors.index && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        <span role="alert" className="text-danger">
                          {formik.errors.index}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                <label className="form-label">Category</label>
                <div className=" mb-7">
                  <select
                    id="category_id"
                    {...formik.getFieldProps("category_id")}
                    className={clsx("form-select", {
                      "is-invalid":
                        formik.touched.category_id && formik.errors.category_id,
                      "is-valid":
                        formik.touched.category_id &&
                        !formik.errors.category_id,
                    })}
                    aria-label="Select business category"
                    name="category_id"
                  >
                    <option>Open this select menu</option>
                    {CategoryList.map((item: any) => (
                      <option key={item._id} value={item._id}>
                        {item.nameEn}
                      </option>
                    ))}
                  </select>
                  {formik.touched.category_id && formik.errors.category_id && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        <span role="alert" className="text-danger">
                          {formik.errors.category_id}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12 col-xxl-12">
                
              </div>
            </div> */}
            <div className="row mb-5">
              <div className="col-sm-12 col-md-12 col-lg-12 col-xxl-12">
                <div className="fv-row">
                  <div
                    className="dropzone bg-primary-light"
                    id="kt_dropzonejs_example_1"
                  >
                    <div className="dz-message needsclick">
                      <i className="ki-duotone ki-file-up fs-3x text-primary">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                      <div className="ms-4">
                        <h3 className="fs-5 fw-bold text-gray-900 mb-1">
                          Drop files here or click to upload.
                        </h3>
                        <span className="fs-7 fw-semibold text-gray-500">
                          Upload up to 10 files
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-9 col-xxl-9">
                <div className="form-check form-switch form-check-custom form-check-solid me-10">
                  <label htmlFor="flexSwitch30x50" className="pe-4">
                    <b>Variant's Available?</b>
                  </label>
                  <input
                    className="form-check-input h-20px w-30px"
                    type="checkbox"
                    checked={variantAvailable}
                    onChange={handleCheckboxChange}
                    id="flexSwitch30x50"
                  />
                </div>
              </div>

              {/* <div className="col-sm-12 col-md-12 col-lg-1 col-xxl-1">
                <div className="mb-10">
                  <div className="form-check form-check-custom form-check-solid">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selectedOptionss === "pickup"}
                      onChange={() => handleCheckboxChanges("pickup")}
                      id="pickupCheckbox"
                    />
                    <label className="form-check-label">PickUp</label>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 col-md-12 col-lg-1 col-xxl-1">
                <div className="mb-10">
                  <div className="form-check form-check-custom form-check-solid">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selectedOptionss === "delivery"}
                      onChange={() => handleCheckboxChanges("delivery")}
                      id="deliveryCheckbox"
                    />
                    <label className="form-check-label">Delivery</label>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 col-md-12 col-lg-1 col-xxl-1">
                <div className="mb-10">
                  <div className="form-check form-check-custom form-check-solid">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selectedOptionss === "both"}
                      onChange={() => handleCheckboxChanges("both")}
                      id="bothCheckbox"
                    />
                    <label className="form-check-label">Both</label>
                  </div>
                </div>
              </div> */}
            </div>{" "}
            <div
              className="row mb-5"
              style={variantAvailable === false ? { display: "none" } : {}}
            >
              <div className="col-sm-12 col-md-12 col-lg-12 col-xxl-12">
                <div>
                  {item.map((item, index) => (
                    <div key={index} className="form-group mt-4 row">
                      <div className="col-md-5">
                        <label className="form-label">Variant</label>
                        <input
                          type="text"
                          className="form-control mb-2 mb-md-0"
                          placeholder="Enter Variant"
                          name="name"
                          value={item.name}
                          onChange={(e) => handleChanges(index, e)}
                        />
                      </div>
                      <div className="col">
                        <label className="form-label">Price</label>
                        <input
                          type="number"
                          className="form-control mb-2 mb-md-0"
                          placeholder="Enter Variant Price"
                          name="price"
                          value={item.price}
                          onChange={(e) => handleChanges(index, e)}
                        />
                      </div>
                      <div className="col-md-2">
                        <a
                          href="javascript:;"
                          data-repeater-delete
                          onClick={() => removeItems(index)}
                          className="btn btn-sm btn-light-danger mt-3 mt-md-8"
                        >
                          <i className="ki-duotone ki-trash fs-5">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                          </i>
                          Delete
                        </a>
                      </div>
                    </div>
                  ))}
                  <div className="form-group mt-5">
                    <button
                      type="button"
                      className="btn btnRed"
                      onClick={addItems}
                    >
                      Add Variant
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row mb-5 mt-4 "
              style={variantAvailable === true ? { display: "none" } : {}}
            >
              <div className="col-sm-12 col-md-12 col-lg-12 col-xxl-12">
                <label className="form-label d-block">Price</label>
                <div className="form-floating mb-7">
                  <input
                    type="number"
                    {...formik.getFieldProps("price")}
                    className={clsx(
                      "form-control custom-number-input bg-transparent",
                      {
                        "is-invalid":
                          formik.touched.price && formik.errors.price,
                      },
                      {
                        "is-valid":
                          formik.touched.price && !formik.errors.price,
                      }
                    )}
                    name="price"
                    id="price"
                    placeholder="Price"
                  />
                  <label htmlFor="floatingInput" className="text-muted">
                    Price
                  </label>
                  {formik.touched.price && formik.errors.price && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        <span role="alert" className="text-danger">
                          {formik.errors.price}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12 col-xxl-12">
                <div className="form-check form-switch form-check-custom form-check-solid me-10">
                  <label htmlFor="flexSwitch30x50" className="pe-4">
                    <b>Add On With Product (optional)</b>
                  </label>
                </div>
              </div>
            </div>{" "}
            <div className="row mb-5">
              <div className="col-sm-12 col-md-12 col-lg-12 col-xxl-12">
                <div>
                  {items.map((item, index) => (
                    <div key={index} className="form-group mt-4 row">
                      <div className="col-md-5">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control mb-2 mb-md-0"
                          placeholder="Enter Variant"
                          name="name"
                          value={item.name}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </div>
                      <div className="col-md-5">
                        <label className="form-label">Price</label>
                        <input
                          type="number"
                          className="form-control mb-2 mb-md-0"
                          placeholder="Enter Variant Price"
                          name="price"
                          value={item.price}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </div>
                      <div className="col-md-2">
                        <a
                          href="javascript:;"
                          data-repeater-delete
                          onClick={() => removeItem(index)}
                          className="btn btn-sm btn-light-danger mt-3 mt-md-8"
                        >
                          <i className="ki-duotone ki-trash fs-5">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                          </i>
                          Delete
                        </a>
                      </div>
                    </div>
                  ))}
                  <div className="form-group mt-5">
                    <button
                      type="button"
                      className="btn btnRed"
                      onClick={addItem}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-10 pt-4 col-xxl-10">
                <div className="form-check form-switch form-check-custom form-check-solid me-10">
                  <label htmlFor="flexSwitch" className="pe-4">
                    <b>Is Featured On?</b>
                  </label>
                  <input
                    className="form-check-input h-20px w-30px"
                    type="checkbox"
                    checked={FeaturedAvailable}
                    onChange={handleFeaturedChange}
                    id="flexSwitch"
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-2 col-xxl-2 form-floating text-end mb-5">
                <button
                  type="submit"
                  id="kt_sign_in_submit"
                  className="btn btnRed"
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  {!loading && <span className="indicator-label">Submit</span>}
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

      <ModalCsv show={isModal} onHide={() => setIsModal(false)} />
    </form>
  );
}
