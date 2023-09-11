import React from 'react';
import styled from 'styled-components';
import List from 'antd/es/list';
import Typography from 'antd/es/typography';
import CrownOutlined from '@ant-design/icons/CrownOutlined';
import { BLACK, LIGHT_GREEN } from '../../utils/colors';
import { TeamRole } from '../../containers/teamPage/ducks/types';

const StyledListItem = styled(List.Item)`
  margin-bottom: 10px;
  width: 85%;
  height: 40px;
  background: ${LIGHT_GREEN}90;
  border: solid 1px ${LIGHT_GREEN}90;
  border-radius: 2px;
  padding: 3px 20px;
`;

const MemberName = styled(Typography.Paragraph)`
  display: inline-block;
  font-size: 15px;
  line-height: 32px;
  color: ${BLACK};
`;

const StyledCrown = styled(CrownOutlined)`
  display: inline-block;
  margin-right: 5px;
  font-size: 20px;
  color: ${BLACK};
`;

interface TeamMemberProps {
  readonly id: number;
  readonly teamRole: TeamRole;
  readonly username: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ id, teamRole, username }) => {
  return (
    <StyledListItem key={id} style={{ borderBottom: '0px' }}>
      {teamRole === TeamRole.LEADER && <StyledCrown />}
      <MemberName>{username}</MemberName>
    </StyledListItem>
  );
};

export default TeamMember;
