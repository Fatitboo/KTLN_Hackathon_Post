import { JobBenefitImage } from "../../../../assets/images";
import { useState } from "react";

import { toast } from "react-toastify";

function HackathonDesign({ formId, formSubmit, config }) {
  let [inputsValues, setInputValues] = useState({
    showPayBy: { id: -1, name: "" },
    pay_1: "",
    pay_2: "",
    rate: { id: -1, name: "" },
  });

  let [errors, setErrors] = useState({});

  let [ErrorMessages, setErrorMessages] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    formSubmit();
  }
  const notify = (type, message) => toast(message, { type: type });

  const TitleDescription = (title, description) => {
    return (
      <div>
        <p className="block leading-6 text-gray-900 text-base font-semibold">
          <label className="align-middle mr-1 text-[#FF4949] font-bold">
            *
          </label>
          {title}
        </p>

        <p className="text-sm text-[#6F6F6F] italic">{description}</p>
      </div>
    );
  };

  return (
    <>
      <div>
        <div className="flex flex-row justify-between bg-[#faf9f8] rounded-xl -mx-8">
          <div className="flex items-center m-8">
            <span className="text-[#2D2D2D] text-[28px] font-bold">Design</span>
          </div>
          <div className="col-span-3 flex mr-8">
            <img
              src={JobBenefitImage}
              alt=""
              className="h-52 overflow-hidden"
            />
          </div>
        </div>

        <div className="p-8">
          <form
            id={formId}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div>
              {TitleDescription(
                "Thumbnail image",
                "Upload one image to be used as a square thumbnail image for your hackathon. View example. This image will be used to represent your hackathon in places such as the Devpost hackathons page. The image must be a JPG, GIF or PNG file, up to 5 MB. For best results crop to 300x300 pixels."
              )}
              <div className="mt-1 w-56 h-56 bg-[#f2f2f2] flex flex-col items-center justify-center border text-sm text-[#6F6F6F] italic">
                <div>5 MB - JPG, PNG, GIF</div>
                <div>1:1 aspect ratio</div>
                <button className="bg-[#808080] font-bold rounded-lg text-white py-1 px-3 mt-2">
                  Select image
                </button>
              </div>
            </div>
            <div>
              {TitleDescription(
                "Thumbnail image",
                "Upload one image to be used as a square thumbnail image for your hackathon. View example. This image will be used to represent your hackathon in places such as the Devpost hackathons page. The image must be a JPG, GIF or PNG file, up to 5 MB. For best results crop to 300x300 pixels."
              )}
              <div className="mt-1 w-full h-28 bg-[#f2f2f2] flex flex-col items-center justify-center border text-sm text-[#6F6F6F] italic">
                <div>5 MB - JPG, PNG, GIF</div>
                <button className="bg-[#808080] font-bold rounded-lg text-white py-1 px-3 mt-2">
                  Select image
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default HackathonDesign;
