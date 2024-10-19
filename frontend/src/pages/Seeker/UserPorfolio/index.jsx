import React from "react";
import { defaultAvt, imgDefaultProject } from "../../../assets/images";
import { CustomButton } from "../../../components";
import { Link, useParams } from "react-router-dom";
import HackathonInfo from "../../../components/Seeker/HackathonInfo";
import CardProject from "../../../components/Seeker/CardProject";

function UserPorfolio() {
  const { id, type } = useParams();
  const myProject = [
    {
      title: "AI DataGraph",
      description: "Data sharing network for AI model training on Metagraph.",
      image: "https://via.placeholder.com/150",
      isWinner: false,
    },
    {
      title: "AutoSight",
      description:
        "Earn income while you drive. Autosight is a metaroboth-powered.",
      image: "https://via.placeholder.com/150",
      isWinner: true,
    },
  ];
  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="bg-blue-100  px-60 h-40">{/*  */}</div>
      <div className="px-60 -mt-12">
        <div className="flex ">
          <div className="flex items-center flex-col space-y-2">
            <img
              src={defaultAvt}
              alt="Profile"
              className="w-32 rounded-full border-4 border-white"
            />
            <div className="flex items-center justify-center">
              <CustomButton
                title="Edit info & Setting"
                containerStyles="bg-blue-600 w-fit font-medium text-white py-1 px-2 focus:outline-none hover:bg-blue-500 rounded-sm text-sm border border-blue-600"
              />
            </div>
            <div className="flex items-center justify-center">
              <CustomButton
                title="Add a new project"
                containerStyles="bg-[#0b8510] w-fit font-medium text-white py-1 px-2 focus:outline-none hover:bg-blue-500 rounded-sm text-sm border border-blue-600"
              />
            </div>
          </div>
          <div className="mt-2 mx-10">
            <div className="text-3xl font-medium">Nguyen Van Phat</div>
            <p className="text-gray-500 text-base mt-5">
              Student at the University of Waterloo
            </p>
            <div className="flex space-x-4 mt-2 text-blue-500">
              <a href="#">Website</a>
              <a href="#">GitHub</a>
              <a href="#">LinkedIn</a>
            </div>
            <div className="text-sm ">
              <div className="flex items-start mt-2 ">
                <div className=" font-medium mr-2">Skills</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Java",
                    "Photoshop",
                    "Design",
                    "Unity",
                    "HTML",
                    "JavaScript",
                    "CSS",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="bg-gray-100 text-gray-600 px-3 py-0.5 rounded-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-start mt-2 ">
                <div className=" font-medium mr-2">Interests</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Fintech",
                    "Gaming",
                    "Machine Learning/AI",
                    "Productivity",
                    "Music/Art",
                  ].map((interest) => (
                    <span
                      key={interest}
                      className="bg-gray-100 text-gray-600 px-3 py-0.5 rounded-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 mt-5">
        <div className="px-60 py-10">
          <div className="flex space-x-10">
            {[
              "2 Projects",
              "3 Hackathons",
              "5 Achievements",
              "6 Followers",
              "6 Following",
              "4 Likes",
            ].map((item) => (
              <Link
                to={`/Seeker-detail/${id}/${item.split(" ")[1]}`}
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
                    <div className="my-5 grid grid-cols-4 max-md:grid-cols-1 gap-6">
                      {[...myProject, ...myProject].map((card, index) => (
                        <CardProject
                          key={index}
                          title={card.title}
                          description={card.description}
                          image={imgDefaultProject}
                          imgUser={defaultAvt}
                          isWinner={card.isWinner}
                          votes={card.votes}
                          comments={card.comments}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPorfolio;
