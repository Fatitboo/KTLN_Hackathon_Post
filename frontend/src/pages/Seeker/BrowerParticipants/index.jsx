import CustomButton from "../../../components/CustomButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HackathonItem from "../../../components/Seeker/HackathonItem";
import SearchInput from "../../../components/Seeker/SearchInput";
import ParticipantItem from "../../../components/Seeker/ParticipantItem";

function BrowerParticipants() {
  const specializes = [
    {
      id: 1,
      name: "Full-stack developer",
      quantity: 82,
    },
    {
      id: 2,
      name: "Front-end developer",
      quantity: 45,
    },
    {
      id: 3,
      name: "Mobile developer",
      quantity: 12,
    },
    {
      id: 4,
      name: "Designer",
      quantity: 34,
    },
    {
      id: 5,
      name: "Data scientist",
      quantity: 31,
    },
    {
      id: 6,
      name: "Back-end developer",
      quantity: 12,
    },
    {
      id: 7,
      name: "Business",
      quantity: 9,
    },
    {
      id: 8,
      name: "Product manager",
      quantity: 2,
    },
    {
      id: 9,
      name: "Android app developer",
      quantity: 1,
    },
  ];
  const skills = [
    {
      name: "Javascript",
      quantity: 10,
    },
    {
      name: "Python",
      quantity: 3,
    },
    {
      name: "Java",
      quantity: 10,
    },
    {
      name: "react",
      quantity: 10,
    },
    {
      name: "html",
      quantity: 10,
    },
  ];

  return (
    <>
      <div>
        <div className="grid grid-cols-12 max-md:grid-cols-1 max-md:mt-1 gap-4 w-full h-full max-md:px-4 px-60">
          <div className="col-span-3 max-md:col-span-1 max-md:mt-1 mt-36 pr-10 max-md:pr-1">
            <div className="flex items-center">
              <div className="text-blue-600">Clear filters</div>
              <div className="ml-6 rounded-[3px] bg-blue-50 px-3 py-1 text-blue-700 text-sm my-1 mr-2">
                {2}
              </div>
            </div>
            <div className="mt-5 text-sm text-gray-600 font-normal">
              <div className="mb-4 ">
                <div className=" font-semibold mb-2 mt-5 uppercase"> Teams</div>
                <label className="my-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Working solo</span>
                </label>
                <label className="my-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Looking for teammates</span>
                </label>
                <label className="my-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Has a team</span>
                </label>
              </div>
              {/* Length Section */}
              <div className="mb-4">
                <div className=" font-semibold mb-2 mt-10 uppercase">
                  Specialties
                </div>
                {specializes.map((item, index) => {
                  return (
                    <>
                      <label
                        key={index}
                        className="my-2 flex items-center  space-x-2"
                      >
                        <input type="checkbox" className="form-checkbox" />
                        <div className="flex items-center flex-1 justify-between">
                          <span>{item.name}</span>
                          <div className="p-1 bg-gray-100 text-xs">
                            {item.quantity}
                          </div>
                        </div>
                      </label>
                    </>
                  );
                })}
              </div>

              {/* Interest Tags Section */}
              <div className="mb-4">
                <div className=" font-semibold mb-2 mt-10 uppercase">
                  Skills
                </div>
                {skills.map((item, index) => {
                  return (
                    <>
                      <label
                        key={index}
                        className="my-2 flex items-center  space-x-2"
                      >
                        <input type="checkbox" className="form-checkbox" />
                        <div className="flex items-center flex-1 justify-between">
                          <span>{item.name}</span>
                          <div className="p-1 bg-gray-100 text-xs">
                            {item.quantity}
                          </div>
                        </div>
                      </label>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-span-9 max-md:col-span-1 pl-5 pb-5">
            <div className="">
              <SearchInput
                textPlaceholder={
                  "Search participants by name, skill, specialize, role,..."
                }
                btnText={"Search participant"}
              />
            </div>
            {/* Title */}
            <div className="flex justify-between items-center text-sm mt-10">
              <dic className="text-gray-600">Showing 9387 participants</dic>
              <div className="flex items-center">
                <div className="mr-3 font-medium">Sort:</div>
                <div className="flex items-center border border-gray-300 p-3">
                  <CustomButton
                    title="Newest"
                    containerStyles="text-blue-600 mb-[2px] font-medium px-2 hover:text-blue-800 text-sm bg-transparent"
                  />
                  <CustomButton
                    title="Projects"
                    containerStyles="text-blue-600 mb-[2px] font-medium px-2 hover:text-blue-800 text-sm bg-transparent"
                  />
                  <CustomButton
                    title="Followers"
                    containerStyles="text-blue-600 mb-[2px] font-medium px-2 hover:text-blue-800 text-sm bg-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              {[1, 2, 3, 4, 4, 5].map(() => {
                return (
                  <>
                    <div className="my-6">
                      <ParticipantItem />
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
          title="View all participants"
          containerStyles="bg-blue-600 w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
        />
      </div>
      {/*  */}
    </>
  );
}

export default BrowerParticipants;
