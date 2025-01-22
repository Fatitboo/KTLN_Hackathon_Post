import { JobBasicImage } from "../../../../assets/images";
import TextInput from "../InputField/TextInput";
import { useEffect, useState } from "react";
import ComboBox from "../InputField/ComboBox";
import { useParams } from "react-router-dom";
import { CustomComboBox } from "../../../../components";

function HackathonPrize({ formSubmit, formId, config }) {
  const param = useParams();

  const [inputValues, setInputValues] = useState({
    winnersAnnounced: "",
    prizeCurrency: "",
    prizes: [],
  });

  const onSubmitForm = (e) => {
    e.preventDefault();
    const data = {
      ...inputValues,
      winnersAnnounced: new Date(inputValues.winnersAnnounced),
    };
    formSubmit(data);
  };

  const currencyList = [
    { id: 1, name: "$" },
    { id: 2, name: "VND" },
  ];

  const onChangeText = (type, subtype, id, e) => {
    setInputValues({
      ...inputValues,
      [type]: inputValues[type].map((i) =>
        i.id === id ? { ...i, [subtype]: e } : { ...i }
      ),
    });
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

  function convertToDateTimeFormat(isoDateString) {
    try {
      // Create a new Date object from the ISO 8601 string
      const date = new Date(isoDateString);

      if (isNaN(date.getTime())) {
        throw new Error("Invalid date string");
      }

      // Extract the required components
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      // Return the formatted string
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch (error) {
      console.error("Error converting date:", error.message);
      return null;
    }
  }

  useEffect(() => {
    fetch(`${baseUrl}/api/v1/hackathons/${param.id}/${formId}`)
      .then((response) => response.json())
      .then((result) => {
        const { _id, ...rest } = result;
        console.log(rest);
        setInputValues({ ...inputValues, ...rest });
      });
  }, []);

  return (
    <>
      <div>
        <div className="bg-[#faf9f8] rounded-xl grid grid-cols-5 gap-4 -mx-8">
          <div className="col-span-2 flex items-center m-8">
            <span className="text-[#2D2D2D] text-[28px] font-bold">Prices</span>
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
              label="Winners Announced (mm/dd/yyyy)"
              require
              description="MM/DD/YYYY format. All times are in Eastern Time (US & Canada) (EDT)"
              type="datetime-local"
              value={convertToDateTimeFormat(inputValues.winnersAnnounced)}
              onChange={(e) => {
                setInputValues({
                  ...inputValues,
                  winnersAnnounced: e.target.value,
                });
              }}
            />

            <CustomComboBox
              label={"Prize currency"}
              require
              placeHolder={"Select an options"}
              selectItem={
                currencyList.find(
                  (item) => item.name == inputValues.prizeCurrency
                ) ?? currencyList[0]
              }
              listItem={currencyList}
              filterValueSelected={(e) => {
                setInputValues({
                  ...inputValues,
                  prizeCurrency: e.name,
                });
              }}
            />

            {TitleDescription(
              "Prizes",
              "Add each of your prizes here. At the end of the hackathon, you will assign each prize to a submission. Prizes can be monetary or non-monetary. If your prize includes cash, please include the cash amount in the “Description” field as well as in the “Cash value” field."
            )}

            {inputValues.prizes?.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="bg-[#f7f7f7] p-5 rounded-lg flex flex-col gap-2"
                >
                  <div className="w-2/5">
                    <TextInput
                      label="Prize name"
                      required
                      value={item.prizeName}
                      onChange={(e) =>
                        onChangeText(
                          "prizes",
                          "prizeName",
                          item.id,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="w-5/6">
                    <TextInput
                      label="Cash value"
                      description={`The total value of the prize (in $). We'll add up the cash value of all your prizes to calculate the "XX in prizes" total prize value listed for your hackathon. The cash value entered will not be displayed next to each prize in your list of prizes.`}
                      required
                      value={item.cashValue}
                      onChange={(e) =>
                        onChangeText(
                          "prizes",
                          "cashValue",
                          item.id,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="w-2/5">
                    <TextInput
                      label="Number of winning projects"
                      type="number"
                      required
                      value={item.numberWinningProject}
                      onChange={(e) =>
                        onChangeText(
                          "prizes",
                          "numberWinningProject",
                          item.id,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="w-5/6">
                    <div className="text-gray-900 font-medium">Description</div>
                    <p className="text-sm text-[#6F6F6F] italic">
                      Describe the details of your prize. If your prize is a
                      cash prize, please also enter the cash value amount here.
                    </p>
                    <textarea
                      className="w-5/6 p-2"
                      value={item.description}
                      onChange={(e) =>
                        onChangeText(
                          "prizes",
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
                        prizes: inputValues.prizes.filter(
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
                const newArr = [...inputValues.prizes];
                newArr.push({
                  id: Date.now(),
                  prizeName: "",
                  cashValue: "",
                  numberWinningProject: 0,
                  description: "",
                });
                setInputValues({
                  ...inputValues,
                  prizes: newArr,
                });
              }}
            >
              Add prize
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default HackathonPrize;
