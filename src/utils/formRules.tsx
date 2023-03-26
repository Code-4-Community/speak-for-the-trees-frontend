import i18n from '../i18n/i18n';
import { FormInstance, Rule } from 'antd/es/form';

export const enterEmailRules: Rule[] = [
  {
    required: true,
    message: i18n.t('validation.email_required', { ns: 'forms' }),
  },
  {
    type: 'email',
    message: i18n.t('validation.email_invalid', { ns: 'forms' }),
  },
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

export const newPasswordRules: Rule[] = [
  {
    required: true,
    message: i18n.t('validation.password_required', { ns: 'forms' }),
  },
  {
    min: 8,
    message: i18n.t('validation.password_min_length', { ns: 'forms' }),
  },
];

export const confirmPasswordRules = (
  form: FormInstance,
  check: string,
): Rule[] => {
  return [
    {
      required: true,
      message: i18n.t('validation.confirm_password_required', { ns: 'forms' }),
    },
    {
      validator(_, value) {
        const password = form.getFieldValue(check);
        if (value && password !== value) {
          return Promise.reject(
            i18n.t('validation.confirm_password_match', { ns: 'forms' }),
          );
        }
        return Promise.resolve();
      },
    },
  ];
};

export const firstNameRules: Rule[] = [
  {
    required: true,
    message: i18n.t('validation.first_name_required', { ns: 'forms' }),
  },
];

export const lastNameRules: Rule[] = [
  {
    required: true,
    message: i18n.t('validation.last_name_required', { ns: 'forms' }),
  },
];

export const usernameRules: Rule[] = [
  {
    required: true,
    message: i18n.t('validation.username_required', { ns: 'forms' }),
  },
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
    pattern: /[0-9]{5}/,
    message: 'Zip code must only consist of numbers',
  },
  {
    len: 5,
    message: 'Zip code must be 5 digits long',
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

export const treeNameRules: Rule[] = [
  {
    max: 60,
    message: 'Tree name must be at most 60 characters long.',
  },
];
