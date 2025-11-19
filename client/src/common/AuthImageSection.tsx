import { Box, Image, Text } from '@mantine/core';
import authImage from '@/assets/img/auth/authImage.jpg';

const AuthImageSection = () => {
  return (
    <Box h={{ base: 0, md: '100%' }} w={{ base: 0, md: '100%' }} pos="relative">
      <Image src={authImage} w="100%" h="100%" fit="cover" />

      <Box
        pos="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        style={{
          background:
            'linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))',
          pointerEvents: 'none'
        }}
      />

      <Box pos="absolute" bottom={24} right={24}>
        <Text
          fz={35}
          lts={1}
          fw={700}
          c="white"
          ta="end"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
        >
          Your Mountain Escape Awaits
        </Text>
        <Text
          size="xs"
          lts={1}
          lh={2}
          ta="end"
          mt="xs"
          c="white"
          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
        >
          Book your next unforgettable stay high above the valley. <br />
          Log in to access exclusive member rates and manage your reservations.
        </Text>
      </Box>
    </Box>
  );
};

export default AuthImageSection;
