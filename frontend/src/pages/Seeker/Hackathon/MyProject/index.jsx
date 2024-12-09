import { useOutletContext } from "react-router-dom";
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

function MyProject() {
  const dispatch = useDispatch();
  const id = "67386091dc5db4aea4e96603";
  const [itemProject, setItemProject] = useState([]);
  const storeData = useSelector((store) => store.users);
  const user = storeData?.userAuth?.user;
  const sliceProject = useSelector((store) => store.projects);
  const { projects, isSuccessUD } = sliceProject;
  const { myProject, item } = useOutletContext();
  useEffect(() => {
    dispatch(getProjectRegisteredToHackathonAction({ hackathonId: id }));
  }, [id]);
  useEffect(() => {
    if (isSuccessUD) {
      dispatch(resetSuccessAction());
      setItemProject(projects);
    }
    console.log("🚀 ~ useEffect ~ projects:", projects);
  }, [isSuccessUD]);
  return (
    <div className="px-60 max-lg:px-2 py-5 ">
      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-10">
        <div className="col-span-2">
          <h2 className="font-semibold mt-5">My hackathon projects</h2>
          <div>
            <div className="my-5 grid grid-cols-2 max-md:grid-cols-1 gap-6">
              {[...itemProject].map((card, index) => (
                <CardProject
                  key={index}
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
          <div>
            {itemProject?.length > 0 || (
              <CustomButton
                title="Join hackathon"
                containerStyles="my-4  bg-blue-600 w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
              />
            )}
            <HackathonInfo
              location={item?.displayed_location}
              organization={item?.organization_name}
              themes={item?.themes}
              participants={item?.registrations_count}
              prizes={item?.prize_amount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProject;
