import { React, useEffect, useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";

export default function CheckBox({
  label,
  listItem,
  filterValueChecked,
  error,
  type,
  rules,
  name,
  selectedItem,
  onBlur,
  require,
  description,
}) {
  const [selected, setSelected] = useState(selectedItem ? selectedItem : []);
  useEffect(() => {
    filterValueChecked(selected);
  }, [selected]);

  useEffect(() => {
    if (selectedItem) setSelected(selectedItem);
  }, [selectedItem]);

  const setSelectedValue = (item) => {
    const list = [...selected.filter((i) => i.id !== item.id)];
    if (selected.length === list.length)
      list.push(listItem.find((i) => i.id === item.id));
    setSelected(list);
  };

  return (
    <div>
      <p
        className="block text-gray-900 text-base font-semibold mb-[2px]"
        style={{ color: `${error ? "#a9252b" : ""}` }}
      >
        <label className="align-middle mr-1 text-[#FF4949] font-bold">
          {require ? "*" : ""}
        </label>
        {label}
      </p>
      <p className="text-sm text-[#6F6F6F] italic">{description}</p>
      <div
        name={name}
        type={type}
        rules={rules}
        value={selected.map((item) => item.id)}
        onBlur={onBlur}
        tabIndex={0}
        className="relative cursor-default"
      >
        <ul className="mt-2 z-10 rounded-md grid grid-flow-row grid-cols-3 gap-2">
          {listItem.map((item, index) => {
            return (
              <li
                key={index}
                value={index}
                onClick={() => setSelectedValue(item)}
                className="flex items-center justify-between bg-white py-1 focus:outline-none text-base text-gray-900 hover:font-normal hover:opacity-90"
              >
                <div className="flex flex-row items-center cursor-pointer border w-full p-2 rounded-md hover:border-[#3f73d3] group">
                  <div className="ml-1">
                    <div className="relative h-7 flex items-center">
                      <div
                        className="absolute bg-[#FFF] border border-[#808082] w-[24px] h-[24px] rounded-[5px] group-hover:bg-[#e1ebff]"
                        style={{
                          borderColor: `${error ? "#a9252b" : "#808082"}`,
                        }}
                        color="#FFF"
                      ></div>
                      <div
                        style={{
                          visibility: `${
                            selected.find((i) => i.id === item.id)
                              ? "visible"
                              : "hidden"
                          }`,
                        }}
                        className={`flex items-center justify-center absolute bg-[#2557a7] w-[24px] h-[24px] rounded-[5px]`}
                        color="#FFF"
                      >
                        <BsCheck color="#FFF" size={"21px"} />
                      </div>
                    </div>
                  </div>
                  <span className="pl-9 text-sm select-none text-[#696969]">
                    {item.name}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {error && (
        <span className="flex flex-row items-center text-sm text-[#a9252b] mt-2">
          <AiFillExclamationCircle className="mr-1" />
          {error}
        </span>
      )}
    </div>
  );
}
