// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getAvaterList } from "../services/Avater/AvaterAPIs";
// import { Spinner } from "react-bootstrap";

// const AvatarViwe = () => {
//   const [restaurants, setResturants] = useState([]);
//   const [loading, setLoading] = useState(true); // Step 1: Add loading state

//   useEffect(() => {
//     getRestaurantList();
//   }, []);

//   const getRestaurantList = async () => {
//     try {
//       const res = await getAvaterList();
//       setResturants(res?.data?.data);
//       console.log(res?.data?.data);
//     } catch (error) {
//       console.error("Error fetching avatars:", error);
//     } finally {
//       setLoading(false); // Step 2: Set loading to false after fetching
//     }
//   };

//   return (
//     <div className="d-flex flex-column flex-row-fluid px-10 mt-10">
//       <div className="tab-content ">
//         <div
//           className="tab-pane fade show active"
//           id="kt_ecommerce_add_product_general"
//           role="tab-panel"
//         >
//           <div className="d-flex mb-4 align-items-center justify-content-end position-relative z-30">
//             <Link to={"/avater/add"}>
//                <button className="py-3 px-5 border-0 custom_btn fw-semibold fs-5 rounded-2">
//                 Add New Avatar
//               </button>
//             </Link>
//           </div>
//           <div className="card w-100 mt-8 p-8">
//             <div className="row w-100">
//               {loading ? ( // Step 3: Show loading indicator
//                 <div
//                   style={{ height: "300px" }}
//                   className="d-flex align-items-center gap-2 justify-content-center align-items-center"
//                 >
//                   <Spinner animation="border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </Spinner>
//                   Loading...
//                 </div>
//               ) : restaurants.length > 0 ? (
//                 restaurants.map((item: any, i: any) => (
//                   <div key={i} className="col-2 mt-4">
//                     <img
//                       height={150}
//                       className="w-100 object-fit-cover"
//                       src={`https://pnapi.testenvapp.com/public/image/${item?.avtar}`}
//                       alt={`Avatar ${i + 1}`}
//                     />
//                   </div>
//                 ))
//               ) : (
//                 <div className="col-12 text-center mt-4">
//                   <p>No data found</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AvatarViwe;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAvaterList } from "../services/Avater/AvaterAPIs";
import { Spinner } from "react-bootstrap";
import PaginationComponent from "./PaginationComponent";

const AvatarView = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit] = useState<number>(20); // Set limit of items per page

  useEffect(() => {
    getRestaurantList();
  }, [currentPage]); // Refetch data when currentPage changes

  const getRestaurantList = async () => {
    setLoading(true); // Set loading true before fetching data
    try {
      const res = await getAvaterList(currentPage, limit); // Pass currentPage and limit to the API
      setRestaurants(res?.data?.data); // Update restaurants with fetched data
      setTotalPages(res?.data?.pagination?.totalPages); // Assuming the response contains totalPages
      console.log(res);
    } catch (error) {
      console.error("Error fetching avatars:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber); // Update current page when pagination is changed
  };

  return (
    <div className="d-flex flex-column flex-row-fluid px-10 mt-10">
      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="kt_ecommerce_add_product_general"
          role="tab-panel"
        >
          <div className="d-flex mb-4 align-items-center justify-content-end position-relative z-30">
            <Link to={"/avater/add"}>
              <button className="py-3 px-5 border-0 custom_btn fw-semibold fs-5 rounded-2">
                Add New Avatar
              </button>
            </Link>
          </div>
          <div style={{ minHeight: "500px" }} className="card w-100 mt-8 p-8">
            <div className="row w-100">
              {loading ? (
                <div
                  style={{ height: "500px" }}
                  className="d-flex align-items-center gap-2 justify-content-center align-items-center"
                >
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  Loading...
                </div>
              ) : restaurants.length > 0 ? (
                restaurants.map((item: any, i: number) => (
                  <div key={i} className="col-2 mt-4">
                    <img
                      height={160}
                      className="w-100 object-fit-cover"
                      src={`https://pnapi.testenvapp.com/public/image/${item?.avtar}`}
                      alt={`Avatar ${i + 1}`}
                    />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center mt-4">
                  <p>No data found</p>
                </div>
              )}
            </div>
            {/* Add Pagination Component Here */}
          </div>
          <div className="d-flex justify-content-end mt-4">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarView;
