import { Image } from '@mantine/core';
import logo from '@/assets/img/logo/logo.png';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/">
      <Image
        src={logo}
        h={{base:18,md:25}}
        mx={{ base: 'unset', md: 'auto' }}
        fit={'contain'}
      />
    </Link>
  );
};

export default Logo;
