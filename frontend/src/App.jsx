import { useState } from 'react'
import { Outlet, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { publicRoutes, AdminRoutes, seekerRoutes, corRoutes } from './routes/index.js'
import { useSelector } from 'react-redux';



function Layout({ user , role}) {
  const location = useLocation();
  if (!user) return <Navigate to='/user-auth/login' state={{ from: location }} replace />
  else {
    if(user?.userType === role ){
      return <Outlet />
    }
    else{
      return <Navigate to='/user-auth/unauthozied' state={{ from: location }} replace />
    }
  }
  // return user ? (<Outlet />) : (<Navigate to='/user-auth/login' state={{ from: location }} replace />);
}

function App() {
  const storeData = useSelector(store => store.users)

  const user = storeData?.userAuth?.user

  
  return (
    <main>
      <Routes>
        <Route element={<Layout user={user} role={'seeker'} />}>
          {seekerRoutes.map((route, index) => {
            const Layout = route.layout;
            const Page = route.component
            return (
              <Route key={index}
                path={route.path}
                element={
                  <Layout user={user}>
                    <Page />
                  </Layout>
                } />
            )
          })}
        </Route>
        <Route element={<Layout user={user} role={'organizer'} />}>
          {corRoutes.map((route, index) => {
            const Layout = route.layout;
            const Page = route.component
            return (
              <Route key={index}
                path={route.path}
                element={
                  <Layout user={user}>
                    <Page />
                  </Layout>
                } />
            )
          })}
        </Route>
        <Route element={<Layout user={user} role={'admin'}/>}>
          {AdminRoutes.map((route, index) => {
            const Layout = route.layout;
            const Page = route.component
            return (
              <Route key={index}
                path={route.path}
                element={
                  <Layout user={user}>
                    <Page />
                  </Layout>
                } />
            )
          })}
        </Route>
        {publicRoutes.map((route, index) => {
          const Layout = route.layout;
          const Page = route.component
          return (
            <Route key={index}
              path={route.path}
              element={
                <Layout user={user}>
                  <Page />
                </Layout>}
            />
          )
        })}
      </Routes>
    </main>
  );
}

export default App
