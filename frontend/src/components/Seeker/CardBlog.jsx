import React from "react";
import { BiCommentDetail } from "react-icons/bi";
import { BsFillHeartFill } from "react-icons/bs";
import { tagWinner } from "../../assets/images";
import { Link } from "react-router-dom";

const CardBlog = ({
  title,
  description,
  image,
  blogType,
  imgUser,
  member,
  votes,
  comments,
  id,
}) => {
  return (
    <Link to={`/Seeker/blog-detail/${id}`}>
      <div className=" cursor-pointer max-w-sm  bg-white border border-gray-300 rounded-sm hover:shadow-md">
        <div className="min-h-[500px] flex flex-col">
          <img src={image} alt={title} className="h-52 w-96 shadow-sm" />
          <div className="p-5 flex-1">
            <span className="bg-gray-200 px-4 py-1 text-sm my-2">
              {blogType}
            </span>
            <h3 className="mt-2 text-2xl font-medium line-clamp-3 mb-4">
              {title}
            </h3>
            <p className="mt-1 text-gray-600 line-clamp-3 font-normal text-sm ">
              {description}
            </p>
          </div>
          <div className="text-blue-600 cursor-pointer p-5 align-bottom">
            Read more
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardBlog;
