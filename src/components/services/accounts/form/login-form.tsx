import { useForm } from "react-hook-form";
import { TextInput, PasswordInput, Button, Stack } from "@mantine/core";
import {useAuth} from "../../../../lib/plugin/auth-provider.tsx";
import {useNavigate} from "react-router-dom";

interface LoginFormInputs {
  username: string;
  password: string;
}

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const credentials = {username: data.username, password: data.password}
      await login(credentials);
      navigate('/search')
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <TextInput
          label="Username"
          placeholder="Username"
          {...register("username", { required: "Username required" })}
          error={errors.username?.message}
        />
        <PasswordInput
          label="Password"
          placeholder="********"
          {...register("password", { required: "Password required" })}
          error={errors.password?.message}
        />
        <Button type="submit" loading={isSubmitting}>
          Login
        </Button>
      </Stack>
    </form>
  );
}
