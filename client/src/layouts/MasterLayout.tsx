import React, { Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store';
import { GET_AUTH_CONFIG } from '@/store/app/auth.slice';

const MasterLayout: React.FC = () => {
  const navigate = useNavigate();
  const { token, isLoggedIn } = useAppSelector(GET_AUTH_CONFIG);
  
  useEffect(() => {
    if (!token || !isLoggedIn) {
      navigate('/auth/signin');
    }
  }, [token, isLoggedIn, navigate]);

  if (!token || !isLoggedIn) {
    return null;
  }

  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default MasterLayout;
