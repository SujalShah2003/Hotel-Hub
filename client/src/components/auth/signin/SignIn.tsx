import { toast } from 'sonner';

import { Box, Button, Divider, Flex, Grid, Text } from '@mantine/core';
import Logo from '@/common/Logo';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { PasswordInput, TextInput } from '@/forms/elements';

import {
  signInInitialValues,
  signInSchema,
  type SignInFormType
} from './zod.signin';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInMutation } from '@/services/auth.service';
import { useAppDispatch } from '@/store';
import { SET_AUTH_DATA } from '@/store/app/auth.slice';

const SignIn = () => {
  const methods = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema),
    defaultValues: signInInitialValues
  });

  const { handleSubmit } = methods;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signIn, { isLoading }] = useSignInMutation();

  const onSubmit = async (data: SignInFormType) => {
    try {
      const response = await signIn(data).unwrap();

      dispatch(
        SET_AUTH_DATA({
          token: response.data.token,
          user: response.data.user
        })
      );

      toast.success(response.message || 'Login successful!');
      navigate('/');
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || err?.message || 'Sign in failed';
      toast.error(errorMessage);
      console.error('Sign in error:', err);
    }
  };

  return (
    <Box w="100%" h="100%">
      <Flex
        w="100%"
        h="100%"
        direction="column"
        justify="center"
        align="center"
        gap="xl"
      >
        <Logo />
        <Box maw={{ base: '90%', md: '80%' }} mah="max-content">
          <Box>
            <Text fw={700} fz={30} ta="center">
              Welcome to HOTEL HUB
            </Text>
            <Text c="dimmed" fz="sm" mt={5} ta="center">
              Enter your email and password to access your account
            </Text>
          </Box>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid mt="xl">
                <Grid.Col span={12}>
                  <TextInput
                    name="email"
                    label="Email"
                    props={{
                      withAsterisk: true,
                      type: 'email',
                      autoComplete: 'off'
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <PasswordInput
                    name="password"
                    label="Password"
                    props={{ withAsterisk: true, autoComplete: 'off' }}
                  />
                </Grid.Col>
                <Grid.Col span={12} mt="sm">
                  <Button
                    w="100%"
                    h="auto"
                    type="submit"
                    p="sm"
                    loaderProps={{ type: 'dots' }}
                    loading={isLoading}
                  >
                    <Text
                      fz="lg"
                      c="#FFF"
                      mr="xs"
                      fw={600}
                      ff="var(--secondary-font)"
                    >
                      Sign In
                    </Text>
                  </Button>
                </Grid.Col>
                <Grid.Col span={12} mt="sm">
                  <Divider
                    color="gray.6"
                    labelPosition="center"
                    label={
                      <Text fz="md" mx="sm" c="dimmed" fw={500} component="div">
                        Don't have an account?
                        <Link to="/auth/signup">
                          <Text
                            component="span"
                            c="primary"
                            fz="inherit"
                            fw={600}
                            ml={5}
                          >
                            {' '}
                            Sign Up
                          </Text>
                        </Link>
                      </Text>
                    }
                  />
                </Grid.Col>
              </Grid>
            </form>
          </FormProvider>
        </Box>
      </Flex>
    </Box>
  );
};

export default SignIn;
