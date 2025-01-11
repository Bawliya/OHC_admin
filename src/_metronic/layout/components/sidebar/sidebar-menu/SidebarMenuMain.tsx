import { useIntl } from "react-intl";
// import {KTIcon} from '../../../../helpers'
import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";

const SidebarMenuMain = () => {
  const intl = useIntl();
  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const role = JSON.parse(localData).data;
  console.log("role", role);

  const roleArray = role?.role?.roleArray;
  console.log(roleArray);

  return (
    <>
      {/* {role.type === "Admin" || */}
      {/* roleArray?.some((item: any) => "Dashboard" in item) ? ( */}
      <SidebarMenuItem
        to="/dashboard"
        icon="element-11"
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        fontIcon="bi-app-indicator"
        color="#fff"
      />
      {/* {role.type === "Admin" ||
      roleArray?.some((item: any) => "Customers" in item) ? ( */}
      <SidebarMenuItem
        to="/customers"
        icon="profile-user"
        title="Users"
        fontIcon="hover-rotate-start"
        color="#fff"
      />
      {/* ) : null} */}
      {/* {role.type === "Admin" ||
      roleArray?.some((item: any) => "Order" in item) ? (
        <SidebarMenuItem
          to="orders"
          icon="parcel"
          title="Orders"
          fontIcon="hover-rotate-start"
          color="#fff"
        />
      ) : null}

      {role.type === "Admin" ? (
        <SidebarMenuItem
          to="withdrawal"
          icon="wallet"
          title="Withdrawal Request"
          fontIcon="hover-rotate-start"
          color="#fff"
        />
      ) : null} */}
      {/* {role.type === 'Admin' ? (
        <SidebarMenuItem
          to="/dispatch-management"
          icon="abstract-29"
          title="Dispatch Management"
          fontIcon="hover-rotate-start"
          color="#ee1b24"
        />
      ) : null} */}
      {/* <SidebarMenuItem to='/builder' icon='switch' title='Layout Builder' fontIcon='bi-layers' /> */}
      {/* <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-white  text-uppercase fs-8 ls-1">
            Management
          </span>
        </div>
      </div> */}
      {/* {role.type === "Admin" ||
      roleArray?.some((item: any) => "Banner" in item) ? ( */}
      {/* <SidebarMenuItemWithSub
        to="Banner"
        title="Banners"
        fontIcon="bi-archive"
        icon="bill"
        color="#fff"
      >
        <SidebarMenuItem to="/banner/add" title="Add Banner" hasBullet={true} />
        
        <SidebarMenuItem
          to="/banner/view"
          title="View Banners"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub> */}
      {/* ) : null} */}
      {/* {role.type === "Admin" ||
      roleArray?.some((item: any) => "Category" in item) ? ( */}
      <SidebarMenuItemWithSub
        to="Category"
        title="Manage App Data"
        fontIcon="bi-archive"
        icon="category" // #ee1b24
        color="#fff"
      >
        {/* <SidebarMenuItem to="/category/add" title="Add Pet" hasBullet={true} /> */}

        <SidebarMenuItem
          to="/category/view"
          title="Categories"
          hasBullet={true}
        />
        <SidebarMenuItem to="/banner/view" title="Banner" hasBullet={true} />
        {/* <SidebarMenuItem to="/vaccine/view" title="Vaccines" hasBullet={true} />
        <SidebarMenuItem to="/avater/view" title="Avatar" hasBullet={true} /> */}
        {/* ) : null} */}
      </SidebarMenuItemWithSub>
      {/* <SidebarMenuItemWithSub
        to="Browse"
        title="Pet Breed"
        fontIcon="bi-archive"
        icon="abstract-26"
        color="#fff"
      >
     
        <SidebarMenuItem
          to="/browse/add"
          title="Add Pet Breed"
          hasBullet={true}
        />
        
        <SidebarMenuItem
          to="/browse/view"
          title="View Pet Breed"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub> */}
      {/* <SidebarMenuItemWithSub
        to="Browse"
        title="Vaccine Type"
        fontIcon="bi-archive"
        icon="abstract-26"
        color="#fff"
      >
        <SidebarMenuItem
          to="/vaccine/add"
          title="Add Vaccine"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/vaccine/view"
          title="View Vaccine"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub> */}
      {/* ) : null} */}
      {/* {role.type === "Admin" ||
      roleArray?.some((item: any) => "Business" in item) ? (
        <SidebarMenuItemWithSub
          to="Business"
          title="Businesses"
          fontIcon="bi-archive"
          icon="shop"
          color="#fff"
        >
          {role.type === "Admin" ||
          roleArray?.some(
            (item: { [x: string]: string | string[] }) =>
              "Business" in item && item["Business"].includes("Create")
          ) ? (
            <SidebarMenuItem
              to="/business/add"
              title="Add Business"
              hasBullet={true}
            />
          ) : null}
          {role.type === "Admin" ||
          roleArray?.some(
            (item: { [x: string]: string | string[] }) =>
              "Business" in item && item["Business"].includes("List")
          ) ? (
            <SidebarMenuItem
              to="/business/view"
              title="View Businesses"
              hasBullet={true}
            />
          ) : null}
        </SidebarMenuItemWithSub>
      ) : null}

      {role.type === "Admin" ||
      roleArray?.some((item: any) => "DeliveryBoy" in item) ? (
        <SidebarMenuItem
          to="/delivery_boy"
          icon="scooter"
          title="Delivery Boys"
          fontIcon="hover-rotate-start"
          color="#fff"
        />
      ) : null} */}
      {/* {role.type === "Admin" ||
      roleArray?.some((item: any) => "Coupons" in item) ? (
        <SidebarMenuItemWithSub
          to="Coupons"
          title="Coupons"
          fontIcon="bi-archive"
          icon="discount" // #ee1b24
          color="#4186f3"
        >
          {role.type === "Admin" ||
          roleArray?.some(
            (item: { [x: string]: string | string[] }) =>
              "Coupons" in item && item["Coupons"].includes("Create")
          ) ? (
            <SidebarMenuItem
              to="/coupons/add"
              title="Add Coupon"
              hasBullet={true}
            />
          ) : null}
          {role.type === "Admin" ||
          roleArray?.some(
            (item: { [x: string]: string | string[] }) =>
              "Coupons" in item && item["Coupons"].includes("List")
          ) ? (
            <SidebarMenuItem
              to="/coupons/view"
              title="View Coupons"
              hasBullet={true}
            />
          ) : null}
        </SidebarMenuItemWithSub>
      ) : null} */}
      {/* {role.type === "Admin" ||
      roleArray?.some((item: any) => "Notification" in item) ? ( */}

      <SidebarMenuItemWithSub
        to="Video"
        title=" Traning Video"
        fontIcon="bi-archive"
        icon="picture"
        color="#fff"
      >
        <SidebarMenuItem
          to="/image/add"
          title="Add New Video"
          hasBullet={true}
        />

        <SidebarMenuItem
          to="/image/view"
          title="View Videos"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      {/* <SidebarMenuItemWithSub
        to="Reel"
        title="Reel Videos"
        fontIcon="bi-archive"
        icon="picture"
        color="#fff"
      >
        <SidebarMenuItem
          to="/sort-video"
          title="Add New Reel
"
          hasBullet={true}
        />

        <SidebarMenuItem
          to="/sort/video/view"
          title="View Reels"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub> */}

      <SidebarMenuItem
        to="/order"
        icon="notification-on"
        title="Orders"
        fontIcon="hover-rotate-start"
        color="#fff"
      />

      {/* ) : null} */}
      {/* 


      {role.type === 'Admin' || roleArray?.some((item: any) => 'Setting' in item) ? (
        <SidebarMenuItemWithSub
          to="Settings"
          title="Settings"
          fontIcon="bi-archive"
          icon="gear"
          color="#4186f3"
        >
          <SidebarMenuItem
            to="/settings/payment"
            title="Payment"
            hasBullet={true}
          />
          <SidebarMenuItem
            to="/settings/radius"
            title="Radius Configuration"
            hasBullet={true}
          />
          <SidebarMenuItem
            to="/settings/terms-conditions"
            title="Terms and Conditions"
            hasBullet={true}
          />
          <SidebarMenuItem
            to="/settings/privacy-policy"
            title="Privacy Policy"
            hasBullet={true}
          />

        </SidebarMenuItemWithSub>
      ) : null}

    
      {role.type === 'Admin' || roleArray?.some((item: any) => 'AccessControl' in item) ? (
        <SidebarMenuItemWithSub
          to="Settings"
          title="Access  Control"
          fontIcon="bi-archive"
          icon="switch"
          color="#ee1b24"
        >
          <SidebarMenuItem
            to="/role/view"
            title="Role"
            hasBullet={true}
          />
          <SidebarMenuItem
            to="/admin/view"
            title="Admin"
            hasBullet={true}
          />

        </SidebarMenuItemWithSub>
      ) : null}

      
   
     
      {/* <SidebarMenuItem
        to="/admin/add"
        icon="switch"
        title="Access  Control"
        fontIcon="hover-rotate-start"
        color="#ee1b24"
      /> */}
      {/* <SidebarMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='profile-circle'
        fontIcon='bi-person'
      >
        <SidebarMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <SidebarMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub to='/error' title='Errors' fontIcon='bi-sticky' icon='cross-circle'>
        <SidebarMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <SidebarMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </SidebarMenuItemWithSub> */}
      {/* <SidebarMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='element-7'
        fontIcon='bi-layers'
      >
        <SidebarMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </SidebarMenuItemWithSub> */}
      {/* <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div> */}
      {/* <SidebarMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='message-text-2'
      >
        <SidebarMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItem
        to='/apps/user-management/users'
        icon='abstract-28'
        title='User management'
        fontIcon='bi-layers'
      /> */}
      {/* <div className='menu-item'>
        <a
          target='_blank'
          className='menu-link'
          href={import.meta.env.VITE_APP_PREVIEW_DOCS_URL + '/changelog'}
        >
          <span className='menu-icon'>
            <KTIcon iconName='code' className='fs-2' />
          </span>
          <span className='menu-title'>Changelog {import.meta.env.VITE_APP_VERSION}</span>
        </a>
      </div> */}
    </>
  );
};

export { SidebarMenuMain };
