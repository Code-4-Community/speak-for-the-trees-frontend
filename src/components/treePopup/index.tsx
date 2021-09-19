import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { LinkButton } from '../linkButton';
import { ParameterizedRouteBases } from '../../App';
import {
  BLACK,
  DARK_GREY,
  LIGHT_GREEN,
  LIGHT_GREY,
  MID_GREEN,
  WHITE,
} from '../../utils/colors';
import { isEmptyString } from '../../utils/isCheck';

const { Paragraph } = Typography;

const PopupContainer = styled.div`
  position: absolute;
`;

const PopupAnchor = styled.div`
  /* position tip */
  position: absolute;
  width: 100%;
  bottom: 17px;
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
  min-width: 250px;
  min-height: 150px;
  padding: 7px 15px;
  border-radius: 2px;
  box-shadow: 0px 2px 10px 1px ${BLACK}50;
`;

const TreeTitle = styled(Paragraph)`
  display: inline-block;
  font-size: 20px;
  line-height: 28px;
  color: ${MID_GREEN};
  text-transform: capitalize;
`;

const CloseIcon = styled(CloseOutlined)`
  display: inline-block;
  float: right;
  font-size: 15px;
  line-height: 28px;
  color: ${DARK_GREY};
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

const PlantRequest = styled(Paragraph)`
  color: ${DARK_GREY};
  font-size: 13px;
  line-height: 13px;
`;

export const NO_SITE_SELECTED = -1;
export const NO_TREE_PRESENT = -2;

export interface BasicTreeInfo {
  id: number;
  commonName: string;
  address: string;
}

interface TreePopupProps {
  popRef: React.RefObject<HTMLDivElement>;
  treeInfo: BasicTreeInfo;
}

const TreePopup: React.FC<TreePopupProps> = ({ popRef, treeInfo }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const hidePopup = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (treeInfo.id !== NO_SITE_SELECTED) {
      setIsVisible(true);
    }
  }, [treeInfo]);

  return (
    <PopupContainer ref={popRef}>
      {isVisible && (
        <PopupAnchor>
          <PopupBubble>
            {treeInfo.id !== NO_TREE_PRESENT ? (
              <>
                <>
                  <TreeTitle>
                    {isEmptyString(treeInfo.commonName)
                      ? 'Unknown Species'
                      : treeInfo.commonName}
                  </TreeTitle>
                  <CloseIcon onClick={hidePopup} />
                </>
                <Line />
                {!isEmptyString(treeInfo.address) && (
                  <GreyText strong>Nearby Address</GreyText>
                )}
                <GreyText>{treeInfo.address}</GreyText>
                <GreenLinkButton
                  to={`${ParameterizedRouteBases.TREE}${treeInfo.id}`}
                >
                  More Info
                </GreenLinkButton>
              </>
            ) : (
              <>
                <>
                  <TreeTitle>Open Planting Site</TreeTitle>
                  <CloseIcon onClick={hidePopup} />
                </>
                <Line />
                {!isEmptyString(treeInfo.address) && (
                  <GreyText strong>Nearby Address</GreyText>
                )}
                <GreyText>{treeInfo.address}</GreyText>
              </>
            )}
          </PopupBubble>
        </PopupAnchor>
      )}
    </PopupContainer>
  );
};

export default TreePopup;
