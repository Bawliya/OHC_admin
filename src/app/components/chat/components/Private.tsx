
import { FC, useEffect, useState } from 'react'
// import {KTIcon} from '../../../../_metronic/helpers'
import { ChatInner } from '../../../../_metronic/partials'
// import { ToolbarWrapper } from '../../../../_metronic/layout/components/toolbar'
import { Content } from '../../../../_metronic/layout/components/content'
import { getCustomerChatFunction, getOneChatFunction } from '../../../services/Chat/Chat'
import io from 'socket.io-client';
import clsx from 'clsx'


const PrivateChat: FC = () => {
  // use State
  const [customerChat, setCustomerChat] = useState<any>([])
  const [displayValue, setDisplayValue] = useState<any>({});
  const [message, setMessage] = useState<any>([]);
  const [ReceivedMessage, setReceivedMessage] = useState({})
  const socket = io('https://daeemsocket.testenvapp.com/');

  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const role = JSON.parse(localData).data
  console.log("role", role._id);



  const getFirstLetter = (name:any) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };


  useEffect(() => {
    getCustomerChat()
    connectSocket(customerChat)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getCustomerChat = async () => {
    const res = await getCustomerChatFunction()
    setCustomerChat(res?.data?.data)
    
  }

  // console.log("displayValue", displayValue);
  const handleChange = (newValue: any) => {
    // console.log("new value id ", newValue);
    
     setDisplayValue(newValue);
    joinChat(newValue)
    getOneChat(newValue?.chat_id)
  };

  const connectSocket = async (chats:any) => {
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    console.log("chatss",chats);
    

    socket.emit(
      'join',
      {userId: role._id},
      (error: any, message: any) => {
        if (error) {
          console.log('error', error);
        } else {
          console.log('Join admin with socket success', message);
        }
      },
    );
    
    
    socket.on('message_received_user',(newmessage: any) => {
      if (newmessage) {
        // console.log('Receive New Message', newmessage);
        setReceivedMessage(newmessage)
        // moveObjectToStart(newmessage?._id ,chats) 
        // message.push(newmessage)
      }
    });

    socket.on('new_chat_user', (newchat: any) => {
      console.log(newchat);
      
      if (newchat) {
        console.log('Receive New Chat', newchat);
        setCustomerChat((prev: any) => {
          const isAlready: any = prev.find((item: any) => item?.chat_id === newchat?.chat_id);
          console.log("isAlready", isAlready);
          if (isAlready) {
            console.log(true);
            return prev; // Return previous state unchanged
          } else {
            console.log(false);
            return [newchat, ...prev]; // Add newchat to the beginning of the array
          }
        });
      }
    });



  }
  const joinChat = async (newValue:any) => {

    // socket.on('disconnect',()=>{
    //   console.log('Disconnected from Socket.IO server');
    // })
     

    // Example: Emit data to the server
    if(newValue.to !== role._id){
    socket.emit('join_chat_admin', {
      user_id: role._id,
      chat_id: newValue.chat_id
    },(error: any, message: any) => {
      if (error) {
        console.log('error', error);
      } else {
        console.log('Join chat by admin', message);
      }
    });
  }
  
  };


  useEffect(()=>{
    moveObjectToStart(ReceivedMessage,customerChat)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ReceivedMessage])

  // console.log("customerChat out",customerChat);
   async function moveObjectToStart(chat : any, customerChat1:any) {
    // Find the index of the object with the specified chat_id
    console.log("customerChat in ",customerChat1);
    console.log("chats" , chat)
    // console.log("chatId",chatId);
    
    const index : any = customerChat1.findIndex((obj : any) => obj._id === chat._id);
    console.log("index",index)
    if (index !== -1) {
      setCustomerChat((prevArray:any) => {
        console.log("prevArray",prevArray);
          // Create a copy of the array
          const newArray = [...prevArray];
          // Remove the object from its current index
          const obj = newArray.splice(index, 1)[0];
          // Add it to the beginning of the array
          newArray.unshift({...obj , latestMessage : chat.message});
          // Return the new array to update the state
          return newArray;
      });
  } 
}

  const isEmpty = Object.keys(displayValue).length === 0;

  const getOneChat = async (id:any)=>{
    // console.log("displayValue id", id);
    const res = await getOneChatFunction(id)
    // console.log("scjscjsdsjdlj", res?.data?.data);
    setMessage(res?.data?.data)
  }





  return (
    <>
      {/* <ToolbarWrapper /> */}
      <Content>
        <div className='d-flex flex-column flex-lg-row'>
          <div className='flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-300px mb-10 mb-lg-0'>
            <div className='card card-flush'>
              <div className='card-header pt-7' id='kt_chat_contacts_header'>
                <form className='w-100 position-relative' autoComplete='off'>
                  <h1>Customer Chat</h1>
                </form>
              </div>

              <div className='card-body pt-5' id='kt_chat_contacts_body'>
                <div
                  className='scroll-y me-n5 pe-5 h-200px h-lg-350px'
                  data-kt-scroll='true'
                  data-kt-scroll-activate='{default: false, lg: true}'
                  data-kt-scroll-max-height='auto'
                  data-kt-scroll-dependencies='#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header'
                  data-kt-scroll-wrappers='#kt_content, #kt_chat_contacts_body'
                  data-kt-scroll-offset='0px'
                >
                  {/* map */}
                  {customerChat?.map((item: any, index: any) => (
                    <div className='d-flex flex-stack py-4' key={index} >
                      <div className='d-flex align-items-center'>
                        <div className='symbol symbol-45px symbol-circle'>
                          <span className='symbol-label bg-light-danger text-danger fs-6 fw-bolder'>
                          {getFirstLetter(item?.userName || item?.usernumber)}
                          </span>
                        </div>

                        <div className='ms-5'>
                          <a href='javascript:void(0)' onClick={() => handleChange(item)} className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                            {item?.userName && item?.usernumber ? (
                              item?.userName
                            ) : (
                              item?.usernumber
                            )}
                          </a>
                          <div className='fw-bold text-gray-500'>{item?.latestMessage}</div>
                        </div>
                      </div>

                      <div className='d-flex flex-column align-items-end ms-2'>
                        <span className='text-muted fs-7 mb-1'>5 hrs</span>
                      </div>
                    </div>
                  ))}
                  {/* <div className='separator separator-dashed d-none'></div> */}


                  {/* <div className='d-flex flex-stack py-4'>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px symbol-circle'>
                        <img alt='Pic' src={toAbsoluteUrl('/media/avatars/300-1.jpg')} />
                      </div>

                      <div className='ms-5'>
                        <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                          Max Smith
                        </a>
                        <div className='fw-bold text-gray-500'>max@kt.com</div>
                      </div>
                    </div>

                    <div className='d-flex flex-column align-items-end ms-2'>
                      <span className='text-muted fs-7 mb-1'>20 hrs</span>
                    </div>
                  </div> */}

                  {/* <div className='separator separator-dashed d-none'></div> */}

                  {/* <div className='d-flex flex-stack py-4'>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px symbol-circle'>
                        <img alt='Pic' src={toAbsoluteUrl('/media/avatars/300-5.jpg')} />
                      </div>

                      <div className='ms-5'>
                        <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                          Sean Bean
                        </a>
                        <div className='fw-bold text-gray-500'>sean@dellito.com</div>
                      </div>
                    </div>

                    <div className='d-flex flex-column align-items-end ms-2'>
                      <span className='text-muted fs-7 mb-1'>20 hrs</span>
                      <span className='badge badge-sm badge-circle badge-light-success'>6</span>
                    </div>
                  </div> */}

                  {/* <div className='separator separator-dashed d-none'></div> */}

                  {/* <div className='d-flex flex-stack py-4'>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px symbol-circle'>
                        <img alt='Pic' src={toAbsoluteUrl('/media/avatars/300-25.jpg')} />
                      </div>

                      <div className='ms-5'>
                        <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                          Brian Cox
                        </a>
                        <div className='fw-bold text-gray-500'>brian@exchange.com</div>
                      </div>
                    </div>

                    <div className='d-flex flex-column align-items-end ms-2'>
                      <span className='text-muted fs-7 mb-1'>20 hrs</span>
                    </div>
                  </div> */}

                  {/* <div className='separator separator-dashed d-none'></div> */}

                  {/* <div className='d-flex flex-stack py-4'>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px symbol-circle'>
                        <span className='symbol-label bg-light-warning text-warning fs-6 fw-bolder'>
                          M
                        </span>
                      </div>

                      <div className='ms-5'>
                        <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                          Mikaela Collins
                        </a>
                        <div className='fw-bold text-gray-500'>mikaela@pexcom.com</div>
                      </div>
                    </div>

                    <div className='d-flex flex-column align-items-end ms-2'>
                      <span className='text-muted fs-7 mb-1'>1 day</span>
                    </div>
                  </div> */}

                  {/* <div className='separator separator-dashed d-none'></div> */}

                  {/* <div className='d-flex flex-stack py-4'>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px symbol-circle'>
                        <img alt='Pic' src={toAbsoluteUrl('/media/avatars/300-9.jpg')} />
                      </div>

                      <div className='ms-5'>
                        <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                          Francis Mitcham
                        </a>
                        <div className='fw-bold text-gray-500'>f.mitcham@kpmg.com.au</div>
                      </div>
                    </div>

                    <div className='d-flex flex-column align-items-end ms-2'>
                      <span className='text-muted fs-7 mb-1'>5 hrs</span>
                      <span className='badge badge-sm badge-circle badge-light-success'>6</span>
                    </div>
                  </div> */}

                  {/* <div className='separator separator-dashed d-none'></div> */}

                  {/* <div className='d-flex flex-stack py-4'>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px symbol-circle'>
                        <span className='symbol-label bg-light-danger text-danger fs-6 fw-bolder'>
                          O
                        </span>
                        <div className='symbol-badge bg-success start-100 top-100 border-4 h-15px w-15px ms-n2 mt-n2'></div>
                      </div>

                      <div className='ms-5'>
                        <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                          Olivia Wild
                        </a>
                        <div className='fw-bold text-gray-500'>olivia@corpmail.com</div>
                      </div>
                    </div>

                    <div className='d-flex flex-column align-items-end ms-2'>
                      <span className='text-muted fs-7 mb-1'>1 week</span>
                    </div>
                  </div> */}

                  {/* <div className='separator separator-dashed d-none'></div> */}

                  {/* <div className='d-flex flex-stack py-4'>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px symbol-circle'>
                        <span className='symbol-label bg-light-primary text-primary fs-6 fw-bolder'>
                          N
                        </span>
                      </div>

                      <div className='ms-5'>
                        <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                          Neil Owen
                        </a>
                        <div className='fw-bold text-gray-500'>owen.neil@gmail.com</div>
                      </div>
                    </div>

                    <div className='d-flex flex-column align-items-end ms-2'>
                      <span className='text-muted fs-7 mb-1'>20 hrs</span>
                      <span className='badge badge-sm badge-circle badge-light-success'>6</span>
                    </div>
                  </div> */}

                  {/* <div className='separator separator-dashed d-none'></div> */}

                  {/* <div className='d-flex flex-stack py-4'>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px symbol-circle'>
                        <img alt='Pic' src={toAbsoluteUrl('/media/avatars/300-23.jpg')} />
                      </div>

                      <div className='ms-5'>
                        <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                          Dan Wilson
                        </a>
                        <div className='fw-bold text-gray-500'>dam@consilting.com</div>
                      </div>
                    </div>

                    <div className='d-flex flex-column align-items-end ms-2'>
                      <span className='text-muted fs-7 mb-1'>2 weeks</span>
                      <span className='badge badge-sm badge-circle badge-light-warning'>9</span>
                    </div>
                  </div> */}

                  {/* <div className='separator separator-dashed d-none'></div> */}

                  {/* <div className='d-flex flex-stack py-4'>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px symbol-circle'>
                        <span className='symbol-label bg-light-danger text-danger fs-6 fw-bolder'>
                          E
                        </span>
                        <div className='symbol-badge bg-success start-100 top-100 border-4 h-15px w-15px ms-n2 mt-n2'></div>
                      </div>

                      <div className='ms-5'>
                        <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                          Emma Bold
                        </a>
                        <div className='fw-bold text-gray-500'>emma@intenso.com</div>
                      </div>
                    </div>

                    <div className='d-flex flex-column align-items-end ms-2'>
                      <span className='text-muted fs-7 mb-1'>1 day</span>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className='flex-lg-row-fluid  ms-lg-7 ms-xl-10'>
            <div className='card' id='kt_chat_messenger'>
              <div  className={clsx('card-header', { 'justify-content-center h-lg-450px h-350px': isEmpty })} id='kt_chat_messenger_header'>
                <div className='card-title'>
                  <div className='d-flex justify-content-center flex-column me-3'>
                    
                    <a
                      href='#'
                      className='fs-4 fw-bolder text-gray-900 text-hover-primary  mb-2 lh-1'
                    >
                      
                      {!isEmpty ? (
                        displayValue?.userName && displayValue?.usernumber ? (
                          <>
                          <div className='symbol symbol-45px me-2 symbol-circle pl-3 ml-4'>
                          <span className='symbol-label bg-light-danger text-danger fs-6 fw-bolder'>
                          {getFirstLetter(displayValue?.userName || displayValue?.usernumber)}
                          </span>
                        </div>
                          {displayValue?.userName} </>
                        ) : (
                          <>
                          <div className='symbol symbol-45px me-2 symbol-circle'>
                          <span className='symbol-label bg-light-danger text-danger fs-6 fw-bolder'>
                          {getFirstLetter( displayValue?.usernumber)}
                          </span>
                        </div>
                          {displayValue?.usernumber} </>
                          
                        )
                      ) : (
                        <>
                        <div className='text-center'>
                          <img src="../../../../../media/illustrations/sketchy-1/17.png" width={"277px"} alt="" />
                        <h1 className='mt-3'>Join Chat</h1>
                        </div>
                        </>
                      )}
                    </a>
                  </div>
                </div>
              </div>
              {isEmpty !== true ? (
                <ChatInner  messageArray={message} receivedMessage={ReceivedMessage} sendMessages={displayValue} set={setReceivedMessage} oneUser={displayValue} />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </Content>
    </>
  )
}

export default PrivateChat
