import React from 'react';
import styled from 'styled-components';
import { Card, Statistic, Typography } from 'antd';

const FeaturedStatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  row-gap: 20px;
`;

const FeaturedStatCard = styled(Card)`
  width: 350px;
  min-height: 150px;
`;

const FeaturedStatTitle = styled(Typography.Paragraph)`
  font-size: 20px;
`;

interface FeaturedStat {
  readonly title: string;
  readonly stat?: number;
}

interface FeaturedStatsProps {
  readonly featuredStats: FeaturedStat[];
}

const FeaturedStats: React.FC<FeaturedStatsProps> = ({ featuredStats }) => {
  return (
    <FeaturedStatsContainer>
      {featuredStats.map((featuredStat: FeaturedStat, idx) => {
        return (
          <FeaturedStatCard key={idx}>
            <FeaturedStatTitle>{featuredStat.title}</FeaturedStatTitle>
            <Statistic
              value={featuredStat.stat}
              loading={featuredStat.stat === undefined}
            />
          </FeaturedStatCard>
        );
      })}
    </FeaturedStatsContainer>
  );
};

export default FeaturedStats;
