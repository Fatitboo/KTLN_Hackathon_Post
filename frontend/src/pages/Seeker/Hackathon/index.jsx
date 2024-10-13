import { useParams, Link } from "react-router-dom";
import { backgroundSearch } from "../../../assets/images";
import { CustomButton } from "../../../components";
import {
  BsCalendar2Fill,
  BsFillPinMapFill,
  BsFlagFill,
  BsTagsFill,
} from "react-icons/bs";
import { AiOutlineGlobal } from "react-icons/ai";
import { calculateTimeLeft } from "../../../utils/convert_date";

function HackathonDetail() {
  const { id, type } = useParams();
  const item = {
    name: "Seam Miniapp Challenge",
    organization_name: "Seam",
    location: "Online",
    themes: "Mobile, Music/Art, Web",
    submission_start_date: "2025-02-05",
    submission_end_date: "2025-02-19",
    prize: "$1,050",
    registrations: 207,
    desc: "Create apps and games for a gen-z social platform",
    img_avt:
      "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_thumbnails/002/968/223/datas/original.png",
    img_bg:
      "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_background_images/002/968/229/datas/original.png",
    url: "https://seam-miniapp-challenge.devpost.com/",
    image:
      "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_photos/002/970/198/datas/original.png",
    description:
      "&lt;h4 id=&quot;about-the-challenge&quot; class=&quot;h2-title&quot;&gt;About the Challenge&lt;/h4&gt;\n&lt;p&gt;The Seam miniapp challenge inspires everyone to build the future of social networks by contributing miniapps. Seam is an app where you can create and discover miniapps and post new types of things for your friends.&lt;/p&gt;\n&lt;ul&gt;\n&lt;li&gt;Submitted miniapps can go live to our community of more than 20k users in the web app at &lt;a href=&quot;http://seam.so&quot; target=&quot;_blank&quot; rel=&quot;noopener&quot;&gt;seam.so&lt;/a&gt; and also live on the iOS appstore!&lt;/li&gt;\n&lt;li&gt;All miniapp code is open source, so you can remix and learn from examples.&lt;/li&gt;\n&lt;li&gt;You earn Seam Points when other users unlock your miniapps.&lt;/li&gt;\n&lt;/ul&gt;\n&lt;h4 id=&quot;get-started&quot; class=&quot;h2-title&quot;&gt;Get Started&lt;/h4&gt;\n&lt;p&gt;Before creating a miniapp, you should join Seam! Creating a Seam account allows you to claim a username and profile that will be used as the author of the miniapp. More importantly though, it allows you to join a community of other builders, designers, and curators all building the future of social networking together.&lt;/p&gt;\n&lt;p&gt;Either join on web at &lt;a href=&quot;https://www.seam.so/&quot; target=&quot;_blank&quot; rel=&quot;noopener&quot;&gt;seam.so&lt;/a&gt;, or &lt;a href=&quot;https://apps.apple.com/us/app/seam-social/id6473547569&quot; target=&quot;_blank&quot; rel=&quot;noopener&quot;&gt;download our iOS app from the Apple appstore&lt;/a&gt;.&lt;/p&gt;\n&lt;p&gt;&lt;/p&gt;\n&lt;p&gt;Start coding at &lt;a href=&quot;https://docs.getseam.xyz/&quot;&gt;docs.getseam.xyz&lt;/a&gt;, our step-by-step guide to get you started. Miniapps are small React components written in Typescript. If you have written JavaScript before, this will be a fun challenge. Even if you are new to front-end development, it is a good place to learn. Simple miniapps can take only 15 minutes to create, and you can make them as complex as you want.&lt;/p&gt;",
    judging_criteria: `<article id="judging-criteria">
<div class="section-title bold">
<h3 class="subheader section-title-left">
      Judging Criteria
    </h3>
<span class="section-title-line"></span>
</div>
<ul class="no-bullet">
<li>
<strong>Voting for top 2 overall</strong><br/>
        Seam users will unlock the miniapps that they are most excited about. Each unlock during the Voting Period will constitute a vote towards winning the challenge. The top three miniapps that were unlocked will be awarded prizes.
      </li>
<li>
<strong>Judging for the other prizes</strong><br/>
        The Judges, at their sole discretion, will evaluate and determine the recipients of the additional prizes based on criteria they find appropriate. 
      </li>
</ul>
</article>`,
    challenge_requirements: `<article id="challenge-requirements">
<div class="section-title bold">
<h3 class="subheader section-title-left">
          Requirements
        </h3>
<span class="section-title-line"></span>
</div>
<div>
<h4>What to Build</h4>
<p>The goal for this miniapp challenge is to create new, fun ways to share with your friends on Seam.</p>
<p>Miniapps make posts. Users play with miniapps to create new art, music, or games, which then can be experienced by your friends. Miniapps live inside Seam, the super app, which acts as a constant contact book and platform for the feeds and groupchats that miniapps live inside of. Miniapps are creative tools that render their end product to a feed.</p>
<p>A miniapp fundamentally has two steps. They start with the singleplayer mode, where someone enters their data, plays the game, or interacts with the app. The second mode is how it shows up in a feed, which is a typically the finished product of the creative process: the finished song, GIF, or highscore. Some quick examples:</p>
<ul>
<li>Artistic miniapps first allow artists to draw on a canvas, and then post their watercolor. Yes, Microsoft Paint is basically a miniapp.</li>
<li>Commerce miniapps first allow a seller to decide what to sell and how to make the post look, and then allows users to buy with one tap.</li>
<li>Game miniapps first allow friends to play the game, and then allows them to compete by posting their highscores.</li>
<li>Utility miniapps take the most arcane 3D image filetypes, and then render them properly in the feed.</li>
</ul>
<p>The options for miniapps are endless — see the examples that already exist on <a href="http://seam.so">seam.so</a>.</p>
<h4>How to Submit</h4>
<p>To be considered a submission for the challenge, the code for the miniapp must be submitted as a <a href="https://github.com/seam-xyz/Miniapp-Builder">Pull Request in the Github repository for Seam’s miniapps</a> by the end of the submission period.</p>
<p>Additionally, submissions are encouraged on Devpost to add more detail as well as to be added to the project gallery.</p>
<p>For a successful submission, the miniapp should:</p>
<p></p>
<ul>
<li>Compile and run within the Seam miniapp builder environment without errors or crashes</li>
<li>Run performantly without excessive lagging or glitching</li>
<li>Allow a user to make a post and successfully render in the feed</li>
</ul>
</div>
</article>`,
    hackathon_id: 1,
  };
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  return (
    <>
      <div>
        <div
          className="flex flex-col pt-5 bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${item.img_bg ?? backgroundSearch})`,
          }}
        >
          <div className="px-60 max-lg:px-2">
            <img src={item.image} alt={item.name} />
          </div>
          <div className=" flex bg-gray-400 opacity-70 py-3 mt-3 text-white text-normal">
            <div className="px-60 max-lg:px-2 ">
              <Link
                to={`/Hackathon-detail/${id}/overview`}
                className={`py-4 px-4 hover:underline ${
                  type === "overview" ? "text-black opacity-100 bg-white" : ""
                }`}
              >
                Overview
              </Link>
              <Link
                to={`/Hackathon-detail/${id}/my-project`}
                className={`py-4 px-4 hover:underline ${
                  type === "my-project" ? "text-black opacity-100 bg-white" : ""
                }`}
              >
                MyProject
              </Link>
              <Link
                to={`/Hackathon-detail/${id}/participants`}
                className={`py-4 px-4 hover:underline ${
                  type === "participants"
                    ? "text-black opacity-100 bg-white"
                    : ""
                }`}
              >
                Participants
              </Link>
              <Link
                to={`/Hackathon-detail/${id}/resourses`}
                className={`py-4 px-4 hover:underline ${
                  type === "resourses" ? "text-black opacity-100 bg-white" : ""
                }`}
              >
                Resourses
              </Link>
              <Link
                to={`/Hackathon-detail/${id}/rules`}
                className={`py-4 px-4 hover:underline ${
                  type === "rules" ? "text-black opacity-100 bg-white" : ""
                }`}
              >
                Rules
              </Link>
              <Link
                to={`/Hackathon-detail/${id}/project-gallery`}
                className={`py-4 px-4 hover:underline ${
                  type === "project-gallery"
                    ? "text-black opacity-100 bg-white"
                    : ""
                }`}
              >
                Project gallery
              </Link>
              <Link
                to={`/Hackathon-detail/${id}/updates`}
                className={`py-4 px-4 hover:underline ${
                  type === "updates" ? "text-black opacity-100 bg-white" : ""
                }`}
              >
                Updates
              </Link>
              <Link
                to={`/Hackathon-detail/${id}/discussions`}
                className={`py-4 px-4 hover:underline ${
                  type === "discussions"
                    ? "text-black opacity-100 bg-white"
                    : ""
                }`}
              >
                Discussions
              </Link>
            </div>
          </div>
        </div>
        <div className="px-60 max-lg:px-2 py-5 bg-gray-100">
          <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-10">
            <div className="col-span-2">
              <h2 className="font-semibold mt-5">{item.name}</h2>
              <p className="text-xl mt-5 h-16">{item.desc}</p>
              <div className="grid grid-cols-5">
                <div className="col-span-1">
                  <CustomButton
                    title="Join hackathon"
                    containerStyles="bg-blue-600 w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
                  />
                </div>
                <div className="text-sm ml-10 col-span-4 ">
                  <div className="font-bold mb-2">Who can participate</div>
                  <div className="grid grid-cols-2 gap-5 mb-4">
                    <ul>
                      <li>
                        Above legal age of majority in country of residence
                      </li>
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
              <div className="bg-white rounded-sm py-2">
                <div className="py-3 px-5">
                  <div className="text-white bg-[#21a196] rounded py-1.5 px-4 mr-6 w-fit">
                    <li> {calculateTimeLeft("2024-12-01")}</li>
                  </div>

                  <div className="font-medium my-2">Deadline</div>
                  <div>13 thg 11, 2024 @ 8:00am</div>
                </div>
                <div className=" border-t border-gray-200 py-3 px-5">
                  <div className="flex font-light items-center">
                    <div className="flex items-start text-sm">
                      {location === "Online" ? (
                        <AiOutlineGlobal className="mr-2 mt-0.5" />
                      ) : (
                        <BsFillPinMapFill className="mr-2 mt-0.5" />
                      )}
                      <h6 className="line-clamp-1">{"location"}</h6>
                    </div>
                  </div>
                  <div className="flex font-light mt-3 text-sm">
                    <div className="mr-6">
                      <strong className="font-semibold">${1000}</strong> in
                      prizes
                    </div>
                    <div className="">
                      <strong className="font-semibold">{1000}</strong>{" "}
                      participants
                    </div>
                  </div>
                </div>
                <div className=" border-t border-gray-200 py-3 px-5">
                  <div className="flex items-center">
                    <BsFlagFill className="text-gray-700 mr-3" />
                    <div className="rounded-full border border-blue-500 pl-2 pr-2 mr-3 py-1 text-blue-500 text-sm line-clamp-1">
                      {"organization"}
                    </div>
                  </div>
                  <div className="flex items-center mt-3">
                    <BsCalendar2Fill className="text-gray-700 mr-3" />
                    <div className=" text-gray-700 text-sm">
                      {"Jun 17 - Jul 15, 2023"}
                    </div>
                  </div>
                  <div className="flex  mt-3 ">
                    <BsTagsFill className="text-gray-700 mr-2 mt-2 " />
                    <div className="flex flex-wrap">
                      {["Beginner Friendly", "Low code", "Web"].map((item) => {
                        return (
                          <>
                            <div className="rounded-[3px] bg-blue-50 px-3 py-1 text-blue-700 text-sm my-1 mr-2">
                              {item}
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-60 max-lg:px-2 py-5 ">
          <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-10">
            <div className="col-span-2 text-gray-600 " id="generated-script">
              <div
                className="mb-6"
                dangerouslySetInnerHTML={{
                  __html: decodeHTML(item?.description),
                }}
              ></div>
              <div
                className="mb-6"
                dangerouslySetInnerHTML={{
                  __html: item?.challenge_description,
                }}
              ></div>
              <div
                className="mb-6"
                dangerouslySetInnerHTML={{
                  __html: item?.challenge_requirements,
                }}
              ></div>
              <div
                className="mb-6"
                dangerouslySetInnerHTML={{
                  __html: item?.judging_criteria,
                }}
              ></div>
            </div>

            <div className="col-span-1"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HackathonDetail;
