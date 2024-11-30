import { Link, useOutletContext } from "react-router-dom";
import { CustomButton } from "../../../../components";
import HackathonInfo from "../../../../components/Seeker/HackathonInfo";

function Overview() {
  const { item, id } = useOutletContext();

  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="">
      <div className="px-60 max-lg:px-2 py-5  bg-gray-100">
        <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-10">
          <div className="col-span-2">
            <h2 className="font-semibold mt-5">{item?.title}</h2>
            <p className="text-xl mt-5 h-16">{item?.challenge_description}</p>
            <div className="grid grid-cols-5">
              <div className="col-span-1">
                <Link to={`/Hackathon-detail/${id}/register`}>
                  <CustomButton
                    title="Join hackathon"
                    containerStyles="bg-blue-600 w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
                  />
                </Link>
              </div>
              <div className="text-sm ml-10 col-span-4 ">
                <div className="font-bold mb-2">Who can participate</div>
                <div className="grid grid-cols-2 gap-5 mb-4">
                  <ul>
                    <li>Above legal age of majority in country of residence</li>
                    <li>Specific</li>
                  </ul>
                  <ul>
                    <li>Team max size: 3 individuals</li>
                    <li>Specific</li>
                  </ul>
                </div>
                <Link
                  to={`/Hackathon-detail/${id}/rules`}
                  className="font-normal mt-5 text-blue-600"
                >
                  View all rules
                </Link>
              </div>
            </div>
          </div>
          <div className="col-span-1 text-sm mt-2">
            <HackathonInfo />
          </div>
        </div>
      </div>
      <div className="px-60 max-lg:px-2 py-5 ">
        <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-10">
          <div className="col-span-2 text-gray-600 " id="generated-script">
            <div>
              <div
                className="mb-6"
                dangerouslySetInnerHTML={{
                  __html: decodeHTML(item?.description),
                }}
              ></div>
              <div
                className="mb-6"
                dangerouslySetInnerHTML={{
                  __html: decodeHTML(item?.challenge_description),
                }}
              ></div>
              <div
                className="mb-6"
                dangerouslySetInnerHTML={{
                  __html: decodeHTML(item?.challenge_requirements),
                }}
              ></div>
              <div
                className="mb-6"
                dangerouslySetInnerHTML={{
                  __html: decodeHTML(item?.judging_criteria),
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
