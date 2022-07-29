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
import { isAdmin } from '../../auth/ducks/selectors';
import { useSelector } from 'react-redux';
import { C4CState } from '../../store';
import { CITY_PLANTING_REQUEST_LINK } from '../../assets/links';

const PopupContainer = styled.div`
  position: absolute;
  /* override google maps styling, which uses Roboto */
  font-family: Montserrat;
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
  padding: 15px;
  border-radius: 2px;
  box-shadow: 0px 2px 10px 1px ${BLACK}50;
  overflow: hidden;
`;

const TreeTitle = styled(Typography.Paragraph)`
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
  position: absolute;
  width: 250px;
  height: 2px;
  margin: -15px 0 10px -15px;
  background: ${LIGHT_GREY};
`;

const GreyText = styled(Typography.Paragraph)`
  color: ${DARK_GREY};
  font-size: 13px;
  line-height: 13px;
`;

const PlantRequest = styled(Typography.Paragraph)`
  color: ${BLACK};
  font-size: 14px;
  line-height: 17px;
`;

export const NO_SITE_SELECTED = -1;

export interface BasicTreeInfo {
  id: number;
  commonName: string;
  address: string;
  treePresent: boolean;
}

interface TreePopupProps {
  popRef: React.RefObject<HTMLDivElement>;
  treeInfo: BasicTreeInfo;
  returnTo?: Routes;
}

const TreePopup: React.FC<TreePopupProps> = ({
  popRef,
  treeInfo,
  returnTo,
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
  const userIsAdmin: boolean = useSelector((state: C4CState) =>
    isAdmin(state.authenticationState.tokens),
  );
  return (
    <PopupContainer ref={popRef}>
      {isVisible && (
        <PopupAnchor>
          <PopupBubble>
            <>
              <>
                <TreeTitle>
                  {/* If the site has a tree, then display its common name (if available). Otherwise, display 'Open Planting Site' */}
                  {treeInfo.treePresent
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
                const editSiteButton = (
                  <GreenLinkButton
                    to={`${ParameterizedRouteBases.SITE}${treeInfo.id}`}
                    state={{ destination: Routes.MY_TREES }}
                    target="_blank"
                  >
                    Edit Site Page
                  </GreenLinkButton>
                );

                if (!treeInfo.treePresent) {
                  return (
                    <div>
                      <PlantRequest>
                        Want to plant a tree here?{' '}
                        <Typography.Link
                          href={CITY_PLANTING_REQUEST_LINK}
                          target="_blank"
                        >
                          Submit a request to the city!
                        </Typography.Link>
                      </PlantRequest>
                      {userIsAdmin && editSiteButton}
                    </div>
                  );
                }
                const StyledDiv = styled.span`
                  marginleft: 0.1rem;
                `;

                return (
                  <div>
                    <GreenLinkButton
                      to={`${ParameterizedRouteBases.TREE}${treeInfo.id}`}
                      state={returnState}
                      target="_blank"
                    >
                      More Info
                    </GreenLinkButton>
                    <StyledDiv> {editSiteButton} </StyledDiv>
                  </div>
                );
              })()}
            </>
          </PopupBubble>
        </PopupAnchor>
      )}
    </PopupContainer>
  );
};

export default TreePopup;
