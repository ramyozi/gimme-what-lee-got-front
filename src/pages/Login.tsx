import LoginForm from "../components/services/accounts/form/login-form.tsx";
import { Container, Title, Paper } from "@mantine/core";

const Login = () => {
  return (
    <Container size={420} my={60}>
      <Title order={2} ta="center" mb="lg">
        Welcome back
      </Title>
      <Paper withBorder shadow="sm" p="lg" radius="md">
        <LoginForm />
      </Paper>
    </Container>
  );
};

export default Login;
