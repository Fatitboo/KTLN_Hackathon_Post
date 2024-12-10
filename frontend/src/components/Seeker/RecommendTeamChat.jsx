import React, { useEffect, useRef, useState } from "react";
import { IconLlama, IconResponse, IconSend } from "../../assets/icons";
import { marked } from "marked";

const RecommendTeamChat = () => {
  const [popInner, setPopInner] = useState(false);
  const [request, setRequest] = useState("");
  const [loading, setLoading] = useState(false);

  const [comunications, setCommunications] = useState({
    system: ["Hello Nhan, Could you tell me some specific skills?"],
    user: [],
  });
  const responseText = useRef();

  const sendMessage = async () => {
    if (request === "") return;
    setCommunications((prev) => ({
      ...prev,
      user: [...prev.user, request],
    }));
    setRequest("");
    setLoading(true);
    const response = await fetch("http://127.0.0.1:5000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: request,
        instruction: "skill",
      }),
    });
    setLoading(false);
    const reader = response.body.getReader();
    let output = "I get it, your skills are ";

    let res = [...comunications.system];
    res.push("");

    while (true) {
      const { done, value } = await reader.read();
      output += new TextDecoder().decode(value);

      res[res.length - 1] = output;
      setCommunications((prev) => ({
        ...prev,
        system: [...res],
      }));

      if (done) {
        return;
      }
    }
  };

  useEffect(() => {
    const _handleClickDocument = (e) => {
      const target = e.target;
      if (
        target instanceof HTMLElement &&
        target.getAttribute("data-view-setting") === "true"
      ) {
        return;
      }
      if (
        target instanceof HTMLDivElement &&
        target.getAttribute("data-testid") === "flowbite-toggleswitch-toggle"
      ) {
        return;
      }
      setPopInner(false);
      document.removeEventListener("click", _handleClickDocument);
    };
    if (popInner) {
      //   sendMessage(message);
      document.addEventListener("click", _handleClickDocument);
    }
    return () => {
      document.removeEventListener("click", _handleClickDocument);
    };
  }, [popInner]);

  return (
    <div
      className={`outline outline-1 flex h-fit flex-col items-center bg-white justify-start rounded-md self-center overflow-hidden border transition-all duration-400 ease-out
          ${popInner && "self-start p-4 shadow-md"}`}
      data-view-setting
    >
      <button
        type="button"
        onClick={(e) => {
          setPopInner(!popInner);
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
          src={IconLlama}
          alt="logo Github"
          className="w-full h-full rounded-full"
        />
      </button>
      <div
        data-view-setting
        className={`flex cursor-default flex-col gap-3 bg-inherit text-xs text-gray-600 ${
          popInner ? "block" : "hidden"
        }`}
      >
        <div data-view-setting className="max-w-xs">
          <div className="overflow-y-scroll scrollbar-hidden max-h-80">
            <div
              data-view-setting
              className="mb-3 rounded-sm flex gap-3 flex-col"
            >
              {comunications.system
                .map((el, index) =>
                  comunications.user[index]
                    ? [el, comunications.user[index]]
                    : [el]
                )
                .flat()
                .map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex items-end gap-2 ${
                        index % 2 === 1
                          ? "  justify-end self-end ml-16"
                          : "justify-start"
                      }`}
                    >
                      {index % 2 === 0 && (
                        <img
                          src={IconLlama}
                          className="w-6 h-6 rounded-full outline outline-1 mb-1 ml-[1px]"
                        />
                      )}
                      <div
                        data-view-setting
                        ref={responseText}
                        className={` w-fit items-center h-fit overflow-hidden resize-none border-gray-300 text-sm px-3 py-2 rounded-lg
                            ${
                              index % 2 === 1
                                ? "bg-[#166FFF] text-white"
                                : "bg-[#F4F4F4]"
                            }`}
                      >
                        {item}
                      </div>
                    </div>
                  );
                })}
              {loading && (
                <div className="flex items-center gap-2">
                  <img
                    src={IconLlama}
                    className="w-6 h-6 rounded-full outline outline-1 mb-1 ml-[1px]"
                  />
                  <img src={IconResponse} className="h-7 rounded-lg w-8" />
                </div>
              )}
            </div>
          </div>
          <div className="relative">
            <textarea
              type="text"
              data-view-setting
              rows="5"
              value={request}
              onChange={(e) => {
                setRequest(e.target.value);
              }}
              className="h-10 w-80 px-3 min-h-10 text-sm pr-10 scroll-hidden py-2 border-gray-300 bg-gray-100 outline-none rounded-md"
            ></textarea>
            <button
              data-view-setting
              type="button"
              onClick={sendMessage}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <img src={IconSend} data-view-setting className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendTeamChat;
