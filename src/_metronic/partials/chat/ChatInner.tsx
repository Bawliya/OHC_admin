import { FC, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import // toAbsoluteUrl,
// defaultMessages,
// defaultUserInfos,
// MessageModel,
// UserInfoModel,
// messageFromClient,
"../../helpers";
import { format } from "date-fns";

import io from "socket.io-client";
// import { on } from 'stream';

interface Props {
  isDrawer?: boolean;
  messageArray: any;
  receivedMessage: any;
  set: any;
  sendMessages: any;
  oneUser: any;
}

const bufferMessages: any = [];

const ChatInner: FC<Props> = ({
  isDrawer = false,
  messageArray,
  receivedMessage,
  set,
  sendMessages,
  oneUser,
}) => {
  const [chatUpdateFlag, toggleChatUpdateFlat] = useState<boolean>(false);
  const chatContainerRef = useRef<any>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any>([]);

  const socket = io("https://daeemsocket.testenvapp.com/");

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return format(date, "PPpp"); // Customize this format string as needed
  };

  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }

  const role = JSON.parse(localData).data;
  console.log("role", role._id);

  useEffect(() => {
    if (messageArray && messageArray[0]?.message) {
      setMessages(messageArray[0]?.message);
    }
  }, [messageArray]);

  console.log("Inner", receivedMessage);
  console.log("Inner2", oneUser);

  useEffect(() => {
    if (receivedMessage?.message && receivedMessage?._id === oneUser?.chat_id) {
      const messageFromClient = {
        user: 4,
        type: receivedMessage?.type,
        message: receivedMessage?.message,
        createdAt: Date.now(),
        from: receivedMessage?.from,
        id: receivedMessage?._id,
      };
      // console.log("messageFromClient", messageFromClient);

      const updatedMessages = [...bufferMessages, messageFromClient];
      console.log(updatedMessages);

      bufferMessages.push(messageFromClient);
      setMessages(() => updatedMessages);
      // toggleChatUpdateFlat((flag) => !flag)
      set(" ");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivedMessage]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  });

  const sendMessage = () => {
    const newMessage = {
      user: 2,
      type: "out",
      message: message,
      createdAt: Date.now(),
    };
    console.log("newMessage", newMessage);
    socket.emit(
      "send_message_user",
      {
        user_id: role._id,
        chat_id: sendMessages?.chat_id,
        message: message,
      },
      (error: any, message: any) => {
        if (error) {
          console.log("error", error);
        } else {
          console.log("Join message", message);
        }
      }
    );

    bufferMessages.push(newMessage);
    setMessages(bufferMessages);
    toggleChatUpdateFlat(!chatUpdateFlag);
    setMessage("");
    // setTimeout(() => {
    // bufferMessages.push(messageFromClient)
    setMessages(() => bufferMessages);
    toggleChatUpdateFlat((flag) => !flag);
    // }, 1000)
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className="card-body"
      id={isDrawer ? "kt_drawer_chat_messenger_body" : "kt_chat_messenger_body"}
    >
      <div
        ref={chatContainerRef}
        className={clsx("scroll-y me-n5 pe-5", {
          "h-300px h-lg-300px": !isDrawer,
        })}
        data-kt-element="messages"
        data-kt-scroll="true"
        data-kt-scroll-activate="{default: false, lg: true}"
        data-kt-scroll-max-height="auto"
        style={{ height: "500px !important" }}
        data-kt-scroll-dependencies={
          isDrawer
            ? "#kt_drawer_chat_messenger_header, #kt_drawer_chat_messenger_footer"
            : "#kt_header, #kt_app_header, #kt_app_toolbar, #kt_toolbar, #kt_footer, #kt_app_footer, #kt_chat_messenger_header, #kt_chat_messenger_footer"
        }
        data-kt-scroll-wrappers={
          isDrawer
            ? "#kt_drawer_chat_messenger_body"
            : "#kt_content, #kt_app_content, #kt_chat_messenger_body"
        }
        data-kt-scroll-offset={isDrawer ? "0px" : "5px"}
      >
        {messages?.map((message: any, index: any) => {
          // const userInfo = userInfos[message.user]
          const state = message.from === oneUser.from ? "info" : "primary";
          const templateAttr = {};
          if (message.template) {
            Object.defineProperty(templateAttr, "data-kt-element", {
              value: `template-${message.type}`,
            });
          }
          const contentClass = `${isDrawer ? "" : "d-flex"} justify-content-${
            message.from === oneUser?.from ? "start" : "end"
          } mb-2`;
          return (
            <div
              key={`message${index}`}
              className={clsx("d-flex", contentClass, "mb-2", {
                "d-none": message.template,
              })}
              {...templateAttr}
            >
              <div
                className={clsx(
                  "d-flex flex-column align-items",
                  `align-items-${
                    message.from === oneUser?.from ? "start" : "end"
                  }`
                )}
              >
                <div className="d-flex align-items-center mb-2">
                  {message.from === oneUser?.from ? (
                    <>
                      <div className="">
                        <p className="text-muted fs-7 mb-1">
                          {formatDate(message.createdAt)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="">
                        <span className="text-muted fs-7 mb-1">
                          {formatDate(message.createdAt)}
                        </span>
                        <a
                          href="#"
                          className="fs-5 fw-bolder text-gray-900 text-hover-primary ms-1"
                        >
                          You
                        </a>
                      </div>
                      <div className="symbol  symbol-35px symbol-circle ">
                        {/* <img alt='Pic' src={toAbsoluteUrl(`media/${userInfo.avatar}`)} /> */}
                      </div>
                    </>
                  )}
                </div>

                <div
                  className={clsx(
                    "p-5 rounded",
                    `bg-light-${state}`,
                    "text-gray-900 fw-bold mw-lg-400px",
                    `text-${message.from === oneUser?.from ? "start" : "end"}`
                  )}
                  data-kt-element="message-text"
                  dangerouslySetInnerHTML={{ __html: message.message }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="card-footer pb-0 pt-4"
        id={
          isDrawer
            ? "kt_drawer_chat_messenger_footer"
            : "kt_chat_messenger_footer"
        }
      >
        <div style={{ position: "relative" }}>
          <textarea
            className="form-control form-control-flush mb-3"
            rows={1}
            data-kt-element="input"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={onEnterPress}
            style={{ paddingRight: "40px" }} // Add some padding on the right to make space for the icon
          ></textarea>
          {message.trim() !== "" && (
            <i
              onClick={sendMessage}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              className="bi fs-2x bi-arrow-right-circle-fill"
            ></i>
          )}
        </div>

        <div className="d-flex flex-stack">
          <div className="d-flex align-items-center me-2">
            {/*  <button
              className='btn btn-sm btn-icon btn-active-light-primary me-1'
              type='button'
              data-bs-toggle='tooltip'
              title='Coming soon'
            >
              <i className='bi bi-paperclip fs-3'></i>
            </button>
             <button
              className='btn btn-sm btn-icon btn-active-light-primary me-1'
              type='button'
              data-bs-toggle='tooltip'
              title='Coming soon'
            >
              <i className='bi bi-upload fs-3'></i>
            </button> */}
          </div>
          {/*  <button
            className='btn btn-primary'
            type='button'
            data-kt-element='send'
            onClick={sendMessage}
          >
            Send
          </button> */}
        </div>
      </div>
    </div>
  );
};

export { ChatInner };
