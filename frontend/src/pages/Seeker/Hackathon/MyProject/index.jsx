import { Link, useNavigate, useOutletContext } from "react-router-dom";
import CardProject from "../../../../components/Seeker/CardProject";
import { CustomButton } from "../../../../components";
import { defaultAvt, imgDefaultProject } from "../../../../assets/images";
import HackathonInfo from "../../../../components/Seeker/HackathonInfo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getProjectRegisteredToHackathonAction,
  resetSuccessAction,
} from "../../../../redux/slices/projects/projectsSlices";
import Swal from "sweetalert2";

function MyProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const id = "67386091dc5db4aea4e96603";
  const [itemProject, setItemProject] = useState([]);

  const sliceProject = useSelector((store) => store.projects);
  const { projects, isSuccessUD } = sliceProject;
  const { item, id, isRegistered, user } = useOutletContext();
  useEffect(() => {
    dispatch(getProjectRegisteredToHackathonAction({ hackathonId: id }));
  }, []);
  const handleNavigatePage = (to) => {
    if (to === "register" && !user) {
      Swal.fire({
        title: "Please login!",
        text: "You need to login to register hackathon.",
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        showCancelButton: true,
        icon: "info",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/user-auth/login");
        }
      });
    } else {
      navigate(
        `/Seeker/project/manage-project/!imptHktid_${id}_${
          projects[0]._id ?? ""
        }/manage-team`
      );
    }
  };
  useEffect(() => {
    if (isSuccessUD) {
      dispatch(resetSuccessAction());
      console.log("🚀 ~ useEffect ~ projects:", projects);
      setItemProject(projects);
    }
  }, [isSuccessUD]);
  return (
    <div className="px-60 max-lg:px-2 py-5 ">
      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-10">
        <div className="col-span-2">
          {isRegistered ? (
            <h2 className="font-semibold mt-5">My hackathon projects</h2>
          ) : (
            <div>Nothing to show. You have to register hackathon</div>
          )}
          <div>
            <div className="my-5 grid grid-cols-2 max-md:grid-cols-1 gap-6">
              {[...(itemProject ?? [])].map((card, index) => (
                <CardProject
                  key={index}
                  id={card._id}
                  title={card?.projectTitle}
                  description={card?.tagline}
                  image={card?.thumnailImage ?? imgDefaultProject}
                  imgUser={defaultAvt}
                  isWinner={false}
                  votes={card?.votes ?? 0}
                  comments={card?.comments ?? 0}
                  link={`/Seeker/project/manage-project/!imptHktid_12762_${card._id}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-1 text-sm mt-2">
          {isRegistered ? (
            <CustomButton
              onClick={() => handleNavigatePage(`my-project`)}
              title="Edit your project"
              containerStyles="bg-blue-600  mb-2 w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
            />
          ) : (
            <CustomButton
              onClick={() => handleNavigatePage(`register`)}
              title="Join hackathon"
              containerStyles="bg-blue-600 w-fit  mb-2 font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
            />
          )}
          <div>
            <HackathonInfo
              themes={item?.hackathonTypes}
              organization={item?.hostName}
              start={item?.submissions?.start}
              end={item?.submissions?.deadline}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProject;
