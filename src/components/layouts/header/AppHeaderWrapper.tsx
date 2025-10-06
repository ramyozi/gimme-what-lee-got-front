import AuthenticatedAppHeader from './AuthenticatedAppHeader';
import UnauthenticatedAppHeader from "./UnauthenticatedAppHeader.tsx";
import {useAuth} from "../../../lib/plugin/auth-provider/use-auth.ts";

export default function AppHeaderWrapper() {
  const { user } = useAuth();

  return user ? <AuthenticatedAppHeader /> : <UnauthenticatedAppHeader />;
}
