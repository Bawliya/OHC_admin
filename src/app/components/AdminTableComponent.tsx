import React, { useEffect, useState } from "react";

// import ModalCategoryComponent from "./ModelCategoryComponent";
// import { verifyCategoryFunction } from "../services/category/Category";
// import ModalCouponsComponent from "./ViewCouponsModel";
const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}/images/category/`;

type props = {
  data: any;
//   handleUpdate: any;
//   handleDelete: any;
};

const TableAdminComponent: React.FC<props> = ({
  data,
//   handleUpdate,
//   handleDelete,
}) => {
//   const [isModal, setIsModal] = useState<any>(false);
//   const [isModal2, setIsModal2] = useState<any>(false);
//   const [currentData, setCurrentData] = useState<any>({});
//   const [currentData2, setCurrentData2] = useState<any>({});
//   console.log(handleDelete);

  const [TableData, setTableData] = useState(data?.data);
  useEffect(() => {
    if (data?.data) {
      setTableData(data?.data);
    }
  }, [data]);

  console.log("TableDataaaaaaaaaaaaaa",TableData);

//   const handleClick = async (id: any) => {
//     const newData: any = TableData.map((item: any) => {
//       console.log(item._id, id);

//       if (item._id == id) {
//         item.publish = !item.publish;
//         return item;
//       } else {
//         return item;
//       }
//     });

//     setTableData(newData);

//     const res = await verifyCategoryFunction(id);
//     console.log(res);
//   };

  return (
    <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="kt_ecommerce_add_product_general"
          role="tab-panel"
        >
          <div className="d-flex flex-column gap-7 gap-lg-10">
            <div className="card">
              <table className="table table-hover p-0 m-0 table-rounded table-striped border gy-7 gs-7">
                <thead>
                  <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                    <th>Sr. No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    {/* <th className="w-150px">Expires Date</th>
                    <th className="w-50px">Publish</th>
                    <th className="text-end">Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                {TableData ? (
                      TableData.length > 0 ? (
                        TableData.map((
                          item: any,
                          index: any // Remove "return" here
                        ) => (
                      <tr key={index}>
                        <td>{(data?.currentPage - 1) * 10 + index + 1}</td>
                        <td>{item?.name}</td>
                        <td>{item?.email}</td>
                        <td>{item?.roleName}</td>
                        

                        
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
                        {" "}
                        {/* Change colSpan to 6 */}
                        No data found
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td colSpan={12} className="text-center">
                      {" "}
                      {/* Change colSpan to 6 */}
                      {/* Show loader if Data is null */}
                      <div
                        className="d-flex justify-content-center mb-5 align-items-center"
                        style={{ height: "10px" }}
                      >
                        <div className="loader-wrapper">
                          <span className="loader"></span>
                          <span className="loading-text px-5">
                            Loading...
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <ModalCategoryComponent
        show={isModal}
        onHide={() => setIsModal(false)}
        values={currentData}
        updateFunc={handleUpdate}
      /> */}
      {/* <ModalCouponsComponent
        show={isModal2}
        onHide={() => setIsModal2(false)}
        values={currentData2}
        // updateFunc={handleUpdate}
      /> */}
    </div>
  );
};

export default TableAdminComponent;
