import React from 'react';
import { Form, Input } from 'antd';
import { FormInstance } from 'antd/es/form';
import { treeNameRules } from '../../../utils/formRules';
import { NameSiteEntryRequest } from '../ducks/types';
import { GreenButton, WhiteButton } from '../../themedComponents';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { site } from '../../../constants';
import { n } from '../../../utils/stringFormat';

interface StyledButtonProps {
  readonly isMobile?: boolean;
}

interface EditTreeNameFormProps extends StyledButtonProps {
  readonly treeName: string;
  readonly editTreeNameForm: FormInstance<NameSiteEntryRequest>;
  readonly onSubmitNameChange: () => void;
  readonly onCancelNameChange: () => void;
}

const StyledForm = styled(Form)`
  margin-top: ${(props: StyledButtonProps) =>
    props.isMobile ? '-20px' : '-30px'};
  margin-bottom: 20px;
  text-transform: none;
`;

const SubmitButton = styled(GreenButton)`
  margin-top: 0;
  margin-right: 10px;
  font-size: ${(props: StyledButtonProps) => (props.isMobile ? '13px' : '')};
  height: ${(props: StyledButtonProps) => (props.isMobile ? '32px' : '')};
`;

const CancelButton = styled(WhiteButton)`
  margin-top: 0;
  font-size: ${(props: StyledButtonProps) => (props.isMobile ? '13px' : '')};
  height: ${(props: StyledButtonProps) => (props.isMobile ? '32px' : '')};
`;

const EditTreeNameForm: React.FC<EditTreeNameFormProps> = ({
  isMobile,
  treeName,
  editTreeNameForm,
  onSubmitNameChange,
  onCancelNameChange,
}) => {
  const { t } = useTranslation(n(site, ['forms']), {
    nsMode: 'fallback',
  });

  return (
    <StyledForm
      name="edit-tree-name"
      form={editTreeNameForm}
      layout={isMobile ? 'horizontal' : 'inline'}
      size={isMobile ? 'small' : 'middle'}
    >
      <Form.Item name="name" rules={treeNameRules}>
        <Input
          placeholder={t('name_form.placeholder')}
          defaultValue={treeName}
        />
      </Form.Item>
      <Form.Item>
        <SubmitButton isMobile={isMobile} onClick={onSubmitNameChange}>
          {t('name_form.submit')}
        </SubmitButton>
        <CancelButton isMobile={isMobile} onClick={onCancelNameChange}>
          {t('cancel')}
        </CancelButton>
      </Form.Item>
    </StyledForm>
  );
};

export default EditTreeNameForm;
