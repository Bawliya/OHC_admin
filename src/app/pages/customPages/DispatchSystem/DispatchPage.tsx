import React, { useEffect, useState } from "react";
import { BackgroundBeams } from "../../../UI/background-beams";
import DispatchOverview from "../../../components/DispatchBoxes";

import DispatchMap from "./DispatchMap";
import { database, ref, onValue } from "./firebase";
import { getFunction } from "../../../services/deliveryboy/DeliveryBoy";

interface Data {

  [key: string]: any;
}



const DispatchPage = () => {

  const [data, setData] = useState<Data | null>(null);
  const [datas, SetDatas] = useState<any>([]);
  const [activeDeliveryMan, setActiveDeliveryMan] = useState<any[]>([]);
  const [array, setArray] = useState<any>([]);
  useEffect(() => {
    const dataRef = ref(database, "users");
    const unsubscribe = onValue(dataRef, (snapshot) => {
      setData(snapshot.val());
    });
    getRecord()
    return () => unsubscribe();
  }, []);


  const getRecord = async () => {
    const data = await getFunction()
    SetDatas(data?.data?.data)
  }
  


  useEffect(() => {


    if (data && Array.isArray(datas.activeDeliveryMan)) {
    

      const updatedDeliveryMen = datas.activeDeliveryMan.map((item: any) => {
        if (data[item._id]) {
          // Merge the data into the item object
          return { ...item, ...data[item._id] };
        }
        return item;
      });

      setActiveDeliveryMan(updatedDeliveryMen);
    }
  }, [data, datas]);



  useEffect(() => {
    const deliveryMenArray = activeDeliveryMan.map((item: any) => ({
      id: item._id,
      name: item.name,
      lat: item.latitude, // replace with actual latitude
      lng: item.longitude, // replace with actual longitude
      status: 'Active',
      phone: item.phone || 'N/A',
    }));
    setArray(deliveryMenArray);
  }, [activeDeliveryMan])


  return (
    <>
      <BackgroundBeams />
      <DispatchOverview datas={datas} />
      <DispatchMap deliveryBoys={array
        // [{
        //   id: '1',
        //   name: 'John Doe',
        //   lat: 51.505,
        //   lng: -0.09,
        //   status: 'Active',
        //   phone: '123-456-7890',
        // },
        // {
        //   id: '2',
        //   name: 'Jane Smith',
        //   lat: 51.515,
        //   lng: -0.1,
        //   status: 'Active',
        //   phone: '987-654-3210',
        // },
        // {
        //   id: '3',
        //   name: 'Bob Johnson',
        //   lat: 51.525,
        //   lng: -0.08,
        //   status: 'Active',
        //   phone: '555-555-5555',
        // }]
      } />
    </>
  );
};

export default DispatchPage;
