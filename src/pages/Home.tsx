import RegisterForm from "../components/services/accounts/form/register-form.tsx";
import LoginForm from "../components/services/accounts/form/login-form.tsx";

export default function Home() {

  return (
 <div className="container mt-5">
      <h2>Register</h2>
      <RegisterForm />

      <hr />

      <h2>Login</h2>
      <LoginForm onLoginSuccess={(t) => console.log('hello')} />
    </div>
  )
}
