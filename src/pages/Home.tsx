import {useAuth} from "../lib/plugin/auth-provider/use-auth.ts";

export default function Home() {

    const {logout, user} = useAuth()

    const handleLogout = async ()=>{
        logout()
    }

  return (
    <div className="container mt-5">
        <button onClick={handleLogout} hidden={!user}> Logout </button>
    </div>
  )
}
