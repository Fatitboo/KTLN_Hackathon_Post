import { useEffect, useState } from "react";
import { CustomButton, TextInput, LoadingComponent } from "../../../components";
import { CgArrowLeft } from "react-icons/cg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import FroalaEditor from "react-froala-wysiwyg";
import { imgDefaultProject } from "../../../assets/images";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
import { blogTypes } from "./AddBlog";

function UpdateBlog() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [value, setValueDes] = useState("");
  const [blog, setBlog] = useState(null);
  const [loading2, setLoading] = useState(false);
  const storeData = useSelector((store) => store.users);
  const user = storeData?.userAuth?.user;
  const [fileThumnail, setFileThumnail] = useState(null);
  const {
    register,
    handleSubmit,
    unregister,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    Swal.fire({
      title: "Confirm update",
      text: "Do you want to update this item?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const pl = {
          blogTitle: data.blogTitle,
          tagline: data.tagline,
          content: value.toString(),
          videoLink: data?.videoLink,
          thumnailImage: fileThumnail,
          autho: {
            name: "Admin",
            title: "Administartor of Devpost",
            createdAt: new Date().toISOString(),
          },
          isApproval: true,
          blogType: blogType,
        };
        try {
          const { data } = await axios.put(`${baseUrl}/api/v1/blogs/${id}`, pl);
          if (data) {
            Swal.fire({
              title: "Updated!",
              text: "This blog has been updated.",
              icon: "success",
              confirmButtonText: "OK",
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/Admin/blog-management";
              }
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Update failed!",
            text: "Update failed, please try again.",
            confirmButtonText: "OK",
            icon: "error",
            allowOutsideClick: false,
            confirmButtonColor: "#3085d6",
          }).then((result) => {
            if (result.isConfirmed) {
              /* empty */
            }
          });
        }
      }
    });
  };
  const [blogType, setBlogType] = useState("");
  const handleBlogTypeChange = (value) => setBlogType(value);

  const handleUpdateAvt = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const rs = await uploadImageFromLocalFiles({ file });
      setFileThumnail(rs.url);
      setLoading(false);
    }
  };
  const uploadImageFromLocalFiles = async ({ file }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "upload_audio"); // Set this in your Cloudinary dashboard

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dvnxdtrzn/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data;

      // return uploadUrls;
    } catch (error) {
      console.error("Error uploading image::", error);
    }
  };
  const occupations = useSelector((store) => store?.occupations);
  const { loading, appErr, isSuccess = false } = occupations;
  const handleGetBlog = async (id) => {
    const { data } = await axios.get(`${baseUrl}/api/v1/blogs/${id}`);
    if (data) {
      console.log("🚀 ~ useEffect ~ data:", data);
      setValue("blogTitle", data?.blogTitle);
      setValue("tagline", data?.tagline);
      setValue("videoLink", data?.videoLink);
      setBlogType(data?.blogType);
      setValueDes(data?.content);
      setFileThumnail(data?.thumnailImage);
      setBlog(data);
    }
  };
  useEffect(() => {
    handleGetBlog(id);
  }, [id]);
  return (
    <div className="px-10 py-10 pb-0">
      {loading && <LoadingComponent />}
      {/* Start title of page  */}
      <div className="flex items-center">
        <Link to="/Admin/blog-management" className="mb-3 flex items-center ">
          <CgArrowLeft fontSize={30} />
          {/* <h3 className="font-normal text-2xl text-gray-900 ml-2 leading-10">Back</h3> */}
        </Link>
        <div className="ml-10 font-medium mb-3 text-3xl text-gray-700">
          Update Blog
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="max-w-full  w-full">
          <div className="relative rounded-lg mb-8 bg-white max-w-full w-full">
            <div className="relative">
              {/* Input form create/ update skill information */}
              <div className="relative flex text-left flex-col bg-transparent px-10 py-2">
                <form
                  className=" grid grid-cols-4 gap-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="mt-4 w-full col-span-3 ">
                    <div className="mb-5 w-full">
                      <TextInput
                        type={"text"}
                        register={register("blogTitle", {
                          required: "Blog Title is required!",
                        })}
                        error={errors.blogTitle ? errors.blogTitle.message : ""}
                        label="Blog Title *"
                        name="blogTitle"
                        containerStyles="text-[#05264e] text-base w-full tw-bg-white"
                        labelStyle="text-[#05264e] font-medium"
                      />
                    </div>
                    <div className="mb-6">
                      <div className="block text-base font-medium text-gray-700">
                        * Blog Type?
                      </div>
                      <div className="flex flex-wrap text-gray-500">
                        {blogTypes.map((item) => (
                          <div
                            key={item}
                            className={`px-4 py-1 flex items-center cursor-pointer rounded-sm border my-1 mr-2 ${
                              blogType === item
                                ? " border-blue-900"
                                : "border-gray-300"
                            } `}
                            onClick={() => handleBlogTypeChange(item)}
                          >
                            {blogType === item ? (
                              <CheckCircleIcon className="rounded-full bg-gray-200 w-5 h-5 mr-2" />
                            ) : (
                              <div className="rounded-full bg-gray-200 w-5 h-5 mr-2" />
                            )}
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-5 w-full">
                      <TextInput
                        type={"text"}
                        register={register("tagline", {
                          required: "Tag line is required!",
                        })}
                        error={errors.tagline ? errors.tagline.message : ""}
                        label="Here's the blog tagline? *"
                        description={`What's your idea? This will be a short tagline for the blog`}
                        name="tagline"
                        placeHolder={"A short tag line for blog."}
                        containerStyles="text-[#05264e] text-base w-full tw-bg-white"
                        labelStyle="text-[#05264e] font-medium"
                      />
                    </div>

                    <div>
                      <p className="block leading-8 text-gray-900 font-medium mt-6">
                        Content of blog *
                      </p>
                      <div className="text-xs text-[#6F6F6F] italic mb-4">
                        Be sure to write what inspired you, what you learned,
                        how you built your project, and the challenges you faced
                      </div>
                      <FroalaEditor
                        model={value}
                        onModelChange={(event, editor) => {
                          setValueDes(event);
                        }}
                        config={{
                          placeholderText:
                            "Provide a comprehensive job description, outlining the roles, responsibilities, qualifications, and any additional information relevant to the blog.",
                          charCounterCount: true,
                          toolbarButtons: {
                            moreParagraph: {
                              buttons: ["formatUL", "outdent", "indent"],
                            },
                            moreText: {
                              buttons: [
                                "bold",
                                "italic",
                                "underline",
                                "fontSize",
                              ],
                            },
                            moreRich: {
                              buttons: [
                                "insertImage",
                                "insertVideo",
                                "insertTable",
                              ],
                            },
                            moreMisc: {
                              buttons: ["undo", "redo"],
                            },
                          },
                          height: 250,
                          heightMin: 250,
                          resizable: true,
                          wordCounter: true,
                          wordCounterLabel: "words",
                          wordCounterBbCode: false,
                          wordCounterTimeout: 0,
                        }}
                      />
                    </div>

                    <div className="mt-6">
                      <div className="mb-5 w-full">
                        <TextInput
                          type={"text"}
                          register={register("videoLink")}
                          label="Video link"
                          name="videoLink"
                          description={
                            "This video will be embedded at the top of your project page. "
                          }
                          containerStyles="text-[#05264e] text-base w-full tw-bg-white"
                          labelStyle="text-[#05264e] font-medium"
                          placeHolder="Youtube, Facebook Video, Vimeo or Youku URL"
                        />
                      </div>
                    </div>
                    <div className="w-[1/3]">
                      <CustomButton
                        // isDisable={loading}
                        title={"Save and continue"}
                        type={"submit"}
                        containerStyles={
                          "bg-[#3c65f5] focus:bg-[#05264e] w-fit py-2 pl-5 pr-5 rounded flex justify-center items-center text-white mb-3"
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-5 w-full col-span-1">
                    <div className="font-medium text-base">Thumnail Image</div>
                    <div className="mb-5 cursor-pointer max-w-xs bg-white border border-gray-300 rounded-sm hover:shadow-md">
                      <div className="">
                        <img
                          src={fileThumnail ?? imgDefaultProject}
                          // alt={titleBinding}
                          className="h-48 w-full"
                        />
                        {/* <div className="mb-2 px-2 h-16">
                                          <h3 className="mt-2 text-base font-semibold line-clamp-1">
                                            {titleBinding}
                                          </h3>
                                          <p className="my-1 text-[#6F6F6F] line-clamp-2 italic text-sm">
                                            {taglineBinding}
                                          </p>
                                        </div> */}
                      </div>
                    </div>
                    <input
                      onChange={(e) => handleUpdateAvt(e)}
                      type="file"
                      name="attachment"
                      accept="image/*"
                      id="uploadImg"
                      hidden
                      className="opacity-0 absolute hidden overflow-hidden h-0 w-0 z-[-1]"
                    />
                    <label
                      htmlFor="uploadImg"
                      className="cursor-pointer text-blue-600 "
                    >
                      Change image
                    </label>
                    <div className="text-sm text-[#6F6F6F]">
                      JPG, PNG or GIF format, 5 MB max file size. For best
                      results, use a 3:2 ratio.
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateBlog;
