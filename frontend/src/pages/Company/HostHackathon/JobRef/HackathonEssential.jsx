import { JobBasicImage } from "../../../../assets/images";
import CheckBox from "../InputField/CheckBox";
import ComboBox from "../InputField/ComboBox";
import RadioButton from "../InputField/RadioButton";
import TextInput from "../InputField/TextInput";

function HackathonEssential({ formSubmit, formId, config }) {
  const period = [
    { id: 1, name: "month(s)", value: 30 },
    { id: 2, name: "week(s)", value: 7 },
    { id: 3, name: "day(s)", value: 1 },
    { id: 4, name: "year(s)", value: 365 },
  ];

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

  const filterValuePeriod = (e) => {};

  const onSubmitForm = (e) => {
    e.preventDefault();
    formSubmit();
  };

  return (
    <>
      <div>
        {config ? null : (
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
        )}
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
              name="jobTitle"
              type="text"
              rules="requiredText"
            />

            <TextInput
              label="Tagline"
              type="text"
              description="Create a short tagline to describe your hackathon."
              required
              rules="requiredText|number|positiveNumber|intergerNumber"
              placeHolder="e.g. Create apps and games that enhance math teaching and learning for our middle schools."
              name="numberParticipants"
            ></TextInput>

            <TextInput
              label="Manager contact email (displayed on site)"
              type="text"
              description="Who can participants contact if they have a question about your hackathon? This email address will be public and displayed on site like this."
              required
              rules="requiredText|number|positiveNumber|intergerNumber"
              placeHolder="manager@hackathon.com"
              name="numberParticipants"
            ></TextInput>

            <ComboBox
              label="Host"
              listItem={period}
              name="showBy"
              require
              description="The organization hosting this hackathon."
              placeHolder="e.g. Amazon or Facebook"
              filterValueSelected={filterValuePeriod}
            />
            <CheckBox
              label="Theme Tags"
              name="showBy"
              require
              column={3}
              description="What's your hackathon about? Select up to 3."
              filterValueSelected={filterValuePeriod}
              filterValueChecked={(e) => {}}
              listItem={themeTags}
              placeHolder={"Select an option"}
            />

            <RadioButton
              listItem={hackathonTypes}
              name="isRequire"
              column={3}
              filterValueChecked={(e) => {}}
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
