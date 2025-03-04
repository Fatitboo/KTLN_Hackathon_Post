import { JobBenefitImage } from "../../../../assets/images";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import baseUrl from "@/utils/baseUrl";

function HackathonDesign({ formId, formSubmit }) {
  const param = useParams();
  const [inputsValues, setInputValues] = useState({
    thumbnail: null,
    headerTitleImage: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await handleUpload();
    console.log(data);
    formSubmit(data);
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

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: files[0],
    }));
  };

  const handleUpload = async () => {
    const updatedInputsValues = { ...inputsValues }; // Giữ lại giá trị cũ

    for (const [key, file] of Object.entries(updatedInputsValues)) {
      if (!file || typeof file == "string") continue;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "nhanle");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dcdjan0oo/image/upload`,
          formData
        );
        updatedInputsValues[key] = response.data.secure_url; // Lưu URL vào inputsValues
        console.log(`${key} uploaded successfully:`, response.data.secure_url);
      } catch (error) {
        console.error(`Error uploading ${key}:`, error);
      }
    }

    return updatedInputsValues; // Cập nhật state với URL đã upload
  };

  useEffect(() => {
    fetch(`${baseUrl}/api/v1/hackathons/component/${param.id}/${formId}`)
      .then((response) => response.json())
      .then((result) => {
        const { _id, ...rest } = result;
        setInputValues({ ...inputsValues, ...rest });
      });
  }, []);

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
              <div>
                <div className="mt-8 w-56 h-56 bg-[#f2f2f2] flex flex-col items-center justify-center border text-sm text-[#6F6F6F] italic mb-1">
                  <div className="w-full h-full flex items-center justify-center">
                    {inputsValues.thumbnail && (
                      <img
                        className="w-full h-full"
                        src={
                          typeof inputsValues.thumbnail == "string"
                            ? inputsValues.thumbnail
                            : URL.createObjectURL(inputsValues.thumbnail)
                        }
                        alt="Uploaded"
                      />
                    )}
                  </div>
                </div>
                <input
                  type="file"
                  name="thumbnail"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div>
              {TitleDescription(
                "Thumbnail image",
                "Upload one image to be used as a square thumbnail image for your hackathon. View example. This image will be used to represent your hackathon in places such as the Devpost hackathons page. The image must be a JPG, GIF or PNG file, up to 5 MB. For best results crop to 300x300 pixels."
              )}
              <div>
                <div className="mt-8 w-full h-28 bg-[#f2f2f2] flex flex-col items-center justify-center border text-sm text-[#6F6F6F] italic mb-1">
                  <div>
                    {inputsValues.headerTitleImage && (
                      <img
                        src={
                          typeof inputsValues.headerTitleImage == "string"
                            ? inputsValues.headerTitleImage
                            : URL.createObjectURL(inputsValues.headerTitleImage)
                        }
                        alt="Uploaded"
                        className="w-full h-full"
                      />
                    )}
                  </div>
                </div>
                <input
                  type="file"
                  name="headerTitleImage"
                  onChange={handleImageChange}
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
