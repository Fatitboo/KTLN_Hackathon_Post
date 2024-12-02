import { Outlet, useParams } from "react-router-dom";
import SubNavbarHackathon from "../../../components/Navbar/SubNavbar";
import { backgroundSearch, imgDefaultProject } from "../../../assets/images";
import Stepper from "../../../components/Stepper";
import { useEffect, useState } from "react";
import extractId from "../../../utils/extractId";

const ManageProject = () => {
  const { projectId } = useParams();
  // projectId = !imptHktid_hackathonId_projectId
  const currentPathname = window.location.pathname; // Lấy pathname
  console.log(currentPathname);
  const [item, setItem] = useState(null);
  const [statePage, setStatePage] = useState(1);
  useEffect(() => {
    if (projectId !== undefined) {
      const hackathonId = extractId({ type: "hackathonId", str: projectId });
      // const prjId = extractId({type: 'projectId', str: projectId})
      if (hackathonId === "12762") {
        setItem({
          img_bg: backgroundSearch,
          image: imgDefaultProject,
          name: "test",
          id: projectId,
          type: "my-project",
        });
      }
    }
  }, [projectId]);
  useEffect(() => {
    if (currentPathname) {
      const arr = currentPathname.split("/");

      const lastE = arr[arr.length - 1];
      console.log("🚀 ~ useEffect ~ lastE:", lastE);
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
            backgroundImage: `url(${item?.img_bg ?? backgroundSearch})`,
          }}
        >
          <div className="px-60 max-lg:px-2 ">
            {item ? (
              <img
                src={item?.image}
                alt={item?.name}
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
          {item && <SubNavbarHackathon id={item?.id} type={item?.type} />}
        </div>
        <div className=" max-lg:px-2 py-5 min-h-60 ">
          <div className="px-60">
            <Stepper currentStep={statePage} />
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ManageProject;
