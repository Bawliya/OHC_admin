import "../../../../../public/plugins.bundle.css";
import "../../../../_metronic/assets/sass/_dropzone.scss?inline";
import "./Overview.css";

import { useEffect, useRef, useState } from "react";

// import { Content } from '../../../../_metronic/layout/components/content'
// import clsx from "clsx";
import Dropzone from "dropzone";
// import { useFormik } from "formik";
import Modal from "react-bootstrap/Modal";
// import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";

// import * as Yup from "yup";
import { getCategoryList } from "../../../services/category/Category";
// import { Link } from "react-router-dom";
import {
  EditProductFunction,
  OneProductFunction,
} from "../../../services/Product/Product";

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}/images/product/`;

// import { AddProductFunction } from "../../../services/Restaurant/Restaurant";

// import $ from 'jquery';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface JQuery<TElement = HTMLElement> {
  repeater: any; // Adjust 'any' to the appropriate type if possible
}

// interface CampaignsProps {
//   data: any;
// }

interface ModalComponentProps {
  show: boolean;
  onHide: () => void;
  values: any;
  setData: any;
  datas: any;
  //   updateFunc: any;
}

const EditProductComponent: React.FC<ModalComponentProps> = (props) => {
  const [currentData, setCurrentData] = useState<any>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [variantAvailable, setVariantAvailable] = useState(false);
  const [multipleFiles, setMultipleFiles] = useState<File[]>([]);
  const [CategoryList, CategoryLists] = useState([]);
  // const [selectedOptionss, setSelectedOption] = useState<string>("");
  const [FeaturedAvailable, setFeatured] = useState<any>(false);
  const dropzoneRef = useRef(null);

  const notifySuccess = () => toast.success("Product Updated Successfully");
  const notifyError = (errorMessage: any) => toast.error(errorMessage);

  const data = { _id: "" };
  const _id = props?.values._id;
  useEffect(() => {
    abc();
  }, [_id]);

  const abc = async () => {
    const res = await OneProductFunction(_id);
    // console.log("ressssssss", res);
    setCurrentData(res?.data?.data);
    setItems(res?.data?.data?.addon);
    setItem(res?.data?.data?.variant);
    setVariantAvailable(res?.data?.data?.price === null);
    setFeatured(res?.data?.data?.featured);
    setImages(res?.data?.data?.images);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const restaurant_id = data._id;
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVariantAvailable(event.target.checked);
  };
  const handleFeaturedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeatured(event.target.checked);
  };

  useEffect(() => {
    getCategoryLists();
  }, []);
  const getCategoryLists = async () => {
    const res = await getCategoryList();
    // eslint-disable-next-line no-var
    CategoryLists(res?.data?.data);
  };

  // eslint-disable-next-line no-var, react-hooks/exhaustive-deps
  useEffect(() => {
    if (dropzoneRef.current) {
      // dropzoneRef.current.style.setProperty('width', '678px', 'important');
      const myDropzone = new Dropzone(dropzoneRef.current, {
        url: "https://keenthemes.com/scripts/void.php",
        paramName: "file",
        maxFiles: 10,
        maxFilesize: 0.5,
        autoProcessQueue: false, // MB
        addRemoveLinks: true,
        accept: function(file: any) {
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
    }
  }, [dropzoneRef.current]);

  const handleChange = (e: any) => {
    setCurrentData({ ...currentData, [e.target.name]: e.target.value });
    console.log(data);
  };

  //   console.log("MultipalFiles", multipleFiles);

  const [item, setItem] = useState([{ name: "", price: "", _id: null }]);

  const addItems = () => {
    setItem([...item, { name: "", price: "", _id: null }]);
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

  const [items, setItems] = useState([{ name: "", price: "", _id: null }]);

  const addItem = () => {
    setItems([...items, { name: "", price: "", _id: null }]);
  };

  const removeItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleChange2 = (index: number, e: any) => {
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

  console.log(multipleFiles?.length);
  const handleClose = () => {
    props.onHide();
    setLoading(false);
  };

  //   console.log(items.length);
  const addOn = items.some((item) => !item.name || !item.price);
  console.log(addOn);
  console.log(hasInvalidItems);

  const [images, setImages] = useState<string[]>(currentData?.images || []);
  const [imagesDelete, setDeleteImages] = useState<string[]>([]);

  console.log(currentData?.images);
  console.log(images);

  const handleDelete = async (indexToDelete: any) => {
    const updatedImages = images.filter((_, index) => index !== indexToDelete);
    const deletedImage = images[indexToDelete]; // Get the deleted image
    setImages(updatedImages);
    setDeleteImages((prevState) => [...prevState, deletedImage]);
  };
  console.log("imagesDelete", imagesDelete.length);
  const DeleteImageCount = imagesDelete.length;

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const requiredFields = [
      { value: currentData.nameEn, name: "nameEn" },
      { value: currentData._id, name: "id" },
      { value: currentData.nameAr, name: "nameAr" },
      { value: currentData.descriptionEn, name: "descriptionEn" },
      { value: currentData.descriptionAr, name: "descriptionAr" },
      { value: currentData.category_id, name: "category_id" },
      { value: currentData.position, name: "position" },
      { value: currentData.restaurant_id, name: "restaurant_id" },
      { value: FeaturedAvailable, name: "featured" },
    ];

    const missingFields = requiredFields.filter(
      (field) =>
        field.value === null || field.value === undefined || field.value === ""
    );

    if (missingFields.length > 0) {
      notifyError(
        "Please fill in all required fields: " +
          missingFields.map((field) => field.name).join(", ")
      );
      setLoading(false);
      // alert("Please fill in all required fields: " + missingFields.map(field => field.name).join(", "));
      return;
    }

    // Check if either price or variant is provided
    const isPriceProvided =
      currentData.price !== null && currentData.price !== "";
    const isVariantProvided = hasInvalidItems === false && item.length > 0;

    if (!isPriceProvided && !isVariantProvided) {
      notifyError("Please provide either a price or a variant.");
      setLoading(false);
      // alert("Please provide either a price or a variant.");
      return;
    }

    // console.log("k={handleUpdate}",currentData,multipleFiles,addOn,hasInvalidItems, variantAvailable,FeaturedAvailable);
    const formData = new FormData();
    formData.append("nameEn", currentData.nameEn);
    formData.append("id", currentData._id);
    formData.append("nameAr", currentData.nameAr);
    formData.append("descriptionEn", currentData.descriptionEn);
    formData.append("descriptionAr", currentData.descriptionAr);
    formData.append("category_id", currentData.category_id);
    formData.append(
      "price",
      currentData.price == null ? "" : currentData.price
    );
    formData.append("position", currentData.position);
    formData.append("restaurant_id", currentData.restaurant_id);
    formData.append("featured", FeaturedAvailable);
    formData.append("deleteItem", "[]");
    formData.append(
      "imageDelete",
      DeleteImageCount == 0 ? "[]" : JSON.stringify(imagesDelete)
    );
    formData.append(
      "variant",
      hasInvalidItems === false ? JSON.stringify(item) : "[]"
    );
    formData.append("addon", addOn === false ? JSON.stringify(items) : "[]");
    multipleFiles.forEach((file) => {
      formData.append(`images`, file);
    });
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    const response: any = await EditProductFunction(formData);
    console.log(response);
    if (response.status === 200) {
      const indexToUpdate = props.datas?.findIndex(
        (item: any) => item._id === currentData?._id
      );

      if (indexToUpdate === -1 || indexToUpdate === undefined) {
        console.error("Item not found or invalid index");
        return;
      }
      const newData = Array.isArray(props.datas) ? [...props.datas] : [];
      newData[indexToUpdate] = { ...response?.data?.data };

      console.log("Updated data array:", newData);

      props.setData(newData);
      notifySuccess();
      setTimeout(() => {
        handleClose();
        // setLoading(false);
      }, 2000);
      // setLoading(false);
    } else {
      notifyError("Product Not Updated Successfully");
      setLoading(false);
    }

    // setLoading(false);
  };

  return (
    <div>
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
                <form
                  //   onSubmit={formik.handleSubmit}
                  noValidate
                  id="AddVariantFrom"
                >
                  <div className="card mb-5 mb-xl-10">
                    <div className="card-body pt-9 pb-0">
                      <div className="">
                        <div className="row">
                          <h5 className="fs-2 text-muted me-auto">Product</h5>
                        </div>
                        <div className="separator mb-10"></div>
                        <div className="row">
                          <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                            <label className="form-label">
                              Name In English
                            </label>
                            <div className="form-floating mb-7">
                              <input
                                type="text"
                                // {...formik.getFieldProps("nameEn")}
                                className="form-control bg-transparent"
                                name="nameEn"
                                id="nameEn"
                                placeholder="Name"
                                value={currentData?.nameEn}
                                onChange={handleChange}
                              />
                              <label
                                htmlFor="floatingInput"
                                className="text-muted"
                              >
                                Product Name In English
                              </label>
                            </div>
                          </div>

                          <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                            <label className="form-label">Name In Arabic</label>
                            <div className="form-floating mb-7">
                              <input
                                type="text"
                                className="form-control bg-transparent"
                                name="nameAr"
                                id="nameAr"
                                placeholder="Name Ar"
                                value={currentData?.nameAr}
                                onChange={handleChange}
                              />
                              <label
                                htmlFor="floatingInput"
                                className="text-muted"
                              >
                                Product Name In Arabic
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                            <label className="form-label">
                              Description In English
                            </label>
                            <div className="form-floating mb-7">
                              <textarea
                                style={{ minHeight: "150px" }}
                                className="form-control  bg-transparent"
                                name="descriptionEn"
                                id="descriptionEn"
                                placeholder="Description"
                                value={currentData?.descriptionEn}
                                onChange={handleChange}
                              />
                              <label
                                htmlFor="floatingInput"
                                className="text-muted"
                              >
                                Description Name In English
                              </label>
                            </div>
                          </div>

                          <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                            <label className="form-label">
                              Description In Arabic
                            </label>
                            <div className="form-floating mb-7">
                              <textarea
                                style={{ minHeight: "150px" }}
                                className="form-control bg-transparent"
                                name="descriptionAr"
                                id="descriptionAr"
                                placeholder="Name Ar"
                                value={currentData?.descriptionAr}
                                onChange={handleChange}
                              />
                              <label
                                htmlFor="floatingInput"
                                className="text-muted"
                              >
                                Description Name In Arabic
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                            <label className="form-label d-block">Index</label>
                            <div className="form-floating mb-7">
                              <input
                                type="number"
                                // {...formik.getFieldProps("index")}
                                className="form-control custom-number-input bg-transparent"
                                name="index"
                                id="index"
                                placeholder="Index"
                                value={currentData?.position}
                                onChange={handleChange}
                              />
                              <label
                                htmlFor="floatingInput"
                                className="text-muted"
                              >
                                Index
                              </label>
                            </div>
                          </div>

                          <div className="col-sm-12 col-md-12 col-lg-6 col-xxl-6">
                            <label className="form-label">Category</label>
                            <div className=" mb-7">
                              <select
                                id="category_id"
                                // {...formik.getFieldProps("category_id")}
                                className="form-control"
                                aria-label="Select business category"
                                name="category_id"
                                value={currentData?.category_id}
                                onChange={handleChange}
                              >
                                <option>Open this select menu</option>
                                {CategoryList.map((item: any) => (
                                  <option key={item._id} value={item._id}>
                                    {item.nameEn}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div
                          className="row w-100 mb-5"
                          style={{ width: "678px" }}
                        >
                          <div className="col-sm-12 col-md-12 col-lg-12 col-xxl-12">
                            <div className="fv-row">
                              <div
                                className=" dropzone dropzoness bg-primary-light w-100"
                                id="kt_dropzonejs_example_1"
                                ref={dropzoneRef}
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
                          <div className="col-lg-12">
                            {images.length > 0 ? (
                              <div className="row">
                                {images.map((image: any, index: any) => (
                                  <div className="col-lg-3 mb-5" key={index}>
                                    <div className="image-container position-relative">
                                      <img
                                        src={`${BASE_URL}/${image}`}
                                        alt={`Image ${index + 1}`}
                                        className="image-thumbnail"
                                        style={{ height: "125px" }}
                                      />
                                      <button
                                        className="btn btn-danger position-absolute top-0 end-0"
                                        style={{
                                          background: "transparent",
                                          border: "none",
                                          fontSize: "1.5rem",
                                          color: "red",
                                          cursor: "pointer",
                                        }}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleDelete(index);
                                        }}
                                      >
                                        X{/* <FaTimes /> */}
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="fw-bold fs-6 mb-5">
                                No images available
                              </span>
                            )}
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
                                value={currentData?.publish}
                                id="flexSwitch30x50"
                              />
                            </div>
                          </div>
                        </div>{" "}
                        <div
                          className="row mb-5"
                          style={
                            variantAvailable === false
                              ? { display: "none" }
                              : {}
                          }
                        >
                          <div className="col-sm-12 col-md-12 col-lg-12 col-xxl-12">
                            <div>
                              {item.map((item, index) => (
                                <div
                                  key={index}
                                  className="form-group mt-4 row"
                                >
                                  <div className="col-md-5">
                                    <label className="form-label">
                                      Variant
                                    </label>
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
                          style={
                            variantAvailable === true ? { display: "none" } : {}
                          }
                        >
                          <div className="col-sm-12 col-md-12 col-lg-12 col-xxl-12">
                            <label className="form-label d-block">Price</label>
                            <div className="form-floating mb-7">
                              <input
                                type="number"
                                // {...formik.getFieldProps("price")}
                                className="form-control custom-number-input bg-transparent"
                                name="price"
                                id="price"
                                placeholder="Price"
                                value={currentData?.price}
                                onChange={handleChange}
                              />
                              <label
                                htmlFor="floatingInput"
                                className="text-muted"
                              >
                                Price
                              </label>
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
                                <div
                                  key={index}
                                  className="form-group mt-4 row"
                                >
                                  <div className="col-md-5">
                                    <label className="form-label">Name</label>
                                    <input
                                      type="text"
                                      className="form-control mb-2 mb-md-0"
                                      placeholder="Enter Variant"
                                      name="name"
                                      value={item.name}
                                      onChange={(e) => handleChange2(index, e)}
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
                                      onChange={(e) => handleChange2(index, e)}
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
                              onClick={handleUpdate}
                              //   disabled={formik.isSubmitting || !formik.isValid}
                            >
                              {!loading && (
                                <span className="indicator-label">Submit</span>
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
                            <ToastContainer />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
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
    </div>
  );
};

export default EditProductComponent;
