import React from 'react';
import { ParameterizedRouteBases, Routes } from '../../App';
import { Card, Typography } from 'antd';
import styled from 'styled-components';
import { CardInfo, GreenLinkButton } from '../themedComponents';
import { MID_GREEN, TEXT_GREY, LIGHT_GREY } from '../../utils/colors';
import { SiteFeaturePropertiesResponse } from '../mapPageComponents/ducks/types';

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
            {site.commonName && <TreeBody>Species: {site.commonName}</TreeBody>}
            {site.id && <TreeBody>ID: {site.id}</TreeBody>}
          </CardInfo>
          <GreenLinkButton
            to={`${ParameterizedRouteBases.TREE}${site.id}`}
            state={{
              destination: Routes.MY_TREES,
            }}
          >
            More Info
          </GreenLinkButton>
        </CardContent>
      </StyledCard>
    </>
  );
};

export default TreeCard;
