import RegisterForm from "../components/services/accounts/form/register-form.tsx";
import { Container, Title, Paper } from "@mantine/core";

const Register = () => {
  return (
    <Container size={420} my={60}>
      <Title order={2} ta="center" mb="lg">
        Create your account
      </Title>
      <Paper withBorder shadow="sm" p="lg" radius="md">
        <RegisterForm />
      </Paper>
    </Container>
  );
};

export default Register;
