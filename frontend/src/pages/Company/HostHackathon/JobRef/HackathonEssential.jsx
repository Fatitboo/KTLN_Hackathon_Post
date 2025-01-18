import { useEffect, useRef, useState } from "react";
import { JobBasicImage } from "../../../../assets/images";
import CheckBox from "../InputField/CheckBox";
import RadioButton from "../InputField/RadioButton";
import TextInput from "../InputField/TextInput";
import { IoIosClose } from "react-icons/io";
import { useParams } from "react-router-dom";

function HackathonEssential({ formSubmit, formId }) {
  const param = useParams();

  const [listSkillApi, setListSkillApi] = useState([]);
  const [spin, setSpin] = useState(false);
  const [skills, setSkills] = useState([]);
  const [inputValues, setInputValues] = useState({
    hackathonName: "",
    tagline: "",
    managerMail: "",
    hostName: "",
    hackathonTypes: [],
    applyFor: "",
  });

  const themeTags = [
    { id: 1, name: "AR/VR" },
    { id: 2, name: "Beginner Friendly" },
    { id: 3, name: "Blockchain" },
    { id: 4, name: "Communication" },
    { id: 5, name: "COVID-19" },
    { id: 6, name: "Cybersecurity" },
    { id: 7, name: "Databases" },
    { id: 8, name: "Design" },
    { id: 9, name: "DevOps" },
    { id: 10, name: "E-commerce/Retail" },
    { id: 11, name: "Education" },
    { id: 12, name: "Enterprise" },
    { id: 13, name: "Fintech" },
    { id: 14, name: "Gaming" },
    { id: 15, name: "Health" },
    { id: 16, name: "IoT" },
    { id: 17, name: "Lifehacks" },
    { id: 18, name: "Low/No Code" },
    { id: 19, name: "Machine Learning/AI" },
    { id: 20, name: "Mobile" },
    { id: 21, name: "Music/Art" },
    { id: 22, name: "Open Ended" },
    { id: 23, name: "Productivity" },
    { id: 24, name: "Quantum" },
    { id: 25, name: "Robotic Process Automation" },
    { id: 26, name: "Social Good" },
    { id: 27, name: "Voice skills" },
    { id: 28, name: "Web" },
  ];

  const hackathonTypes = [
    { id: 1, name: "College/University" },
    { id: 2, name: "High School" },
    { id: 3, name: "Civic" },
  ];

  const onSubmitForm = (e) => {
    e.preventDefault();
    formSubmit(inputValues);
  };

  const inputBox = useRef();

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: new Headers(),
  };

  const fetchDataSkill = (value) => {
    if (value === "") {
      setListSkillApi([]);
    } else {
      setSpin(true);
      fetch(
        "https://thingproxy.freeboard.io/fetch/https://manage.devpost.com/organizations?q=" +
          value,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setListSkillApi([
            ...result["organizations"].map((item) => item.name),
          ]);
          setSpin(false);
        })
        .catch((error) => {
          setSpin(false);
          console.log(error);
        });
    }
  };

  const onChangeValueTextInput = (type, e) => {
    setInputValues({
      ...inputValues,
      [type]: e.target.value,
    });
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/hackathons/${param.id}/${formId}`)
      .then((response) => response.json())
      .then((result) => {
        const { _id, ...rest } = result;
        setInputValues({ ...inputValues, ...rest });
        const { hackathonTypes } = result;
        setSkills([...hackathonTypes]);
      });
  }, []);

  return (
    <>
      <div>
        <div className="bg-[#faf9f8] rounded-xl grid grid-cols-5 gap-4 -mx-8">
          <div className="col-span-2 flex items-center m-8">
            <span className="text-[#2D2D2D] text-[28px] font-bold">
              Essentials
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
            <TextInput
              label="Name"
              description="Enter the name of your hackathon. Make it distinctive and memorable! Less is more."
              required
              value={inputValues?.hackathonName}
              onChange={(value) =>
                onChangeValueTextInput("hackathonName", value)
              }
              name="jobTitle"
              type="text"
              rules="requiredText"
            />

            <TextInput
              label="Tagline"
              type="text"
              description="Create a short tagline to describe your hackathon."
              required
              value={inputValues?.tagline}
              onChange={(value) => onChangeValueTextInput("tagline", value)}
              placeHolder="e.g. Create apps and games that enhance math teaching and learning for our middle schools."
              name="numberParticipants"
            ></TextInput>

            <TextInput
              label="Manager contact email (displayed on site)"
              type="text"
              description="Who can participants contact if they have a question about your hackathon? This email address will be public and displayed on site like this."
              required
              value={inputValues.managerMail}
              onChange={(value) => onChangeValueTextInput("managerMail", value)}
              rules="requiredText|number|positiveNumber|intergerNumber"
              placeHolder="manager@hackathon.com"
              name="numberParticipants"
            ></TextInput>

            <div>
              <p className="block leading-8 text-gray-900 text-base font-semibold mb-1">
                Host
              </p>
              <div
                tabIndex={0}
                onBlur={() => setListSkillApi([])}
                className={`relative flex flex-row gap-1 flex-wrap items-center w-full bg-white focus:bg-white focus:border-gray-900 text-base shadow-sm rounded-md pl-5 py-2 text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
              >
                {skills?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row items-center rounded-[4px] gap-1 bg-[#1967d3] text-white p-1 h-8"
                    >
                      <div className="whitespace-nowrap">{item}</div>
                      <div
                        className="cursor-pointer"
                        onClick={() =>
                          setSkills(skills.filter((i) => i != item))
                        }
                      >
                        <IoIosClose />
                      </div>
                    </div>
                  );
                })}
                <div className="flex-1">
                  <input
                    type="text"
                    ref={inputBox}
                    readOnly={skills.length === 1}
                    onBlur={(e) => e.stopPropagation()}
                    onChange={(e) => fetchDataSkill(e.target.value)}
                    className={`min-w-5 w-full block focus:outline-none bg-white focus:bg-white text-base shadow-sm rounded-md pr-5 text-gray-900 border-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-8`}
                  />
                </div>

                {spin ? (
                  <svg
                    className="absolute right-1 animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="#cccccc"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
              </div>
              <div
                className="relative"
                style={{
                  visibility:
                    listSkillApi.length === 0 ? "collapse" : "visible",
                }}
              >
                <div className="border mt-1 rounded overflow-auto absolute z-10 w-full max-h-56">
                  {listSkillApi.map((item, index) => {
                    return (
                      <div
                        onClick={() => {
                          skills
                            ? !skills.includes(item) &&
                              setSkills([...skills, item])
                            : setSkills([item]);
                          setInputValues({
                            ...inputValues,
                            hostName: item,
                          });
                          inputBox.current.value = "";
                          setListSkillApi([]);
                        }}
                        key={index}
                        className={`hover:bg-[#eef1f2]  block focus:outline-none bg-white focus:bg-white text-base shadow-sm py-2.5 pl-5 pr-5 text-gray-90 placeholder:text-gray-400 sm:text-base sm:leading-8 cursor-pointer`}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <CheckBox
              label="Theme Tags"
              name="showBy"
              require
              column={3}
              description="What's your hackathon about? Select up to 3."
              selectedItem={
                themeTags.filter((item) =>
                  inputValues.hackathonTypes.includes(item.name)
                ) ?? []
              }
              filterValueChecked={(e) => {
                setInputValues({
                  ...inputValues,
                  hackathonTypes: e.map((item) => item.name),
                });
              }}
              listItem={themeTags}
              placeHolder={"Select an option"}
            />

            <RadioButton
              listItem={hackathonTypes}
              name="isRequire"
              column={3}
              selectedItem={
                hackathonTypes.find(
                  (item) => inputValues.applyFor === item.name
                ) ?? []
              }
              filterValueChecked={(e) => {
                setInputValues({
                  ...inputValues,
                  applyFor: e.name,
                });
              }}
              label="What type of hackathon is this?"
              require
              description="Knowing more about the type of hackathon you're running helps us provide the best support."
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default HackathonEssential;
