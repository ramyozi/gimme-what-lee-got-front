import React from "react";
import { useForm } from "react-hook-form";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import {useAuth} from "../../../../lib/plugin/auth-provider.tsx";

type LoginFormInputs = {
  username: string;
  password: string;
};

const LoginForm: React.FC<{ onLoginSuccess?: () => void }> = ({ onLoginSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const {login} = useAuth()

  const onSubmit = async (data: LoginFormInputs) => {
    try {
        await login(data);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MDBInput
        label="Username"
        {...register("username", { required: "Username required" })}
        className="mb-3"
      />
      {errors.username && <p className="text-danger">{errors.username.message}</p>}

      <MDBInput
        label="Password"
        type="password"
        {...register("password", { required: "Password required" })}
        className="mb-3"
      />
      {errors.password && <p className="text-danger">{errors.password.message}</p>}

      <MDBBtn type="submit">Login</MDBBtn>
    </form>
  );
};

export default LoginForm;
