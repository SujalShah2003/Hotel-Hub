import { createBrowserRouter } from 'react-router';
import ErrorPage from '@/pages/error/ErrorPage.tsx';
import HomePage from '@/pages/home/HomePage.tsx';
import MasterLayout from '@/layouts/MasterLayout';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import SignIn from '@/components/auth/signin/SignIn';
import SignUp from '@/components/auth/signup/Signup';

export const routes = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        Component: MasterLayout,
        children: [
          {
            path: '/',
            element: <MainLayout />,
            children: [
              {
                index: true,
                element: <HomePage />
              }
            ]
          }
        ]
      },
      {
        Component: AuthLayout,
        children: [
          {
            path: '/auth/signin',
            element: <SignIn />
          },
          {
            path: '/auth/signup',
            element: <SignUp />
          }
        ]
      }
    ]
  }
]);
