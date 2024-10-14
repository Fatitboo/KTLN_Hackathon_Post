import { LayoutNoSidebar, LayoutHasSidebar } from "../components/index";
import { Dashboard } from "../pages/Admin";
import { Home, MyProfile } from "../pages/Seeker";
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
} from "../pages/Auth";
import unAuthoPage from "../pages/Auth/unAuthoPage/unAuthoPage";
import { AboutUs } from "../pages/Seeker/AboutUs/AboutUs";
import { Contact } from "../pages/Seeker/Contact/Contact";

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
    path: "/user-auth/verify-account/:token",
    component: VerifyAccount,
    layout: LayoutNoSidebar,
  },
  { path: "/", component: Home, layout: LayoutNoSidebar },
  { path: "/Seeker/about-us", component: AboutUs, layout: LayoutNoSidebar },
  { path: "/Seeker/contact", component: Contact, layout: LayoutNoSidebar },
];
const seekerRoutes = [
  {
    path: "/Seeker/my-profile",
    component: MyProfile,
    layout: LayoutHasSidebar,
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
];
const AdminRoutes = [
  //Admin Layout

  { path: "/Admin", component: Dashboard, layout: LayoutHasSidebar },
];

export { publicRoutes, seekerRoutes, AdminRoutes, corRoutes };
