import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import useWindowDimensions, { WindowTypes } from '../window-dimensions';
import InfoCard from '../info-card/InfoCard';
import MobileInfoCard from '../mobile-info-card/MobileInfoCard';
import { TEXT_GREY, MID_GREEN } from '../../colors';

const { Title, Paragraph, Link } = Typography;

const TreeStatsContainer = styled.div`
  margin-top: 35px;
`;

const MapCardsContainer = styled.div`
  margin: 30px auto;
`;

const MapCard = styled.div`
  margin: 10px auto;
`;

const MobileTitle = styled(Paragraph)`
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

const GreyParagraph = styled(Paragraph)`
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
            <Link underline>here</Link>.
          </GreyParagraph>
        </TreeStatsContainer>
      );

    default:
      return (
        <TreeStatsContainer>
          <Title level={3}>Current Status of our Trees</Title>

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

          <Paragraph>
            Learn more about how we got these numbers{' '}
            <Link underline>here</Link>.
          </Paragraph>
        </TreeStatsContainer>
      );
  }
};

// TODO: Move function to a common utilities file

/**
 * Converts the given dollar amount to a formatted string
 * @param amount the amount to convert
 */
export function getMoneyString(amount: number): string {
  return `$${amount.toLocaleString('en-us', { maximumFractionDigits: 2 })}`;
}

export default LandingTreeStats;
