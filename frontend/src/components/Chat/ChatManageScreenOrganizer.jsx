import React, { useEffect, useRef, useState } from "react";
import { chatIcon } from "@/assets/images";
import { ChatState } from "@/Context/ChatProvider";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats, resetValue } from "@/redux/slices/chat/chatSlices";
import { Modal } from "..";
import { AddGroupChat } from "./AddGroupChat";

const ChatManageScreenOrganizer = () => {
  const popupRef = useRef(null);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChats());
    // eslint-disable-next-line
  }, []);
  return (
    <div className="px-2 pb-0 pt-10">
      <div
        style={{ height: "90vh" }}
        className={`flex w-full flex-col items-center bg-blue-200 mt-10  justify-start rounded-md self-center overflow-hidden transition-all duration-400 ease-out
          ${"self-start p-5 shadow-md"}`}
      >
        <div
          className=" w-full flex bg-blue-50 overflow-hidden"
          style={{ height: "90vh" }}
        >
          <ChatList
            setSelectedDiscussion={setSelectedDiscussion}
            data-view-setting
          />
          <ChatWindow />
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
    </div>
  );
};

export default ChatManageScreenOrganizer;
