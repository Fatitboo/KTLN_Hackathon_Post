import { useState } from "react";
import { JobRefImage } from "../../../../assets/images";
import { TextInput } from "../../../../components";
import ComboBox from "../InputField/ComboBox";
import { IoMdClose } from "react-icons/io";

function HackathonToDos({ formId, formSubmit, config }) {
  function handleSubmit(e) {
    e.preventDefault();
    formSubmit(inputValues);
  }

  const actionList = [
    { id: 1, name: "download" },
    { id: 2, name: "signup" },
    { id: 3, name: "register" },
    { id: 4, name: "read" },
    { id: 5, name: "review" },
    { id: 6, name: "attend" },
    { id: 7, name: "request" },
    { id: 8, name: "go" },
  ];

  const [inputValues, setInputValues] = useState({
    communityChatLink: "",
    tasks: [],
  });

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

  const onChangeValueTask = (type, value, index) => {
    setInputValues({
      ...inputValues,
      tasks: inputValues.tasks.map((item, i) => {
        return i == index ? { ...item, [type]: value } : { ...item };
      }),
    });
  };

  return (
    <>
      <div className="flex flex-row justify-between bg-[#faf9f8] rounded-xl -mx-8">
        <div className="flex items-center m-8">
          <span className="text-[#2D2D2D] text-[28px] font-bold">To-dos</span>
        </div>
        <div className="col-span-3 flex mr-8">
          <img src={JobRefImage} alt="" className="h-52 overflow-hidden" />
        </div>
      </div>
      <div className="p-8">
        <form
          id={formId}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <TextInput
            label="Community chat"
            description="If the hackathon has a Slack, Discord chat or Facebook group add the the join link, this will be made available to registered participants."
            required
            type="text"
            onChange={(e) => {
              setInputValues({
                ...inputValues,
                communityChatLink: e.target.value,
              });
            }}
            placeHolder="Slack or Discord invitation link or Facebook group URL"
          />

          <div>
            {TitleDescription(
              "Additional actions",
              "Add up to 3 additional actions for participants to help them create a great submission e.g. 'Download SDK' or 'Signup for a dev account'."
            )}
            {inputValues.tasks.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="flex flex-row items-center gap-2 -mt-[20px]"
                >
                  <div className="w-52 mt-[10px]">
                    <ComboBox
                      listItem={actionList}
                      name="participantAge"
                      selectItem={
                        actionList.find((i) => i.name == item.type) ?? {
                          id: -1,
                          name: "",
                        }
                      }
                      filterValueSelected={(value) => {
                        setInputValues({
                          ...inputValues,
                          tasks: inputValues.tasks.map((i) =>
                            i.id == item.id
                              ? { ...i, type: value.name }
                              : { ...i }
                          ),
                        });
                      }}
                      placeHolder={"Select an options."}
                    />
                  </div>
                  <TextInput
                    type="text"
                    rules="requiredText"
                    vl={item.label}
                    onChange={(e) =>
                      onChangeValueTask("label", e.target.value, index)
                    }
                    placeHolder="Label"
                  />
                  <TextInput
                    type="text"
                    vl={item.url}
                    onChange={(e) =>
                      onChangeValueTask("url", e.target.value, index)
                    }
                    rules="requiredText"
                    placeHolder="URL"
                  />
                  <IoMdClose
                    color="red"
                    width={"20px"}
                    height={"20px"}
                    onClick={() => {
                      let newList = [...inputValues.tasks];
                      newList.splice(index, 1);
                      setInputValues({
                        ...inputValues,
                        tasks: [...newList],
                      });
                    }}
                    className="mt-8 cursor-pointer ml-4"
                  />
                </div>
              );
            })}
            <div
              className="text-blue-600 font-bold cursor-pointer mt-1"
              onClick={() => {
                const newArr = [...inputValues.tasks];
                newArr.push({
                  id: Date.now(),
                  type: "",
                  label: "",
                  url: "",
                });
                setInputValues({
                  ...inputValues,
                  tasks: newArr,
                });
              }}
            >
              Add task
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default HackathonToDos;
