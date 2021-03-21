export interface TeamProps {
  id: number;
  name: string;
  bio: string;
  members: MemberProps[];
  goals: GoalProps[];
}

export interface MemberProps {
  userId: number;
  username: string;
  teamRole: TeamRole;
}

export interface GoalProps {
  id: number;
  goal: number;
  progress: number;
  startDate: Date;
  completeBy: Date;
  completionDate: Date | null;
}

export enum TeamRole {
  NONE = 'none',
  MEMBER = 'member',
  LEADER = 'leader',
  PENDING = 'pending',
}

export interface UserInvite {
  name: string;
  email: string;
}

export interface Applicant {
  userId: number;
  username: string;
}