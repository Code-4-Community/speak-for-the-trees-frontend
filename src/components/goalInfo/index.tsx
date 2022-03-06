import React from 'react';
import styled from 'styled-components';
import { Card, Typography } from 'antd';
import { DARK_GREEN, TEXT_GREY } from '../../utils/colors';

interface GoalInfoProps {
  readonly blockProgress: number;
  readonly blockGoal: number;
  readonly startDate: string;
  readonly targetDate: string;
}

const CardContainer = styled.div`
  height: 125px;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const RightMargin = styled.div`
  margin-right: 10px;
`;

const StyledCard = styled(Card)`
  min-width: 200px;
  max-width: 300px;
  height: 125px;
  display: inline-block;
  border-radius: 2px;
`;

const CardHeader = styled(Typography.Paragraph)`
  font-size: 14px;
  line-height: 1;
  color: ${TEXT_GREY};
`;

const LargeText = styled(Typography.Paragraph)`
  display: inline-block;
  font-size: 25px;
  color: ${DARK_GREEN};
`;

const SmallText = styled(Typography.Paragraph)`
  display: inline-block;
  font-size: 15px;
  color: ${DARK_GREEN};
`;

const GoalInfo: React.FC<GoalInfoProps> = ({
  blockProgress,
  blockGoal,
  startDate,
  targetDate,
}) => {
  return (
    <CardContainer>
      <RightMargin>
        <StyledCard>
          <CardHeader>Blocks Counted</CardHeader>
          <SmallText>
            <LargeText>{blockProgress}</LargeText>/{blockGoal}
          </SmallText>
        </StyledCard>
      </RightMargin>
      <RightMargin>
        <StyledCard>
          <CardHeader>Start Date</CardHeader>
          <LargeText>{startDate}</LargeText>
        </StyledCard>
      </RightMargin>
      <StyledCard>
        <CardHeader>Target Date</CardHeader>
        <LargeText>{targetDate}</LargeText>
      </StyledCard>
    </CardContainer>
  );
};

export default GoalInfo;
