import { toast } from 'sonner';

import { Box, Button, Divider, Flex, Grid, Text } from '@mantine/core';
import Logo from '@/common/Logo';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { PasswordInput, TextInput } from '../../../forms/elements';

import {
  signUpInitialValues,
  signUpSchema,
  type SignUpFormType
} from './zod.sigup';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '@/services/auth.service';

const SignUp = () => {
  const methods = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpInitialValues
  });

  const { handleSubmit } = methods;
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();

  const onSubmit = async (data: SignUpFormType) => {
    try {
      const response = await signUp(data).unwrap();
      toast.success(response.message || 'Account created successfully!');
      navigate('/auth/signin');
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || err?.message || 'Sign up failed';
      toast.error(errorMessage);
      console.error('Sign up error:', err);
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
        {/* Logo */}
        <Logo />

        <Box maw={{ base: '90%', md: '80%' }} mah="max-content">
          {/* Title */}
          <Box>
            <Text fw={700} fz={{ base: 25, md: 30 }} ta="center">
              Sign Up for Best Deals
            </Text>
            <Text c="dimmed" fz="sm" mt={5} ta="center">
              Empower your experience, sign up for a free account today.
            </Text>
          </Box>

          {/* Form */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid mt="xl">
                <Grid.Col span={6}>
                  <TextInput
                    name="firstname"
                    label="First Name"
                    props={{ withAsterisk: true, autoComplete: 'off' }}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    name="lastname"
                    label="Last Name"
                    props={{ withAsterisk: true }}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInput
                    name="email"
                    label="Email"
                    props={{ withAsterisk: true, type: 'email' }}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <PasswordInput
                    name="password"
                    label="Password"
                    props={{
                      withAsterisk: true,

                      autoComplete: 'off'
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <PasswordInput
                    name="confirmpwd"
                    label="Confirm password"
                    props={{
                      withAsterisk: true,

                      autoComplete: 'off'
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={12} mt="sm">
                  <Button
                    w="100%"
                    h="auto"
                    p="sm"
                    type="submit"
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
                      Sign Up
                    </Text>
                  </Button>
                </Grid.Col>
                <Grid.Col span={12} mt="sm">
                  <Divider
                    color="gray.6"
                    labelPosition="center"
                    label={
                      <Text fz="md" mx="sm" c="dimmed" fw={500} component="div">
                        Already have an account?
                        <Link to="/auth/signin">
                          <Text
                            component="span"
                            c="primary"
                            fz="inherit"
                            fw={600}
                            ff="inherit"
                            ml={5}
                          >
                            {' '}
                            Sign In
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

export default SignUp;
