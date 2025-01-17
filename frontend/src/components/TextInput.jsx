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
      styles,
      label,
      register,
      name,
      error,
      labelStyle,
      onChange,
      rules,
      value,
      onblur,
      oninput,
      vl,
      readOnly,
    },
    ref
  ) => {
    var styleLabel = "block leading-8 text-gray-900 font-medium";
    if (labelStyle) {
      styleLabel = labelStyle;
    }
    return (
      <div className="flex flex-col ">
        {label && (
          <p className={styleLabel}>
            <label className="align-middle mr-1 text-[#FF4949] font-bold">
              {required ? "*" : ""}
            </label>
            {label}
          </p>
        )}
        {description && (
          <p className="text-xs text-[#6F6F6F] italic">{description}</p>
        )}
        <div className="relative mt-[2px] rounded-sm">
          <input
            type={type}
            name={name}
            placeholder={placeHolder}
            onInput={oninput}
            onChange={onChange}
            rules={rules}
            onBlur={onblur}
            ref={ref}
            value={vl}
            defaultValue={value}
            className={`block bg-white focus:bg-white text-base outline-1 shadow-sm w-full rounded-sm py-1 px-3 text-gray-900 border-[1px] border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8 ${styles}`}
            {...register}
            style={{
              borderColor: `${error ? "#a9252b" : ""}`,
              outlineColor: `${error ? "#a9252b" : ""}`,
            }}
            aria-invalid={error ? "true" : "false"}
            readOnly={readOnly}
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
