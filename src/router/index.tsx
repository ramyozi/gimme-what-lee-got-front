import { Suspense } from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import NotFound from "../pages/NotFound";
import { ProtectedRoute } from "./protected-route";

// Lazy loading
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

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

      {/* User protected */}
      <Route
        path="interactions"
        element={withSuspense(
          <ProtectedRoute roles={["member", "admin"]}>
            {/*<Profile />*/}<></>
          </ProtectedRoute>
        )}
      />

      {/* Admin only */}
      <Route
        path="admin-list"
        element={withSuspense(
          <ProtectedRoute roles={["admin"]}>
            {/*<AccountList /> Pas créé encore*/}<></>
          </ProtectedRoute>
        )}
      />

      {/* 404 */}
      <Route path="*" element={withSuspense(<NotFound />)} />
    </Route>
  )
);
