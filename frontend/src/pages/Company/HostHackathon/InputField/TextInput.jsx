import React from "react";
import { AiFillExclamationCircle } from "react-icons/ai";

// eslint-disable-next-line react/display-name
const TextInput = React.forwardRef(
  (
    {
      type,
      placeHolder,
      description,
      required,
      label,
      name,
      error,
      onChange,
      value,
      onBlur,
    },
    rest
  ) => {
    return (
      <div className="flex flex-col ">
        <p className="block text-gray-900 font-medium mb-[2px]">
          <label className="align-middle mr-1 text-[#FF4949] font-bold">
            {required ? "*" : ""}
          </label>
          {label}
        </p>
        <p className="text-sm text-[#6F6F6F] italic">{description}</p>
        <div className="relative mt-[2px] rounded-md">
          <input
            type={type}
            name={name}
            placeholder={placeHolder}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            className="block bg-[#f9fbfc] focus:bg-white text-base outline-1 shadow-sm w-full rounded-md py-2 pl-5 pr-5 text-gray-900 border-[1px] border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8"
            aria-invalid={error ? "true" : "false"}
            {...rest}
          />
          {error && (
            <span className="flex flex-row items-center text-sm text-[#a9252b] mt-2">
              <AiFillExclamationCircle className="mr-1" />
              {error}
            </span>
          )}
        </div>
      </div>
    );
  }
);

export default TextInput;
