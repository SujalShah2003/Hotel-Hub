import { Outlet, ScrollRestoration } from 'react-router-dom';

import { Fragment } from 'react';
import { AppShell } from '@mantine/core';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

const MainLayout = () => {
  return (
    <Fragment>
      <ScrollRestoration />
      <AppShell header={{ height: 60 }} bg="white">
        <AppShell.Header withBorder={true} bg="white">
          <Header />
        </AppShell.Header>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
        <Footer />
      </AppShell>
    </Fragment>
  );
};

export default MainLayout;
