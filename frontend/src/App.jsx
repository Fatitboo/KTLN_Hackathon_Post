import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  publicRoutes,
  AdminRoutes,
  seekerRoutes,
  corRoutes,
} from "./routes/index.js";
import { useSelector } from "react-redux";

function Layout({ user, role }) {
  const location = useLocation();
  console.log(user, role);
  if (!user)
    return (
      <Navigate to="/user-auth/login" state={{ from: location }} replace />
    );
  else {
    return <Outlet />;
    if (user?.userType?.includes(role)) {
      return <Outlet />;
    } else {
      return (
        <Navigate
          to="/user-auth/unauthozied"
          state={{ from: location }}
          replace
        />
      );
    }
  }
}

function App() {
  const storeData = useSelector((store) => store.users);

  const user = storeData?.userAuth?.user;

  return (
    <main>
      <Routes>
        <Route element={<Layout user={user} role={"seeker"} />}>
          {seekerRoutes.map((route, index) => {
            const Layout = route.layout;
            const Page = route.component;
            if (route.nested) {
              const m = route.nested;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout user={user}>
                      <Page />
                    </Layout>
                  }
                >
                  <Route
                    index
                    element={<Navigate to="manage-team" replace />}
                  />
                  {m.map((r, index) => {
                    const L = r.element;
                    return <Route key={index} path={r.path} element={<L />} />;
                  })}
                </Route>
              );
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout user={user}>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Route>
        <Route element={<Layout user={user} role={"organizer"} />}>
          {corRoutes.map((route, index) => {
            const Layout = route.layout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout user={user}>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Route>
        <Route element={<Layout user={user} role={"admin"} />}>
          {AdminRoutes.map((route, index) => {
            const Layout = route.layout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout user={user}>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Route>
        {publicRoutes.map((route, index) => {
          const Layout = route.layout;
          const Page = route.component;
          if (route.nested) {
            const m = route.nested;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout user={user}>
                    <Page />
                  </Layout>
                }
              >
                <Route index element={<Navigate to="overview" replace />} />
                {m.map((r, index) => {
                  const L = r.element;
                  return <Route key={index} path={r.path} element={<L />} />;
                })}
              </Route>
            );
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout user={user}>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </main>
  );
}

export default App;
