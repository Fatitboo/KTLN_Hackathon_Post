import React, { useEffect, useRef, useState } from "react";
import { chatIcon } from "@/assets/images";
import { ChatState } from "@/Context/ChatProvider";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats, resetValue } from "@/redux/slices/chat/chatSlices";
import { Modal } from "..";
import { AddGroupChat } from "./AddGroupChat";

const ChatManageScreen = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { popInner } = useSelector((store) => store.chats);
  const popupRef = useRef(null);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);

  const dispatch = useDispatch();
  const _handleClickDocument = (e) => {
    const target = e.target;
    if (popupRef.current && !popupRef.current.contains(target)) {
      dispatch(resetValue({ key: "popInner", value: false }));
    }
  };
  useEffect(() => {
    if (popInner) {
      document.addEventListener("click", _handleClickDocument);
    }
    return () => {
      document.removeEventListener("click", _handleClickDocument);
    };
  }, [popInner]);

  useEffect(() => {
    dispatch(fetchChats());
    // eslint-disable-next-line
  }, [popInner]);
  return (
    <div
      className={`flex h-fit flex-col items-center bg-blue-200  justify-start rounded-md self-center overflow-hidden transition-all duration-400 ease-out
          ${popInner && "self-start p-2 shadow-md"}`}
      ref={popupRef}
      data-view-setting
    >
      <button
        type="button"
        onClick={(e) => {
          dispatch(resetValue({ key: "popInner", value: !popInner }));
        }}
        data-view-setting
        className={`flex h-12 w-12 items-center gap-4 text-nowrap rounded-full text-sm"
              ${
                popInner
                  ? "items-start justify-start hidden"
                  : "justify-center hover:bg-gray-200 block"
              }
            `}
      >
        <img
          data-view-setting
          src={chatIcon}
          alt="logo Github"
          className="w-full h-full rounded-full"
        />
      </button>
      <div
        data-view-setting
        className={`flex cursor-default flex-col gap-3 bg-inherit text-xs text-gray-600 ${
          popInner ? "block" : "hidden"
        }`}
        style={{
          width: "90vw", // Chiều rộng là 80% của màn hình
          height: "80vh", // Chiều cao là 70% của màn hình
        }}
      >
        <div data-view-setting className="h-full w-full flex bg-blue-50">
          <ChatList
            setSelectedDiscussion={setSelectedDiscussion}
            data-view-setting
          />
          <ChatWindow data-view-setting />
        </div>
      </div>
      <Modal
        open={
          selectedDiscussion !== null &&
          typeof selectedDiscussion?.chatName === "string"
        }
      >
        <AddGroupChat
          setopenReport={setSelectedDiscussion}
          // setReports={setReports}
          item={{
            chatName: selectedDiscussion?.chatName,
            memberUsers: selectedDiscussion?.memberUsers,
            isUpdate: selectedDiscussion?.isUpdate,
            chatId: selectedDiscussion?.chatId,
            // reportId: selectedDiscussion?.reportId,
          }}
          isVacancy={true}
        />
      </Modal>
    </div>
  );
};

export default ChatManageScreen;
