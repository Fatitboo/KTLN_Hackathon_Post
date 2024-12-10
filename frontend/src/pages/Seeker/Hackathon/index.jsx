import { useParams, Outlet } from "react-router-dom";
import { backgroundSearch } from "../../../assets/images";
import { useEffect, useState } from "react";
import axios from "axios";
import RecommendTeamChat from "../../../components/Seeker/RecommendTeamChat";
import SubNavbarHackathon from "../../../components/Navbar/SubNavbar";

function HackathonDetail() {
  const { id, type } = useParams();

  const [item, setItemHackathon] = useState({});
  const getHackathonDetail = async (hackathon_id) => {
    const { data } = await axios.get(
      "http://localhost:5001/get-hackathon-detail/" + hackathon_id
    );
    console.log("🚀 ~ getHackathonDetail ~ data:", data);
    setItemHackathon(data[0]);
  };
  useEffect(() => {
    getHackathonDetail(id);
  }, [id]);
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
    <>
      <div>
        <div
          className="flex flex-col py-5 bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${item?.img_bg ?? backgroundSearch})`,
          }}
        >
          <div className="px-60 max-lg:px-2 ">
            <img
              src={item?.image}
              alt={item?.name}
              className="max-h-40 min-w-full"
            />
          </div>
          <SubNavbarHackathon id={id} type={type} />
        </div>
        <div className=" max-lg:px-2 py-5 min-h-60 ">
          <Outlet context={{ item, myProject, id }} />
        </div>
        //recommend team hackathons
        <div className="fixed bottom-12 right-12 z-10">
          <RecommendTeamChat />
        </div>
      </div>
    </>
  );
}

export default HackathonDetail;
