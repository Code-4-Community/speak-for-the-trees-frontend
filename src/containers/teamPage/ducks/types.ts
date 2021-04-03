import { AsyncRequest } from '../../../utils/asyncRequest';
import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { TeamResponseAction } from './actions';
import { ProtectedApiExtraArgs } from '../../../api/protectedApiClient';

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
  completionDate?: Date;
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

export interface CreateTeamRequest {
  name: string;
  bio: string;
  inviteEmails: string[];
}

// JSON response types

export interface TeamResponse {
  id: number;
  name: string;
  bio: string;
  members: MemberProps[];
  goals: GoalResponseJSON[];
  finished: boolean;
  createdAt: string;
  deletedAt?: string;
}

export interface GoalResponseJSON {
  goalId: number;
  goal: number;
  progress: number;
  startDate: number;
  completeBy: number;
  completionDate?: number;
}

// Redux Types

export interface TeamReducerState {
  readonly team: AsyncRequest<TeamResponse, any>;
}

export type TeamThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ProtectedApiExtraArgs,
  TeamResponseAction
>;
