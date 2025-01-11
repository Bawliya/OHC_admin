/* eslint-disable @typescript-eslint/no-unused-vars */
// BannerTablePage.tsx
import React, {
    useEffect,
    useState,
} from 'react';

// import {getRestaurantFunction} from "../../../services/Restaurant/Restaurant";
import Swal from 'sweetalert2';

// import RestaurantTableComponent from "../../../components/RestaurantTableComponent";
import AccountHeader from '../../../components/accounts/AccountHeader';
import OrdersTableComponent from '../../../components/OrdersTable';
import PaginationComponent
    from '../../../components/PaginationComponent'; // Adjust the import path as needed
import {
    deleteCategoryFunction,
    EditCategoryFunction,
} from '../../../services/category/Category';
import { getFunction, getOrderListFunction, getUserFunction } from '../../../services/order/order';
//   import { BackgroundBeams } from '../../../UI/background-beams';
import { KTIcon } from '../../../../_metronic/helpers';
import DeliveryBoyTransactionComponent from './DeliveryTransactionsList';

interface types {
    id: any;
}

const DeliveryTransactionsTableComponent: React.FC<types> = ({ id }) => {
    const [tableData, setTableData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalLimit, setLimit] = useState<number>(1);
    const [TotalRecords, setTotalRecords] = useState<number>(1);
    const [isTable, setIsTable] = useState<any>(false);
    const [deliveryBoy, setDeliveryBoy] = useState<any>();
    const [searchValue, setSearchValue] = useState<string>("");


    // eslint-disable-next-line prefer-const
    useEffect(() => {
        getRestaurant(currentPage, 10, searchValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const DeliveryId: any = id.id
    console.log("DeliveryId", DeliveryId);

    const getRestaurant = async (currentPage: any, limit: any, searchValue: any) => {
        const resp: any = await getUserFunction(currentPage, limit, searchValue, DeliveryId); // Pass currentPage to API call
        console.log("resp", resp);

        if (resp?.data.status) {
            setTableData(resp?.data?.data);
            setTotalPages(resp?.data?.data?.totalPage);
            setLimit(resp?.data?.data?.pageLimit);
            setTotalRecords(resp?.data?.data?.totalRecords);
        } else {
            setTableData([]);
        }
    };

    console.log("tableData", tableData);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleUpdate = async (formData: any) => {
        const response = await EditCategoryFunction(formData);
        if (response.data.status) {
            getRestaurant(currentPage, 10, searchValue);
        }
        return response;
    };

    const handleDelete = async (item: any) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                // Perform deletion action here, for now, let's just log
                const res = await deleteCategoryFunction(item._id);
                if (!res.data.status) {
                    return Swal.fire("Error!", "Something went wrong.", "error");
                } else {
                    getRestaurant(currentPage, 10, searchValue);
                    Swal.fire("Deleted!", "Your record has been deleted.", "success");
                }
            }
        });
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value); // Update the search value state
        getRestaurant(currentPage, 10, event.target.value);
    };


    return (
        <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
            {!isTable ? <div className="d-flex flex-column  flex-column-fluid">
                {/* <BackgroundBeams /> */}
                <div id="kt_app_toolbar" className="">
                    <div
                        id="kt_app_toolbar_container"
                        className="app-container container-xxl d-flex flex-stack"
                    >
                    </div>
                </div>
                <div className="" id="kt_app_content">
                    <div
                        className=""
                        id="kt_app_content_container"
                    >
                        <div
                            id="kt_ecommerce_add_product_form"
                            className="form d-flex -column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework"
                        >
                            <DeliveryBoyTransactionComponent
                                data={tableData}
                                handleDelivery={handleUpdate}
                                handleDeliveryShow={handleDelete}
                                setIsTable={setIsTable}
                                deliveryBoyData={setDeliveryBoy}
                            />
                        </div>
                        <div className="card mb-5">
                            <div className="row p-1">
                                <div className="col-sm-12 text-sm-center  pb-sm-2 col-md-12 text-md-center text-xl-start pb-md-2 col-xl-6">
                                    <div className="pt-2 px-2">
                                        Showing page {`${(currentPage - 1) * totalLimit + 1}`} to{" "}
                                        {`${Math.min(
                                            currentPage * totalLimit,
                                            totalPages * totalLimit
                                        )} of ${TotalRecords}`}
                                    </div>
                                </div>
                                <div className="col-md-12 col-xl-6">
                                    <PaginationComponent
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> :
                <AccountHeader setIsTable={setIsTable} DeliveryBoyRecord={deliveryBoy} />}
        </div>
    );
};

export default DeliveryTransactionsTableComponent;
