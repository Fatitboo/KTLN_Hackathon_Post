import {
  backgroundSearch,
  banner_1,
  banner_2,
  GroupOrg,
} from "../../../assets/images";
import { TopBannerIcon, BottomBannerIcon } from "../../../assets/icons";
import { AiOutlineSearch } from "react-icons/ai";
import "./style.css";
import CustomButton from "../../../components/CustomButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import HackathonItem from "../../../components/Seeker/HackathonItem";
import { data_popular } from "../../../utils/data_hackathon";
import { useSelector } from "react-redux";
import SearchInput from "../../../components/Seeker/SearchInput";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "../../../utils/baseUrl";

function Home() {
  const storeData = useSelector((store) => store.users);
  const [recommendHackathons, setRecommendHackathons] = useState([]);
  const [onlines, setOnlines] = useState([]);
  const [inPersons, setInPersons] = useState([]);
  const user = storeData?.userAuth?.user;
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getRecommend = async () => {
    axios
      .get(
        `http://localhost:5001/recommend-cb?user_id=${
          user?.id || "671b64262b605334688d5f77"
        }&byModel=hd`
      )
      .then((response) => {
        const array = response.data;
        console.log("🚀 ~ ).then ~ data:", array);
        setRecommendHackathons(array);
        axios
          .post(`${baseUrl}/api/v1/hackathons/search/by-ids`, {
            hackathonLeans: array,
          })
          .then((response) => {
            const obj = response.data;
            setRecommendHackathons(obj?.recommendHackathons);
            setOnlines(obj?.onlines);
            setInPersons(obj?.inPerson);
          });
      })
      .catch(() => {
        axios
          .post(`${baseUrl}/api/v1/hackathons/search/by-ids`, {
            hackathonLeans: [],
          })
          .then((response) => {
            const obj = response.data;
            setRecommendHackathons(obj?.recommendHackathons);
            setOnlines(obj?.onlines);
            setInPersons(obj?.inPerson);
          });
      });
  };
  const handleSearch = () => {
    const data = { searchTerm };
    navigate("/Seeker/brower-hackathons", { state: data });
  };
  useEffect(() => {
    getRecommend();
  }, []);
  // const user = {
  //   token: "xx",
  //   isVerify: true,
  // };
  return (
    <>
      {/* Searching Hackthon By Keyword*/}
      <></>
      {!user ? (
        <div>
          <div
            className=" grid grid-cols-12 gap-3 w-full h-full bg-no-repeat bg-cover pt-5 pb-20"
            style={{ backgroundImage: `url(${backgroundSearch})` }}
          >
            <div className="col-span-7 pt-12 pl-60 max-md:pl-4 pr-20 pb-20 relative">
              {/* Introduce */}
              <h1 className="text-5xl font-bold leading-[60px]">
                The home for
                <span className="relative text-[#3c65f5] ml-2">
                  {" "}
                  Hackathons{" "}
                  <span className="absolute left-0 -bottom-[6px] opacity-10 bg-[#3c65f5] h-[25px] w-full"></span>
                </span>
              </h1>

              <p className="text-[18px] text-[#4f5e64] mt-5">
                Where organizations and developers come together to build,
                inspire, and innovate.
              </p>

              <div className="mt-8">
                <CustomButton
                  title="For organizers"
                  iconRight={<ArrowRightIcon className="w-5 h-5" />}
                  containerStyles="text-blue-800 font-medium mr-6 py-2 px-5 focus:outline-none hover:bg-blue-400 hover:text-white rounded-sm text-base  border border-blue-800"
                />
                <CustomButton
                  title="For participants"
                  iconRight={<ArrowRightIcon className="w-5 h-5" />}
                  containerStyles="bg-blue-600 font-medium text-white py-2 px-5 focus:outline-none hover:bg-white hover:text-blue-700 rounded-sm text-base border border-blue-600"
                />
              </div>

              {/* Search Box */}
              <div className="">
                <SearchInput
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  handleSearch={handleSearch}
                />
              </div>

              {/* Popula Search */}
              <div className="mt-10 w-full ">
                <strong className="text-[#4F5E64] text-xs">
                  TRUSTED BY THE WORLD'S LEADING ORGANIZATIONS
                </strong>
                <img
                  src={GroupOrg}
                  alt=""
                  className="absolute top-[78%] z-10"
                />
              </div>
            </div>

            <div className="col-span-5 pr-28 pl-20">
              <div className="block">
                <div className="relative h-full min-h-[540px] py-16">
                  <div className="absolute top-[10%] -left-[150px] hero-thumb-animation_1">
                    <img alt="jobBox" src={banner_1}></img>
                  </div>
                  <div className="absolute bottom-0 right-[120px] hero-thumb-animation_2">
                    <img alt="jobBox" src={banner_2} />
                  </div>
                  <div className="absolute top-[21%] right-[220px] hero-thumb-animation_3">
                    <img alt="jobBox" src={TopBannerIcon} />
                  </div>
                  <div className="absolute hero-thumb-animation_3 bottom-[8%] -left-[80px]">
                    <img alt="jobBox" src={BottomBannerIcon} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <></>
      <div className="h-[0.5px] bg-gray-300 my-10" />
      {/* Popular hackthon */}

      {user && (
        <div className="px-96 max-md:px-4">
          <div className="">
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearch}
            />
          </div>
        </div>
      )}
      <></>
      <div>
        <div className="grid grid-cols-12 max-md:grid-cols-1 gap-4 mt-12 w-full h-full">
          <div className="col-span-6 max-md:col-span-1 max-md:pl-4 pl-60 pr-5 pb-5">
            {/* Title */}
            <div className="flex justify-between items-end">
              <h3 className="font-semibold">Hackathons for you</h3>
              <CustomButton
                title="Edit your recommendations"
                iconRight={<ArrowRightIcon className="w-5 h-5" />}
                containerStyles="text-blue-600 mb-[2px] font-medium px-5 hover:text-blue-800 text-base  bg-transparent"
              />
            </div>
            <div className="mt-8">
              {(recommendHackathons.filter((i) => i.id !== null) || []).map(
                (hackathon, index) => {
                  return (
                    <>
                      <div className="my-6" key={index}>
                        <Link
                          to={`/Hackathon-detail/${hackathon.hackathon_id}/overview`}
                        >
                          <HackathonItem
                            id={hackathon?._id}
                            startDate={hackathon?.submissions?.start}
                            endDate={hackathon?.submissions?.deadline}
                            themes={hackathon.hackathonTypes}
                            organization={hackathon?.hostName}
                            period={hackathon.period}
                            isExtended={false}
                            title={hackathon?.hackathonName}
                            isFeature={index % 2 === 0 ? true : false}
                            location={hackathon.location}
                            prizes={`${hackathon?.prizeCurrency ?? "$"} ${
                              hackathon?.prizes[0]?.cashValue ?? 1000
                            }`}
                            participants={hackathon?.registerUsers?.length ?? 0}
                            imageHackthon={hackathon?.thumbnail}
                          />
                        </Link>
                      </div>
                    </>
                  );
                }
              )}
            </div>
          </div>

          <div className="col-span-6 max-md:col-span-1 pr-60 max-md:pr-4 pl-16">
            <div className="flex justify-between items-end">
              <h3 className="font-semibold">Top Hackathons themes</h3>
            </div>
            <div className="mt-8">
              <table className="relative w-full overflow-y-hidden overflow-x-hidden">
                <thead className=" border-gray-200 border-b w-full">
                  <tr className="w-fullx">
                    <th className="relative text-gray-700 font-normal text-base text-left pb-3">
                      Themes
                    </th>
                    <th className="relative text-gray-700 font-normal text-base text-left  pb-3">
                      Hackthons
                    </th>
                    <th className="relative text-gray-700 font-normal text-base text-left pb-3">
                      Total prizes
                    </th>
                    <th className="relative text-gray-700 font-normal text-base text-left pb-3 "></th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {data_popular.map((item, index) => {
                    return (
                      <>
                        <tr key={item.id} className="py-5">
                          <td className="py-2">
                            <div className="flex items-center">
                              <div className="w-5">{index + 1}.</div>
                              <div className="ml-6 rounded-[3px] bg-blue-50 px-3 py-1 text-blue-700 text-sm my-1 mr-2">
                                {item.name}
                              </div>
                            </div>
                          </td>
                          <td className="py-2">
                            <div>{item.current_challenges_count}</div>
                          </td>
                          <td className="py-2">
                            <div>{item.formatted_current_usd_prize_amount}</div>
                          </td>
                          <td className="py-2">
                            <div>
                              <ArrowRightIcon className="w-5 h-5 text-blue-700" />
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <></>
      <div className="flex items-center justify-center">
        <CustomButton
          onClick={() => {
            navigate("/Seeker/brower-hackathons");
          }}
          title="View all hackathons"
          containerStyles="bg-blue-600 w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
        />
      </div>
      {/*  */}

      <div className="pb-10 bg-gradient-to-tl from-[#6373E0] via-[#1F78D1] to-[#23A197] mt-10 ">
        <div>
          <div className="flex justify-between items-end px-60 max-md:px-4 py-8">
            <h2 className="font-semibold text-white">
              Featured online hackathons
            </h2>
            <CustomButton
              title="Explore online hackathons"
              containerStyles="text-blue-800 font-medium py-2 px-5 bg-white focus:outline-none hover:bg-gray-50 rounded-sm text-base  border border-blue-800"
            />
          </div>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5 max-md:gap-1 max-md:px-4 px-60">
            {(onlines.filter((i) => i.id !== null) || []).map(
              (hackathon, index) => {
                return (
                  <>
                    <div className="my-6" key={hackathon.hackathon_id}>
                      <Link to={`/Hackathon-detail/${hackathon.id}/overview`}>
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
                            hackathon?.prizes[0]?.cashValue ?? 1000
                          }`}
                          participants={hackathon?.registerUsers?.length ?? 0}
                          imageHackthon={hackathon?.thumbnail}
                        />
                      </Link>
                    </div>
                  </>
                );
              }
            )}
          </div>
        </div>
        <div className="mt-6">
          <div className="flex justify-between items-end px-60 max-md:px-4 py-8">
            <h2 className="font-semibold text-white">
              Featured in-person hackathons
            </h2>
            <CustomButton
              title="Explore in-person hackathons"
              containerStyles="text-blue-800 font-medium py-2 px-5 bg-white focus:outline-none hover:bg-gray-50 rounded-sm text-base  border border-blue-800"
            />
          </div>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5 max-md:gap-1 max-md:px-4 px-60">
            {(inPersons.filter((i) => i.id !== null) || []).map(
              (hackathon, index) => {
                return (
                  <>
                    <div className="my-6" key={hackathon.hackathon_id}>
                      <Link to={`/Hackathon-detail/${hackathon.id}/overview`}>
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
                            hackathon?.prizes[0]?.cashValue ?? 1000
                          }`}
                          participants={hackathon?.registerUsers?.length ?? 0}
                          imageHackthon={hackathon?.thumbnail}
                        />
                      </Link>
                    </div>
                  </>
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
