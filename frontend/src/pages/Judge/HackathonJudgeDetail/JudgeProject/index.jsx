import SearchInput from "@/components/Seeker/SearchInput";
import { defaultAvt } from "../../../../assets/images";
import CardProjectJudge from "@/components/Judge/CardProject";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CustomButton, TextInput } from "@/components";
import { BiInfoCircle } from "react-icons/bi";
import InfoPopup from "@/components/Judge/InfoPopup";

const JudgeProjects = ({ props, projectGallery, hackathon }) => {
  const params = useParams();

  const [projects, setProjects] = useState([]);
  let { userAuth } = useSelector((state) => state.users);

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
        setProjects(projectsSelect);
      })
      .catch((error) => console.log("error", error));
  };

  const handleSave = () => {};

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
                          votes={Math.floor(Math.random() * 21)}
                          comments={Math.floor(Math.random() * 11)}
                        />
                      </td>
                      {hackathon.criteria.map((item) => {
                        return (
                          <td className="p-2 border-r-2 border-r-[#a7b1c2]">
                            <TextInput
                              type="number"
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
                          className="block focus:bg-white text-base w-full rounded-md border-0 py-2.5 pl-5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-base sm:leading-8"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-end justify-end">
              <CustomButton
                onClick={handleSave}
                title={"Save"}
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
