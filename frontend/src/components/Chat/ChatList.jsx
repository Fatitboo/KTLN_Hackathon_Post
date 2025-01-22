import {
  getLastestMessageSender,
  getSender,
  getSenderAvatar,
} from "../config/ChatLogics";
import { IoIosClose } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import baseUrl from "@/utils/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { accessChat, resetValue } from "@/redux/slices/chat/chatSlices";
import { defaultAvt, groupChat } from "@/assets/images";

const ChatList = ({ setSelectedDiscussion }) => {
  const { selectedChat, chats } = useSelector((store) => store.chats);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [spin, setSpin] = useState(false);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const inputBoxReal = useRef("");
  const inputBox = useRef();
  const storeData = useSelector((store) => store.users);

  const user = storeData?.userAuth?.user;

  const [listSkillApi, setListSkillApi] = useState([]);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchDataSkill = (searchTerm, hackathonId, value) => {
    inputBoxReal.current = value;
    if (value === "") {
      setListSkillApi([]);
    } else {
      setSpin(true);
      const params = new URLSearchParams({
        searchTerm,
        hackathonId,
        searchQuery: value,
      }).toString();

      fetch(`${baseUrl}/api/v1/users/search?${params}`)
        .then((response) => response.json())
        .then((result) => {
          if (result.length == 0) {
            fetchSkillsAI(value);
          }
          const arr = [...result];
          console.log(arr);

          setListSkillApi(arr);
          setSpin(false);
        })
        .catch((error) => console.log("error", error));
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchDataSkill("all", "", searchTerm);
    }
  }, [debouncedSearchTerm]);

  const handleClose = () => {
    setListSkillApi([]);
    setSearchTerm(""); // Xóa trạng thái
    if (inputBox.current) {
      inputBox.current.value = ""; // Xóa giá trị trong ô input
    }
  };

  const handleAccessChat = (userId) => {
    dispatch(accessChat({ userId, handleClose }));
  };
  return (
    <div className="w-1/3 bg-white shadow-lg p-4">
      <div className="lg:flex justify-between items-center">
        <h2 className="text-xl font-bold mb-4 w-fit">My Chats</h2>
        <button
          onClick={() =>
            setSelectedDiscussion({ chatName: "", memberUsers: [] })
          }
          className="px-5 text-base py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          New Group Chat +
        </button>
      </div>
      <div className="relative mb-4 mt-2">
        <div className="flex items-center">
          <div
            tabIndex={0}
            onChange={() => setListSkillApi([])}
            className={`relative flex flex-row gap-1 flex-wrap items-center w-full bg-white focus:bg-white focus:border-gray-900 text-base shadow-sm rounded-sm pl-5 py-1 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
          >
            <div className="flex"></div>
            <div className="flex-1 ">
              <input
                type="text"
                ref={inputBox}
                placeholder={"Input email of user you want to chat with."}
                onBlur={(e) => e.stopPropagation()}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`min-w-5 w-full block focus:outline-none bg-white  focus:bg-white text-base  rounded-md pr-5 text-gray-900 border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
              />
            </div>

            {spin ? (
              <svg
                className="absolute right-1 animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="#cccccc"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <div
                className="cursor-pointer mr-5"
                onClick={() => handleClose()}
              >
                <IoIosClose size={20} />
              </div>
            )}
          </div>
        </div>
        <div
          className="relative z-100"
          style={{
            visibility: listSkillApi.length === 0 ? "collapse" : "visible",
          }}
        >
          <div className="border mt-1 rounded overflow-auto absolute w-full max-h-56">
            {listSkillApi.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    handleAccessChat(item._id);
                  }}
                  key={index}
                  className={`hover:bg-[#eef1f2] z-20  block focus:outline-none bg-white focus:bg-white text-base shadow-sm py-2 pl-5 pr-5 text-gray-90 placeholder:text-gray-400 sm:text-base sm:leading-8 cursor-pointer`}
                >
                  <>
                    <div className="w-full grid grid-cols-2 items-center justify-between">
                      <div className="flex flex-row items-center gap-2">
                        <div className="w-10 h-10">
                          <img
                            src={item?.avatar ?? defaultAvt}
                            className="w-10 h-10 rounded-full"
                          />
                        </div>
                        <div>
                          <div>{item?.fullname}</div>
                          <div>{item?.email}</div>
                        </div>
                      </div>
                    </div>
                  </>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex flex-col p-3  w-full h-full rounded-lg overflow-hidden">
          {chats ? (
            <div className="flex flex-col bg-gray-100 gap-2 overflow-y-scroll">
              {chats.map((chat) => (
                <div
                  key={chat._id}
                  onClick={() =>
                    dispatch(resetValue({ key: "selectedChat", value: chat }))
                  }
                  className={`cursor-pointer px-3 py-2 rounded-lg ${
                    selectedChat === chat
                      ? "bg-teal-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={
                        chat.avatarGroupChat ??
                        (!chat.isGroupChat
                          ? getSenderAvatar(user, chat.users)
                          : groupChat)
                      }
                      alt="avatar"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#ccc",
                      }}
                    />
                    <div>
                      <p className="text-base font-medium text-ellipsis line-clamp-1">
                        {!chat.isGroupChat
                          ? getSender(user, chat.users)
                          : chat.chatName}
                      </p>
                      {chat.latestMessage && (
                        <p className="max-lg:hidden text-xs text-gray-700 text-ellipsis line-clamp-1">
                          <strong>
                            {getLastestMessageSender(
                              chat.latestMessage.sender,
                              chat.users,
                              chat.orgSender
                            )}{" "}
                            :
                          </strong>{" "}
                          {chat?.latestMessage?.content?.length > 50
                            ? chat.latestMessage.content.substring(0, 51) +
                              "..."
                            : chat.latestMessage.content}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // <ChatLoading />
            <>
              <div>Nothing to display</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
