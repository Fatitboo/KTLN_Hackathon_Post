import { Link } from "react-router-dom";

const SubNavbarHackathon = ({ id, type }) => {
  return (
    <div className=" flex bg-gray-800 opacity-90 py-3 mt-3 -mb-3  text-white text-normal">
      <div className="px-60 max-lg:px-2 ">
        <Link
          to={`/Hackathon-detail/${id}/overview`}
          className={`py-4 px-4 hover:underline ${
            type === "overview" ? "text-black opacity-100 bg-white" : ""
          }`}
        >
          Overview
        </Link>
        <Link
          to={`/Hackathon-detail/${id}/my-project`}
          className={`py-4 px-4 hover:underline ${
            type === "my-project" ? "text-black opacity-100 bg-white" : ""
          }`}
        >
          MyProject
        </Link>
        <Link
          to={`/Hackathon-detail/${id}/teams`}
          className={`py-4 px-4 hover:underline ${
            type === "teams" ? "text-black opacity-100 bg-white" : ""
          }`}
        >
          Teams
        </Link>
        <Link
          to={`/Hackathon-detail/${id}/participants`}
          className={`py-4 px-4 hover:underline ${
            type === "participants" ? "text-black opacity-100 bg-white" : ""
          }`}
        >
          Participants
        </Link>
        <Link
          to={`/Hackathon-detail/${id}/resourses`}
          className={`py-4 px-4 hover:underline ${
            type === "resourses" ? "text-black opacity-100 bg-white" : ""
          }`}
        >
          Resourses
        </Link>
        <Link
          to={`/Hackathon-detail/${id}/rules`}
          className={`py-4 px-4 hover:underline ${
            type === "rules" ? "text-black opacity-100 bg-white" : ""
          }`}
        >
          Rules
        </Link>
        <Link
          to={`/Hackathon-detail/${id}/project-gallery`}
          className={`py-4 px-4 hover:underline ${
            type === "project-gallery" ? "text-black opacity-100 bg-white" : ""
          }`}
        >
          Project gallery
        </Link>
        <Link
          to={`/Hackathon-detail/${id}/updates`}
          className={`py-4 px-4 hover:underline ${
            type === "updates" ? "text-black opacity-100 bg-white" : ""
          }`}
        >
          Updates
        </Link>
        <Link
          to={`/Hackathon-detail/${id}/discussions`}
          className={`py-4 px-4 hover:underline ${
            type === "discussions" ? "text-black opacity-100 bg-white" : ""
          }`}
        >
          Discussions
        </Link>
      </div>
    </div>
  );
};

export default SubNavbarHackathon;
