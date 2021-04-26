import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { LinkButton } from '../linkButton';
import { Routes } from '../../App';
import {
  BLACK,
  DARK_GREY,
  LIGHT_GREEN,
  LIGHT_GREY,
  MID_GREEN,
  WHITE,
} from '../../utils/colors';

const { Paragraph } = Typography;

const PopupContainer = styled.div`
  position: absolute;
`;

const PopupAnchor = styled.div`
  /* position tip */
  position: absolute;
  width: 100%;
  bottom: 8px;
  left: 0;

  /* draw tip */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, 0);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid ${WHITE};
  }
`;

const PopupBubble = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -100%);
  background-color: ${WHITE};
  width: 250px;
  height: 150px;
  padding: 7px 15px;
  border-radius: 2px;
  box-shadow: 0px 2px 10px 1px ${BLACK}50;
`;

const TreeTitle = styled(Paragraph)`
  font-size: 20px;
  line-height: 28px;
  color: ${MID_GREEN};
`;

const Line = styled.div`
  width: 250px;
  height: 2px;
  margin: -15px 0 10px -15px;
  background: ${LIGHT_GREY};
`;

const GreyText = styled(Paragraph)`
  color: ${DARK_GREY};
  font-size: 13px;
  line-height: 13px;
`;

const GreenLinkButton = styled(LinkButton)`
  background-color: ${LIGHT_GREEN};
  border-color: ${LIGHT_GREEN};
  color: ${WHITE};
`;

export interface BasicTreeInfo {
  id: number;
  commonName: string;
  address: string;
}

interface TreePopupProps {
  popRef: React.RefObject<HTMLDivElement>;
  treeInfo: BasicTreeInfo;
}

export const TreePopup: React.FC<TreePopupProps> = ({ popRef, treeInfo }) => {
  return (
    <PopupContainer ref={popRef}>
      <PopupAnchor>
        <PopupBubble>
          <TreeTitle>{treeInfo.commonName}</TreeTitle>
          <Line />
          <GreyText strong>Nearby Address</GreyText>
          <GreyText>{treeInfo.address}</GreyText>
          {/* TODO change to tree page route */}
          <GreenLinkButton to={`${Routes.NOT_FOUND}/${treeInfo.id}`}>
            More Info
          </GreenLinkButton>
        </PopupBubble>
      </PopupAnchor>
    </PopupContainer>
  );
};

export default TreePopup;
