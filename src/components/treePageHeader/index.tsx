import React, { useState } from 'react';
import { FormInstance } from 'antd';
import { NameSiteEntryRequest } from '../forms/ducks/types';
import EditTreeNameForm from '../forms/editTreeNameForm';
import {
  StyledTitle,
  StyledSubtitle,
  StyledSubtitleProps,
} from '../themedComponents';
import styled from 'styled-components';
import { EditOutlined } from '@ant-design/icons';

interface TreePageHeaderProps extends StyledSubtitleProps {
  readonly pageTitle: string;
  readonly pageSubtitle: string;
  readonly treeName: string;
  readonly userOwnsTree: boolean;
  readonly editTreeNameForm: FormInstance<NameSiteEntryRequest>;
  readonly onClickEditTreeName: (values: NameSiteEntryRequest) => void;
}

const StyledEditOutline = styled(EditOutlined)`
  margin-top: 2px;
  margin-left: 5px;
`;

const StyledSubtitleText = styled(StyledSubtitle)`
  font-size: ${(props: StyledSubtitleProps) => (props.isMobile ? '14px' : '')};
  line-height: ${(props: StyledSubtitleProps) =>
    props.isMobile ? '14px' : ''};
  margin-top: ${(props: StyledSubtitleProps) =>
    props.isMobile ? '-30px' : '-35px'};
`;

const TreePageHeader: React.FC<TreePageHeaderProps> = ({
  pageTitle,
  pageSubtitle,
  treeName,
  userOwnsTree,
  editTreeNameForm,
  onClickEditTreeName,
  isMobile,
  subtitlecolor,
}) => {
  const [editingTreeName, setEditingTreeName] = useState<boolean>(false);
  const [displayedTreeName, setDisplayedTreeName] = useState<string>(treeName);

  //   useEffect(() => {
  //     editTreeNameForm.setFieldsValue({
  //       name: displayedTreeName,
  //     });
  //   }, [displayedTreeName]);

  const handleTreeNameChange = () => {
    setEditingTreeName(false);
    const newTreeName = editTreeNameForm.getFieldValue('name');
    setDisplayedTreeName(newTreeName);
    const nameSiteEntryRequest: NameSiteEntryRequest = {
      name: newTreeName,
    };
    onClickEditTreeName(nameSiteEntryRequest);
  };

  return (
    <>
      <StyledTitle isMobile={isMobile}>{pageTitle}</StyledTitle>
      {editingTreeName ? (
        <EditTreeNameForm
          form={editTreeNameForm}
          isMobile={isMobile}
          onSubmit={handleTreeNameChange}
          onCancel={() => setEditingTreeName(false)}
        />
      ) : (
        <StyledSubtitleText subtitlecolor={subtitlecolor} isMobile={isMobile}>
          {displayedTreeName}
          {userOwnsTree && (
            <StyledEditOutline
              onClick={() => {
                setEditingTreeName(true);
              }}
            />
          )}
        </StyledSubtitleText>
      )}
      <StyledSubtitle isMobile={isMobile} subtitlecolor={subtitlecolor}>
        {pageSubtitle}
      </StyledSubtitle>
    </>
  );
};

export default TreePageHeader;
