import { useEffect, useRef, useState } from "react";
import { IconLlama, IconResponse, IconSend } from "../../assets/icons";
import { marked } from "marked";
import { CgClose } from "react-icons/cg";
import { BiPaste } from "react-icons/bi";
import { LiaPasteSolid } from "react-icons/lia";

export default function OptimizeContentPopup({ message }) {
  const [popInner, setPopInner] = useState(false);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const responseText = useRef();

  const sendMessage = async () => {
    if (loading) return;
    if (request === "") return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(message, "text/html");

    // Lấy tất cả text content
    const textContent = doc.body.textContent.trim();
    setLoading(true);
    const response = await fetch("http://127.0.0.1:5000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: textContent,
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

  return (
    <div
      className={`flex h-fit flex-col items-center justify-start self-center overflow-hidden border border-gray-300 bg-gray-100 transition-all ease-out
        ${
          popInner
            ? "self-start py-2 px-4 pb-4 shadow-md rounded-md"
            : "rounded-full"
        }`}
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
          <div className="flex flex-rows items-center justify-between">
            {/* <div className="font-semibold">Hackadev Support</div> */}
            <img src="/src/assets/images/Logo.png" alt="" className="h-4"></img>
            <button
              type="button"
              onClick={(e) => {
                setRequest("");
                responseText.current.innerHTML = "";
                setPopInner(!popInner);
              }}
              data-view-setting
              className={
                "h-5 w-5 gap-4 rounded-full text-sm flex items-center justify-center hover:bg-red-600 hover:text-white"
              }
            >
              <CgClose />
            </button>
          </div>
          <div className="h-[1px] bg-slate-300 my-1 mb-2 -mx-3"></div>
          <div data-view-setting className="mb-2 rounded-sm">
            {loading ? (
              <img
                src={IconResponse}
                data-view-setting
                className="h-7 rounded-lg w-8"
              />
            ) : (
              <div className="relative">
                <div
                  ref={responseText}
                  data-view-setting
                  className="w-full overflow-hidden resize-none bg-white p-2 rounded-lg"
                />
                {responseText?.current?.innerHTML !== "" && (
                  <LiaPasteSolid
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard
                          .writeText(responseText.current.innerText)
                          .then(() => {})
                          .catch((err) => {
                            console.error("Failed to copy text:", err);
                          });
                      } else {
                        alert(
                          "Clipboard API is not supported in this browser."
                        );
                      }
                    }}
                    className="absolute top-2 right-0 translate-x-1/2 w-5 h-5 cursor-pointer bg-white rounded-full active:opacity-70"
                  />
                )}
              </div>
            )}
          </div>
          <div className="relative min-w-64" data-view-setting>
            <textarea
              type="text"
              data-view-setting
              rows="5"
              placeholder="Please enter your request..."
              value={request}
              onChange={(e) => {
                setRequest(e.target.value);
              }}
              className="h-10 w-full px-2 text-sm pr-10 scroll-hidden py-2"
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
}
