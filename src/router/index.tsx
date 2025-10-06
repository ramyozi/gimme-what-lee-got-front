import {Suspense} from "react";
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import NotFound from "../pages/NotFound";
import {ProtectedRoute} from "./protected-route";
import {RoleEnum} from "../types";

// Lazy loading
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Search from "../pages/Search.tsx";
import Profile from "../pages/Profile.tsx";
import ItemDetail from "../pages/ItemDetail.tsx";

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
        path="admin-list"
        element={withSuspense(
          <ProtectedRoute roles={[RoleEnum.Admin]}>
            {/*<AccountList /> Pas créé encore*/}<></>
          </ProtectedRoute>
        )}
      />

      {/* 404 */}
      <Route path="*" element={withSuspense(<NotFound />)} />
    </Route>
  )
);
