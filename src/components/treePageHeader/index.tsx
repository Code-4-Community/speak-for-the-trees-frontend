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
import { getSiteData } from '../../containers/treePage/ducks/thunks';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TreeParams } from '../../containers/treePage';
import { DARK_TEXT_GREY } from '../../utils/colors';

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
    props.isMobile ? '0px' : '-10px'};
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
  const siteId = Number(useParams<TreeParams>().id);
  const dispatch = useDispatch();

  const treeDisplayName = !isEmptyString(unescape(treeName))
    ? unescape(treeName)
    : canEditTreeName
    ? 'Name this tree!'
    : '';

  const onTreeNameChange = () => {
    setEditingTreeName(false);
    const newTreeName = editTreeNameForm.getFieldValue('name');
    onClickEditTreeName({ name: escape(newTreeName) });
    dispatch(getSiteData(siteId));
  };

  return (
    <>
      <StyledTitle isMobile={isMobile}>{pageTitle}</StyledTitle>
      {editingTreeName ? (
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
      )}
      <AddressText isMobile={isMobile} subtitlecolor={subtitlecolor}>
        {pageSubtitle}
      </AddressText>
    </>
  );
};

export default TreePageHeader;
