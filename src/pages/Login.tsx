import LoginForm from "../components/services/accounts/form/login-form.tsx";
import { Container, Title, Paper } from "@mantine/core";

const Login = () => {

    return (
        <Container size={400} my={40}>
            <Title>Login</Title>
            <Paper shadow="xs" p="md" mt="md">
            <LoginForm />
            </Paper>
        </Container>
    )
};

export default Login;
