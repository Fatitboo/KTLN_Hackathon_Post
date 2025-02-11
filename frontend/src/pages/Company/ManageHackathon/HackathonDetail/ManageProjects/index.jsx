import { CustomButton, Modal, TextInput } from "@/components";
import { useEffect, useState } from "react";
import TeamProjectSmall from "../TeamProjectSmall/TeamProjectSmall";
import { IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { CiViewBoard } from "react-icons/ci";
import { defaultAvt } from "@/assets/images";
import SearchInput from "@/components/Seeker/SearchInput";
import CardProject from "@/components/Seeker/CardProject";
import { StarIcon } from "@heroicons/react/20/solid";
import InfoPopup from "@/components/Judge/InfoPopup";
import baseUrl from "@/utils/baseUrl";

const ManageProjects = ({
  judges,
  projects,
  hackathon,
  selectTeam,
  setSelectTeam,
}) => {
  const params = useParams();
  const [modal, setModal] = useState(false);
  let [modal2, setModal2] = useState(false);
  let [modal3, setModal3] = useState(false);
  let [selectPrize, setSelectPrize] = useState(null);
  let [selectProj, setSelectPrj] = useState(null);
  const list = [12, 10, 25, 1, 3, 6, 10, 15, 16, 12, 1, 6, 4, 6, 8];

  const [currentHackathon, setCurrentHackathon] = useState([]);
  useEffect(() => {
    if (judges) setJudgeList(judges);
  }, [judges]);

  const handleAward = () => {
    setModal(!modal);
  };

  const handleSaveWinner = () => {
    const updateHackathon = currentHackathon.prizes.map((item) => {
      if (item.winnerList)
        return {
          ...item,
          winnerList: item.winnerList.map((i) => i.id),
        };
      else return { ...item };
    });
    fetch(`${baseUrl}/api/v1/hackathons/awarding/${params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hackathon: {
          prizes: updateHackathon,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        Swal.fire({
          title: "Success",
          text: "Awarding successfully",
          confirmButtonText: "OK",
          icon: "success",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            setCurrentHackathon({
              ...currentHackathon,
              prizes: updateHackathon,
            });
            setModal(false);
          }
        });
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <div className="px-60 max-lg:px-2 py-5 ">
        <div>
          <div className="mb-10 w-[90%] flex items-end">
            <SearchInput
              textPlaceholder={"Search project"}
              btnText={"Search project"}
            />
            <CustomButton
              onClick={handleAward}
              title={"Awarding"}
              containerStyles="h-[42px] bg-blue-600 w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
            />
          </div>
          <div className="my-5 grid grid-cols-4 max-xl:grid-cols-1 gap-6">
            {[...projects].map((card, index) => (
              <div key={index} className="relative">
                <CardProject
                  id={card.id}
                  title={card.projectTitle}
                  description={card.tagline}
                  image={card.thumnailImage}
                  imgUser={defaultAvt}
                  member={card.createdBy}
                  isWinner={currentHackathon?.prizes
                    ?.reduce(
                      (acc, cur) =>
                        cur.winnerList ? acc.concat(cur.winnerList) : acc,
                      []
                    )
                    ?.includes(card.id)}
                  votes={index < list.length ? list[index] : 0}
                  comments={
                    index < list.length ? list[list.length - index - 1] : 0
                  }
                />
                <button
                  onClick={() => {
                    // getMarkList(item);
                    setSelectPrj(card);
                    setModal3(true);
                  }}
                  className="list-none absolute top-8 right-0 translate-x-1/2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] p-1 hover:bg-[#278646] hover:text-white"
                >
                  {" "}
                  <CiViewBoard fontSize={18} />{" "}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal open={modal} setModal={setModal}>
        <div>
          <div className="flex flex-row items-center justify-between mx-2">
            <p className="block leading-8 text-gray-900 text-xl font-bold">
              Present an award
            </p>
            <div
              className="hover:bg-slate-100 rounded-sm p-2 cursor-pointer opacity-90"
              onClick={() => {
                setSelectTeam([]);
                setSelectPrize(null);
                setCurrentHackathon(hackathon);
                setModal(false);
              }}
            >
              <IoClose size={20} />
            </div>
          </div>
          <hr className="block h-1 w-full bg-[rgb(212, 210, 208)] my-3" />
          <div className="max-h-[400px] max-w-[900px] mx-9 overflow-y-scroll no-scrollbar overflow-x-hidden mb-4">
            <div className="flex gap-3 flex-col col-span-2">
              {currentHackathon?.prizes?.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className=" bg-white border border-gray-300 rounded-sm hover:shadow-md p-2"
                  >
                    <div className="flex flex-row gap-1 text-base font-semibold justify-between">
                      <div className="flex flex-row gap-1 items-center">
                        <StarIcon color="#FFD333" width={24} />
                        {item.prizeName}
                      </div>
                      <button
                        onClick={() => {
                          setSelectPrize(item);
                          setSelectTeam([...(item.winnerList ?? [])]);
                          setModal2(true);
                        }}
                        className="flex items-center justify-center box-border bg-[#1967d3] px-[10px] py-[8px] rounded-[4px] text-[#fff] hover:bg-[#0146a6] cursor-pointer"
                      >
                        <span className="text-[15px] leading-none font-semibold">
                          Award team
                        </span>
                      </button>
                    </div>
                    <ul className="list-disc pl-10">
                      <li>
                        <span className="font-semibold">Prize: </span>$
                        {item.cashValue}
                      </li>
                      <li>
                        <span className="font-semibold">Number wining: </span>
                        {item.numberWinningProject}
                      </li>
                      <li>
                        <span className="font-semibold">Description: </span>
                        {item.description}
                      </li>
                    </ul>
                    <div className="grid grid-cols-2 gap-2">
                      {item?.winnerList?.map((i) => {
                        return (
                          <div className="relative group ">
                            <TeamProjectSmall
                              props={projects.find(
                                (proj) => proj.id == i || proj.id == i?.id
                              )}
                            />
                            <div
                              onClick={() => {
                                let list = [...item.winnerList];
                                if (list.length === 1) list = null;
                                else list.splice(list.indexOf(i), 1);
                                setCurrentHackathon({
                                  ...currentHackathon,
                                  prizes: currentHackathon.prizes.map((prize) =>
                                    prize.id == item.id
                                      ? { ...prize, winnerList: list }
                                      : { ...prize }
                                  ),
                                });
                              }}
                              className="absolute top-2 right-4 cursor-pointer bg-transparent rounded-lg text-black group-hover:text-white group-hover:bg-red-600"
                            >
                              <IoClose />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 float-right">
            <div
              className="flex items-center justify-center box-border bg-[white] border px-[18px] py-[14px] rounded-[8px] text-[#1967d3] hover:bg-[#eef1fe] hover:border-[#1967d3] cursor-pointer"
              onClick={() => {
                setSelectTeam([]);
                setSelectPrize(null);
                setCurrentHackathon(hackathon);
                setModal(false);
              }}
            >
              <span className="text-[15px] leading-none font-bold">Close</span>
            </div>
            <button
              type="submit"
              onClick={handleSaveWinner}
              className="w-[90px] flex items-center justify-center box-border bg-[#1967d3] px-[18px] py-[14px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer"
            >
              {false ? (
                <svg
                  className="right-1 animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-0"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-90"
                    fill="white"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <span className="text-[15px] leading-none font-bold">Done</span>
              )}
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={modal2} setModal={setModal2}>
        <div>
          <div className="flex flex-row items-center justify-between mx-2">
            <p className="block leading-8 text-gray-900 text-xl font-bold">
              Select team
            </p>
            <div
              className="hover:bg-slate-100 rounded-sm p-2 cursor-pointer opacity-90"
              onClick={() => {
                setSelectTeam([]);
                setModal2(false);
              }}
            >
              <IoClose size={20} />
            </div>
          </div>
          <hr className="block h-1 w-full bg-[rgb(212, 210, 208)] my-3" />
          <div className="max-h-[400px] max-w-[900px] mx-4 overflow-y-auto overflow-x-hidden mb-4">
            <div className="flex flex-col gap-2 col-span-1">
              {projects?.map((item) => {
                return (
                  <div
                    onClick={() => {
                      if (selectTeam.includes(item)) {
                        selectTeam.splice(selectTeam.indexOf(item), 1);
                        setSelectTeam([...selectTeam]);
                      } else {
                        if (
                          selectTeam.length >=
                          Number(selectPrize.numberWinningProject)
                        )
                          return;
                        setSelectTeam([...selectTeam, item]);
                      }
                    }}
                  >
                    <TeamProjectSmall
                      props={item}
                      select={selectTeam.includes(item)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 float-right mt-2">
            <div
              className="flex items-center justify-center box-border bg-[white] border px-[18px] py-[14px] rounded-[8px] text-[#1967d3] hover:bg-[#eef1fe] hover:border-[#1967d3] cursor-pointer"
              onClick={() => {
                setSelectTeam([]);
                setModal2(false);
              }}
            >
              <span className="text-[15px] leading-none font-bold">Close</span>
            </div>
            <button
              onClick={() => {
                setCurrentHackathon({
                  ...currentHackathon,
                  prizes: currentHackathon.prizes.map((item) =>
                    item.id === selectPrize.id
                      ? { ...item, winnerList: selectTeam }
                      : { ...item }
                  ),
                });
                setSelectTeam([]);
                setModal2(false);
              }}
              className="w-[90px] flex items-center justify-center box-border bg-[#1967d3] px-[18px] py-[14px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer"
            >
              <span className="text-[15px] leading-none font-bold">Select</span>
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={modal3} setModal={setModal3}>
        <div>
          <div className="flex flex-row items-center justify-between mx-2">
            <p className="block leading-8 text-gray-900 text-xl font-bold">
              Select team
            </p>
            <div
              className="hover:bg-slate-100 rounded-sm p-2 cursor-pointer opacity-90"
              onClick={() => {
                setSelectTeam([]);
                setModal3(false);
              }}
            >
              <IoClose size={20} />
            </div>
          </div>
          <hr className="block h-1 w-full bg-[rgb(212, 210, 208)] my-3" />
          <div className="overflow-x-auto max-h-[500px] no-scrollbar">
            <table className="color-white w-full border-2 border-[#a7b1c2]">
              <thead className="w-full bg-[#f5f7fc]">
                <tr>
                  <th
                    rowSpan={2}
                    className="relative text-[#3a60bf] font-medium py-2 text-base border-r-2 border-r-[#a7b1c2]"
                  >
                    Judge name
                  </th>
                  <th
                    colSpan={hackathon?.criteria.length ?? 1}
                    className="relative text-[#3a60bf] font-medium py-2 border text-base border-b-2 border-[#a7b1c2]"
                  >
                    Criteria
                  </th>
                  <th
                    rowSpan={2}
                    className="relative text-[#3a60bf] font-medium py-2 text-base border-l-2 border-[#a7b1c2]"
                  >
                    Comment
                  </th>
                </tr>
                <tr>
                  {hackathon?.criteria.map((item, index) => {
                    return (
                      <th
                        key={index}
                        className="text-[#3a60bf] font-medium py-2 text-base border-r-2 border-r-[#a7b1c2]"
                      >
                        <div className="flex flex-row items-center gap-1 justify-center">
                          {item.title}
                          <InfoPopup information={item.description} />
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="bg-slate-50">
                {hackathon?.judges?.map((card, index) => (
                  <tr className="border-2 border-[#a7b1c2]">
                    <td className="p-2 border-r-2 border-r-[#a7b1c2] max-w-xs">
                      <div className="flex flex-row items-center gap-2">
                        <img src={card.photo} className="w-20 h-20" />
                        <label className="font-semibold text-gray-600">
                          {card.fullName}
                        </label>
                      </div>
                    </td>
                    {card.invited ? (
                      card.projectRates?.view ? (
                        <td
                          colSpan={(hackathon?.criteria.length ?? 0) + 1}
                          className="text-center px-5"
                        >
                          The judges have not yet graded this project.
                        </td>
                      ) : card.projectRates?.find(
                          (i) => i.projectId === selectProj?.id
                        ) ? (
                        <>
                          {card.projectRates
                            .find((i) => i.projectId === selectProj?.id)
                            ?.scores?.map((item) => {
                              return (
                                <td className="p-2 border-r-2 border-r-[#a7b1c2]">
                                  <TextInput
                                    type="number"
                                    readOnly
                                    value={item.score}
                                  />
                                </td>
                              );
                            })}
                          <td className="p-2">
                            <textarea
                              type="text"
                              name="comment"
                              id="comment"
                              readOnly
                              value={
                                card.projectRates?.find(
                                  (i) => i.projectId === selectProj?.id
                                )?.comment
                              }
                              className="block focus:bg-white text-base w-full rounded-md border-0 py-2.5 pl-5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8"
                            />
                          </td>
                        </>
                      ) : (
                        <td
                          colSpan={(hackathon?.criteria.length ?? 0) + 1}
                          className="text-center px-5"
                        >
                          Judge is not assign for this project
                        </td>
                      )
                    ) : (
                      <td
                        colSpan={(hackathon?.criteria.length ?? 0) + 1}
                        className="text-center px-5"
                      >
                        This judge has not been invited.
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row items-center gap-2 float-right mt-2">
            <div
              className="flex items-center justify-center box-border bg-[white] border px-[18px] py-[14px] rounded-[8px] text-[#1967d3] hover:bg-[#eef1fe] hover:border-[#1967d3] cursor-pointer"
              onClick={() => {
                setModal3(false);
              }}
            >
              <span className="text-[15px] leading-none font-bold">Close</span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ManageProjects;
