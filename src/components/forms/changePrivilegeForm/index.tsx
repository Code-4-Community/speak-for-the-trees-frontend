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
import { SelectValue } from 'antd/lib/select';
import { PrivilegeLevel } from '../../../auth/ducks/types';

const { Option } = Select;

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
  const [changePrivilegeForm] = Form.useForm();

  const onRoleChange = (role: SelectValue) => {
    changePrivilegeForm.setFieldsValue({ newLevel: role });
  };

  const onFinishChangePrivilege = (values: ChangePrivilegeRequest) => {
    ProtectedApiClient.changePrivilegeLevel(values)
      .then(() => {
        message.success('Privilege level changed!');
        changePrivilegeForm.resetFields();
      })
      .catch((err) =>
        message.error(
          `Privilege level could not be changed: ${err.response.data}`,
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
        <Input placeholder="User Email" />
      </Form.Item>

      <Form.Item name="newLevel" rules={newLevelRules}>
        <RoleDropdown placeholder="New Role" onChange={onRoleChange}>
          <Option value={'ADMIN'}>Admin</Option>
          {privilegeLevel === PrivilegeLevel.SUPER_ADMIN && (
            <>
              <Option value={'STANDARD'}>Standard</Option>
              <Option value={'SUPER_ADMIN'}>Super Admin</Option>
            </>
          )}
        </RoleDropdown>
      </Form.Item>

      <Form.Item name="password" rules={loginPasswordRules}>
        <Input.Password placeholder="Password" />
      </Form.Item>

      <SubmitButton type="primary" htmlType="submit">
        Confirm
      </SubmitButton>
    </Form>
  );
};

export default ChangePrivilegeForm;
