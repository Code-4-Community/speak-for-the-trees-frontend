import { FormInstance, Rule } from 'antd/es/form';

export const enterEmailRules: Rule[] = [
  { required: true, message: 'Please input your email!' },
  { type: 'email', message: 'Not a valid email address' },
];

export const targetUserEmailRules: Rule[] = [
  {
    required: true,
    message:
      'Please input the email of the user whose privilege level you wish to change!',
  },
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

export const newLevelRules: Rule[] = [
  {
    required: true,
    message: 'Please pick a privilege level for this user!',
  },
];

export const zipCodeRules: Rule[] = [
  {
    required: true,
    message: 'Please enter a valid zip code!',
  },
  {
    pattern: /^\d{5}$/,
    message: 'Zip code must be a 5-digit number',
  },
];

export const stringNumberRules: Rule[] = [
  {
    pattern: /^\d+\.?\d+$|^\d+$/,
    message: 'Must be a number',
  },
];

export const positiveNumberRules = (
  form: FormInstance,
  check: string,
): Rule[] => {
  return [
    {
      validator() {
        if (form.getFieldValue(check) < 1) {
          return Promise.reject('Number must be positive!');
        }
        return Promise.resolve();
      },
    },
  ];
};

export const requiredRule = (message: string): Rule[] => {
  return [{ required: true, message }];
};
