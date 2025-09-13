import React from "react";
import { useForm } from "react-hook-form";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useAuth } from "../../../../lib/plugin/auth-provider.tsx";

type LoginFormInputs = {
  username: string;
  password: string;
};

const LoginForm: React.FC<{ onLoginSuccess?: () => void }> = ({ onLoginSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const { login } = useAuth();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <MDBContainer className="d-flex justify-content-center align-items-center vh-100">
      <MDBCard style={{ maxWidth: "500px", width: "100%" }} className="shadow-4-strong">
        <MDBCardBody>
          <MDBTypography tag="h3" className="text-center mb-4" style={{ color: "#d32f2f" }}>
            Welcome Back
          </MDBTypography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <MDBInput
              label="Username"
              wrapperClass="mb-3"
              {...register("username", { required: "Username required" })}
            />
            {errors.username && <p className="text-danger">{errors.username.message}</p>}

            <MDBInput
              label="Password"
              type="password"
              wrapperClass="mb-3"
              {...register("password", { required: "Password required" })}
            />
            {errors.password && <p className="text-danger">{errors.password.message}</p>}

            <MDBBtn type="submit" block color="primary" className="mb-3">
              Login
            </MDBBtn>
          </form>

          <p className="text-center">
            Don’t have an account?{" "}
            <a href="/register" className="text-success fw-bold">
              Register
            </a>
          </p>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default LoginForm;
