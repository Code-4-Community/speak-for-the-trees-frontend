import React from 'react';
import { Typography } from 'antd';
import MapCard from '../general-components/MapCard';
import './landing-tree-stats.less';

const { Title, Paragraph, Link } = Typography;

type LandingTreeStatsProps = {
  moneySaved: number;
  rainWater: number;
  carbonEmissions: number;
};

const LandingTreeStats: React.FC<LandingTreeStatsProps> = (props) => {
  return (
    <div className="tree-stats-container">
      <Title level={3}>Current Status of our Trees</Title>

      <div className="map-cards-container">
        <div className="map-card">
          <MapCard
            cardHeader="Money Saved"
            cardBody={getMoneyString(props.moneySaved)}
          />
        </div>

        <div className="map-card">
          <MapCard
            cardHeader="Rain Water Caught"
            cardBody={`${props.rainWater.toLocaleString()} gallons`}
          />
        </div>

        <div className="map-card">
          <MapCard
            cardHeader="Carbon Emissions"
            cardBody={`${props.carbonEmissions}%`}
          />
        </div>
      </div>

      <Paragraph>
        Learn more about how we got these numbers <Link underline>here</Link>.
      </Paragraph>
    </div>
  );
};

/**
 * Converts the given dollar amount to a formatted string
 * @param amount the amount to convert
 */
function getMoneyString(amount: number) {
  return `$${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

export default LandingTreeStats;
