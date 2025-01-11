// import {ProfileDetails} from './cards/ProfileDetails'
// import {SignInMethod} from './cards/SignInMethod'
// import {ConnectedAccounts} from './cards/ConnectedAccounts'
// import {EmailPreferences} from './cards/EmailPreferences'
// import {Notifications} from './cards/Notifications'
// import {DeactivateAccount} from './cards/DeactivateAccount'
import { useState } from "react";
import { Content } from "../../../../../_metronic/layout/components/content";
import ModalImageComponent from "./ModelImage";
// import { string } from 'yup';

interface CampaignsProps {
  data: any;
  date: any;
  setDate: any;
}

export function Settings({ data, date, setDate }: CampaignsProps) {
  const [isModal, setIsModal] = useState<any>(false);
  // const [modalOpen, setModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const getImage = (licence: any) => {
    setImageSrc(`https://daeemapi.testenvapp.com/images/${licence}`);
    setIsModal(true);
  };

  return (
    <Content>
      <div className="card mb-5 mb-xl-10">
        <div
          className="card-header border-0 cursor-pointer"
          role="button"
          data-bs-toggle="collapse"
          data-bs-target="#kt_account_profile_details"
          aria-expanded="true"
          aria-controls="kt_account_profile_details"
        >
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">Documents</h3>
          </div>
        </div>
        <div className="card-body border-top p-9">
          <div className="row mb-6">
            <div className="col-lg-12">
              {/* <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-6  text-center">
                      <div className="image-container">
                        <img
                          src={`https://daeemapi.testenvapp.com/images/${data.driving_licence}`}
                          alt=""
                          className="img-fluid rounded shadow"
                        />
                        <div className="image-title">Driving Licence</div>
                      </div>
                    </div>
                    <div className="col-6 text-center">
                      <div className="image-container">
                        <img
                          src={`https://daeemapi.testenvapp.com/images/${data.driver_photo}`}
                          alt=""
                          className="img-fluid rounded shadow"
                        />
                        <div className="image-title">Driver Photo</div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-5 mt-5">
                    <div className="col-6 mb-5 text-center">
                      <div className="image-container">
                        <img
                          src={`https://daeemapi.testenvapp.com/images/${data.nation_id}`}
                          alt=""
                          className="img-fluid rounded shadow"
                        />
                        <div className="image-title">Nation ID</div>
                      </div>
                    </div>
                    <div className="col-6 text-center">
                      <div className="image-container">
                        <img
                          src={`https://daeemapi.testenvapp.com/images/${data.vehicle_rc}`}
                          alt=""
                          className="img-fluid rounded shadow"
                        />
                        <div className="image-title">Vehicle RC</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="row">
                <div className="col-md-12">
                  {/* Row for Driving Licence and Driver Photo */}
                  {data.driving_licence &&
                  data.driver_photo &&
                  data.nation_id &&
                  data.vehicle_rc ? (
                    <div className="row">
                      <div className="col-6 col-lg-3 mt-5  text-center">
                        <div className="image-containe h-200px w-200px">
                          <img
                            src={`https://daeemapi.testenvapp.com/images/${data.driving_licence}`}
                            alt="Driving Licence"
                            className="img-fluid rounded shadow"
                            style={{ cursor: "pointer" }}
                            onClick={() => getImage(data.driving_licence)}
                          />
                          <div className="overlay">
                            <button
                              onClick={() => getImage(data.driving_licence)}
                              className="btn btnRed overlay-text"
                            >
                              View
                            </button>
                          </div>
                          <div className="image-title-container">
                            <div className="image-title">Driving Licence</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 col-lg-3 mt-5 text-center">
                        <div className="image-containe h-200px w-200px">
                          <img
                            src={`https://daeemapi.testenvapp.com/images/${data.driver_photo}`}
                            alt="Driver Photo"
                            className="img-fluid rounded shadow"
                            style={{ cursor: "pointer" }}
                            onClick={() => getImage(data.driver_photo)}
                          />
                          <div className="overlay">
                            <button
                              onClick={() => getImage(data.driver_photo)}
                              className="btn btnRed overlay-text"
                            >
                              View
                            </button>
                          </div>
                          <div className="image-title-container">
                            <div className="image-title">Driver Photo</div>
                          </div>
                        </div>
                      </div>
                      {/* </div>
                  ) : (
                    <div className="text-center mt-3">Image not found</div>
                  )} */}

                      {/* Row for Nation ID and Vehicle RC */}
                      {/* {data.nation_id && data.vehicle_rc ? (
                    <div className="row mb-5 mt-5"> */}
                      <div className="col-6 col-lg-3 mt-5 text-center">
                        <div className="image-containe h-200px w-200px">
                          <img
                            src={`https://daeemapi.testenvapp.com/images/${data.nation_id}`}
                            alt="Nation ID"
                            className="img-fluid rounded shadow"
                            style={{ cursor: "pointer" }}
                            onClick={() => getImage(data.nation_id)}
                          />
                          <div className="overlay">
                            <button
                              onClick={() => getImage(data.nation_id)}
                              className="btn btnRed overlay-text"
                            >
                              View
                            </button>
                          </div>
                          <div className="image-title-container">
                            <div className="image-title">Nation ID</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 col-lg-3 mt-5 text-center">
                        <div className="image-containe h-200px w-200px">
                          <img
                            src={`https://daeemapi.testenvapp.com/images/${data.vehicle_rc}`}
                            alt="Vehicle RC"
                            className="img-fluid rounded shadow"
                            style={{ cursor: "pointer" }}
                            onClick={() => getImage(data.vehicle_rc)}
                          />
                          <div className="overlay">
                            <button
                              onClick={() => getImage(data.vehicle_rc)}
                              className="btn btnRed overlay-text"
                            >
                              View
                            </button>
                          </div>
                          <div className="image-title-container">
                            <div className="image-title">Vehicle RC</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center mt-3">
                      <b>Documents Not Found</b>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalImageComponent
          show={isModal}
          onHide={() => setIsModal(false)}
          values={imageSrc}
        />
      </div>

      <div className="card mb-5 mb-xl-10">
        <div
          className="card-header border-0 cursor-pointer"
          role="button"
          data-bs-toggle="collapse"
          data-bs-target="#kt_account_profile_details"
          aria-expanded="true"
          aria-controls="kt_account_profile_details"
        >
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">Date</h3>
          </div>
        </div>
        <div className="card-body border-top p-9">
          <div className="row mb-6">
            <label className="col-lg-4 col-form-label fw-bold fs-6">
              Enter Driving Licence Expiry Date :
            </label>
            <div className="col-lg-6">
              <input
                type="date"
                className="form-control form-control-lg form-control-solid"
                placeholder="Enter Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="col-lg-2">
              <button className="btn btnRed">Submit</button>
            </div>
          </div>
        </div>
        <ModalImageComponent
          show={isModal}
          onHide={() => setIsModal(false)}
          values={imageSrc}
        />
      </div>
    </Content>
  );
}
