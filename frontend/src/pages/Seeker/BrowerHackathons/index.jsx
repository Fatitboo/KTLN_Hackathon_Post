import CustomButton from "../../../components/CustomButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import HackathonItem from "../../../components/Seeker/HackathonItem";
import { data_popular } from "../../../utils/data_hackathon";
import SearchInput from "../../../components/Seeker/SearchInput";
import { useState } from "react";
const hackathons = [
  {
    name: "Student Mental Health Hackathon",
    location: "Online",
    currency: "$",
    price: 0,
    participants: 7,
    organizer: "RaahimFarhan",
    period: "Jun 23 - Jul 01, 2023",
    invite: "False",
    tags: "['Beginner Friendly', 'Gaming', 'Open Ended']",
    logo_link:
      "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_thumbnails/002/514/731/datas/medium_square.png",
    item_id: "item-00001",
    start_date: "2023-06-23",
    end_date: "2023-07-01",
  },
  {
    name: "Encode Justice NY Hackathon",
    location: "Brooklyn Public Library",
    currency: "$",
    price: 0,
    participants: 3,
    organizer: "Encode Justice New York",
    period: "Jul 01, 2023",
    invite: "False",
    tags: "['Beginner Friendly', 'Education', 'Low/No Code']",
    logo_link:
      "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_thumbnails/002/509/489/datas/medium_square.png",
    item_id: "item-00027",
    start_date: "2023-07-01",
    end_date: "2023-07-08",
  },
  {
    name: "InfoCamp",
    location: "Online",
    currency: "₹",
    price: 7000,
    participants: 30,
    organizer: "Skill Pulse",
    period: "Jun 24 - Jul 01, 2023",
    invite: "False",
    tags: "['Beginner Friendly', 'Communication', 'Mobile']",
    logo_link:
      "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_thumbnails/002/512/612/datas/medium_square.png",
    item_id: "item-00003",
    start_date: "2023-06-24",
    end_date: "2023-07-01",
  },
  {
    name: "Hackspree 1.0",
    location: "Online",
    currency: "$",
    price: 0,
    participants: 27,
    organizer: "The HackSpree Community",
    period: "Jun 17 - Jul 15, 2023",
    invite: "False",
    tags: "['Beginner Friendly', 'Open Ended', 'Social Good']",
    logo_link:
      "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_thumbnails/002/509/438/datas/medium_square.png",
    item_id: "item-00004",
    start_date: "2023-06-17",
    end_date: "2023-07-15",
  },
];
function BrowerHackathons() {
  const [showMoreTags, setShowMoreTags] = useState(false);

  const toggleShowMore = () => {
    setShowMoreTags(!showMoreTags);
  };
  return (
    <>
      <></>
      <div className="p-10 bg-[#0b4540] text-white text-center font-bold">
        <h1>Join the world's best online and in-person hackathons</h1>
      </div>
      {/* Popular hackthon */}
      <></>
      <div>
        <div className="grid grid-cols-12 max-md:grid-cols-1 max-md:mt-1 gap-4 w-full h-full max-md:px-4 px-60">
          <div className="col-span-3 max-md:col-span-1 max-md:mt-1 mt-36">
            <div className="flex items-center">
              <div className="text-blue-600">Clear filters</div>
              <div className="ml-6 rounded-[3px] bg-blue-50 px-3 py-1 text-blue-700 text-sm my-1 mr-2">
                {2}
              </div>
            </div>
            <div className="mt-5 text-sm text-gray-600 font-normal">
              <div className="flex items-center">
                <label className="my-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Match my eligibility</span>
                </label>
                <div className="text-blue-600 ml-10 cursor-pointer">Update</div>
              </div>
              <div className="mb-4 ">
                <div className=" font-semibold mb-2 mt-5">Location</div>
                <label className="my-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Online</span>
                </label>
                <label className="my-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>In-person</span>
                </label>
              </div>
              {/* Status Section */}
              <div className="mb-4">
                <div className=" font-semibold mb-2 mt-10">Status</div>
                <label className="my-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Upcoming</span>
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                </label>
                <label className="my-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Open</span>
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                </label>
                <label className="my-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Ended</span>
                  <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                </label>
              </div>
              {/* Length Section */}
              <div className="mb-4">
                <div className=" font-semibold mb-2 mt-10">Length</div>
                <label className="my-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>1–6 days</span>
                </label>
                <label className="my-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>1–4 weeks</span>
                </label>
                <label className="my-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>1+ month</span>
                </label>
              </div>

              {/* Interest Tags Section */}
              <div className="mb-4">
                <div className=" font-semibold mb-2 mt-10">Interest tags</div>
                <label className="my-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Beginner Friendly</span>
                </label>
                <label className="my-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Social Good</span>
                </label>
                <label className="my-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Machine Learning/AI</span>
                </label>
                <label className="my-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Open Ended</span>
                </label>
                <label className="my-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Education</span>
                </label>

                {showMoreTags && (
                  <div>
                    {/* Hiển thị thêm các tag khác */}
                    <label className="my-2 flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox" />
                      <span>More Tag 1</span>
                    </label>
                    <label className="my-2 flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox" />
                      <span>More Tag 2</span>
                    </label>
                    {/* Add more as needed */}
                  </div>
                )}

                <button className="text-blue-500 mt-2" onClick={toggleShowMore}>
                  {showMoreTags ? "Show less" : "Show more (23)"}
                </button>
              </div>

              {/* Host Section */}
              <div className="mb-4">
                <div className=" font-semibold mb-2 mt-10">Host</div>
                <select className="w-full p-2 border rounded-md">
                  <option value="">Select host</option>
                  <option value="host1">Host 1</option>
                  <option value="host2">Host 2</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-span-9 max-md:col-span-1 pl-5 pb-5">
            <div className="">
              <SearchInput />
            </div>
            {/* Title */}
            <div className="flex justify-between items-center text-sm mt-10">
              <dic className="text-gray-600">Showing 9387 hackathons</dic>
              <div className="flex items-center">
                <div className="mr-3 font-medium">Sort:</div>
                <div className="flex items-center border border-gray-300 p-3">
                  <CustomButton
                    title="Most relevant"
                    containerStyles="text-blue-600 mb-[2px] font-medium px-2 hover:text-blue-800 text-sm bg-transparent"
                  />
                  <CustomButton
                    title="Submission date"
                    containerStyles="text-blue-600 mb-[2px] font-medium px-2 hover:text-blue-800 text-sm bg-transparent"
                  />
                  <CustomButton
                    title="Recently added"
                    containerStyles="text-blue-600 mb-[2px] font-medium px-2 hover:text-blue-800 text-sm bg-transparent"
                  />
                  <CustomButton
                    title="Prize amount"
                    containerStyles="text-blue-600 mb-[2px] font-medium px-2 hover:text-blue-800 text-sm bg-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              {(hackathons || []).map((hackathon, index) => {
                return (
                  <>
                    <div className="my-6">
                      <HackathonItem
                        id={index}
                        startDate={hackathon.start_date}
                        endDate={hackathon.end_date}
                        themes={hackathon.tags}
                        organization={hackathon.organizer}
                        period={hackathon.period}
                        title={hackathon.name}
                        isExtended={true}
                        isFeature={index % 2 === 0 ? true : false}
                        location={hackathon.location}
                        prizes={`${hackathon.currency} ${hackathon.price}`}
                        participants={hackathon.participants}
                        imageHackthon={hackathon.logo_link}
                      />
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <></>
      <div className="flex items-center justify-center">
        <CustomButton
          title="View all hackathons"
          containerStyles="bg-blue-600 w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
        />
      </div>
      {/*  */}
    </>
  );
}

export default BrowerHackathons;
