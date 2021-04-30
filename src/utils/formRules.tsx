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

export const newPasswordRules: Rule[] = [
  { required: true, message: 'Please enter a password!' },
  {
    min: 8,
    message: 'Password must be at least 8 characters long',
  },
];

export const confirmPasswordRules = (form: FormInstance): Rule[] => {
  return [
    {
      required: true,
      message: 'Please confirm your password!',
    },
    {
      validator(_, value) {
        const password = form.getFieldValue('password');
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

export const activitiesRules: Rule[] = [
  {
    required: true,
    message: 'Please select at least one activity',
  },
];

export const activitiesDateRules: Rule[] = [
  {
    required: true,
    message: 'Please input the date of the activity!',
  },
];
