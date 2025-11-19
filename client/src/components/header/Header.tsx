import Logo from '@/common/Logo';
import {
  Flex,
  Menu,
  Avatar,
  Text,
  UnstyledButton,
  Group,
  Box
} from '@mantine/core';
import {
  IconLogout,
  IconUser,
  IconMail,
  IconChevronDown
} from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { GET_AUTH_CONFIG, CLEAR_AUTH_DATA } from '@/store/app/auth.slice';
import { useLogoutMutation } from '@/services/auth.service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Header = () => {
  const { user } = useAppSelector(GET_AUTH_CONFIG);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(CLEAR_AUTH_DATA());
      toast.success('Logged out successfully');
      navigate('/auth/signin');
    } catch (error) {
      dispatch(CLEAR_AUTH_DATA());
      navigate('/auth/signin');
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return 'U';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Flex align="center" justify="space-between" h={60} px={{base:30, md:50 }}>
      <Logo />

      {user && (
        <Menu shadow="md" width={250} position="bottom-end">
          <Menu.Target>
            <UnstyledButton>
              <Group gap="xs">
                <Avatar color="primary" radius="xl">
                  {getUserInitials()}
                </Avatar>
                <Box
                  style={{ flex: 1 }}
                  display={{ base: 'none', md: 'block' }}
                >
                  <Text size="sm" fw={600}>
                    {user.firstName} {user.lastName}
                  </Text>
                </Box>
                <IconChevronDown size={16} />
              </Group>
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Account</Menu.Label>
            <Menu.Item leftSection={<IconUser size={16} />} c="dimmed">
              <Text size="sm" fw={500}>
                {user.firstName} {user.lastName}
              </Text>
            </Menu.Item>
            <Menu.Item leftSection={<IconMail size={16} />} c="dimmed">
              <Text size="sm">{user.email}</Text>
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item
              color="red"
              leftSection={<IconLogout size={16} />}
              onClick={handleLogout}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </Flex>
  );
};

export default Header;
