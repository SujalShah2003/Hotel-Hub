import { Grid, Paper } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import AuthImageSection from '@/common/AuthImageSection';

const AuthLayout = () => {
  return (
    <Grid
      gutter={0}
      styles={{
        inner: {
          height: '100vh',
          margin: 0
        }
      }}
      style={{ overflow: 'hidden', height: '100vh' }}
    >
      <Grid.Col
        span={{ base: 0, md: 7 }}
        display={{ base: 'none', md: 'block' }}
        style={{ height: '100vh', overflow: 'hidden' }}
      >
        <AuthImageSection />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 5 }} p="lg" pos="relative" style={{ height: '100vh', overflowY: 'auto' }}>
        <Paper
          w={80}
          h={80}
          top={0}
          left={0}
          radius="50%"
          pos="absolute"
          bg={'primary'}
          style={{ filter: 'blur(50px)' }}
          visibleFrom="base"
          hiddenFrom="md"
        />

        <Outlet />

        <Paper
          w={80}
          h={80}
          bottom={0}
          right={0}
          radius="50%"
          pos="absolute"
          bg={'primary'}
          style={{ filter: 'blur(50px)' }}
          visibleFrom="base"
          hiddenFrom="md"
        />
      </Grid.Col>
    </Grid>
  );
};

export default AuthLayout;
