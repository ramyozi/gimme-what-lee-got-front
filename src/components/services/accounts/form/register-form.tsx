import { useForm } from "react-hook-form";
import { TextInput, PasswordInput, Button, Stack, Text } from "@mantine/core";
import {Link, useNavigate} from "react-router-dom";
import { registerRequest } from "../../../../services/api/account.ts";

type RegisterFormInputs = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

const RegisterForm: React.FC = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerRequest({
        ...data,
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <TextInput
          label="Username"
          placeholder="Choose a username"
          {...register("username", { required: "Username required" })}
          error={errors.username?.message}
        />

        <TextInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          {...register("email", { required: "Email required" })}
          error={errors.email?.message}
        />

        <TextInput
          label="First name"
          placeholder="John"
          {...register("first_name", { required: "First name required" })}
          error={errors.first_name?.message}
        />

        <TextInput
          label="Last name"
          placeholder="Doe"
          {...register("last_name", { required: "Last name required" })}
          error={errors.last_name?.message}
        />

        <PasswordInput
          label="Password"
          placeholder="Create a password"
          {...register("password", { required: "Password required" })}
          error={errors.password?.message}
        />

        <Button type="submit" loading={isSubmitting} fullWidth color="yellow">
          Register
        </Button>

        <Text size="sm" ta="center" mt="sm">
          Already have an account?{" "}
          <Link to="/login" style={{ fontWeight: 600, color: "#1971c2" }}>
            Login
          </Link>
        </Text>
      </Stack>
    </form>
  );
};

export default RegisterForm;
