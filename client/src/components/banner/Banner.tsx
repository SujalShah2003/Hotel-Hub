import bannerImage from '@/assets/img/banner/bannerImage.jpg';
import { Image, Box, Text, Button, Container } from '@mantine/core';

const Banner = () => {
  const handleBookNowClick = () => {
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box pos="relative" w="100%">
      <Image src={bannerImage} w="100%" h="60vh" mx="auto"  />

      {/* Overlay gradient */}
      <Box
        pos="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        style={{
          background:
            'linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2))',
          pointerEvents: 'none'
        }}
      />

      {/* Content */}
      <Container
        pos="absolute"
        top="50%"
        size="100%"
        left="2.5%"
        style={{ transform: 'translateY(-50%)', pointerEvents: 'auto' }}
      >
        <Text
          fz={{ base: 16, sm: 18, md: 30 }}
          c="white"
          tt="uppercase"
          mt="md"
          maw={800}
          style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
        >
          Unlock world-class service and panoramic views. Book with confidence
          and enjoy exclusive deals.
        </Text>
        <Button
          size="lg"
          mt="xl"
          variant="outline"
          color="white"
          tt="uppercase"
          radius="md"
          onClick={handleBookNowClick}
          style={{
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}
        >
          Book Now
        </Button>
      </Container>
    </Box>
  );
};

export default Banner;
