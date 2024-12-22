import React, { useState } from "react";

const MultiSelectDropdown = ({
  options,
  setSelectedOptions,
  selectedOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (option) => {
    setSelectedOptions((prev) => {
      if (option === "All") {
        return prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [option];
      }
      return prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option].filter((i) => i !== "All");
    });
  };

  const handleOutsideClick = (event) => {
    if (event.target.closest(".dropdown")) return;
    setIsOpen(false);
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="dropdown relative inline-block">
      <button
        onClick={toggleDropdown}
        className="bg-white border border-gray-200 text-black px-4 py-2 rounded-sm focus:outline-none"
      >
        Selected filter tags
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 h-40 overflow-y-auto  bg-white border border-gray-300 rounded-sm shadow-lg z-10">
          {options.map((option) => (
            <label
              key={option.value}
              className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleOptionChange(option.value)}
                className="mr-2"
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
