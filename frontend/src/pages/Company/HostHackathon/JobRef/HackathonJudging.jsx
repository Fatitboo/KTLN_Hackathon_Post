import { useRef, useState } from "react";
import { JobBasicImage } from "../../../../assets/images";
import CheckBox from "../InputField/CheckBox";
import RadioButton from "../InputField/RadioButton";
import TextInput from "../InputField/TextInput";
import { IoIosClose } from "react-icons/io";
import { CustomButton } from "../../../../components";
// import ReactImagePickerEditor from "react-image-picker-editor";
import { BsCheck } from "react-icons/bs";
import axios from "axios";

function HackathonJudging({ formSubmit, formId, config }) {
  const [inputValues, setInputValues] = useState({
    judgingType: "",
    judgingPeriod: {
      start: "",
      end: "",
    },
    judges: [],
    criteria: [],
  });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const uploadedJudges = await handleUpload(inputValues.judges);
    const data = {
      ...inputValues,
      judges: uploadedJudges,
    };
    console.log(data);
    formSubmit(data);
  };

  const judgingTypes = [
    {
      type: "ONLINE",
      des: "Judges will log onto Devpost to score each project.",
      subDes: "(This is the preferred method for online hackathons.)",
    },
    {
      type: "OFFLINE",
      des: "Judges will review projects via expo / demos / presentations.",
      subDes: "(This method is frequently used at in-person hackathons)",
    },
  ];

  const onChangeValueTextInput = (type, e) => {
    setInputValues({
      ...inputValues,
      judgingPeriod: { ...inputValues.judgingPeriod, [type]: e.target.value },
    });
  };

  const onChangeText = (type, subtype, id, e) => {
    setInputValues({
      ...inputValues,
      [type]: inputValues[type].map((i) =>
        i.id === id ? { ...i, [subtype]: e } : { ...i }
      ),
    });
  };

  const handleUpload = async (judgePhotos) => {
    const updatedJudges = [];

    for (const judge of judgePhotos) {
      const { photo, id } = judge;
      if (!photo) continue;

      const formData = new FormData();
      formData.append("file", photo);
      formData.append("upload_preset", "nhanle");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dcdjan0oo/image/upload`,
          formData
        );
        const photoUrl = response.data.secure_url;
        console.log(`Photo for judge ${id} uploaded successfully: ${photoUrl}`);

        // Cập nhật đối tượng judge với URL ảnh mới
        updatedJudges.push({ ...judge, photo: photoUrl });
      } catch (error) {
        console.error(`Error uploading photo for judge ${id}:`, error);
      }
    }

    return updatedJudges;
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

  const handleImageChange = (type, id, e) => {
    const { name, files } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      judges: prevValues.judges.map((item) =>
        item.id === id ? { ...item, [type]: files[0] } : { ...item }
      ),
    }));
  };

  return (
    <>
      <div>
        <div className="bg-[#faf9f8] rounded-xl grid grid-cols-5 gap-4 -mx-8">
          <div className="col-span-2 flex items-center m-8">
            <span className="text-[#2D2D2D] text-[28px] font-bold">
              Judging
            </span>
          </div>
          <div className="col-span-3 flex mr-12 justify-end">
            <img src={JobBasicImage} className="h-52 overflow-hidden" />
          </div>
        </div>
        <div className="p-8">
          <form
            id={formId}
            onSubmit={onSubmitForm}
            className="flex flex-col gap-5"
          >
            {TitleDescription(
              "Are you using online or offline judging?",
              "You can edit this choice until the submission period ends"
            )}

            {judgingTypes.map((item, index) => {
              return (
                <li
                  key={index}
                  value={index}
                  onClick={() => {
                    setInputValues({
                      ...inputValues,
                      judgingType: item.type,
                    });
                  }}
                  className="flex items-center justify-between py-0 px-5 focus:outline-none text-base text-gray-900 hover:font-normal hover:opacity-90"
                >
                  <div className="flex flex-row items-center cursor-pointer">
                    <div>
                      <div className="relative h-7 flex items-center">
                        <div
                          className="absolute bg-[#FFF] border border-[#808082] w-[18px] h-[18px] rounded-[10px]"
                          color="#FFF"
                        ></div>
                        <div
                          className={`${
                            inputValues.judgingType === item.type
                              ? ""
                              : "hidden"
                          } flex items-center justify-center absolute bg-[#1967d2] w-[18px] h-[18px] rounded-[10px]`}
                          color="#FFF"
                        >
                          <BsCheck color="#FFF" />
                        </div>
                      </div>
                    </div>
                    <span className="pl-7 text-base select-none text-[#6F6F6F] flex flex-col">
                      <div className="flex flex-row items-center">
                        {item.type}
                        <div className="text-[#696969] text-sm">
                          - {item.des}
                        </div>
                      </div>
                      <span className="text-sm select-none text-[#696969]">
                        {item.subDes}
                      </span>
                    </span>
                  </div>
                </li>
              );
            })}

            {TitleDescription(
              "Judging Period (mm/dd/yyyy)",
              "MM/DD/YYYY format. All times are in Eastern Time (US & Canada) (EDT)"
            )}
            <TextInput
              label="Start"
              required
              vl={inputValues.judgingPeriod.start}
              onChange={(value) => onChangeValueTextInput("start", value)}
              type="datetime-local"
            />

            <TextInput
              label="Ends"
              required
              vl={inputValues.judgingPeriod.end}
              onChange={(value) => onChangeValueTextInput("end", value)}
              type="datetime-local"
            />

            {TitleDescription(
              "Judges",
              "Add your judges here and their name, title, and photo will be displayed on the hackathon site. (We won't display emails.)"
            )}

            {inputValues.judges?.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="bg-[#f7f7f7] p-5 rounded-lg flex flex-col gap-2"
                >
                  <div className="w-2/5">
                    <TextInput
                      label="Full name"
                      required
                      vl={item.fullName}
                      onChange={(e) =>
                        onChangeText(
                          "judges",
                          "fullName",
                          item.id,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="w-2/5">
                    <TextInput
                      label="Email or Hackadev username"
                      required
                      vl={item.email}
                      onChange={(e) =>
                        onChangeText("judges", "email", item.id, e.target.value)
                      }
                    />
                  </div>
                  <div className="w-2/5">
                    <TextInput
                      label="Title / Company"
                      required
                      vl={item.title}
                      onChange={(e) =>
                        onChangeText("judges", "title", item.id, e.target.value)
                      }
                    />
                  </div>
                  <div className="text-gray-900 font-medium">Photo</div>
                  <div>
                    <div className="mt-8 w-56 h-56 bg-[#f2f2f2] flex flex-col items-center justify-center border text-sm text-[#6F6F6F] italic mb-1">
                      <div className="w-full h-full">
                        {item.photo && (
                          <img
                            src={URL.createObjectURL(item.photo)}
                            alt="Uploaded"
                            className="w-full h-full"
                          />
                        )}
                      </div>
                    </div>
                    <input
                      type="file"
                      name="photo"
                      onChange={(e) => handleImageChange("photo", item.id, e)}
                    />
                  </div>

                  <div
                    className="text-[#1D4ED8] cursor-pointer mt-1 font-semibold w-14"
                    onClick={() => {
                      setInputValues({
                        ...inputValues,
                        judges: inputValues.judges.filter(
                          (i) => i.id !== item.id
                        ),
                      });
                    }}
                  >
                    Cancel
                  </div>
                </div>
              );
            })}

            <button
              className="bg-[#1D4ED8] text-white rounded-lg py-1 font-semibold flex items-center justify-center w-28 hover:opacity-90"
              onClick={(e) => {
                e.preventDefault();
                const newArr = [...inputValues.judges];
                newArr.push({
                  id: Date.now(),
                  fullName: "",
                  email: "",
                  title: "",
                  photo: "",
                });
                setInputValues({
                  ...inputValues,
                  judges: newArr,
                });
              }}
            >
              Add judges
            </button>

            {TitleDescription(
              "Criteria",
              "Add criteria to help participants understand how they'll be judged."
            )}

            {inputValues.criteria?.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="bg-[#f7f7f7] p-5 rounded-lg flex flex-col gap-2"
                >
                  <div className="w-2/5">
                    <TextInput
                      label="Title"
                      required
                      vl={item.title}
                      onChange={(e) =>
                        onChangeText(
                          "criteria",
                          "title",
                          item.id,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="w-5/6">
                    <div className="text-gray-900 font-medium">Description</div>
                    <textarea
                      className="w-5/6 p-2"
                      value={item.description}
                      onChange={(e) =>
                        onChangeText(
                          "criteria",
                          "description",
                          item.id,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div
                    className="text-[#1D4ED8] cursor-pointer mt-1 font-semibold w-14"
                    onClick={() => {
                      setInputValues({
                        ...inputValues,
                        criteria: inputValues.criteria.filter(
                          (i) => i.id !== item.id
                        ),
                      });
                    }}
                  >
                    Cancel
                  </div>
                </div>
              );
            })}

            <button
              className="bg-[#1D4ED8] text-white rounded-lg py-1 font-semibold flex items-center justify-center w-28 hover:opacity-90"
              onClick={(e) => {
                e.preventDefault();
                const newArr = [...inputValues.criteria];
                newArr.push({
                  id: Date.now(),
                  title: "",
                  description: "",
                });
                setInputValues({
                  ...inputValues,
                  criteria: newArr,
                });
              }}
            >
              Add criteria
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default HackathonJudging;
