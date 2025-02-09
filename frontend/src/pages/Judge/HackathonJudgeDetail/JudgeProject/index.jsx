import SearchInput from "@/components/Seeker/SearchInput";
import { defaultAvt } from "../../../../assets/images";
import CardProjectJudge from "@/components/Judge/CardProject";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CustomButton, TextInput } from "@/components";
import { BiInfoCircle } from "react-icons/bi";
import InfoPopup from "@/components/Judge/InfoPopup";
import Swal from "sweetalert2";

const JudgeProjects = ({ props, projectGallery, hackathon }) => {
  const params = useParams();

  const [projects, setProjects] = useState([]);
  let { userAuth } = useSelector((state) => state.users);
  const list = [12, 10, 25, 1, 3, 6, 10, 15, 16, 12, 1, 6, 4, 6, 8];

  useEffect(() => {
    if (projectGallery) {
      getSelectedProject(userAuth.user.id);
    }
  }, [projectGallery]);

  const getSelectedProject = (id) => {
    fetch(
      `http://localhost:3000/api/v1/hackathons/judges-project/${params.id}?judgeId=${id}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.length !== 1 || result[0].judges.length !== 1) return;
        const projectIdList = result[0].judges[0].projectRates.map(
          (item) => item.projectId
        );
        const projectsSelect = projectGallery.filter((i) =>
          projectIdList.includes(i.id)
        );
        const projectRates = hackathon.judges.find(
          (i) => i.userId === id
        )?.projectRates;

        if (!projectRates) return;
        const mappedProject = projectsSelect.map((i) => {
          const proj = projectRates.find((p) => p.projectId === i.id);
          return {
            ...i,
            scores: [
              ...hackathon.criteria.map((c) => ({
                ...c,
                score:
                  proj.scores?.find((p) => p.criteriaId === c.id)?.score ?? 0,
              })),
            ],
            comment: proj.comment,
          };
        });
        setProjects(mappedProject);
      })
      .catch((error) => console.log("error", error));
  };

  const handleSave = () => {
    fetch(
      `http://localhost:3000/api/v1/hackathons/update-view-judge/${params.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          judgeId: userAuth.user.id,
        }),
      }
    )
      .then((result) => {
        Swal.fire({
          title: "Success",
          text: "Your rate send successfully!",
          confirmButtonText: "OK",
          icon: "success",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
          }
        });
      })
      .catch((error) => console.log("error", error));
  };

  const handleDraftSave = () => {
    const saveRating = projects.map((item) => {
      return {
        projectId: item.id,
        scores: item.scores.map((i) => ({
          criteriaId: i.id,
          score: Number(i.score),
        })),
        comment: item.comment,
      };
    });
    fetch(
      `http://localhost:3000/api/v1/hackathons/rate-project-judge/${params.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          judgeId: userAuth.user.id,
          ratingObj: saveRating,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        Swal.fire({
          title: "Success",
          text: "Your rate has been saved successfully",
          confirmButtonText: "OK",
          icon: "success",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
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
          </div>
          <div className="my-5 flex flex-col max-md:grid-cols-1 gap-3">
            <div className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-1 bg-white border-0">
              <table className="color-white w-full border-2 border-[#a7b1c2]">
                <thead className="w-full bg-[#f5f7fc]">
                  <tr>
                    <th
                      rowSpan={2}
                      className="relative text-[#3a60bf] font-medium py-2 text-base border-r-2 border-r-[#a7b1c2]"
                    >
                      Project
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
                  {projects?.map((card, index) => (
                    <tr className="border-2 border-[#a7b1c2]">
                      <td className="p-2 border-r-2 border-r-[#a7b1c2] max-w-xs">
                        <CardProjectJudge
                          key={index}
                          id={card.id}
                          title={card.projectTitle}
                          description={card.tagline}
                          image={card.thumnailImage}
                          imgUser={defaultAvt}
                          member={card.createdBy}
                          isWinner={false}
                          votes={index < list.length ? list[index] : 0}
                          comments={
                            index < list.length
                              ? list[list.length - index - 1]
                              : 0
                          }
                        />
                      </td>
                      {card.scores.map((item) => {
                        return (
                          <td className="p-2 border-r-2 border-r-[#a7b1c2]">
                            <TextInput
                              type="number"
                              value={item.score}
                              onChange={(e) => {
                                setProjects([
                                  ...projects.map((i) => {
                                    if (i.id === card.id)
                                      return {
                                        ...i,
                                        scores: [
                                          ...card.scores.map((s) =>
                                            s.id === item.id
                                              ? {
                                                  ...s,
                                                  score: Number(e.target.value),
                                                }
                                              : { ...s }
                                          ),
                                        ],
                                      };
                                    else return { ...i };
                                  }),
                                ]);
                              }}
                              min={hackathon?.criteriaScore?.min ?? 0}
                              max={hackathon?.criteriaScore?.max ?? 10}
                            />
                          </td>
                        );
                      })}
                      <td className="p-2">
                        <textarea
                          type="text"
                          name="comment"
                          id="comment"
                          value={card.comment}
                          onChange={(e) => {
                            setProjects([
                              ...projects.map((i) => {
                                if (i.id === card.id)
                                  return {
                                    ...i,
                                    comment: e.target.value,
                                  };
                                else return { ...i };
                              }),
                            ]);
                          }}
                          className="block focus:bg-white text-base w-full rounded-md border-0 py-2.5 pl-5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-end justify-end gap-2">
              <CustomButton
                onClick={handleDraftSave}
                title={"Draft save"}
                containerStyles="bg-blue-600 w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
              />
              <CustomButton
                onClick={handleSave}
                title={"Submit"}
                containerStyles="bg-blue-600 w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JudgeProjects;
