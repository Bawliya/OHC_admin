// import { Link } from 'react-router-dom';
// import { KTIcon } from '../../../../_metronic/helpers';
// import {
//   ChartsWidget1,
//   ListsWidget5,
//   TablesWid,get1,
//   TablesWidget5
// } from '../../../../_metronic/partials/widgets'
import { Content } from '../../../../_metronic/layout/components/content';

interface CampaignsProps {
  data: any;
}


export function Overview({ data }: CampaignsProps) {

  const formatDate = (dateString:any) => {
    const options:any = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    };

    return new Date(dateString).toLocaleString('en-US', options).replace(',', '');
  };

  return (
    <Content>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Customers Details</h3>
          </div>

          {/* <Link to='/crafted/account/settings' className='btn btn-primary align-self-center'>
            Edit Profile
          </Link> */}
        </div>

        <div className='card-body p-9'>
  <div className='row mb-7'>
    <div className='col-lg-6'>
      <div className='row mb-7'>
        <label className='col-lg-6 fw-bold text-muted'>First Name</label>
        <div className='col-lg-6'>
          <span className='fw-bolder fs-6 text-gray-900'>{data.first_name || "-"}</span>
        </div>
      </div>
      <div className='row mb-7'>
        <label className='col-lg-6 fw-bold text-muted'>Last Name</label>
        <div className='col-lg-6'>
          <span className='fw-bolder fs-6 text-gray-900'>{data.last_name || "-"}</span>
        </div>
      </div>

      <div className='row mb-7'>
        <label className='col-lg-6 fw-bold text-muted'>Email</label>
        <div className='col-lg-6 fv-row'>
          <span className='fw-bold fs-6'>{data.email || "-"}</span>
        </div>
      </div>

      <div className='row mb-7'>
        <label className='col-lg-6 fw-bold text-muted'>Phone</label>
        <div className='col-lg-6 d-flex align-items-center'>
          <span className='fw-bolder fs-6 me-2'>{data.phone}</span>
        </div>
      </div>

      <div className='row mb-7'>
        <label className='col-lg-6 fw-bold text-muted'>Country Code</label>
        <div className='col-lg-6'>
          <a href='javascript:void(0)' className='fw-bold fs-6 text-gray-900 text-hover-primary'>+{data.country_code}</a>
        </div>
      </div>

      <div className='row mb-7'>
        <label className='col-lg-6 fw-bold text-muted'>Verify</label>
        <div className='col-lg-6'>
          <span className='fw-bolder fs-6 text-gray-900'>{data.verify.toString()}</span>
        </div>
      </div>

      <div className='row mb-7'>
        <label className='col-lg-6 fw-bold text-muted'>Joining Date</label>
        <div className='col-lg-6'>
          <span className='fw-bolder fs-6 text-gray-900'>{formatDate(data.createdAt) }</span>
        </div>
      </div>

      {/* <div className='row mb-7'>
        <label className='col-lg-6 fw-bold text-muted'>Id Number</label>
        <div className='col-lg-6'>
          <span className='fw-bolder fs-6 text-gray-900'>{data.id_no}</span>
        </div>
      </div>

      <div className='row mb-7'>
        <label className='col-lg-6 fw-bold text-muted'>Vehicle Type</label>
        <div className='col-lg-6'>
          <span className='fw-bold fs-6'>{data.vehicle_type}</span>
        </div>
      </div> */}
    </div>

    {/* <div className='col-lg-6'>
      <div className='row mb-7'>
        <label className='col-lg-6 fw-bold text-muted'>Make</label>
        <div className='col-lg-6'>
          <span className='fw-bold fs-6'>{data.make}</span>
        </div>
      </div>

      <div className='row mb-7'>
        <label className='col-lg-6 fw-bold text-muted'>Model</label>
        <div className='col-lg-6'>
          <span className='fw-bold fs-6'>{data.model}</span>
        </div>
      </div>

      <div className='row mb-7'>
        <label className='col-lg-6 fw-bold text-muted'>Color</label>
        <div className='col-lg-6'>
          <span className='fw-bold fs-6'>{data.color}</span>
        </div>
      </div>

      <div className='row mb-7'>
        <label className='col-lg-6 fw-bold text-muted'>Car Type Id</label>
        <div className='col-lg-6'>
          <span className='fw-bold fs-6'>{data.car_type_id}</span>
        </div>
      </div>

      <div className='row mb-7'>
        <label className='col-lg-6 fw-bold text-muted'>Vehicle Number</label>
        <div className='col-lg-6'>
          <span className='fw-bold fs-6'>{data.car_number}</span>
        </div>
      </div>

      <div className='row mb-7'>
        <label className='col-lg-6 fw-bold text-muted'>Vehicle Sequence Number</label>
        <div className='col-lg-6'>
          <span className='fw-bold fs-6'>{data.vehicle_sequence_no}</span>
        </div>
      </div>

      <div className='row mb-7'>
        <label className='col-lg-6 fw-bold text-muted'>Region Id</label>
        <div className='col-lg-6'>
          <span className='fw-bold fs-6'>{data.region_id}</span>
        </div>
      </div>

      <div className='row mb-7'>
        <label className='col-lg-6 fw-bold text-muted'>City Id</label>
        <div className='col-lg-6'>
          <span className='fw-bold fs-6'>{data.city_id}</span>
        </div>
      </div>
    </div> */}
  </div>
</div>

      </div>

      {/* <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-6'>
          <ChartsWidget1 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>

        <div className='col-xl-6'>
          <TablesWidget1 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
      </div> */}

      {/* <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-6'>
          <ListsWidget5 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>

        <div className='col-xl-6'>
          <TablesWidget5 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
      </div> */}
    </Content>
  )
}
