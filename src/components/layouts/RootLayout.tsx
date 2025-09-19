import { Outlet } from "react-router-dom";
import AuthProvider from "../../lib/plugin/auth-provider.tsx";
import AppHeaderWrapper from "./header/AppHeaderWrapper.tsx";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppHeaderWrapper />
      <Outlet />
    </AuthProvider>
  );
}
