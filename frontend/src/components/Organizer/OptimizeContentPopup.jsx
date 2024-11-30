import { useEffect, useRef, useState } from "react";
import { IconLlama, IconResponse, IconSend } from "../../assets/icons";
import { marked } from "marked";

export default function OptimizeContentPopup({ message }) {
  const [popInner, setPopInner] = useState(false);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const responseText = useRef();

  const sendMessage = async () => {
    setLoading(true);
    const response = await fetch("http://127.0.0.1:5000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: message,
        instruction: request ?? "Make this more attractive",
      }),
    });
    setLoading(false);
    const reader = response.body.getReader();
    let output = "";

    while (true) {
      const { done, value } = await reader.read();
      output += new TextDecoder().decode(value);
      console.log(output);
      responseText.current.innerHTML = marked.parse(output);

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
      sendMessage(message);
      document.addEventListener("click", _handleClickDocument);
    }
    return () => {
      document.removeEventListener("click", _handleClickDocument);
    };
  }, [popInner]);
  return (
    <div
      className={`flex h-fit flex-col items-center justify-start self-center overflow-hidden border border-gray-300 bg-gray-100 transition-all duration-300 ease-out
        ${popInner ? "self-start p-4 shadow-md rounded-md" : "rounded-full"}`}
      data-view-setting
    >
      <button
        type="button"
        onClick={(e) => {
          setPopInner(!popInner);
        }}
        data-view-setting
        className={`outline outline-1 flex h-9 w-9 items-center gap-4 text-nowrap rounded-full text-sm"
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
          <div data-view-setting className="mb-2 rounded-sm">
            {loading ? (
              <img src={IconResponse} className="h-7 rounded-lg w-8" />
            ) : (
              <div
                ref={responseText}
                data-view-setting
                className="w-full overflow-hidden resize-none bg-white p-2 rounded-lg"
              />
            )}
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
              className="h-10 w-full  px-2 text-sm pr-10 scroll-hidden py-2"
            ></textarea>
            <button
              data-view-setting
              type="button"
              onClick={sendMessage}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <img src={IconSend} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
