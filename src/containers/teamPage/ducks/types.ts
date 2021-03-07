export interface TeamProps {
  id: number;
  name: string;
  bio: string;
  members: MemberProps[];
  goals: GoalProps[];
}

export interface MemberProps {
  user_id: number;
  username: string;
  team_role: TeamRole;
}

export interface GoalProps {
  id: number;
  goal: number;
  progress: number;
  start_date: Date;
  complete_by: Date;
  completion_date: Date | null;
}

export enum TeamRole {
  NONE = 'none',
  MEMBER = 'member',
  LEADER = 'leader',
  PENDING = 'pending',
}
