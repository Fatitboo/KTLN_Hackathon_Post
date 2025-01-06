import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogSingle,
  resetValue,
} from "../../../../redux/slices/occupations/occupationsSlices";
function BlogDetailUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const occupationSlices = useSelector((store) => store.occupations);
  const [item, setItemBlog] = useState({});
  const { blog, isSuccess } = occupationSlices;
  const getBlogDetail = async (id) => {
    dispatch(getBlogSingle(id));
  };
  useEffect(() => {
    getBlogDetail(id);
  }, [id]);

  useEffect(() => {
    if (isSuccess) {
      setItemBlog(blog);
      dispatch(resetValue("isSuccess", false));
    }
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
        <div className="bg-[#f8f4f4] text-center py-10 min-h-[500px] px-64 grid grid-cols-2 gap-5 ">
          <div className="col-span-1 items-start justify-start flex flex-col mr-10">
            <div className="bg-teal-500 text-white p-2 my-3 w-fit h-fit text-xs font-bold">
              {item?.blogType}
            </div>
            <h3 className="text-5xl text-start leading-tight">
              {item?.blogTitle}
            </h3>
            <p className="text-start italic font-semibold my-4">
              {item?.tagline}
            </p>
            <div>By {` ${item?.autho?.name}`}</div>
            <div> {` ${item?.autho?.title}`}</div>
            <div>
              Create at: {` ${new Date(item?.create_at).toDateString()}`}
            </div>
          </div>
          <div className="col-span-1 mt-10 items-center ml-10">
            <img src={item?.thumnailImage}></img>
          </div>
        </div>

        <div className=" max-lg:px-2 py-5 ">
          <div className="mx-auto ">
            {([item?.videoLink] || []).map((i, index) => {
              if (i?.includes("youtube")) {
                let url;
                if (i?.includes("embed")) url = i;
                else
                  url = "https://www.youtube.com/embed/" + getQueryParams(i)?.v;
                return (
                  <div key={index}>
                    <div className="flex flex-col items-center justify-center">
                      <iframe
                        width={900}
                        height={600}
                        src={url}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="px-96">
            <div className="">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogDetailUser;
