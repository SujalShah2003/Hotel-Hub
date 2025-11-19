import { z } from 'zod';

export const signUpInitialValues: SignUpFormType = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmpwd: ''
};

export const signUpSchema = z
  .object({
    firstname: z
      .string({ error: 'First name is required' })
      .min(2, 'First name must be greater than 5 letters'),
    lastname: z
      .string({ error: 'Last name is required' })
      .min(2, 'Last name must be greater than 5 letters'),
    email: z
      .string({ error: 'Email is required' })
      .min(2, 'Email is required')
      .email('Invalid email'),
    password: z
      .string({ message: 'Password is required' })
      .min(8, 'Password must be at least 8 characters')
      .max(15, 'Password must be at most 15 characters')
      .regex(/[a-z]/, 'Password must contain a lowercase letter')
      .regex(/[A-Z]/, 'Password must contain an uppercase letter')
      .regex(/[0-9]/, 'Password must contain a number')
      .regex(
        /[@#%&!$*]/,
        'Password must contain a special character (@,#,%,&,!,$,*)'
      ),
    confirmpwd: z.string().min(1, 'Confirm password is required')
  })
  .refine(data => data.password === data.confirmpwd, {
    message: 'Passwords do not match',
    path: ['confirmpwd']
  });

export type SignUpFormType = z.infer<typeof signUpSchema>;
