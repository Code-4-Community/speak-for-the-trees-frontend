import React from 'react';
import { Form, Input, message, Select } from 'antd';
import ProtectedApiClient from '../../../api/protectedApiClient';
import {
  loginPasswordRules,
  newLevelRules,
  targetUserEmailRules,
} from '../../../utils/formRules';
import { ChangePrivilegeRequest } from '../ducks/types';
import { SubmitButton } from '../../themedComponents';
import styled from 'styled-components';
import { PrivilegeLevel } from '../../../auth/ducks/types';
import { useTranslation } from 'react-i18next';
import { n } from '../../../utils/stringFormat';
import { site } from '../../../constants';

const RoleDropdown = styled(Select)`
  width: 100%;
  height: 36px;
`;

interface ChangePrivilegeFormProps {
  readonly privilegeLevel: PrivilegeLevel;
}

const ChangePrivilegeForm: React.FC<ChangePrivilegeFormProps> = ({
  privilegeLevel,
}) => {
  const { t } = useTranslation(n(site, ['admin', 'forms']), {
    nsMode: 'fallback',
  });

  const [changePrivilegeForm] = Form.useForm();

  const onRoleChange = (role: unknown) => {
    changePrivilegeForm.setFieldsValue({ newLevel: role });
  };

  const onFinishChangePrivilege = (values: ChangePrivilegeRequest) => {
    ProtectedApiClient.changePrivilegeLevel(values)
      .then(() => {
        message.success(t('change_privilege.success'));
        changePrivilegeForm.resetFields();
      })
      .catch((err) =>
        message.error(
          t('change_privilege.error', { error: err.response.data }),
        ),
      );
  };

  return (
    <Form
      name="changePrivilege"
      form={changePrivilegeForm}
      onFinish={onFinishChangePrivilege}
    >
      <Form.Item name="targetUserEmail" rules={targetUserEmailRules}>
        <Input placeholder={t('change_privilege.user_email')} />
      </Form.Item>

      <Form.Item name="newLevel" rules={newLevelRules}>
        <RoleDropdown
          placeholder={t('change_privilege.new_role')}
          onChange={onRoleChange}
        >
          <Select.Option value={'ADMIN'}>{t('roles.admin')}</Select.Option>
          {privilegeLevel === PrivilegeLevel.SUPER_ADMIN && (
            <>
              <Select.Option value={'STANDARD'}>
                {t('roles.standard')}
              </Select.Option>
              <Select.Option value={'SUPER_ADMIN'}>
                {t('roles.super_admin')}
              </Select.Option>
            </>
          )}
        </RoleDropdown>
      </Form.Item>

      <Form.Item name="password" rules={loginPasswordRules}>
        <Input.Password placeholder={t('password')} />
      </Form.Item>

      <SubmitButton htmlType="submit">{t('confirm')}</SubmitButton>
    </Form>
  );
};

export default ChangePrivilegeForm;
