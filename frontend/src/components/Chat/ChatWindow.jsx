import { ChatState } from "@/Context/ChatProvider";
import io from "socket.io-client";
import baseUrl from "@/utils/baseUrl";
import { useEffect, useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "react-lottie";
var socket, selectedChatCompare;
import { toast, ToastContainer } from "react-toastify";

import animationData from "./animations/typing.json";
import ScrollableChat from "./ScrollableChat";
import axios from "axios";
import { IconSend } from "@/assets/icons";
import { fetchChats, resetValue } from "@/redux/slices/chat/chatSlices";
import { getSender, getSenderAvatar } from "../config/ChatLogics";
import { groupChat } from "@/assets/images";
import { CgClose } from "react-icons/cg";

const ChatWindow = () => {
  const notify = (type, message) => toast(message, { type: type });
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const { selectedChat, chats } = useSelector((store) => store.chats);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const storeData = useSelector((store) => store.users);

  const user = storeData?.userAuth?.user;
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);

      const { data } = await axios.get(
        `${baseUrl}/api/v1/message/${selectedChat._id}`,
        {
          withCredentials: true,
        }
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      notify("error", "Fail to load the messages!");
    }
  };

  const sendMessage = async (event) => {
    if (newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        setNewMessage("");
        const { data } = await axios.post(
          `${baseUrl}/api/v1/message`,
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          { withCredentials: true }
        );
        socket.emit("new message", data);
        dispatch(fetchChats());
        setMessages((prevMessages) => {
          // Kiểm tra xem tin nhắn đã có trong mảng messages chưa
          const messageExists = prevMessages.some(
            (msg) => msg._id === data._id
          );

          // Nếu chưa có tin nhắn trong messages với _id đó, mới thêm vào
          if (messageExists) {
            return prevMessages;
          } else {
            return [...prevMessages, data];
          }
        });
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(baseUrl);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      // dispatch(fetchChats());

      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        console.log(
          "🚀 ~ socket.on ~ selectedChatCompare:",
          selectedChatCompare
        );

        if (!notification.includes(newMessageRecieved)) {
          // setNotification([newMessageRecieved, ...notification]);
          // setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages((prevMessages) => {
          const messageExists = prevMessages.some(
            (msg) => msg._id === newMessageRecieved._id
          );

          if (messageExists) {
            return prevMessages;
          } else {
            return [...prevMessages, newMessageRecieved];
          }
        });
      }
    });
  });
  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Gọi hàm cuộn xuống dưới cùng khi danh sách tin nhắn thay đổi
    scrollToBottom();
  }, [messages]);
  return (
    <>
      <ToastContainer />

      <div
        className={`${
          selectedChat ? "flex" : "hidden"
        } md:flex flex-col w-2/3 p-4 items-center bg-white rounded-lg border border-gray-200`}
        style={{
          width: "80%",
        }}
      >
        <>
          {selectedChat ? (
            <>
              {/* Header Section */}
              <div className="flex justify-between items-center w-full pb-3 px-2 text-2xl md:text-[30px] font-sans">
                {selectedChat && (
                  <>
                    {
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <img
                          src={
                            selectedChat.avatarGroupChat ??
                            (!selectedChat.isGroupChat
                              ? getSenderAvatar(user, selectedChat.users)
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
                          <p className="text-base font-medium">
                            {!selectedChat.isGroupChat
                              ? getSender(user, selectedChat.users)
                              : selectedChat.chatName}
                          </p>
                        </div>
                      </div>
                    }
                  </>
                )}
                <button
                  className="flex "
                  onClick={() =>
                    dispatch(resetValue({ key: "selectedChat", value: null }))
                  }
                >
                  <CgClose className="text-lg" />
                </button>
              </div>

              {/* Chat Section */}
              <div className="relative flex flex-col justify-end p-3 bg-gray-200 w-full h-full rounded-lg overflow-hidden">
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <svg
                      className="absolute right-100 animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  </div>
                ) : (
                  <div className="w-full overflow-auto">
                    <ScrollableChat
                      selectedChat={selectedChat}
                      messages={messages}
                      user={user}
                    />
                    <div ref={messagesEndRef} />
                  </div>
                )}

                {/* Input Section */}
                <div className="mt-3">
                  {istyping && (
                    <div>
                      <Lottie
                        options={defaultOptions}
                        width={70}
                        style={{ marginBottom: 15, marginLeft: 0 }}
                      />
                    </div>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter a message.."
                    className="h-10 w-full px-3 min-h-10 text-sm pr-10 scroll-hidden py-2 border-gray-300 bg-gray-100 outline-none rounded-md"
                    value={newMessage}
                    onChange={typingHandler}
                    // onKeyDown={sendMessage}
                  />
                  <button
                    data-view-setting
                    type="button"
                    onClick={() => sendMessage()}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <img src={IconSend} data-view-setting className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            // When no chat is selected
            <div className="flex justify-center items-center h-full">
              <span className="text-3xl font-sans pb-3">
                Click on a user to start chatting
              </span>
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default ChatWindow;
