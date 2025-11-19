import { JSX } from 'react';
import { providingService } from '@/components/services/providingService.temp';
import { Box, Text, Group, SimpleGrid, Flex } from '@mantine/core';
import {
  IconHeadphones,
  IconRefresh,
  IconTag,
  IconShieldCheck,
  IconCircleCheck,
  IconGift
} from '@tabler/icons-react';
import { IProvidedServices } from '@/types/providingServices.type';

const iconMap: Record<string, JSX.Element> = {
  tag: <IconTag size={40} strokeWidth={1} />,
  headset: <IconHeadphones size={40} strokeWidth={1} />,
  refresh: <IconRefresh size={40} strokeWidth={1} />,
  'check-circle': <IconCircleCheck size={40} strokeWidth={1} />,
  'shield-check': <IconShieldCheck size={40} strokeWidth={1} />,
  gift: <IconGift size={40} strokeWidth={1} />
};

const ProvidingServices = () => {
  return (
    <Box p={{base:20, md:50}} py={{base:20,md:70}}>
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 4, lg: 3 }}
        spacing="lg"
        verticalSpacing="xl"
      >
        {providingService.map((service: IProvidedServices, index: number) => (
          <Box p="lg" key={index}>
            <Flex gap="md">
              <Group mb="sm">{iconMap[service.icon]}</Group>
              <Box>
                <Text fw={600} fz="lg">
                  {service.title}
                </Text>
                <Text c="dimmed" fz="sm">
                  {service.description}
                </Text>
              </Box>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProvidingServices;
