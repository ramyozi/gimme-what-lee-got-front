import { useForm } from "react-hook-form";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { registerRequest } from "../../../../services/api/account.ts";

type RegisterFormInputs = {
  username: string;
  email: string;
  password: string;
};

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await registerRequest(data);
      console.log("Registered:", response.data);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <MDBContainer className="d-flex justify-content-center align-items-center vh-100">
      <MDBCard style={{ maxWidth: "500px", width: "100%" }} className="shadow-4-strong">
        <MDBCardBody>
          <MDBTypography tag="h3" className="text-center mb-4" style={{ color: "#6a1b9a" }}>
            Create Account
          </MDBTypography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <MDBInput
              label="Username"
              wrapperClass="mb-3"
              {...register("username", { required: "Username required" })}
            />
            {errors.username && <p className="text-danger">{errors.username.message}</p>}

            <MDBInput
              label="Email"
              type="email"
              wrapperClass="mb-3"
              {...register("email", { required: "Email required" })}
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}

            <MDBInput
              label="Password"
              type="password"
              wrapperClass="mb-3"
              {...register("password", { required: "Password required" })}
            />
            {errors.password && <p className="text-danger">{errors.password.message}</p>}

            <MDBBtn type="submit" block color="warning" className="mb-3">
              Register
            </MDBBtn>
          </form>

          <p className="text-center">
            Already have an account?{" "}
            <a href="/login" className="text-primary fw-bold">
              Login
            </a>
          </p>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default RegisterForm;
