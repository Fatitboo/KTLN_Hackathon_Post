import { FaPlusSquare } from "react-icons/fa";
import { defaultAvt } from "../../assets/images";

const TeamItem = ({ props, min, currentTeamId, handleInvite, isHideTag }) => {
  return (
    <>
      <div className="border border-gray-200 rounded-sm p-5">
        <div className="flex pb-5 border-b border-gray-100">
          <div className="flex justify-between flex-1">
            <div className="">
              <div className="flex space-x-4 items-center">
                <div className="text-xl font-semibold">{props?.name}</div>
                {currentTeamId !== props._id && !isHideTag && (
                  <div
                    onClick={() => handleInvite(currentTeamId, props._id)}
                    className="cursor-pointer flex items-center space-x-1 rounded-full h-fit px-2 py-1 text-sm text-white bg-green-800"
                  >
                    <FaPlusSquare className="mr-2" />
                    Request combine
                  </div>
                )}
              </div>
              <div className="flex text-xs text-gray-400 mt-3 space-x-4">
                <div>{props?.projects?.length ?? 0} PROJECTS</div>
                <div>{props?.members?.length ?? 8} MEMBERS</div>
                {/* <div>{props?.achievement?.length ?? 9} ACHIVEMENT</div> */}
              </div>
            </div>
            <div className="rounded-full h-fit px-2 py-1 border text-sm text-gray-500 border-r-gray-100">
              {props?.members?.length >= min
                ? "Eligible Members"
                : "Not Eligible Members"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <div className=" uppercase ml-1 my-2 ">Leader</div>
            <div className="flex flex-wrap">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",

                  marginBottom: "10px",
                }}
              >
                <div className="flex justify-between items-center">
                  <img
                    src={props.leaderId?.avatar ?? defaultAvt}
                    alt="avatar"
                    style={{
                      width: "40px",
                      height: "40px",
                      marginRight: "5px",
                      borderRadius: "50%",
                      backgroundColor: "#ccc",
                    }}
                  />
                  <div>
                    <p style={{ margin: 0 }}>{props.leaderId.fullname}</p>
                    <p style={{ margin: 0, color: "#888" }}>
                      {props.leaderId.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className=" uppercase ml-1 my-2">Members</div>
            <div className="flex flex-wrap">
              <div style={{ listStyle: "none", padding: 0 }}>
                {props.members?.map((teammate, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <img
                        src={teammate?.avatar ?? defaultAvt}
                        alt="avatar"
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "5px",
                          borderRadius: "50%",
                          backgroundColor: "#ccc",
                        }}
                      />
                      <div>
                        <p style={{ margin: 0 }}>{teammate.fullname}</p>
                        <p style={{ margin: 0, color: "#888" }}>
                          {teammate.email}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamItem;
