import React from 'react';
import { Form, Input } from 'antd';
import { FormInstance } from 'antd/es/form';
import { treeNameRules } from '../../../utils/formRules';
import { NameSiteEntryRequest } from '../ducks/types';
import { GreenButton, WhiteButton } from '../../themedComponents';
import styled from 'styled-components';

interface StyledButtonProps {
  readonly isMobile?: boolean;
}

interface EditTreeNameFormProps extends StyledButtonProps {
  readonly editTreeNameForm: FormInstance<NameSiteEntryRequest>;
  readonly onSubmitNameChange: () => void;
  readonly onCancelNameChange: () => void;
}

const StyledForm = styled(Form)`
  margin-top: -30px;
  margin-bottom: 20px;
`;

const StyledGreenButton = styled(GreenButton)`
  margin-top: 0;
  margin-right: 10px;
  font-size: ${(props: StyledButtonProps) => (props.isMobile ? '13px' : '')};
  height: ${(props: StyledButtonProps) => (props.isMobile ? '32px' : '')};
`;

const StyledWhiteButton = styled(WhiteButton)`
  margin-top: 0;
  font-size: ${(props: StyledButtonProps) => (props.isMobile ? '13px' : '')};
  height: ${(props: StyledButtonProps) => (props.isMobile ? '32px' : '')};
`;

const EditTreeNameForm: React.FC<EditTreeNameFormProps> = ({
  isMobile,
  editTreeNameForm,
  onSubmitNameChange,
  onCancelNameChange,
}) => {
  return (
    <StyledForm
      name="edit-tree-name"
      form={editTreeNameForm}
      layout={isMobile ? 'horizontal' : 'inline'}
      size={isMobile ? 'small' : 'middle'}
    >
      <Form.Item name="name" rules={treeNameRules}>
        <Input placeholder="Enter tree name" />
      </Form.Item>
      <Form.Item>
        <StyledGreenButton isMobile={isMobile} onClick={onSubmitNameChange}>
          Change Name
        </StyledGreenButton>
        <StyledWhiteButton isMobile={isMobile} onClick={onCancelNameChange}>
          Cancel
        </StyledWhiteButton>
      </Form.Item>
    </StyledForm>
  );
};

export default EditTreeNameForm;
