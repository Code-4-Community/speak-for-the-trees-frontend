import React from 'react';
import { Card, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { CardInfo } from "../themedComponents";
import { MID_GREEN, TEXT_GREY, LIGHT_GREY } from '../../utils/colors';

const { Paragraph } = Typography;

const StyledCard = styled(Card)`
  width: 95%;
  max-height: 112px;
  border: solid 1px ${LIGHT_GREY};
  radius: 2px;
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
`;

const BlockTitle = styled(Paragraph)`
  font-size: 24px;
  line-height: 32px;
  color: ${MID_GREEN};
`;

const CancelIcon = styled(CloseCircleOutlined)`
  display: inline-block;
  font-size: 20px;
  color: ${TEXT_GREY};
`;

interface BlockCardProps {
  readonly id: number;
  readonly reserved: boolean;
}

const BlockCard: React.FC<BlockCardProps> = ({ id, reserved }) => {
  return (
    <>
      <StyledCard>
        <CardContent>
          <CardInfo>
            <BlockTitle>Block {id}</BlockTitle>
          </CardInfo>
          {reserved && <CancelIcon />}
        </CardContent>
      </StyledCard>
    </>
  );
};

export default BlockCard;
