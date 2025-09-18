import { Container, Title, Text } from "@mantine/core";

export default function NotFound() {
  return (
    <Container mt="xl" ta="center">
      <Title order={1}>404</Title>
      <Text>We couldn’t find that page.</Text>
    </Container>
  );
}
