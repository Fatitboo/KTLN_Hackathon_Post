import React, { useEffect, useState } from "react";
import { defaultAvt, imgDefaultProject } from "../../../assets/images";
import { CustomButton, Modal } from "../../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import HackathonInfo from "../../../components/Seeker/HackathonInfo";
import CardProject from "../../../components/Seeker/CardProject";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction } from "../../../redux/slices/users/usersSlices";
import HackathonItem from "../../../components/Seeker/HackathonItem";
import { AskToAddProject } from "../../../components/Modal/AskToAddProject";

function UserPorfolio() {
  const { id, type } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uProfile, setUProfile] = useState({});
  const [openAskToAddProject, setOpenAskToAddProject] = useState(false);

  const storeData = useSelector((store) => store?.users);
  const { userProfile, loading, appErr, isSuccess, isSuccessUpd } = storeData;
  useEffect(() => {
    setUProfile({ ...userProfile });
    console.log("🚀 ~ useEffect ~ userProfile:", userProfile);
  }, [userProfile]);
  useEffect(() => {
    if (id !== "my-porfolio") {
      dispatch(
        getUserProfileAction({
          getType: "all",
          getBy: "id",
          id,
        })
      );
    } else {
      dispatch(
        getUserProfileAction({
          getType: "all",
          getBy: "id",
        })
      );
    }
  }, [id]);
  const handleEditProject = (id) => {
    navigate(`/Seeker/project/manage-project/${id}/manage-team`);
  };
  return (
    <div>
      {/* Header */}
      <div className="bg-blue-100  px-60 h-40" />
      <div className="px-60 -mt-12">
        <div className="grid-cols-5 grid ">
          <div className="flex items-center col-span-1 flex-col  space-y-2">
            <img
              sizes="w-32"
              src={uProfile?.avatar || defaultAvt}
              alt="Profile"
              className="w-32 rounded-full border-4 border-white"
            />
            <div className="flex items-center justify-center">
              <CustomButton
                onClick={() => {
                  navigate("/Seeker/my-profile");
                }}
                title="Edit info & Setting"
                containerStyles="bg-blue-600 w-fit font-medium text-white py-1 px-2 focus:outline-none hover:bg-blue-500 rounded-sm text-sm border border-blue-600"
              />
            </div>
            <div className="flex items-center justify-center">
              <CustomButton
                onClick={() => setOpenAskToAddProject(true)}
                title="Add a new project"
                containerStyles="bg-[#0b8510] w-fit font-medium text-white py-1 px-2 focus:outline-none hover:bg-blue-500 rounded-sm text-sm border border-blue-600"
              />
            </div>
          </div>
          <div className="mt-2 mx-10 col-span-4">
            <div className="text-3xl font-medium">{uProfile?.fullname}</div>
            <p className="text-gray-500 text-base mt-5">
              Student at the University of Waterloo
            </p>
            <div className="flex space-x-4 mt-2 text-blue-500">
              <a className="cursor-pointer" href={uProfile?.bio}>
                Website
              </a>
              <a className="cursor-pointer" href={uProfile?.githubLink}>
                GitHub
              </a>
              <a className="cursor-pointer" href={uProfile?.linkedinLink}>
                LinkedIn
              </a>
            </div>
            <div className="text-sm ">
              <div className="flex items-start mt-2 ">
                <div className=" font-medium mr-2">Skills</div>
                <div className="flex flex-wrap gap-2">
                  {[...(uProfile?.settingRecommend?.skills ?? [])].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="bg-gray-100 text-gray-600 px-3 py-0.5 rounded-sm"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="flex items-start mt-2 ">
                <div className=" font-medium mr-2">Interests</div>
                <div className="flex flex-wrap gap-2">
                  {[...(uProfile?.settingRecommend?.interestedIn ?? [])].map(
                    (interest) => (
                      <span
                        key={interest}
                        className="bg-gray-100 text-gray-600 px-3 py-0.5 rounded-sm"
                      >
                        {interest}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 min-h-[500px] mt-5 ">
        <div className="px-60 py-10 ">
          <div className="flex space-x-10">
            {[
              `${uProfile?.projects?.length} Projects`,
              `${uProfile?.registerHackathons?.length} Hackathons`,
              "5 Achievements",
              "6 Followers",
              "6 Following",
              "4 Likes",
            ].map((item) => (
              <Link
                to={`/Seeker-detail/${id !== undefined ? id : "my-porfolio"}/${
                  item.split(" ")[1]
                }`}
                key={item}
                className={`flex flex-col items-center uppercase ${
                  type === item.split(" ")[1]
                    ? "border-b-4 border-blue-800 pb-2"
                    : ""
                }`}
              >
                <span className=" font-semibold">{item.split(" ")[0]}</span>
                <span className="text-gray-500">{item.split(" ")[1]}</span>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            {type === "Projects" && (
              <>
                <div className=" max-lg:grid-cols-1 gap-10">
                  <div>
                    <div
                      className={`my-5 grid ${
                        id !== undefined ? "grid-cols-4" : "grid-cols-3"
                      }  max-w-60:grid-cols-3 max-md:grid-cols-1 gap-6`}
                    >
                      {(uProfile?.projects || []).map((card, index) => (
                        <div className="relative group">
                          <CardProject
                            key={index}
                            id={card._id}
                            member={card.createdBy}
                            title={card?.projectTitle}
                            description={card?.tagline}
                            image={card?.thumnailImage ?? imgDefaultProject}
                            imgUser={defaultAvt}
                            isWinner={true}
                            votes={card.votes}
                            comments={card.comments}
                          />
                          <button
                            className="absolute top-3 right-5 hidden group-hover:flex items-center bg-blue-600 text-white px-2 py-1 rounded shadow-md text-sm"
                            onClick={() =>
                              handleEditProject(
                                card?.registeredToHackathon
                                  ? `!imptHktid_${card?.registeredToHackathon}_${card?._id}`
                                  : card._id
                              )
                            }
                          >
                            Edit
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="mt-10 ">
            {type === "Hackathons" && (
              <>
                <div className=" max-lg:grid-cols-1 gap-10">
                  <div>
                    <div
                      className={`my-5 grid mr-20 max-w-60:grid-cols-3 max-md:grid-cols-1 gap-6`}
                    >
                      {(
                        (uProfile?.registerHackathons || []).filter(
                          (i) => i._id !== null
                        ) || []
                      ).map((hackathon, index) => {
                        return (
                          <>
                            <div className="my-6" key={hackathon._id}>
                              <Link
                                to={`/Hackathon-detail/${hackathon._id}/overview`}
                              >
                                <HackathonItem
                                  id={hackathon?._id}
                                  startDate={hackathon?.submissions?.start}
                                  endDate={hackathon?.submissions?.deadline}
                                  themes={hackathon.hackathonTypes}
                                  organization={hackathon?.hostName}
                                  period={hackathon.period}
                                  title={hackathon?.hackathonName}
                                  isExtended={false}
                                  isFeature={index % 2 === 0 ? true : false}
                                  location={hackathon.location}
                                  prizes={`${hackathon?.prizeCurrency ?? "$"} ${
                                    hackathon?.prizes?.length > 0
                                      ? hackathon?.prizes[0]?.cashValue
                                      : 1000
                                  }`}
                                  participants={
                                    hackathon?.registerUsers?.length ?? 0
                                  }
                                  imageHackthon={hackathon?.thumbnail}
                                />
                              </Link>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Modal open={openAskToAddProject}>
        <AskToAddProject
          isAddProject={true}
          setopenReport={setOpenAskToAddProject}
          item={{}}
          isVacancy={true}
        />
      </Modal>
    </div>
  );
}

export default UserPorfolio;
