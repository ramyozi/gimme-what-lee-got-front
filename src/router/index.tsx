import React, {Suspense} from "react";
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import NotFound from "../pages/NotFound";
import {ProtectedRoute} from "./protected-route";
import {RoleEnum} from "../types";

// Lazy loading
const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const Search = React.lazy(() => import("../pages/Search"));
const Profile = React.lazy(() => import("../pages/Profile"));
const ItemDetail = React.lazy(() => import("../pages/ItemDetail"));

const withSuspense = (el: JSX.Element): JSX.Element => (
  <Suspense fallback={<div>Loading…</div>}>{el}</Suspense>
);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* Public */}
      <Route index element={withSuspense(<Home />)} />
      <Route path="login" element={withSuspense(<Login />)} />
      <Route path="register" element={withSuspense(<Register />)} />
      <Route path="search" element={withSuspense(<Search />)} />
        <Route path="item/:id" element={withSuspense(<ItemDetail />)} />


      {/* User protected */}
      <Route
        path="profile"
        element={withSuspense(
          <ProtectedRoute roles={[RoleEnum.Member, RoleEnum.Admin]}>
              <Profile />
          </ProtectedRoute>
        )}
      />

      {/* Admin only */}
        <Route
            path="users"
            element={withSuspense(
                <ProtectedRoute roles={[RoleEnum.Admin]}>
                    <></>
                    {/*<userList />*/}
                </ProtectedRoute>
            )}
        />

      {/* 404 */}
      <Route path="*" element={withSuspense(<NotFound />)} />
    </Route>
  )
);
