import React from 'react';
import { Typography } from 'antd';
import InfoCard from '../info-card/InfoCard';
import './landing-tree-stats.less';

const { Title, Paragraph, Link } = Typography;

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
  return (
    <div className="tree-stats-container">
      <Title level={3}>Current Status of our Trees</Title>

      <div className="map-cards-container">
        <div className="map-card">
          <InfoCard header="Money Saved" body={getMoneyString(moneySaved)} />
        </div>

        <div className="map-card">
          <InfoCard
            header="Rain Water Caught"
            body={`${rainWater.toLocaleString()} gallons`}
          />
        </div>

        <div className="map-card">
          <InfoCard header="Carbon Emissions" body={`${carbonEmissions}%`} />
        </div>
      </div>

      <Paragraph type="secondary">
        Learn more about how we got these numbers <Link underline>here</Link>.
      </Paragraph>
    </div>
  );
};

// TODO: Move function to a common utilities file

/**
 * Converts the given dollar amount to a formatted string
 * @param amount the amount to convert
 */
export function getMoneyString(amount: number) {
  return `$${amount.toLocaleString('en-us', { maximumFractionDigits: 2 })}`;
}

export default LandingTreeStats;
