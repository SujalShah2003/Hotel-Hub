import { FC } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { persistor, store } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import { routes } from '@/routes';
import { theme } from '@/theme';
import { Toaster } from "sonner";

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { MantineProvider } from '@mantine/core';

export const appMode: 'light' | 'dark' | 'auto' = 'light';

const App: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading="Initializing...">
        <MantineProvider theme={theme}>
          <Toaster position="bottom-right" expand={false} richColors />
          <RouterProvider router={routes} />
        </MantineProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
