// import { Link } from 'react-router-dom';
// import { KTIcon } from '../../../../_metronic/helpers';
// import {
//   ChartsWidget1,
//   ListsWidget5,
//   TablesWid,get1,
//   TablesWidget5
// } from '../../../../_metronic/partials/widgets'
import { useEffect, useState } from 'react';
import { Content } from '../../../../_metronic/layout/components/content';
import { getDeliveryBoyOneFunction } from '../../../services/deliveryboy/DeliveryBoy';
import { Link } from 'react-router-dom';
import ModalWalletComponent from './ModelWallet';
import DeliveryTransactionsTableComponent from './DeliveryTransactionsTable';

interface CampaignsProps {
    data: any;
    setActiveTab:any
}


export function DeliveryBoyWalletComponent({ data,setActiveTab }: CampaignsProps) {
    const [balance, setBalance] = useState<any>({});
    const [isModal, setIsModal] = useState<any>(false);
    const [currentData, setCurrentData] = useState<any>({});
    const delveryBoyData = {id:data._id};
    // alert(JSON.stringify(data._id))
    useEffect(() => {
        getDeliveryBoy(data._id)
    },[])
    const getDeliveryBoy = async (id: any) => {
        try {
            const response = await getDeliveryBoyOneFunction(id)
            // alert(JSON.stringify(response?.data?.data))
            console.log(response)
            setBalance(response?.data?.data)
        } catch (error: any) {
            // alert(JSON.stringify(error))
            console.error(error)
        }
    }

    const handleUpdate = ""
    return (
        <Content>
            <div className='card m-0 ' id='kt_profile_details_view'>
                <div className='card-header cursor-pointer'>
                    <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>Wallet Balance : {balance.wallet_balance} SAR</h3>
                    </div>
                    <Link to='' className='btn btnRed  align-self-center' 
                     onClick={() => {
                        setCurrentData({});
                        setIsModal(true);
                        setCurrentData(balance);
                      }}>
                        Add Balance
                    </Link>
                </div>
                <div className=''>
                    {/* <h4>Wallet Balance : {balance.wallet_balance} SAR</h4> */}
                    
                </div>
            </div>
            <DeliveryTransactionsTableComponent
                     id={delveryBoyData}/>
            <ModalWalletComponent
                show={isModal}
                onHide={() => setIsModal(false)}
                values={currentData}
                updateFunc={handleUpdate}
                setActiveTab={setActiveTab}
            />
            
        </Content>
    )
}
