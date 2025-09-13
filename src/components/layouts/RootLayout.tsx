import { Outlet } from "react-router-dom";
import AuthProvider from "../../lib/plugin/auth-provider.tsx";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
