import { JobBenefitImage } from "../../../../assets/images";
import { useState } from "react";
import ReactImagePickerEditor from "react-image-picker-editor";
import "react-image-picker-editor/dist/index.css";
import { toast } from "react-toastify";

function HackathonDesign({ formId, formSubmit, config }) {
  let [inputsValues, setInputValues] = useState({
    thumbnail: "",
    headerTitleImage: "",
  });

  function handleSubmit(e) {
    console.log(inputsValues);
    e.preventDefault();
    formSubmit();
  }

  const config1 = {
    borderRadius: "8px",
    language: "en",
    width: "224px",
    height: "224px",
    objectFit: "contain",
    compressInitial: null,
    darkMode: false,
    rtl: false,
  };
  const config2 = {
    borderRadius: "8px",
    language: "en",
    width: "700px",
    height: "112px",
    objectFit: "contain",
    compressInitial: null,
    darkMode: false,
    rtl: false,
  };

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
              <div className="mt-8 w-56 h-56 bg-[#f2f2f2] flex flex-col items-center justify-center border text-sm text-[#6F6F6F] italic">
                <ReactImagePickerEditor
                  config={config1}
                  imageSrcProp={inputsValues.thumbnail}
                  imageChanged={(newDataUri) => {
                    setInputValues({
                      ...inputsValues,
                      thumbnail: newDataUri,
                    });
                  }}
                />
              </div>
            </div>
            <div>
              {TitleDescription(
                "Thumbnail image",
                "Upload one image to be used as a square thumbnail image for your hackathon. View example. This image will be used to represent your hackathon in places such as the Devpost hackathons page. The image must be a JPG, GIF or PNG file, up to 5 MB. For best results crop to 300x300 pixels."
              )}
              <div className="mt-8 w-full h-28 bg-[#f2f2f2] flex flex-col items-center justify-center border text-sm text-[#6F6F6F] italic">
                <ReactImagePickerEditor
                  config={config2}
                  imageSrcProp={inputsValues.headerTitleImage}
                  imageChanged={(newDataUri) => {
                    setInputValues({
                      ...inputsValues,
                      headerTitleImage: newDataUri,
                    });
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default HackathonDesign;
