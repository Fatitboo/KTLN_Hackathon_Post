import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa";
import baseUrl from "@/utils/baseUrl";

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadNotifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Để fetch notification từ API
  useEffect(() => {
    const fetchNotifications = async () => {
      if (isOpen) {
        try {
          const response = await axios.get(
            baseUrl + "/api/v1/notifications?isRead=false",
            { withCredentials: true }
          ); // Thay bằng URL API của bạn
          console.log("🚀 ~ fetchNotifications ~ response:", response.data);

          setNotifications(response.data);
        } catch (error) {
          console.error("Failed to fetch notifications", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchNotifications();
  }, [isOpen]);

  const toggleNotifications = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button onClick={toggleNotifications} className="relative">
        <FaBell className="text-gray-700" size={20} />
        {unreadNotifications.length > 0 && (
          <span className="absolute top-2 left-3 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {unreadNotifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg border  p-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="space-y-2">
              {unreadNotifications.length === 0 ? (
                <>Nothing to show</>
              ) : (
                <div>
                  {" "}
                  {unreadNotifications.map((noti, index) => (
                    <li
                      key={index}
                      className={`p-3 ${
                        noti.read ? "text-gray-600" : "text-blue-600"
                      } border-b border-gray-200`}
                    >
                      {/* Title and Content */}
                      <div className="font-semibold text-sm">{noti.title}</div>
                      <p className="text-sm text-ellipsis text-black line-clamp-2">
                        {noti.content}
                      </p>

                      {/* Sender and Link */}
                      {/* <div className="flex items-center mt-2">
                        <img
                          src={noti.sender.avatar}
                          alt={noti.sender.name}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span className="text-xs text-gray-500">
                          {noti.sender.name}
                        </span>
                      </div> */}

                      {/* Time and Location */}
                      {/* <div className="text-xs text-gray-400 mt-1">
                        <span>{new Date(noti.create_at).toLocaleString()}</span>
                        <br />
                        <span>{`Location: ${noti.additionalData.hackathonLocation}`}</span>
                      </div> */}

                      {/* Hackathon Link */}
                      {noti.additionalData.linkDetails && (
                        <a
                          href={noti.additionalData.linkDetails}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 text-sm mt-2 block"
                        >
                          View Hackathon Details
                        </a>
                      )}
                    </li>
                  ))}
                </div>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
