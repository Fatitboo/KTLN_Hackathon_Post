import { Tooltip, Avatar } from "@chakra-ui/react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
// import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages, user }) => {
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => {
          const isSameSenderAsPrevious =
            i > 0 && messages[i - 1].sender._id === m.sender._id;

          return (
            <div className="flex w-full items-start" key={m._id}>
              <div className="w-6 h-6  mt-3 mr-2 " title={m.sender.fullname}>
                {!isSameSenderAsPrevious && m.sender._id !== user.id && (
                  <div className="relative group">
                    <img
                      className="rounded-full "
                      src={m.sender.avatar}
                      alt={`${m.sender.fullname}'s avatar`}
                    />
                    {/* Tooltip */}

                    <div className="text-left z-20 absolute top-5 left-0 w-max bg-gray-800 text-white text-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150">
                      {m.sender.fullname}
                    </div>
                  </div>
                )}
              </div>

              <span
                className="group"
                style={{
                  backgroundColor: `${
                    m.sender._id === user.id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  marginLeft: isSameSenderMargin(messages, m, i, user.id),
                  marginTop: isSameUser(messages, m, i, user.id) ? 3 : 10,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                  position: "relative",
                }}
              >
                {m.content}
                <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 w-max bg-gray-800 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-150">
                  {new Date(m.created_at).toLocaleDateString() +
                    " : " +
                    new Date(m.created_at).toLocaleTimeString()}
                </div>
              </span>
            </div>
          );
        })}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
