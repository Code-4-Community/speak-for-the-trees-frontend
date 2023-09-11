import i18n from '../i18n/i18n';
import type { FormInstance, Rule } from 'antd/es/form';

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
    message: i18n.t('validation.target_email_required', { ns: 'forms' }),
  },
  {
    type: 'email',
    message: i18n.t('validation.email_invalid', { ns: 'forms' }),
  },
];

export const loginPasswordRules: Rule[] = [
  {
    required: true,
    message: i18n.t('validation.password_required', { ns: 'forms' }),
  },
];

export const newPasswordRules: Rule[] = [
  {
    required: true,
    message: i18n.t('validation.password_new_required', { ns: 'forms' }),
  },
  {
    min: 8,
    message: i18n.t('validation.password_new_min_length', { ns: 'forms' }),
  },
];

export const confirmPasswordRules = (
  form: FormInstance,
  check: string,
): Rule[] => {
  return [
    {
      required: true,
      message: i18n.t('validation.confirm_password_new_required', {
        ns: 'forms',
      }),
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
    message: i18n.t('validation.activity_required', { ns: 'forms' }),
  },
];

export const activitiesDateRules: Rule[] = [
  {
    required: true,
    message: i18n.t('validation.activity_date_required', { ns: 'forms' }),
  },
];

export const newLevelRules: Rule[] = [
  {
    required: true,
    message: i18n.t('validation.new_privilege_required', { ns: 'forms' }),
  },
];

export const zipCodeRules: Rule[] = [
  {
    required: true,
    message: i18n.t('validation.zip_required', { ns: 'forms' }),
  },
  {
    pattern: /[0-9]{5}/,
    message: i18n.t('validation.zip_numeric', { ns: 'forms' }),
  },
  {
    len: 5,
    message: i18n.t('validation.zip_length', { ns: 'forms' }),
  },
];

export const stringNumberRules: Rule[] = [
  {
    pattern: /^\d+\.?\d+$|^\d+$/,
    message: i18n.t('validation.numeric', { ns: 'forms' }),
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
          return Promise.reject(
            i18n.t('validation.numeric_positive', { ns: 'forms' }),
          );
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
    message: i18n.t('validation.tree_name_length', { ns: 'forms' }),
  },
];
