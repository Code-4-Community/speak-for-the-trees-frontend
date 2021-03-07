import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import useWindowDimensions, { WindowTypes } from '../window-dimensions';
import { TEXT_GREY, MID_GREEN } from '../../utils/colors';
import MobileInfoCard from '../mobileComponents/mobileInfoCard';
import InfoCard from '../infoCard';
import { getMoneyString } from '../../utils/stringFormat';

const TreeStatsContainer = styled.div`
  margin-top: 35px;
`;

const MapCardsContainer = styled.div`
  margin: 30px auto;
`;

const MapCard = styled.div`
  margin: 10px auto;
`;

const MobileTitle = styled(Typography.Paragraph)`
  color: ${MID_GREEN};
  font-size: 14px;
`;

const MobileMapCardsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;

const RightMargin = styled.div`
  margin-right: 10px;
`;

const GreyParagraph = styled(Typography.Paragraph)`
  color: ${TEXT_GREY};
`;

type LandingTreeStatsProps = {
  readonly moneySaved: number;
  readonly rainWater: number;
  readonly carbonEmissions: number;
};

const LandingTreeStats: React.FC<LandingTreeStatsProps> = ({
  moneySaved,
  rainWater,
  carbonEmissions,
}) => {
  const { windowType } = useWindowDimensions();

  switch (windowType) {
    case WindowTypes.Mobile:
      return (
        <TreeStatsContainer>
          <MobileTitle>Current Status of our Trees</MobileTitle>
          <MobileMapCardsContainer>
            <RightMargin>
              <MobileInfoCard
                header="Money Saved"
                body={getMoneyString(moneySaved)}
              />
            </RightMargin>

            <RightMargin>
              <MobileInfoCard
                header="Rain Water Caught"
                body={`${rainWater.toLocaleString()} gallons`}
              />
            </RightMargin>

            <MobileInfoCard
              header="Carbon Emissions"
              body={`${carbonEmissions}%`}
            />
          </MobileMapCardsContainer>

          <GreyParagraph>
            Learn more about how we got these numbers{' '}
            <Typography.Link underline>here</Typography.Link>.
          </GreyParagraph>
        </TreeStatsContainer>
      );

    case WindowTypes.Tablet:
    case WindowTypes.NarrowDesktop:
    case WindowTypes.Desktop:
      return (
        <TreeStatsContainer>
          <Typography.Title level={3}>
            Current Status of our Trees
          </Typography.Title>

          <MapCardsContainer>
            <MapCard>
              <InfoCard
                header="Money Saved"
                body={getMoneyString(moneySaved)}
              />
            </MapCard>

            <MapCard>
              <InfoCard
                header="Rain Water Caught"
                body={`${rainWater.toLocaleString()} gallons`}
              />
            </MapCard>

            <MapCard>
              <InfoCard
                header="Carbon Emissions"
                body={`${carbonEmissions}%`}
              />
            </MapCard>
          </MapCardsContainer>

          <Typography.Paragraph>
            Learn more about how we got these numbers{' '}
            <Typography.Link underline>here</Typography.Link>.
          </Typography.Paragraph>
        </TreeStatsContainer>
      );

    default:
      return (
        <Typography.Paragraph>
          This browser type is not supported.
        </Typography.Paragraph>
      );
  }
};

export default LandingTreeStats;
