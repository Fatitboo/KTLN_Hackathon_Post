import { LayoutNoSidebar, LayoutHasSidebar } from "../components/index";
import {
  AddOccupation,
  Approval,
  CompanyProfileAdmin,
  Dashboard,
  EditOccupation,
  HistoryTransaction,
  ManageReport,
  ManageVacancyAdmin,
  OccupationMng,
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
    path: "/Hackathon-detail/:id/:type",
    component: HackathonDetail,
    layout: LayoutNoSidebar,
  },
  { path: "/Seeker/about-us", component: AboutUs, layout: LayoutNoSidebar },
  {
    path: "/Seeker-detail/:id/:type",
    component: UserPorfolio,
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
    path: "/Organizer/manage-hackathons/:id",
    component: HackathonDetail,
    layout: LayoutNoSidebar,
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
    path: "/Admin/approval-project",
    component: Approval,
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
    path: "/Admin/occupation-management",
    component: OccupationMng,
    layout: LayoutHasSidebar,
  },
  {
    path: "/Admin/occupation-management/add-occupation",
    component: AddOccupation,
    layout: LayoutHasSidebar,
  },
  {
    path: "/Admin/occupation-management/edit-occupation/:id",
    component: EditOccupation,
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
