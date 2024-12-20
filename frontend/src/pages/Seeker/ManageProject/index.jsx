import { Outlet, useParams } from "react-router-dom";
import SubNavbarHackathon from "../../../components/Navbar/SubNavbar";
import { backgroundSearch, imgDefaultProject } from "../../../assets/images";
import Stepper from "../../../components/Stepper";
import { useEffect, useState } from "react";
import extractId from "../../../utils/extractId";
import { useDispatch, useSelector } from "react-redux";
import { singleHackathon } from "../../../redux/slices/hackathons/hackathonsSlices";

const ManageProject = () => {
  const { projectId } = useParams();
  // projectId = !imptHktid_hackathonId_projectId
  const dispatch = useDispatch();

  const currentPathname = window.location.pathname; // Lấy pathname
  const [item, setItem] = useState(null);
  const [statePage, setStatePage] = useState(1);
  const { hackathon } = useSelector((state) => state.hackathons);

  useEffect(() => {
    if (projectId !== undefined) {
      const hackathonId = extractId({ type: "hackathonId", str: projectId });
      // const prjId = extractId({type: 'projectId', str: projectId})
      if (hackathonId) dispatch(singleHackathon(hackathonId));
    }
  }, [projectId]);
  useEffect(() => {
    if (hackathon) {
      setItem({ ...hackathon, type: "my-project" });
    }
  }, [hackathon]);
  useEffect(() => {
    if (currentPathname) {
      const arr = currentPathname.split("/");

      const lastE = arr[arr.length - 1];
      if (lastE === "manage-team") {
        setStatePage(1);
      }
      if (lastE === "edit") {
        setStatePage(2);
      }
      if (lastE === "submit") {
        setStatePage(3);
      }
    }
  }, [currentPathname]);
  return (
    <>
      <div>
        <div
          className="flex flex-col py-5 bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${
              item?.headerImgBackground ?? backgroundSearch
            })`,
          }}
        >
          <div className="px-60 max-lg:px-2 ">
            {item ? (
              <img
                src={item?.headerTitleImage}
                alt={item?.hackathonName}
                className="max-h-40 min-w-full"
              />
            ) : (
              <div className="py-10 px-60 flex h-40  bg-[#0b4540] w-full text-white text-center font-bold items-center justify-between">
                <div className="flex items-start flex-col">
                  <h2>Post a new project</h2>
                  <div className="font-light text-sm mt-5">
                    Please respect our community guidelines.
                  </div>
                </div>
              </div>
            )}
          </div>
          {item && <SubNavbarHackathon id={item?._id} type={item?.type} />}
        </div>
        <div className=" max-lg:px-2 py-5 min-h-60 ">
          <div className="px-60">
            <Stepper currentStep={statePage} id={projectId} />
          </div>
          <Outlet
            context={{
              hackathonId: extractId({ type: "hackathonId", str: projectId }),
              projectId,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ManageProject;
