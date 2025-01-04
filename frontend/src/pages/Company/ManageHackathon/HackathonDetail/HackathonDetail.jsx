import { useParams, Link } from "react-router-dom";
import { CustomButton, Modal } from "../../../../components";
import HackathonInfo from "../../../../components/Seeker/HackathonInfo";
import CardProject from "../../../../components/Seeker/CardProject";
import SearchInput from "../../../../components/Seeker/SearchInput";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singleHackathon } from "../../../../redux/slices/hackathons/hackathonsSlices";
import { backgroundSearch, defaultAvt } from "../../../../assets/images";
import BrowerParticipants from "../../../Seeker/BrowerParticipants";
import { LiaEyeSlash, LiaEyeSolid } from "react-icons/lia";
import { CgLock, CgUnblock } from "react-icons/cg";
import ParticipantItem from "../../../../components/Seeker/ParticipantItem";
import TeamProjectItem from "./TeamProject/TeamProject";
import Swal from "sweetalert2";
import { IoClose } from "react-icons/io5";
import { StarIcon } from "@heroicons/react/20/solid";
import TeamProjectSmall from "./TeamProjectSmall/TeamProjectSmall";

function HackathonCorDetail() {
  const { id, type } = useParams();
  const dispatch = useDispatch();
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
    judging_criteria: `
      &lt;div class=&quot;section-title bold&quot;&gt;
      &lt;h3 class=&quot;subheader section-title-left&quot;&gt;
            Judging Criteria
          &lt;/h3&gt;
      &lt;span class=&quot;section-title-line&quot;&gt;&lt;/span&gt;
      &lt;/div&gt;
      &lt;ul class=&quot;no-bullet&quot;&gt;
      &lt;li&gt;
      &lt;strong&gt;Voting for top 2 overall&lt;/strong&gt;&lt;br/&gt;
              Seam users will unlock the miniapps that they are most excited about. Each unlock during the Voting Period will constitute a vote towards winning the challenge. The top three miniapps that were unlocked will be awarded prizes.
            &lt;/li&gt;
      &lt;li&gt;
      &lt;strong&gt;Judging for the other prizes&lt;/strong&gt;&lt;br/&gt;
              The Judges, at their sole discretion, will evaluate and determine the recipients of the additional prizes based on criteria they find appropriate. 
            &lt;/li&gt;
      &lt;/ul&gt;
      `,
    rule_section: `
      &lt;div class=&quot;row&quot;&gt;
      &lt;div class=&quot;small-12 columns&quot;&gt;
      &lt;section class=&quot;row text-content content-section&quot; id=&quot;main&quot;&gt;
      &lt;section class=&quot;large-12 columns&quot; role=&quot;main&quot;&gt;
      &lt;h4 id=&quot;timing-and-important-dates&quot;&gt;Timing and Important Dates&lt;/h4&gt;
      &lt;ul&gt;
      &lt;li&gt;Registration period: Tuesday July 30th 2024 - August 6th 2024&lt;/li&gt;
      &lt;li&gt;Registration &amp;amp; Submission period: August 6th (10am EST) - August 19th (5pm EST)&lt;/li&gt;
      &lt;li&gt;Judging Period: August 19th - August 26th (9am EST)&lt;/li&gt;
      &lt;li&gt;Voting Period: August 26th (9am EST ) - September 2nd (5pm EST)&lt;/li&gt;
      &lt;/ul&gt;
      &lt;h4 id=&quot;eligibility&quot;&gt;Eligibility&lt;/h4&gt;
      &lt;p&gt;The miniapp challenge IS open to:&lt;/p&gt;
      &lt;ul&gt;
      &lt;li&gt;Persons who have reached the age of majority in their place of residence at the time of entry (“Eligible Individuals”);&lt;/li&gt;
      &lt;li&gt;Groups composed of Eligible Individuals (“Teams”); and&lt;/li&gt;
      &lt;li&gt;Entities (including corporations, nonprofit organizations, limited liability companies, partnerships, and other legal entities) that are established and legally recognized at the time of entry.&lt;/li&gt;
      &lt;/ul&gt;
      &lt;p&gt;The miniapp challenge is unfortunately NOT open to:&lt;/p&gt;
      &lt;ul&gt;
      &lt;li&gt;Individuals residing in, or Organizations based in, any country, state, province, or territory where participation in the Hackathon or receipt of a prize is prohibited by United States law or local regulations (including, but not limited to, Brazil, Quebec, Russia, Crimea, Cuba, Iran, North Korea, Syria, and any other country designated by the United States Treasury’s Office of Foreign Assets Control).&lt;/li&gt;
      &lt;/ul&gt;
      &lt;p&gt;No purchase is required to be considered eligible for the challenge.&lt;/p&gt;
      &lt;h4 id=&quot;how-to-submit&quot;&gt;How to Submit&lt;/h4&gt;
      &lt;p&gt;To be considered a submission for the challenge, the code for the miniapp must be submitted as a &lt;a href=&quot;https://github.com/seam-xyz/Miniapp-Builder&quot;&gt;Pull Request in the Github repository for Seam’s miniapps&lt;/a&gt; by the end of the submission period.&lt;/p&gt;
      &lt;p&gt;Additionally, submissions are encouraged on Devpost to add more detail as well as to be added to the project gallery.&lt;/p&gt;
      &lt;p&gt;For a successful submission, the miniapp should:&lt;/p&gt;
      &lt;ul&gt;
      &lt;li&gt;Compile and run within the Seam miniapp builder environment without errors or crashes&lt;/li&gt;
      &lt;li&gt;Run performantly without excessive lagging or glitching&lt;/li&gt;
      &lt;li&gt;Allow a user to make a post and successfully render in the feed&lt;/li&gt;
      &lt;/ul&gt;
      &lt;h4 id=&quot;judges-and-criteria&quot;&gt;Judges and Criteria&lt;/h4&gt;
      &lt;p&gt;&lt;strong&gt;Voting for top 2 Prizes.&lt;/strong&gt; At the beginning of the Judging Period, the judges will confer and create a list of the finalists. The Seam team will work with the finalists in code review to ensure that each miniapp submission is ready to be published into the Seam miniapp marketplace. At the end of the Judging Period, each finalist miniapp will be published live onto the Seam social platform for all other Seam users to unlock and use to create posts.&lt;/p&gt;
      &lt;p&gt;During the Voting Period, Seam users will unlock the miniapps that they are most excited about. Each unlock during the Voting Period will constitute a vote towards winning the challenge. At the end of the Voting Period, the top two miniapps that were unlocked will be awarded prizes.&lt;/p&gt;
      &lt;p&gt;&lt;strong&gt;Judging for the other prizes.&lt;/strong&gt; The Judges, at their sole discretion, will evaluate and determine the recipients of the additional prizes based on criteria they find appropriate. Their decisions will be final and binding.&lt;/p&gt;
      &lt;p&gt;We welcome miniapps that are original, engaging, and stem from your own creativity. We encourage the representation of diverse perspectives on Seam, provided that the miniapps show respect for users with differing viewpoints and maintain high quality standards. We reserve the right to reject any miniapps that, in our discretion, contain content or exhibit behavior deemed unacceptable.&lt;/p&gt;
      &lt;h4 id=&quot;prizes&quot;&gt;Prizes&lt;/h4&gt;
      &lt;p&gt;Most Unlocked Mini App (Overall Winner) - The largest prize will be given to the contestant whose Mini App gets the most unlocks on Seam. It will consist of a First Place Ribbon Badge for their Seam profile, Seam Points, and $500.&lt;/p&gt;
      &lt;p&gt;Second Most Unlocked Mini App- This prize will be given to the contestant whose Mini App gets the second most unlocks. It will consist of a Second Place Ribbon Badge, Seam Points.&lt;/p&gt;
      &lt;p&gt;Honorable Mentions:&lt;/p&gt;
      &lt;ul&gt;
      &lt;li&gt;Best Design- This will go to the contestant who creates the Mini App with the best design. It will consist of Seam Points, a Best Design Ribbon, and $100.&lt;/li&gt;
      &lt;li&gt;Most Creative- This will go to the contestant who creates the most creative Mini App It will consist of Seam Points, a Most Creative Ribbon, and $100.&lt;/li&gt;
      &lt;li&gt;Highest Quality- This will go to the contestant who creates the highest quality Mini App. It will consist of Seam Points, a Highest Quality Ribbon, and $100.&lt;/li&gt;
      &lt;/ul&gt;
      &lt;p&gt;&lt;/p&gt;
      &lt;p&gt;&lt;/p&gt;
      &lt;p&gt;Everyone who participates gets Seam Points and a Badge.&lt;/p&gt;
      &lt;h4 id=&quot;rights-withholdings&quot;&gt;Rights &amp;amp; Withholdings&lt;/h4&gt;
      &lt;p&gt;&lt;strong&gt;Publicity.&lt;/strong&gt; By joining the miniapp challenge, you’ll have the chance to get your submission featured and receive shoutouts on Seam’s social media channels! We may share your name, photo, voice, and where you’re from to highlight your amazing work. Your participation means you’re okay with us using this info to spread the word, whether it’s through existing or new media, all around the world, without further prizes to you. This includes using it for advertising and promotional purposes to give you and your work the recognition you deserve.&lt;/p&gt;
      &lt;p&gt;&lt;strong&gt;Administrator.&lt;/strong&gt; The challenge is administered by BingBong Inc, dba Seam Social.&lt;/p&gt;
      &lt;p&gt;&lt;/p&gt;
      &lt;p&gt;&lt;strong&gt;Terms of Service&lt;/strong&gt;. By making a submission to this challenge, you agree to the &lt;a href=&quot;https://www.notion.so/Community-Guidelines-798d92c34a12418ea0bf4558b1b22314?pvs=21&quot;&gt;Seam Terms of Service and Community Guidelines&lt;/a&gt;.&lt;/p&gt;
      &lt;/section&gt;
      &lt;/section&gt;
      &lt;/div&gt;
      &lt;/div&gt;
      `,
    challenge_requirements: `
      &lt;div class=&quot;section-title bold&quot;&gt;
      &lt;h3 class=&quot;subheader section-title-left&quot;&gt;
              Requirements
            &lt;/h3&gt;
      &lt;span class=&quot;section-title-line&quot;&gt;&lt;/span&gt;
      &lt;/div&gt;
      &lt;div&gt;
      &lt;h4&gt;What to Build&lt;/h4&gt;
      &lt;p&gt;The goal for this miniapp challenge is to create new, fun ways to share with your friends on Seam.&lt;/p&gt;
      &lt;p&gt;Miniapps make posts. Users play with miniapps to create new art, music, or games, which then can be experienced by your friends. Miniapps live inside Seam, the super app, which acts as a constant contact book and platform for the feeds and groupchats that miniapps live inside of. Miniapps are creative tools that render their end product to a feed.&lt;/p&gt;
      &lt;p&gt;A miniapp fundamentally has two steps. They start with the singleplayer mode, where someone enters their data, plays the game, or interacts with the app. The second mode is how it shows up in a feed, which is a typically the finished product of the creative process: the finished song, GIF, or highscore. Some quick examples:&lt;/p&gt;
      &lt;ul&gt;
      &lt;li&gt;Artistic miniapps first allow artists to draw on a canvas, and then post their watercolor. Yes, Microsoft Paint is basically a miniapp.&lt;/li&gt;
      &lt;li&gt;Commerce miniapps first allow a seller to decide what to sell and how to make the post look, and then allows users to buy with one tap.&lt;/li&gt;
      &lt;li&gt;Game miniapps first allow friends to play the game, and then allows them to compete by posting their highscores.&lt;/li&gt;
      &lt;li&gt;Utility miniapps take the most arcane 3D image filetypes, and then render them properly in the feed.&lt;/li&gt;
      &lt;/ul&gt;
      &lt;p&gt;The options for miniapps are endless — see the examples that already exist on &lt;a href=&quot;http://seam.so&quot;&gt;seam.so&lt;/a&gt;.&lt;/p&gt;
      &lt;h4&gt;How to Submit&lt;/h4&gt;
      &lt;p&gt;To be considered a submission for the challenge, the code for the miniapp must be submitted as a &lt;a href=&quot;https://github.com/seam-xyz/Miniapp-Builder&quot;&gt;Pull Request in the Github repository for Seam’s miniapps&lt;/a&gt; by the end of the submission period.&lt;/p&gt;
      &lt;p&gt;Additionally, submissions are encouraged on Devpost to add more detail as well as to be added to the project gallery.&lt;/p&gt;
      &lt;p&gt;For a successful submission, the miniapp should:&lt;/p&gt;
      &lt;p&gt;&lt;/p&gt;
      &lt;ul&gt;
      &lt;li&gt;Compile and run within the Seam miniapp builder environment without errors or crashes&lt;/li&gt;
      &lt;li&gt;Run performantly without excessive lagging or glitching&lt;/li&gt;
      &lt;li&gt;Allow a user to make a post and successfully render in the feed&lt;/li&gt;
      &lt;/ul&gt;
      &lt;/div&gt;
      `,
    resources_section: `
      &lt;div class=&quot;row&quot;&gt;
      &lt;div class=&quot;small-12 columns&quot;&gt;
      &lt;section class=&quot;row text-content content-section&quot; id=&quot;main&quot;&gt;
      &lt;section class=&quot;large-12 columns&quot; role=&quot;main&quot;&gt;
      &lt;h4 id=&quot;introduction&quot;&gt;Introduction
      &lt;/h4&gt;
      &lt;p&gt;All documentation for creating Seam miniapps can be found at docs.getseam.xyz.&lt;/p&gt;
      &lt;p&gt;The codebase to get started is in &lt;a href=&quot;https://github.com/seam-xyz/Miniapp-Builder&quot;&gt;our GitHub repository&lt;/a&gt;.&lt;/p&gt;
      &lt;h4 id=&quot;tools-and-technologies&quot;&gt;Tools and Technologies&lt;/h4&gt;
      &lt;p&gt;Seam miniapps are React components, written in Typescript.&lt;/p&gt;
      &lt;h4 id=&quot;inspiration&quot;&gt;Inspiration&lt;/h4&gt;
      &lt;p&gt;Find our list of &lt;a href=&quot;https://www.notion.so/Seam-Miniapp-Idea-List-9d28594c48ca432a90e0e088274a72c1?pvs=21&quot;&gt;miniapp ideas in our Notion.&lt;/a&gt;&lt;/p&gt;
      &lt;h4 id=&quot;contact-us-support-channels&quot;&gt;Contact Us &amp;amp; Support Channels&lt;/h4&gt;
      &lt;p&gt;Keep up-to-date with the challenge by following Seam on &lt;a href=&quot;https://x.com/seam_xyz&quot;&gt;Twitter&lt;/a&gt; and on &lt;a href=&quot;https://www.instagram.com/seam.social/&quot;&gt;Instagram&lt;/a&gt;.&lt;/p&gt;
      &lt;p&gt;There are two ways to get in contact with the Seam team:&lt;/p&gt;
      &lt;ul&gt;
      &lt;li&gt;If it’s a question about Seam, email us at hello@getseam.xyz.&lt;/li&gt;
      &lt;li&gt;If it’s getting support about building your miniapp, &lt;a href=&quot;https://www.seam.so/home&quot;&gt;make a post on Seam&lt;/a&gt;. This way other builders will also be able to chime in and help out!&lt;/li&gt;
      &lt;/ul&gt;
      &lt;p&gt;If you’ve found a bug on Seam or in the miniapp builder, please create an issue on Github.&lt;/p&gt;
      &lt;h4 id=&quot;additional-resource-links&quot;&gt;Additional Resource links&lt;/h4&gt;
      &lt;p&gt;&lt;/p&gt;
      &lt;ul&gt;
      &lt;li&gt;&lt;a href=&quot;https://medium.com/seam-social/miniapps-future-of-social-networks-9f29406e2fe2&quot;&gt;Miniapps: Future of Social Networks&lt;/a&gt;&lt;/li&gt;
      &lt;/ul&gt;
      &lt;/section&gt;
      &lt;/section&gt;
      &lt;/div&gt;
      &lt;/div&gt;
      `,
    hackathon_id: 1,
  };
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  const [projectGallery, setProjectGallery] = useState([]);
  const [currentHackathon, setCurrentHackathon] = useState([]);
  const { hackathon } = useSelector((state) => state.hackathons);
  let [modal, setModal] = useState(false);
  let [modal2, setModal2] = useState(false);
  let [selectTeam, setSelectTeam] = useState([]);
  let [selectPrize, setSelectPrize] = useState(null);
  useEffect(() => {
    if (!id) return;
    dispatch(singleHackathon(id));
  }, [id]);

  useEffect(() => {
    if (hackathon) {
      setCurrentHackathon(hackathon);
    }
  }, [hackathon]);

  useEffect(() => {
    if (type == "project-gallery" || type == "teams") {
      fetch(`http://localhost:3000/api/v1/hackathons/${id}/${type}`)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setProjectGallery(result);
        })
        .catch((error) => console.log("error", error));
    }
  }, [type]);

  const handleGetMembers = (project) => {
    if (project?.createdByObj) {
      setProjectGallery(
        projectGallery.map((item) =>
          item.id === project.id ? { ...item, createdByObj: null } : { ...item }
        )
      );
    } else {
      fetch(
        `http://localhost:3000/api/v1/projects/get-members/${project.id}/members`
      )
        .then((response) => response.json())
        .then((result) => {
          setProjectGallery(
            projectGallery.map((item) =>
              item.id === project.id
                ? { ...item, createdByObj: result }
                : { ...item }
            )
          );
        })
        .catch((error) => console.log("error", error));
    }
  };

  const handleBlockTeam = (project) => {
    Swal.fire({
      title: "Warning",
      text: "Do you want to confirm?",
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      icon: "warning",
      allowOutsideClick: false,
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `http://localhost:3000/api/v1/projects/block-project/${project?.id}/block`,
          {
            method: "POST", // Chỉ định phương thức là POST
            headers: {
              "Content-Type": "application/json", // Đặt header để báo server biết dữ liệu là JSON
            },
            body: JSON.stringify({
              block: !project?.block, // Thay thế bằng dữ liệu bạn muốn gửi
            }),
          }
        )
          .then((response) => response.json())
          .then(() => {
            setProjectGallery(
              projectGallery.map((item) =>
                item.id === project.id
                  ? { ...item, block: !item.block }
                  : { ...item }
              )
            );
            Swal.fire({
              title: "Success",
              text: `${project?.block ? "Unblock" : "Block"} project success`,
              confirmButtonText: "OK",
              icon: "success",
              allowOutsideClick: false,
              confirmButtonColor: "#3085d6",
            }).then((result) => {
              if (result.isConfirmed) {
                /* empty */
              }
            });
          })
          .catch((error) => console.log("error", error));
      }
    });
  };

  const handleAward = () => {
    setModal(!modal);
  };

  const handleSaveWinner = () => {
    const updateHackathon = currentHackathon.prizes.map((item) => {
      if (item.winnerList)
        return {
          ...item,
          winnerList: item.winnerList.map((i) => i.id),
        };
      else return { ...item };
    });
    fetch(`http://localhost:3000/api/v1/hackathons/awarding/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hackathon: {
          prizes: updateHackathon,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        Swal.fire({
          title: "Success",
          text: "Awarding successfully",
          confirmButtonText: "OK",
          icon: "success",
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            setModal(false);
          }
        });
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <div>
        <div
          className="flex flex-col pt-5 bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${
              item.headerImgBackground ?? backgroundSearch
            })`,
          }}
        >
          <div className="px-60 max-lg:px-2">
            <img
              src={hackathon?.headerTitleImage}
              alt={item.name}
              className="max-h-40 min-w-full"
            />
          </div>
          <div className=" flex bg-gray-400 opacity-70 py-3 mt-3 text-white text-normal">
            <div className="px-60 max-lg:px-2 ">
              <Link
                to={`/Organizer/manage-hackathons/${id}/overview`}
                className={`py-4 px-4 hover:underline ${
                  type === "overview" ? "text-black opacity-100 bg-white" : ""
                }`}
              >
                Overview
              </Link>
              <Link
                to={`/Organizer/manage-hackathons/${id}/teams`}
                className={`py-4 px-4 hover:underline ${
                  type === "teams" ? "text-black opacity-100 bg-white" : ""
                }`}
              >
                Teams
              </Link>
              <Link
                to={`/Organizer/manage-hackathons/${id}/participants`}
                className={`py-4 px-4 hover:underline ${
                  type === "participants"
                    ? "text-black opacity-100 bg-white"
                    : ""
                }`}
              >
                Participants
              </Link>
              <Link
                to={`/Organizer/manage-hackathons/${id}/resourses`}
                className={`py-4 px-4 hover:underline ${
                  type === "resourses" ? "text-black opacity-100 bg-white" : ""
                }`}
              >
                Resourses
              </Link>
              <Link
                to={`/Organizer/manage-hackathons/${id}/rules`}
                className={`py-4 px-4 hover:underline ${
                  type === "rules" ? "text-black opacity-100 bg-white" : ""
                }`}
              >
                Rules
              </Link>
              <Link
                to={`/Organizer/manage-hackathons/${id}/project-gallery`}
                className={`py-4 px-4 hover:underline ${
                  type === "project-gallery"
                    ? "text-black opacity-100 bg-white"
                    : ""
                }`}
              >
                Project gallery
              </Link>
              <Link
                to={`/Organizer/manage-hackathons/${id}/updates`}
                className={`py-4 px-4 hover:underline ${
                  type === "updates" ? "text-black opacity-100 bg-white" : ""
                }`}
              >
                Updates
              </Link>
              <Link
                to={`/Organizer/manage-hackathons/${id}/discussions`}
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
        {type === "overview" && (
          <div className="px-60 max-lg:px-2 py-5 bg-gray-100">
            <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-10">
              <div className="col-span-2">
                <h2 className="font-semibold mt-5">
                  {hackathon?.hackathonName}
                </h2>
                <p className="text-xl mt-5 h-16">{hackathon?.tagline}</p>
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
                      to={`/Organizer/manage-hackathons/${id}/rules`}
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
        )}
        {type === "teams" && (
          <>
            <div className="px-60 max-lg:px-2 py-5 ">
              <div className="col-span-2">
                <h2 className="font-semibold mt-5 mb-5">Manage teams</h2>
                <div>
                  <div className="gap-2">
                    <table className="relative w-full overflow-y-hidden overflow-x-hidden rounded-md mb-1 bg-white border-0">
                      <thead className="bg-[#f5f7fc] color-white border-transparent border-0 w-full">
                        <tr className="w-full">
                          <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-4/12 pl-5 ">
                            Team name
                          </th>
                          <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-2/12">
                            Project
                          </th>
                          <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-2/12">
                            Member
                          </th>
                          <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-2/12">
                            Owner
                          </th>
                          <th className="relative text-[#3a60bf] font-medium py-6 text-base text-left w-2/12">
                            Actions
                          </th>
                        </tr>
                      </thead>
                    </table>
                    <div className="w-full flex flex-col gap-5">
                      {[...projectGallery]?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="border-b border-l border-r border-solid border-[#ecedf2] px-2 pb-1"
                          >
                            <div className="flex items-center w-full hover:bg-[#f4f2f2] cursor-pointer">
                              <div className="relative pl-5 py-5 font-normal text-base w-4/12">
                                <div className="mb-0 relative h-16 gap-2 flex flex-row items-center">
                                  <div>
                                    <div className="font-medium text-md text-ellipsis mb-1 line-clamp-2 ">
                                      {item?.teamName}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="font-light w-2/12">
                                <div className="font-medium text-md text-ellipsis mb-1 line-clamp-2 ">
                                  {item?.projectTitle}
                                </div>
                              </div>
                              <div className="font-semibold text-blue-700 w-[12%]">
                                <div className="flex h-full items-center">
                                  <div className="mr-1">
                                    {item?.createdBy?.length ?? 0}
                                  </div>
                                </div>
                              </div>
                              <div className="text-center w-2/12 font-semibold text-gray-700 text-base">
                                <div className="line-clamp-3 w-full flex items-center gap-1">
                                  <img
                                    src={item?.owner?.avatar}
                                    className="w-5 h-5 rounded-full"
                                  />
                                  {item?.owner?.name}
                                </div>
                              </div>
                              <div className="text-center w-2/12 font-semibold text-gray-700 text-base">
                                <div className="line-clamp-3 w-full flex relative item-center justify-center">
                                  <button
                                    onClick={() => handleGetMembers(item)}
                                    className="list-none relative mr-2 bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#5f86e9] hover:text-white"
                                  >
                                    {item?.createdByObj ? (
                                      <LiaEyeSlash fontSize={18} />
                                    ) : (
                                      <LiaEyeSolid fontSize={18} />
                                    )}
                                  </button>

                                  <li
                                    className="list-none relative bg-[#f5f7fc] border rounded-md border-[#e9ecf9] px-1 pt-1 hover:bg-[#ce3e37] hover:text-white"
                                    onClick={() => {
                                      handleBlockTeam(item);
                                    }}
                                  >
                                    {item?.block ? (
                                      <CgUnblock fontSize={18} />
                                    ) : (
                                      <CgLock fontSize={18} />
                                    )}
                                  </li>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 transition-all duration-300">
                              {item?.createdByObj &&
                                item?.createdByObj.map((i) => {
                                  return (
                                    <div className="my-1" key={item?._id}>
                                      <TeamProjectItem props={i} />
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {type === "project-gallery" && (
          <>
            <div className="px-60 max-lg:px-2 py-5 ">
              <div>
                <div className="mb-10 w-[90%] flex items-end">
                  <SearchInput
                    textPlaceholder={"Search project"}
                    btnText={"Search project"}
                  />
                  <CustomButton
                    onClick={handleAward}
                    title={"Awarding"}
                    containerStyles="h-[42px] bg-blue-600 w-fit font-medium text-white py-2 px-5 focus:outline-none hover:bg-blue-500 rounded-sm text-base border border-blue-600"
                  />
                </div>
                <div className="my-5 grid grid-cols-4 max-md:grid-cols-1 gap-6">
                  {[...projectGallery].map((card, index) => (
                    <CardProject
                      key={index}
                      id={card.id}
                      title={card.projectTitle}
                      description={card.tagLine}
                      image={card.thumnailImage}
                      imgUser={defaultAvt}
                      member={card.createdBy}
                      isWinner={currentHackathon.prizes
                        .reduce(
                          (acc, cur) =>
                            cur.winnerList ? acc.concat(cur.winnerList) : acc,
                          []
                        )
                        .includes(card.id)}
                      votes={Math.floor(Math.random() * 21)}
                      comments={Math.floor(Math.random() * 11)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        {type === "participants" && <BrowerParticipants hackathonId={id} />}
        <div className="px-60 max-lg:px-2 py-5 ">
          <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-10">
            <div className="col-span-2 text-gray-600 " id="generated-script">
              {type === "overview" && (
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
              )}
              {type === "rules" && (
                <div>
                  <div
                    className="mb-6"
                    dangerouslySetInnerHTML={{
                      __html: decodeHTML(item?.rule_section),
                    }}
                  ></div>
                </div>
              )}
              {type === "resourses" && (
                <div>
                  <div
                    className="mb-6"
                    dangerouslySetInnerHTML={{
                      __html: decodeHTML(item?.resources_section),
                    }}
                  ></div>
                </div>
              )}
            </div>

            <div className="col-span-1"></div>
          </div>
        </div>
      </div>
      <Modal open={modal} setModal={setModal}>
        <div>
          <div className="flex flex-row items-center justify-between mx-2">
            <p className="block leading-8 text-gray-900 text-xl font-bold">
              Present an award
            </p>
            <div
              className="hover:bg-slate-100 rounded-sm p-2 cursor-pointer opacity-90"
              onClick={() => {
                setSelectTeam([]);
                setSelectPrize(null);
                setCurrentHackathon(hackathon);
                setModal(false);
              }}
            >
              <IoClose size={20} />
            </div>
          </div>
          <hr className="block h-1 w-full bg-[rgb(212, 210, 208)] my-3" />
          <div className="max-h-[400px] max-w-[900px] mx-9 overflow-y-scroll no-scrollbar overflow-x-hidden mb-4">
            <div className="flex gap-3 flex-col col-span-2">
              {currentHackathon?.prizes?.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className=" bg-white border border-gray-300 rounded-sm hover:shadow-md p-2"
                  >
                    <div className="flex flex-row gap-1 text-base font-semibold justify-between">
                      <div className="flex flex-row gap-1 items-center">
                        <StarIcon color="#FFD333" width={24} />
                        {item.prizeName}
                      </div>
                      <button
                        onClick={() => {
                          setSelectPrize(item);
                          setSelectTeam([...(item.winnerList ?? [])]);
                          setModal2(true);
                        }}
                        className="flex items-center justify-center box-border bg-[#1967d3] px-[10px] py-[8px] rounded-[4px] text-[#fff] hover:bg-[#0146a6] cursor-pointer"
                      >
                        <span className="text-[15px] leading-none font-semibold">
                          Award team
                        </span>
                      </button>
                    </div>
                    <ul className="list-disc pl-10">
                      <li>
                        <span className="font-semibold">Prize: </span>$
                        {item.cashValue}
                      </li>
                      <li>
                        <span className="font-semibold">Number wining: </span>
                        {item.numberWinningProject}
                      </li>
                      <li>
                        <span className="font-semibold">Description: </span>
                        {item.description}
                      </li>
                    </ul>
                    <div className="grid grid-cols-2 gap-2">
                      {item?.winnerList?.map((i) => {
                        return (
                          <div className="relative group ">
                            <TeamProjectSmall
                              props={projectGallery.find(
                                (proj) => proj.id == i
                              )}
                            />
                            <div
                              onClick={() => {
                                let list = [...item.winnerList];
                                if (list.length === 1) list = null;
                                else list.splice(list.indexOf(i), 1);
                                setCurrentHackathon({
                                  ...currentHackathon,
                                  prizes: currentHackathon.prizes.map((prize) =>
                                    prize.id == item.id
                                      ? { ...prize, winnerList: list }
                                      : { ...prize }
                                  ),
                                });
                              }}
                              className="absolute top-2 right-4 cursor-pointer bg-transparent rounded-lg text-black group-hover:text-white group-hover:bg-red-600"
                            >
                              <IoClose />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 float-right">
            <div
              className="flex items-center justify-center box-border bg-[white] border px-[18px] py-[14px] rounded-[8px] text-[#1967d3] hover:bg-[#eef1fe] hover:border-[#1967d3] cursor-pointer"
              onClick={() => {
                setSelectTeam([]);
                setSelectPrize(null);
                setCurrentHackathon(hackathon);
                setModal(false);
              }}
            >
              <span className="text-[15px] leading-none font-bold">Close</span>
            </div>
            <button
              type="submit"
              onClick={handleSaveWinner}
              className="w-[90px] flex items-center justify-center box-border bg-[#1967d3] px-[18px] py-[14px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer"
            >
              {false ? (
                <svg
                  className="right-1 animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-0"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-90"
                    fill="white"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <span className="text-[15px] leading-none font-bold">Done</span>
              )}
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={modal2} setModal={setModal2}>
        <div>
          <div className="flex flex-row items-center justify-between mx-2">
            <p className="block leading-8 text-gray-900 text-xl font-bold">
              Select team
            </p>
            <div
              className="hover:bg-slate-100 rounded-sm p-2 cursor-pointer opacity-90"
              onClick={() => {
                setSelectTeam([]);
                setModal2(false);
              }}
            >
              <IoClose size={20} />
            </div>
          </div>
          <hr className="block h-1 w-full bg-[rgb(212, 210, 208)] my-3" />
          <div className="max-h-[400px] max-w-[900px] mx-4 overflow-y-auto overflow-x-hidden mb-4">
            <div className="flex flex-col gap-2 col-span-1">
              {projectGallery?.map((item) => {
                return (
                  <div
                    onClick={() => {
                      if (selectTeam.includes(item)) {
                        selectTeam.splice(selectTeam.indexOf(item), 1);
                        setSelectTeam([...selectTeam]);
                      } else {
                        if (
                          selectTeam.length >=
                          Number(selectPrize.numberWinningProject)
                        )
                          return;
                        setSelectTeam([...selectTeam, item]);
                      }
                    }}
                  >
                    <TeamProjectSmall
                      props={item}
                      select={selectTeam.includes(item)}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex flex-row items-center gap-2 float-right mt-2">
              <div
                className="flex items-center justify-center box-border bg-[white] border px-[18px] py-[14px] rounded-[8px] text-[#1967d3] hover:bg-[#eef1fe] hover:border-[#1967d3] cursor-pointer"
                onClick={() => {
                  setSelectTeam([]);
                  setModal2(false);
                }}
              >
                <span className="text-[15px] leading-none font-bold">
                  Close
                </span>
              </div>
              <button
                onClick={() => {
                  setCurrentHackathon({
                    ...currentHackathon,
                    prizes: currentHackathon.prizes.map((item) =>
                      item.id === selectPrize.id
                        ? { ...item, winnerList: selectTeam }
                        : { ...item }
                    ),
                  });
                  setSelectTeam([]);
                  setModal2(false);
                }}
                className="w-[90px] flex items-center justify-center box-border bg-[#1967d3] px-[18px] py-[14px] rounded-[8px] text-[#fff] hover:bg-[#0146a6] cursor-pointer"
              >
                <span className="text-[15px] leading-none font-bold">
                  Select
                </span>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default HackathonCorDetail;
