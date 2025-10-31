import { useForm } from "react-hook-form";
import { TextInput, PasswordInput, Button, Stack, Text } from "@mantine/core";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../../../lib/plugin/auth-provider/use-auth.ts";

interface LoginFormInputs {
  username: string;
  password: string;
}

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Détermine la page vers laquelle rediriger après login
  const from =
      (location.state as { from?: string })?.from ||
      sessionStorage.getItem("lastVisitedPath") ||
      "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      login(data.username, data.password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <TextInput
          label="Username"
          placeholder="Enter username"
          {...register("username", { required: "Username required" })}
          error={errors.username?.message}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter password"
          {...register("password", { required: "Password required" })}
          error={errors.password?.message}
        />

        <Button type="submit" loading={isSubmitting} fullWidth>
          Login
        </Button>

        <Text size="sm" ta="center" mt="sm">
          First time here?{" "}
          <Link to="/register" style={{ fontWeight: 600, color: "#1971c2" }}>
            Register first
          </Link>
        </Text>
      </Stack>
    </form>
  );
}
