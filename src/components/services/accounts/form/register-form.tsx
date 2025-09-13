import { useForm } from "react-hook-form";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import {registerRequest} from "../../../../services/api/account.ts";

type RegisterFormInputs = {
  username: string;
  email: string;
  password: string;
};

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await registerRequest(data);
      console.log("Registered:", response.data);
      alert("Registration successful!");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MDBInput
        label="Username"
        wrapperClass="form-outline mb-3"
        {...register("username", { required: "Username required" })}
        className="mb-3"
      />
      {errors.username && <p className="text-danger">{errors.username.message}</p>}

      <MDBInput
        label="Email"
        type="email"
        wrapperClass="form-outline mb-3"
        {...register("email", { required: "Email required" })}
        className="mb-3"
      />
      {errors.email && <p className="text-danger">{errors.email.message}</p>}

      <MDBInput
        label="Password"
        type="password"
        wrapperClass="form-outline mb-3"
        {...register("password", { required: "Password required" })}
        className="mb-3"
      />
      {errors.password && <p className="text-danger">{errors.password.message}</p>}

      <MDBBtn type="submit">Register</MDBBtn>
    </form>
  );
};

export default RegisterForm;
