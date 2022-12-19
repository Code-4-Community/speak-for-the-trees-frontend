import React, { useState } from 'react';
import { FormInstance } from 'antd';
import { escape, unescape } from 'lodash';
import { NameSiteEntryRequest } from '../forms/ducks/types';
import EditTreeNameForm from '../forms/editTreeNameForm';
import {
  StyledTitle,
  StyledSubtitle,
  StyledSubtitleProps,
} from '../themedComponents';
import styled from 'styled-components';
import { EditOutlined } from '@ant-design/icons';
import { isEmptyString } from '../../utils/isCheck';

interface TreePageHeaderProps extends StyledSubtitleProps {
  readonly pageTitle: string;
  readonly pageSubtitle: string;
  readonly treeName: string;
  readonly canEditTreeName: boolean;
  readonly editTreeNameForm: FormInstance<NameSiteEntryRequest>;
  readonly onClickEditTreeName: (values: NameSiteEntryRequest) => void;
}

const StyledEditOutline = styled(EditOutlined)`
  margin-top: 2px;
  margin-left: 5px;
`;

const TreeNameText = styled(StyledSubtitle)`
  font-size: ${(props: StyledSubtitleProps) => (props.isMobile ? '14px' : '')};
  line-height: ${(props: StyledSubtitleProps) =>
    props.isMobile ? '14px' : ''};
  margin-top: ${(props: StyledSubtitleProps) =>
    props.isMobile ? '-30px' : '-35px'};
  text-transform: none;
`;

const AddressText = styled(StyledSubtitle)`
  margin-top: ${(props: StyledSubtitleProps) =>
    props.isMobile ? '-20px' : '-10px'};
`;

const TreePageHeader: React.FC<TreePageHeaderProps> = ({
  pageTitle,
  pageSubtitle,
  treeName,
  canEditTreeName,
  editTreeNameForm,
  onClickEditTreeName,
  isMobile,
  subtitlecolor,
}) => {
  const [editingTreeName, setEditingTreeName] = useState<boolean>(false);

  const treeDisplayName = !isEmptyString(unescape(treeName))
    ? unescape(treeName)
    : canEditTreeName
    ? 'Name this tree!'
    : '';

  const onTreeNameChange = () => {
    setEditingTreeName(false);
    const treeName = editTreeNameForm.getFieldValue('name');
    onClickEditTreeName({ name: escape(treeName) });
  };

  return (
    <>
      <StyledTitle isMobile={isMobile}>{pageTitle}</StyledTitle>
      {editingTreeName ? (
        <EditTreeNameForm
          form={editTreeNameForm}
          isMobile={isMobile}
          onSubmit={onTreeNameChange}
          onCancel={() => setEditingTreeName(false)}
        />
      ) : (
        <TreeNameText subtitlecolor={subtitlecolor} isMobile={isMobile}>
          {treeDisplayName}
          {canEditTreeName && (
            <StyledEditOutline
              onClick={() => {
                setEditingTreeName(true);
              }}
            />
          )}
        </TreeNameText>
      )}
      <AddressText isMobile={isMobile} subtitlecolor={subtitlecolor}>
        {pageSubtitle}
      </AddressText>
    </>
  );
};

export default TreePageHeader;
