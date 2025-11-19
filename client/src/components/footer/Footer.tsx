import { Box, Container, Text } from '@mantine/core';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Box
      component="footer"
      p={10}
      pt="sm"
      style={{
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#f8f9fa'
      }}
    >
      <Container size="xl" p={0}>
        <Text size="sm" c="dimmed" ta="center">
          © {currentYear} Booking App - Sujal Shah. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
