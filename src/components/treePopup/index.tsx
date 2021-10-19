import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { ParameterizedRouteBases, Routes } from '../../App';
import { GreenLinkButton } from '../themedComponents';
import {
  BLACK,
  DARK_GREY,
  LIGHT_GREY,
  MID_GREEN,
  WHITE,
} from '../../utils/colors';
import { isEmptyString } from '../../utils/isCheck';
import { CITY_PLANTING_REQUEST_LINK } from '../../assets/content';

const { Paragraph, Link } = Typography;

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

const PlantRequest = styled(Paragraph)`
  color: ${BLACK};
  font-size: 14px;
  line-height: 17px;
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
  returnTo?: Routes;
  mobile: boolean;
}

const TreePopup: React.FC<TreePopupProps> = ({
  popRef,
  treeInfo,
  returnTo,
  mobile,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const hidePopup = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (treeInfo.id !== NO_SITE_SELECTED) {
      setIsVisible(true);
    }
  }, [treeInfo]);

  const returnState = returnTo && { destination: returnTo };
  // if on mobile or no return destination specified, open in new tab
  // location state is only saved within the same tab, does not work when opening new tab
  const target = !mobile || (!returnState && '_blank');

  return (
    <PopupContainer ref={popRef}>
      {isVisible && (
        <PopupAnchor>
          <PopupBubble>
            <>
              <>
                <TreeTitle>
                  {/* If the site has a tree, then display its common name (if available). Otherwise, display 'Open Planting Site' */}
                  {treeInfo.id !== NO_TREE_PRESENT
                    ? isEmptyString(treeInfo.commonName)
                      ? 'Unknown Species'
                      : treeInfo.commonName
                    : 'Open Planting Site'}
                </TreeTitle>
                <CloseIcon onClick={hidePopup} />
              </>
              <Line />
              {!isEmptyString(treeInfo.address) && (
                <GreyText strong>Nearby Address</GreyText>
              )}
              <GreyText>{treeInfo.address}</GreyText>
              {(() => {
                switch (treeInfo.id) {
                  case NO_TREE_PRESENT:
                    return (
                      <PlantRequest>
                        Want to plant a tree here?{' '}
                        <Link href={CITY_PLANTING_REQUEST_LINK} target="_blank">
                          Submit a request to the city!
                        </Link>
                      </PlantRequest>
                    );
                  default:
                    return (
                      <GreenLinkButton
                        to={`${ParameterizedRouteBases.TREE}${treeInfo.id}`}
                        state={returnState}
                        target={target}
                      >
                        More Info
                      </GreenLinkButton>
                    );
                }
              })()}
            </>
          </PopupBubble>
        </PopupAnchor>
      )}
    </PopupContainer>
  );
};

export default TreePopup;
