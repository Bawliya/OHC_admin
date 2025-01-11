import 'react-toastify/dist/ReactToastify.css';
import '/public/custom.css';

import {
  useEffect,
  useState,
} from 'react';

import { getRestaurantByIdFunction } from '../services/Restaurant/Restaurant';
import { ProfileHeader } from './profile/ProfileHeader';

const RestaurantDetailsCard: React.FC = () => {
    const [RestaurantData, setRestaurantData] = useState('');
  useEffect(() => {
    const currentPageUrl = window.location.href;
    const parts = currentPageUrl.split("/"); // Split the URL by '/'
    const id = parts[parts.length - 1];
    restaurantData(id);
  }, []);

  const  restaurantData = async (id:any) =>{
    const res:any = await  getRestaurantByIdFunction(id);
console.log(res?.data?.data)
    setRestaurantData(res?.data?.data)
  }
  
  return (
    <>
    <div className="row">
      <div className="row container">
        
      </div>
      <div className="">
        <div className="app-container container-fluid">
        <img src="/media/logos/applogo.png" className="h-60px w-155px" alt="" />
        </div>
      </div>
    <ProfileHeader  data={RestaurantData}/>
    </div>
    </>
  );
};

export default RestaurantDetailsCard;
