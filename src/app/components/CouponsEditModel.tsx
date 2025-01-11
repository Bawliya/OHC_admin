import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import ProductThumbnail from "./ImageComponent";
import Flatpickr from 'react-flatpickr';
import { getRestaurantListFunction } from "../services/Restaurant/Restaurant";
const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}/images/category/`;

interface ModalComponentProps {
    show: boolean;
    onHide: () => void;
    values: any;
    updateFunc: any;
}

const ModalCouponEditComponent: React.FC<ModalComponentProps> = (props) => {
    // const [file, setFile] = useState<any>("");
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [data, setData] = useState<any>({
        code: props?.values?.code,
        discountType: props?.values?.discountType,
        discount: props?.values?.discount,
        expiresAt: props?.values?.expiresAt,
        restaurant_id: props?.values?.restaurant_id,
        description: props?.values?.description,
        CouponId: props.values._id,
    });
    const handleChange = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const [dateState, setDateState] = useState<any>({
        date: new Date()
    });

    const [restaurants, setResturants] = useState([]);

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day

    const specificDisabledDates = ["2023-09-18", "2023-09-19", "2023-09-20"];

    useEffect(() => {
        getRestaurantList();
    }, []);
    const getRestaurantList = async () => {
        const res = await getRestaurantListFunction();
        setResturants(res?.data?.data);
    };


    const handleUpdate = async () => {
        setLoading(true);
        const obj = {
            code: data.code,
            discountType: data.discountType,
            discount: data.discount,
            expiresAt: data.expiresAt,
            restaurant_id: data.restaurant_id,
            description: data.description,
            CouponId: data.CouponId,
        }

        console.log("obj",data);
        
        
        const response = await props.updateFunc(obj);
        setShowAlert(true);
        if (response.data.status) {
            setTimeout(() => {
                handleClose();
            }, 2000);
        }
    };

    useEffect(() => {
        // console.log(file);
        if (props.values) {
            setData({
                code: props?.values?.code,
                discountType: props?.values?.discountType,
                discount: props?.values?.discount,
                expiresAt: props?.values?.expiresAt,
                restaurant_id: props.values.businessId,
                description: props.values.description,
                CouponId: props.values._id,
            });
        }
    }, [props.values]);
    const handleClose = () => {
        props.onHide();
        setLoading(false);
        setShowAlert(false);
        setData({ nameEn: "", nameAr: "", index: "", categoryImage: "" });
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
                    Update Coupons
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

                            <form
                                className="form w-100"
                                //   onSubmit={formik.handleSubmit}
                                noValidate
                                id="AddCategoryFrom"
                            >
                                <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
                                    <div className="tab-content">
                                        <div
                                            className="tab-pane fade show active"
                                            id="kt_ecommerce_add_product_general"
                                            role="tab-panel"
                                        >
                                            <div className="d-flex flex-column gap-7 gap-lg-10">
                                                <div className=" card-flush py-2">
                                                    <div className="card-header">
                                                        {/* <div className="card-title">
                              <h2>Category Details</h2>
                            </div> */}
                                                    </div>
                                                    <div className="card-body">
                                                        <label className="form-label">
                                                            Code
                                                        </label>
                                                        <div className="form-floating mb-7">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="code"
                                                                id="code"
                                                                placeholder="Name"
                                                                value={data.code}
                                                                onChange={handleChange}
                                                            />
                                                            <label
                                                                htmlFor="floatingInput"
                                                                className="text-muted"
                                                            >
                                                                Code
                                                            </label>
                                                        </div>

                                                        <div className="text-muted fs-7 mb-7"></div>
                                                        <label className="form-label">
                                                            Discount Type
                                                        </label>
                                                        <div className="form-floating mb-7">
                                                            <select
                                                                id="discountType"
                                                                // className="form-control custom-number-input bg-transparent",
                                                                className="form-control pt-2 bg-transparent"
                                                                // style={{ padding: "14px" }}
                                                                aria-label="Select"
                                                                name="discountType"
                                                                value={data.discountType}
                                                                onChange={handleChange}
                                                            >
                                                                <option>Open this select menu</option>
                                                                <option key="Percent" value="Percent">
                                                                    Percent
                                                                </option>
                                                                <option key="Fixed" value="Fixed">
                                                                    Fixed
                                                                </option>

                                                            </select>
                                                        </div>

                                                        <div className="text-muted fs-7 mb-7"></div>
                                                        <label className="form-label d-block">Discount</label>
                                                        <div className="form-floating mb-7">
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                name="discount"
                                                                id="discount"
                                                                placeholder="Discount"
                                                                value={data.discount}
                                                                onChange={handleChange}
                                                            />
                                                            <label
                                                                htmlFor="floatingInput"
                                                                className="text-muted"
                                                            >
                                                                Discount
                                                            </label>

                                                        </div>

                                                        <div className="text-muted fs-7 mb-7"></div>
                                                        <label className="form-label d-block">Expires Date</label>
                                                        <div className="form-floating mb-7">
                                                            <Flatpickr
                                                                value={dateState.date}
                                                                onChange={([date]) => {
                                                                    setDateState({ date });
                                                                }}
                                                                options={{
                                                                    disable: specificDisabledDates,
                                                                    minDate: today, // Ensure only today and future dates are selectable
                                                                    enableTime: true,
                                                                    dateFormat: "d-m-Y H:i",
                                                                }}
                                                                className="form-control"
                                                                name="expiresAt"
                                                                id="expiresAt"
                                                                style={{ padding: "14px" }}
                                                                placeholder="Expires At"
                                                            />

                                                        </div>

                                                        <div className="text-muted fs-7 mb-7"></div>
                                                        <label className="form-label d-block">Restaurant</label>
                                                        <div className="mb-7">
                                                            <select
                                                                id="restaurant_id"
                                                                //   {...formik.getFieldProps("restaurantId")}
                                                                className="form-select bg-transparent"
                                                                aria-label="Select business category"
                                                                name="restaurant_id"
                                                                value={data.restaurant_id}
                                                            >
                                                                <option>Open this select menu</option>
                                                                {/* <option key="All" value="All">All</option> */}
                                                                {restaurants?.map((item: any) => (
                                                                    <option key={item._id} value={item._id}>
                                                                        {item.nameEn}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>


                                                        <div className="text-muted fs-7 mb-7"></div>
                                                        <label className="form-label d-block">Description</label>
                                                        <div className="form-floating mb-7">
                                                            <textarea
                                                                // type="number"
                                                                style={{ minHeight: "150px" }}
                                                                className="form-control"
                                                                name="description"
                                                                id="description"
                                                                placeholder="Description"
                                                                value={data.description}
                                                                onChange={handleChange}
                                                            />
                                                            <label
                                                                htmlFor="floatingInput"
                                                                className="text-muted"
                                                            >
                                                                Description
                                                            </label>

                                                        </div>

                                                        <div className="text-muted fs-7 mb-7"></div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {showAlert && (
                            <div className="alert alert-dismissible text-success bg-light-success   alert-success d-flex align-items-center p-5">
                                {/* Icon */}
                                <i className="ki-duotone ki-shield-tick fs-2hx text-success me-4">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                </i>
                                <div className="d-flex text-success flex-column">
                                    <h4 className="mb-1 text-success">Success!</h4>
                                    <span className="text-success">
                                        Category has been updated successfully.
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </>
            <Modal.Footer>
                {/*  <Button onClick={handleUpdate}>Update</Button> */}
                 <button
                    type="submit"
                    id="kt_sign_in_submit"
                    className="btn btnRed"
                    onClick={handleUpdate}
                //   disabled={}
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
        </Modal >
    );
};

export default ModalCouponEditComponent;
