import React from "react";
import { useForm } from "react-hook-form";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import {loginRequest} from "../../../../services/api/account.ts";

type LoginFormInputs = {
  username: string;
  password: string;
};

const LoginForm: React.FC<{ onLoginSuccess?: (token: string) => void }> = ({ onLoginSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await loginRequest(data);
      const token = response.data.access;
      console.log("Logged in token:", token);
      alert("Login successful!");
      if (onLoginSuccess) onLoginSuccess(token);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.detail || "Login failed");
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
