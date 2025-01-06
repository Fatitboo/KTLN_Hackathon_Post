import { LayoutNoSidebar, LayoutHasSidebar } from "../components/index";
import {
  // AddOccupation,
  Approval,
  CompanyProfileAdmin,
  Dashboard,
  // EditOccupation,
  HistoryTransaction,
  ManageReport,
  ManageVacancyAdmin,
  // OccupationMng,
  ProjectDetailAdmin,
  Skills,
  UserMng,
  VacancyInfoAdmin,
} from "../pages/Admin";
import {
  Home,
  MyProfile,
  BrowerHackathons,
  BrowerProjects,
  Contact,
  AboutUs,
  HackathonDetail,
  UserPorfolio,
  SettingHackathonRecommend,
} from "../pages/Seeker";
import {
  DashboardCompany,
  HackathonCorDetail,
  HostHackathon,
  ManageHackathon,
} from "../pages/Company";
import {
  Login,
  Register,
  ResetPassword,
  NotiSendEmail,
  VerifyAccount,
  ConfirmUsername,
  ChangePassword,
  unAuthoPage,
} from "../pages/Auth";
import LoginGithubSuccess from "../pages/Auth/LoginGithubSuccess/LoginGithubSuccess";
import Overview from "../pages/Seeker/Hackathon/Overview";
import MyProject from "../pages/Seeker/Hackathon/MyProject";
import BrowerParticipants from "../pages/Seeker/BrowerParticipants";
import ProjectGallery from "../pages/Seeker/Hackathon/ProjectGallery";
import Rule from "../pages/Seeker/Hackathon/Rule";
import Resourses from "../pages/Seeker/Hackathon/Resoures";
import RegisterToHackathon from "../pages/Seeker/Hackathon/Register";
import AddProject from "../pages/Seeker/ManageProject/AddProject";
import ProjectDetail from "../pages/Seeker/ManageProject/ProjectDetail";
import ManageProject from "../pages/Seeker/ManageProject";
import ManageTeam from "../pages/Seeker/ManageProject/ManageTeam";
import SubmitProject from "../pages/Seeker/ManageProject/SubmitProject";
import BrowserProducts from "../pages/Seeker/BrowserProducts";
import AutoRegisterToHackathon from "../pages/Seeker/Hackathon/AutoRegister";
import ManageHackathonsAdmin from "../pages/Admin/Approval";
import BrowerBlogs from "../pages/Seeker/BrowerBlogs";
import ManageReportUser from "../pages/Seeker/Setting/Reports";
import BlogManagement from "../pages/Admin/BlogMng";
import AddBlog from "../pages/Admin/BlogMng/AddBlog";
import { Payment } from "../pages/Seeker/Payment/Payment";
import UpdateBlog from "../pages/Admin/BlogMng/UpdateBlog";
import BlogDetail from "../pages/Admin/BlogMng/BlogDetail";
import UpdateBlogOr from "../pages/Company/BlogMng/UpdateBlog";
import BlogManagementOr from "../pages/Company/BlogMng";
import AddBlogOr from "../pages/Company/BlogMng/AddBlog";
import BlogDetailUser from "../pages/Seeker/BrowerBlogs/BlogDetail";
import Discussion from "../pages/Seeker/Hackathon/Discussion";
import Updates from "../pages/Seeker/Hackathon/Updates";
const publicRoutes = [
  // User Layout
  { path: "/user-auth/login", component: Login, layout: LayoutNoSidebar },
  { path: "/user-auth/register", component: Register, layout: LayoutNoSidebar },
  {
    path: "/user-auth/reset-password/:token",
    component: ResetPassword,
    layout: LayoutNoSidebar,
  },
  {
    path: "/user-auth/noti-send-mail",
    component: NotiSendEmail,
    layout: LayoutNoSidebar,
  },
  {
    path: "/user-auth/change-password",
    component: ChangePassword,
    layout: LayoutHasSidebar,
  },
  {
    path: "/user-auth/confirm-username",
    component: ConfirmUsername,
    layout: LayoutNoSidebar,
  },
  {
    path: "/user-auth/unauthozied",
    component: unAuthoPage,
    layout: LayoutNoSidebar,
  },
  {
    path: "/user/github-callback",
    component: LoginGithubSuccess,
    layout: LayoutNoSidebar,
  },
  {
    path: "/user-auth/verify-account/:token",
    component: VerifyAccount,
    layout: LayoutNoSidebar,
  },
  { path: "/", component: Home, layout: LayoutNoSidebar },
  {
    path: "/Seeker/brower-hackathons",
    component: BrowerHackathons,
    layout: LayoutNoSidebar,
  },
  {
    path: "/Seeker/brower-projects",
    component: BrowerProjects,
    layout: LayoutNoSidebar,
  },
  {
    path: "/Seeker/brower-blogs",
    component: BrowerBlogs,
    layout: LayoutNoSidebar,
  },
  {
    path: "/Seeker/blog-detail/:id",
    component: BlogDetailUser,
    layout: LayoutNoSidebar,
  },
  {
    path: "/Seeker/payment",
    component: Payment,
    layout: LayoutNoSidebar,
  },
  {
    path: "/Hackathon-detail/:id",
    component: HackathonDetail,
    layout: LayoutNoSidebar,
    nested: [
      {
        path: "overview",
        element: Overview,
      },
      {
        path: "my-project",
        element: MyProject,
      },
      {
        path: "participants",
        element: BrowerParticipants,
      },
      {
        path: "project-gallery",
        element: ProjectGallery,
      },
      {
        path: "rules",
        element: Rule,
      },
      {
        path: "resourses",
        element: Resourses,
      },
      {
        path: "updates",
        element: Updates,
      },
      {
        path: "discussions",
        element: Discussion,
      },
      {
        path: "register",
        element: RegisterToHackathon,
      },
      {
        path: "auto-register",
        element: AutoRegisterToHackathon,
      },
    ],
  },
  { path: "/Seeker/about-us", component: AboutUs, layout: LayoutNoSidebar },
  {
    path: "/Seeker-detail/:id/:type",
    component: UserPorfolio,
    layout: LayoutNoSidebar,
  },
  {
    path: "/Seeker/project/:projectId",
    component: ProjectDetail,
    layout: LayoutNoSidebar,
  },
  { path: "/Seeker/contact", component: Contact, layout: LayoutNoSidebar },
];
const seekerRoutes = [
  {
    path: "/Seeker/my-profile",
    component: MyProfile,
    layout: LayoutHasSidebar,
  },
  {
    path: "/Seeker/manage-reports",
    component: ManageReportUser,
    layout: LayoutHasSidebar,
  },
  {
    path: "/Seeker/brower-products",
    component: BrowserProducts,
    layout: LayoutNoSidebar,
  },
  {
    path: "/Seeker/project/manage-project/:projectId",
    component: ManageProject,
    layout: LayoutNoSidebar,
    nested: [
      {
        path: "manage-team",
        element: ManageTeam,
      },
      {
        path: "edit",
        element: AddProject,
      },
      {
        path: "submit",
        element: SubmitProject,
      },
    ],
  },
  {
    path: "/Seeker-detail/my-porfolio/:type",
    component: UserPorfolio,
    layout: LayoutHasSidebar,
  },
  {
    path: "/Seeker/setting-recommend",
    component: SettingHackathonRecommend,
    layout: LayoutHasSidebar,
  },
  {
    path: "/setting-recommend",
    component: SettingHackathonRecommend,
    layout: LayoutNoSidebar,
  },
];
const corRoutes = [
  {
    path: "/Organizer/dashboard",
    component: DashboardCompany,
    layout: LayoutHasSidebar,
  },
  {
    path: "/Organizer/manage-hackathons",
    component: ManageHackathon,
    layout: LayoutHasSidebar,
  },
  {
    path: "/Organizer/host-hackathon/:id",
    component: HostHackathon,
    layout: LayoutNoSidebar,
  },
  {
    path: "/Organizer/manage-hackathons/:id/:type",
    component: HackathonCorDetail,
    layout: LayoutNoSidebar,
  },
  {
    path: "/Organizer/blog-management",
    component: BlogManagementOr,
    layout: LayoutHasSidebar,
  },
  {
    path: "/Organizer/blog-management/add-blog",
    component: AddBlogOr,
    layout: LayoutHasSidebar,
  },
  {
    path: "/Organizer/blog-management/edit-blog/:id",
    component: UpdateBlogOr,
    layout: LayoutHasSidebar,
  },
  {
    path: "/Organizer/blog-management/detail-blog/:id",
    component: BlogDetail,
    layout: LayoutHasSidebar,
  },
];
const AdminRoutes = [
  //Admin Layout
  {
    path: "/Admin/user-management",
    component: UserMng,
    layout: LayoutHasSidebar,
  },
  {
    path: "/Admin/user-management/:id",
    component: CompanyProfileAdmin,
    layout: LayoutHasSidebar,
  },
  {
    path: "/Admin/manage-hackathons",
    component: ManageHackathonsAdmin,
    layout: LayoutHasSidebar,
  },
  {
    path: "/Admin/approval-project/:id",
    component: ProjectDetailAdmin,
    layout: LayoutHasSidebar,
  },
  {
    path: "/Admin/manage-vacancy",
    component: ManageVacancyAdmin,
    layout: LayoutHasSidebar,
  },
  {
    path: "/Admin/manage-vacancy/:id",
    component: VacancyInfoAdmin,
    layout: LayoutHasSidebar,
  },
  { path: "/Admin", component: Dashboard, layout: LayoutHasSidebar },
  {
    path: "/Admin/skills-management",
    component: Skills,
    layout: LayoutHasSidebar,
  },
  {
    path: "/Admin/blog-management",
    component: BlogManagement,
    layout: LayoutHasSidebar,
  },
  {
    path: "/Admin/blog-management/add-blog",
    component: AddBlog,
    layout: LayoutHasSidebar,
  },
  {
    path: "/Admin/blog-management/edit-blog/:id",
    component: UpdateBlog,
    layout: LayoutHasSidebar,
  },
  {
    path: "/Admin/blog-management/detail-blog/:id",
    component: BlogDetail,
    layout: LayoutHasSidebar,
  },
  {
    path: "/Admin/manage-report",
    component: ManageReport,
    layout: LayoutHasSidebar,
  },
  {
    path: "/Admin/history-transactions",
    component: HistoryTransaction,
    layout: LayoutHasSidebar,
  },
];

export { publicRoutes, seekerRoutes, AdminRoutes, corRoutes };
