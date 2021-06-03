import React from 'react';
import { ParameterizedRouteBases } from '../../App';
import { Card, Typography } from 'antd';
import styled from 'styled-components';
import { CardInfo } from "../themedComponents";
import {
  MID_GREEN,
  TEXT_GREY,
  LIGHT_GREY,
  LIGHT_GREEN,
  WHITE,
} from '../../utils/colors';
import { SiteFeaturePropertiesResponse } from '../mapPageComponents/ducks/types';
import { LinkButton } from '../linkButton';

const { Paragraph } = Typography;

const StyledCard = styled(Card)`
  width: 95%;
  border: solid 1px ${LIGHT_GREY};
  radius: 2px;
`;

const CardContent = styled.div`
  align-items: center;
`;

const TreeTitle = styled(Paragraph)`
  font-size: 20px;
  line-height: 16px;
  color: ${MID_GREEN};
`;

const TreeBody = styled(Paragraph)`
  font-size: 18px;
  line-height: 14px;
  color: ${TEXT_GREY};
`;

const GreenLinkButton = styled(LinkButton)`
  background-color: ${LIGHT_GREEN};
  border-color: ${LIGHT_GREEN};
  color: ${WHITE};
`;

interface TreeCardProps {
  readonly site: SiteFeaturePropertiesResponse;
}

const TreeCard: React.FC<TreeCardProps> = ({ site }) => {
  return (
    <>
      <StyledCard>
        <CardContent>
          <CardInfo>
            {site.address && <TreeTitle>Address: {site.address}</TreeTitle>}
            {site.species && <TreeBody>Species: {site.species}</TreeBody>}
            {site.id && <TreeBody>ID: {site.id}</TreeBody>}
          </CardInfo>
          <GreenLinkButton to={`${ParameterizedRouteBases.TREE}${site.id}`}>
            More Info
          </GreenLinkButton>
        </CardContent>
      </StyledCard>
    </>
  );
};

export default TreeCard;
