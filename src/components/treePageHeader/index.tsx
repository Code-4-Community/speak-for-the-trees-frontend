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
import { DARK_TEXT_GREY } from '../../utils/colors';
import { useTranslation } from 'react-i18next';
import { site } from '../../constants';
import { n } from '../../utils/stringFormat';

interface TreePageHeaderProps extends StyledSubtitleProps {
  readonly pageTitle: string;
  readonly pageSubtitle: string;
  readonly treeName: string;
  readonly canEditTreeName: boolean;
  readonly editTreeNameForm: FormInstance<NameSiteEntryRequest>;
  readonly onClickEditTreeName: (values: NameSiteEntryRequest) => void;
  readonly treePresent: boolean;
}

const StyledEditOutline = styled(EditOutlined)`
  margin-top: 2px;
  margin-left: 5px;
`;

const TreeNameText = styled(StyledSubtitle)`
  font-size: ${(props: StyledSubtitleProps) =>
    props.isMobile ? '14' : '20'}px;
  line-height: ${(props: StyledSubtitleProps) =>
    props.isMobile ? '14' : '24'}px;
  margin-top: ${(props: StyledSubtitleProps) =>
    props.isMobile ? '-25' : '-45'}px;
  text-transform: none;
  color: ${DARK_TEXT_GREY};
`;

const AddressText = styled(StyledSubtitle)`
  margin-top: ${(props: StyledSubtitleProps) =>
    props.isMobile ? '0' : '-10px'};
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
  treePresent,
}) => {
  const { t } = useTranslation(n(site, ['treeInfo']), {
    nsMode: 'fallback',
  });

  const [editingTreeName, setEditingTreeName] = useState<boolean>(false);
  const treeDisplayName = !isEmptyString(unescape(treeName))
    ? unescape(treeName)
    : canEditTreeName
    ? t('name_prompt')
    : '';

  const onTreeNameChange = () => {
    setEditingTreeName(false);
    const newTreeName = editTreeNameForm.getFieldValue('name');
    onClickEditTreeName({ name: escape(newTreeName) });
  };

  return (
    <>
      <StyledTitle isMobile={isMobile}>{pageTitle}</StyledTitle>
      {treePresent &&
        (editingTreeName ? (
          <EditTreeNameForm
            editTreeNameForm={editTreeNameForm}
            isMobile={isMobile}
            treeName={treeName}
            onSubmitNameChange={onTreeNameChange}
            onCancelNameChange={() => setEditingTreeName(false)}
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
        ))}
      <AddressText isMobile={isMobile} subtitlecolor={subtitlecolor}>
        {pageSubtitle}
      </AddressText>
    </>
  );
};

export default TreePageHeader;
