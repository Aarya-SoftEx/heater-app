import type { RouteObject } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../components/layout/Home";
import ProtectedRoute from "./ProtectedRoute";
import SectionWrapper from "../pages/SectionWrapper";
import TermsAndConditions from "../pages/TermsAndConditions";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import AdminPage from "../pages/AdminPage";
import AdminWorkspaceMembers from "../components/common/admin-components/AdminWorkspaceMembers";

export type AppRoute = RouteObject & {
  name: string;
};

const routes: AppRoute[] = [
  { path: "/login", element: <Login />, name: "Login" },
  { path: "/signup", element: <Signup />, name: "Signup" },
  { path: "/terms", element: <TermsAndConditions />, name: "Terms" },
  { path: "/privacy", element: <PrivacyPolicy />, name: "Privacy" },
  {
    path: "/",
    element: <ProtectedRoute />,
    name: "RootRoute",
    children: [
      {
        path: "admin",
        element: <SectionWrapper />,
        children: [
          { path: "", element: <AdminPage /> },
          { path: "members/:workspaceId", element: <AdminWorkspaceMembers /> },
        ],
      },
      {
        path: "home",
        element: <SectionWrapper />,
        children: [{ path: "", element: <Home /> }],
      },
      {
        path: "designs",
        element: <SectionWrapper />,
        children: [],
      },
    ],
  },
];

export default routes;
