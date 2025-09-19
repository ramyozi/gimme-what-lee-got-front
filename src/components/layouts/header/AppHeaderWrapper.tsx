import AuthenticatedAppHeader from './AuthenticatedAppHeader';
import {useAuth} from "../../../lib/plugin/auth-provider.tsx";
import UnauthenticatedAppHeader from "./UnauthenticatedAppHeader.tsx";

export default function AppHeaderWrapper() {
  const { user } = useAuth();

  return user ? <AuthenticatedAppHeader /> : <UnauthenticatedAppHeader />;
}
