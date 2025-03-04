import { useParams, Link } from "react-router-dom";
import {
  backgroundSearch,
  defaultAvt,
  imgDefaultProject,
} from "../../../../assets/images";
import CustomButton from "../../../../components/CustomButton";

import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentProject,
  getProjectSingle,
  resetSuccessAction,
  toggleLikeProject,
} from "../../../../redux/slices/projects/projectsSlices";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { TextInput } from "../../../../components";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
function ProjectDetail() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const projectSlice = useSelector((store) => store.projects);
  const { isSuccess, project, isSuccessUD } = projectSlice;
  const storeData = useSelector((store) => store.users);
  const user = storeData?.userAuth?.user;
  const [item, setItemProject] = useState({});
  const getPrpjectDetail = async (id) => {
    dispatch(getProjectSingle(id));
  };
  const notify = (type, message) => toast(message, { type: type });

  const [teammates, setTeammates] = useState([
    { fullname: "Nguyễn Văn Phát", email: "@Fatitboo" },
  ]);
  const [registeredHackathon, setRegisteredHackathon] = useState([]);
  useEffect(() => {
    getPrpjectDetail(projectId);
  }, [projectId]);
  const { register, handleSubmit, setValue } = useForm({ mode: "onChange" });
  const onSubmitInfo = (data) => {
    if (!user) {
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
      if (data.comment === "") return;
      else {
        dispatch(
          addCommentProject({ comment: data.comment, productId: projectId })
        );
      }
    }
  };
  useEffect(() => {
    if (isSuccessUD) {
      getPrpjectDetail(projectId);
      dispatch(resetSuccessAction());
      setValue("comment", "");
      notify("success", "Toogle Like successfully!");
    }
  }, [isSuccessUD]);
  const handleToggleLike = () => {
    if (!user) {
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
      dispatch(toggleLikeProject(projectId));
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setItemProject(project);
      setTeammates(project?.createdBy);
      setRegisteredHackathon(
        project?.registeredToHackathon ? [project?.registeredToHackathon] : []
      );
      dispatch(resetSuccessAction());
    }
    console.log("🚀 ~ useEffect ~ project:", project);
  }, [isSuccess]);

  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  function getQueryParams(url) {
    // Tách phần query string từ URL
    const queryString = url.split("?")[1];
    if (!queryString) return {};

    // Tách từng cặp key=value
    const queryPairs = queryString.split("&");
    const queryParams = {};

    // Xử lý từng cặp và lưu vào object
    queryPairs.forEach((pair) => {
      const [key, value] = pair.split("=");
      queryParams[decodeURIComponent(key)] = decodeURIComponent(value || "");
    });

    return queryParams;
  }
  return (
    <>
      <div>
        <ToastContainer />
        <div className="bg-teal-900 text-white text-center py-10  px-60">
          <h1 className="text-4xl font-bold mb-2">
            {item?.projectTitle ?? "Unitied"}
          </h1>
          <p className="text-lg mb-6 text-ellipsis line-clamp-3">
            {item?.tagline}
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleToggleLike}
              className="flex items-center gap-2 bg-teal-600 text-white py-2 px-4 rounded-sm hover:bg-teal-700 focus:outline-none"
            >
              <span role="img" aria-label="heart">
                ❤️
              </span>{" "}
              Like {item?.likedBy?.length || 0}
            </button>
            <a
              href="#update"
              className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-sm hover:bg-blue-700 focus:outline-none"
            >
              <span role="img" aria-label="comment">
                💬
              </span>{" "}
              View Comments
            </a>
          </div>
        </div>
        <div className="px-60 pt-5 flex">
          <div className="border-blue-500 border-b-4 w-24">
            <h1 className="text-3xl font-medium mb-2 ">STORY</h1>
          </div>
          <a href="#update" className=" w-30 ml-10">
            <h1 className="text-3xl font-medium mb-2 ">UPDATE</h1>
          </a>
        </div>
        <hr />
        <div className="px-60 max-lg:px-2 py-5 ">
          <div className="w-[60%] ">
            <Swiper
              modules={[Navigation, Autoplay]}
              slidesPerView={1}
              navigation
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              spaceBetween={30}
              className="rounded-lg overflow-hidden flex mx-auto"
            >
              {/* Slide 1: Image */}
              {(item?.galary || []).map((i, index) => {
                if (i?.url.includes("youtube")) {
                  let url;
                  if (i?.url.includes("embed")) url = i?.url;
                  else
                    url =
                      "https://www.youtube.com/embed/" +
                      getQueryParams(i?.url)?.v;
                  return (
                    <SwiperSlide key={index}>
                      <div className="flex flex-col items-center justify-center">
                        <iframe
                          width={500}
                          height="315"
                          src={url}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                        <div className=" text-black text-xl text-center py-2">
                          <p>{i?.caption}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                } else {
                  return (
                    <SwiperSlide key={index}>
                      <div className="flex flex-col items-center justify-center">
                        <img width="315" src={i?.url} />
                        <div className=" text-black text-xl text-center py-2">
                          <p>{i?.caption}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                }
              })}
            </Swiper>
            <div></div>
          </div>
          <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-10">
            <div className="col-span-2">
              <div className=" text-gray-600 " id="generated-script">
                <div>
                  <div
                    className="mb-6"
                    dangerouslySetInnerHTML={{
                      __html: decodeHTML(item?.content),
                    }}
                  ></div>
                </div>
              </div>
              {/* Built With Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Built With</h2>
                <div className="flex flex-wrap gap-2">
                  {(
                    item?.builtWith ?? [
                      "adobe",
                      "c#",
                      "illustrator",
                      "javascript",
                    ]
                  ).map((item, index) => {
                    return (
                      <>
                        <span
                          index={index}
                          className="bg-gray-200 px-4 py-1 text-sm "
                        >
                          {item}
                        </span>
                      </>
                    );
                  })}
                </div>
              </div>

              {/* Try It Out Section */}
              <div className="mb-8 flex-col flex">
                <h2 className="text-xl font-bold mb-4">Try it out</h2>
                {(item?.tryoutLinks || []).map((item, index) => {
                  return (
                    <>
                      <a
                        key={index}
                        href={item}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline "
                      >
                        {item}
                      </a>
                    </>
                  );
                })}
              </div>
              <hr />
              {/* Like and Comments Section */}
              <div className="my-8">
                <div className="flex items-center gap-4 mb-4">
                  <button className="flex items-center gap-2 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700">
                    <span>❤️</span> Like {item?.likedBy?.length || 0}
                  </button>
                </div>
              </div>
              <hr />
              {/* Updates Section */}
              <div className="">
                <h2 id="update" className="text-xl font-bold my-4">
                  Updates
                </h2>
                <div className="space-y-4">
                  {[...(item?.updates || [])].map((update, index) => (
                    <div
                      key={index}
                      className="bg-white p-4  rounded-md shadow-md flex flex-row"
                    >
                      <img
                        className="w-20 h-20 rounded-full border-2 border-white mr-4"
                        src={defaultAvt}
                        alt="User 1"
                      />
                      <div>
                        <p className="text-gray-700 mb-4">
                          Owner Started this project at{" "}
                          {new Date(update.createdAt).toLocaleDateString()}
                        </p>
                        <h4 className="text-base text-ellipsis line-clamp-3 ">
                          {update?.update}
                        </h4>
                        <div className="mt-5 bg-gray-100 p-5">
                          {[...(update?.comments || [])].map((cmt, index) => {
                            return (
                              <div key={index} className="flex flex-row my-4">
                                <img
                                  className="w-10 h-10 rounded-full border-2 border-white mr-4"
                                  src={defaultAvt}
                                  alt="User 1"
                                />
                                <div>
                                  <div className="flex">
                                    <div className="text-blue-700">
                                      {cmt.user} -{" "}
                                    </div>
                                    {new Date(
                                      cmt.createdAt
                                    ).toLocaleDateString()}
                                  </div>
                                  <div>{cmt?.comment}</div>
                                </div>
                              </div>
                            );
                          })}
                          <form onSubmit={handleSubmit(onSubmitInfo)}>
                            <div className="flex flex-row mt-5">
                              <img
                                className="w-10 h-10 rounded-full border-2 border-white mr-4"
                                src={user?.avatar ?? defaultAvt}
                                alt="User 1"
                              />
                              <div className=" w-full">
                                <TextInput
                                  name="comment"
                                  register={register("comment")}
                                  type="text"
                                  placeHolder="Write a comment"
                                  styles="bg-[#f0f5f7]"
                                />
                                <CustomButton
                                  type={"Submit"}
                                  title="Post comment"
                                  containerStyles="bg-blue-600 mt-4 font-medium text-white py-2 px-5 focus:outline-none hover:bg-white hover:text-blue-700 rounded-sm text-base border border-blue-600"
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-1">
              {registeredHackathon.length > 0 && (
                <div className=" w-full col-span-1 -mt-[250px]">
                  <div className="font-medium text-2xl uppercase mb-4">
                    register to hackathon
                  </div>

                  <div style={{ listStyle: "none", padding: 0 }}>
                    {registeredHackathon.map((hack, index) => (
                      <Link
                        to={`/Hackathon-detail/${hack?._id}/overview`}
                        key={index}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "10px",
                          }}
                        >
                          <img
                            src={hack?.thumbnail ?? defaultAvt}
                            alt="avatar"
                            style={{
                              width: "80px",
                              height: "80px",
                              borderRadius: "3%",
                              backgroundColor: "#ccc",
                              border: "0.04px solid #ccc",
                            }}
                          />
                          <div>
                            <p style={{ margin: 0, fontSize: "20px" }}>
                              {hack?.hackathonName}
                            </p>
                            <p style={{ margin: 0, color: "#888" }}>
                              {hack?.hostName}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <div className=" w-full col-span-1 mt-20">
                <div className="font-medium text-2xl uppercase mb-4">
                  current teammates
                </div>

                <div style={{ listStyle: "none", padding: 0 }}>
                  {teammates?.map((teammate, index) => (
                    <Link
                      to={`/Seeker-detail/${teammate?._id}/Projects`}
                      key={index}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <img
                          src={teammate?.avatar ?? defaultAvt}
                          alt="avatar"
                          style={{
                            width: "40px",
                            height: "40px",
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
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectDetail;
