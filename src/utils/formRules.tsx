import { FormInstance, Rule } from 'antd/es/form';

export const enterEmailRules: Rule[] = [
  { required: true, message: 'Please input your email!' },
  { type: 'email', message: 'Not a valid email address' },
];

export const loginPasswordRules: Rule[] = [
  {
    required: true,
    message: 'Please input your password!',
  },
];

export const passwordHelp =
  'Your new password must be at least 8 characters long.';

export const newPasswordRules: Rule[] = [
  { required: true, message: 'Please enter a new password!' },
  {
    min: 8,
    message: passwordHelp,
  },
];

export const confirmPasswordRules = (
  form: FormInstance,
  check: string,
): Rule[] => {
  return [
    {
      required: true,
      message: 'Please confirm your new password!',
    },
    {
      validator(_, value) {
        const password = form.getFieldValue(check);
        if (value && password !== value) {
          return Promise.reject('Passwords do not match');
        }
        return Promise.resolve();
      },
    },
  ];
};

export const firstNameRules: Rule[] = [
  {
    required: true,
    message: 'Please input your first name!',
  },
];

export const lastNameRules: Rule[] = [
  {
    required: true,
    message: 'Please input your last name!',
  },
];

export const usernameRules: Rule[] = [
  { required: true, message: 'Please enter a username!' },
];
