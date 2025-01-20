import { useState } from "react";
import { BiInfoCircle } from "react-icons/bi";

export default function InfoPopup({ information }) {
  const [popInner, setPopInner] = useState(false);
  return (
    <div
      className={`relative flex h-fit flex-col items-center justify-start self-center`}
    >
      <BiInfoCircle
        onMouseMove={() => {
          setPopInner(true);
        }}
        onMouseLeave={() => {
          setPopInner(false);
        }}
      />
      <textarea
        readOnly
        className={`absolute shadow-md bg-white p-2 top-5 z-50 flex cursor-default flex-col gap-3 bg-inherit text-xs text-gray-600 ${
          popInner ? "block w-60" : "hidden"
        }`}
      >
        {information}
      </textarea>
    </div>
  );
}
