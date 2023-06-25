import ProtectedApiClient, {
  AdminApiClientRoutes,
  ParameterizedAdminApiRoutes,
  ParameterizedApiRoutes,
  ProtectedApiClientRoutes,
} from '../protectedApiClient';
import { TeamResponse, TeamRole } from '../../containers/teamPage/ducks/types';
import nock from 'nock';
import { PrivilegeLevel, UserData } from '../../auth/ducks/types';
import { SiteOwner } from '../../components/mapComponents/constants';

const BASE_URL = 'http://localhost';

describe('Protected API Client Tests', () => {
  describe('Reservation Tests', () => {
    describe('makeReservation', () => {
      it('makes the right request with team', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.MAKE_RESERVATION)
          .reply(200, response);

        const result = await ProtectedApiClient.makeReservation(1, 1);

        expect(result).toEqual(response);
      });

      it('makes the right request without team', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.MAKE_RESERVATION)
          .reply(200, response);

        const result = await ProtectedApiClient.makeReservation(1);

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'No such block';

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.MAKE_RESERVATION)
          .reply(400, response);

        const result = await ProtectedApiClient.makeReservation(-1).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });
    });

    describe('completeReservation', () => {
      it('makes the right request with team', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.COMPLETE_RESERVATION)
          .reply(200, response);

        const result = await ProtectedApiClient.completeReservation(2, 2);

        expect(result).toEqual(response);
      });

      it('makes the right request without team', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.COMPLETE_RESERVATION)
          .reply(200, response);

        const result = await ProtectedApiClient.completeReservation(2);

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'No such block';

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.COMPLETE_RESERVATION)
          .reply(400, response);

        const result = await ProtectedApiClient.completeReservation(-1).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });
    });

    describe('releaseReservation', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.RELEASE_RESERVATION)
          .reply(200, response);

        const result = await ProtectedApiClient.releaseReservation(2);

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'No such block';

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.RELEASE_RESERVATION)
          .reply(400, response);

        const result = await ProtectedApiClient.releaseReservation(2).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });
    });
  });

  describe('Admin Reservation Tests', () => {
    describe('uncompleteReservation', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(AdminApiClientRoutes.UNCOMPLETE_RESERVATION)
          .reply(200, response);

        const result = await ProtectedApiClient.uncompleteReservation(5);

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'No such block';

        nock(BASE_URL)
          .post(AdminApiClientRoutes.UNCOMPLETE_RESERVATION)
          .reply(400, response);

        const result = await ProtectedApiClient.uncompleteReservation(5).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });

      it('makes an unauthorized request', async () => {
        const response = 'Not an admin';

        nock(BASE_URL)
          .post(AdminApiClientRoutes.UNCOMPLETE_RESERVATION)
          .reply(401, response);

        const result = await ProtectedApiClient.uncompleteReservation(5).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });
    });

    describe('markReservationForQa', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(AdminApiClientRoutes.MARK_RESERVATION_FOR_QA)
          .reply(200, response);

        const result = await ProtectedApiClient.markReservationForQa(6);

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'No such block';

        nock(BASE_URL)
          .post(AdminApiClientRoutes.MARK_RESERVATION_FOR_QA)
          .reply(400, response);

        const result = await ProtectedApiClient.markReservationForQa(5).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'Not an admin';

        nock(BASE_URL)
          .post(AdminApiClientRoutes.MARK_RESERVATION_FOR_QA)
          .reply(401, response);

        const result = await ProtectedApiClient.markReservationForQa(5).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });
    });

    describe('passReservationQa', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(AdminApiClientRoutes.PASS_RESERVATION_QA)
          .reply(200, response);

        const result = await ProtectedApiClient.passReservationQa(6);

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'No such block';

        nock(BASE_URL)
          .post(AdminApiClientRoutes.PASS_RESERVATION_QA)
          .reply(400, response);

        const result = await ProtectedApiClient.passReservationQa(5).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'Not an admin';

        nock(BASE_URL)
          .post(AdminApiClientRoutes.PASS_RESERVATION_QA)
          .reply(401, response);

        const result = await ProtectedApiClient.passReservationQa(5).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });
    });

    describe('failReservationQa', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(AdminApiClientRoutes.FAIL_RESERVATION_QA)
          .reply(200, response);

        const result = await ProtectedApiClient.failReservationQa(7);

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'No such block';

        nock(BASE_URL)
          .post(AdminApiClientRoutes.FAIL_RESERVATION_QA)
          .reply(400, response);

        const result = await ProtectedApiClient.failReservationQa(5).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });

      it('makes an unauthorized request', async () => {
        const response = 'Not an admin';

        nock(BASE_URL)
          .post(AdminApiClientRoutes.FAIL_RESERVATION_QA)
          .reply(401, response);

        const result = await ProtectedApiClient.failReservationQa(5).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });
    });
  });

  describe('Users Tests', () => {
    describe('changePassword', () => {
      it('makes the right request', async () => {
        const response = new Promise((res) => res);

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.CHANGE_PASSWORD)
          .reply(200, response);

        const result = ProtectedApiClient.changePassword({
          currentPassword: 'password',
          newPassword: 'password2',
        });

        expect(result).toEqual(response);
      });

      it('makes an unauthorized request, wrong password', async () => {
        const response = 'Given password is not correct';

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.CHANGE_PASSWORD)
          .reply(401, response);

        const result = await ProtectedApiClient.changePassword({
          currentPassword: 'password',
          newPassword: 'password2',
        }).catch((err) => err.response.data);

        expect(result).toEqual(response);
      });
    });

    describe('changeUsername', () => {
      it('makes the right request', async () => {
        const response = new Promise((res) => res);

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.CHANGE_USERNAME)
          .reply(200, response);

        const result = ProtectedApiClient.changeUsername({
          newUsername: 'willthomas',
          password: 'password',
        });

        expect(result).toEqual(response);
      });

      it('makes an unauthorized request, wrong password', async () => {
        const response = 'Given password is not correct';

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.CHANGE_USERNAME)
          .reply(401, response);

        const result = await ProtectedApiClient.changeUsername({
          newUsername: 'willthomas',
          password: 'password',
        }).catch((err) => err.response.data);

        expect(result).toEqual(response);
      });

      it('makes a conflicting request, username in use', async () => {
        const response =
          'Error creating new user, given username willthomas already used';

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.CHANGE_USERNAME)
          .reply(409, response);

        const result = await ProtectedApiClient.changeUsername({
          newUsername: 'willthomas',
          password: 'password',
        }).catch((err) => err.response.data);

        expect(result).toEqual(response);
      });
    });

    describe('changeEmail', () => {
      it('makes the right request', async () => {
        const response = new Promise((res) => res);

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.CHANGE_EMAIL)
          .reply(200, response);

        const result = ProtectedApiClient.changeEmail({
          newEmail: 'willthomas@c4c.com',
          password: 'password',
        });

        expect(result).toEqual(response);
      });

      it('makes an unauthorized request, wrong password', async () => {
        const response = 'Given password is not correct';

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.CHANGE_EMAIL)
          .reply(401, response);

        const result = await ProtectedApiClient.changeEmail({
          newEmail: 'willthomas@c4c.com',
          password: 'password',
        }).catch((err) => err.response.data);

        expect(result).toEqual(response);
      });

      it('makes a conflicting request, username in use', async () => {
        const response =
          'Error creating new user, given username willthomas@c4c.com already used';

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.CHANGE_EMAIL)
          .reply(409, response);

        const result = await ProtectedApiClient.changeEmail({
          newEmail: 'willthomas@c4c.com',
          password: 'password',
        }).catch((err) => err.response.data);

        expect(result).toEqual(response);
      });
    });

    describe('deleteUser', () => {
      it('makes the right request', async () => {
        const response = new Promise((res) => res);

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.DELETE_USER)
          .reply(200, response);

        const result = ProtectedApiClient.deleteUser({
          password: 'password',
        });

        expect(result).toEqual(response);
      });

      it('makes an unauthorized request, wrong password', async () => {
        const response = 'Given password is not correct';

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.DELETE_USER)
          .reply(401, response);

        const result = await ProtectedApiClient.deleteUser({
          password: 'password',
        }).catch((err) => err.response.data);

        expect(result).toEqual(response);
      });
    });

    describe('getUserData', () => {
      it('makes the right request', async () => {
        const response: UserData = {
          firstName: '',
          lastName: '',
          email: '',
          username: '',
        };

        nock(BASE_URL)
          .get(ProtectedApiClientRoutes.GET_USER_DATA)
          .reply(200, response);

        const result = await ProtectedApiClient.getUserData();

        expect(result).toEqual(response);
      });
    });
  });

  describe('Teams Tests', () => {
    describe('createTeam', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.CREATE_TEAM)
          .reply(200, response);

        const result = await ProtectedApiClient.createTeam({
          name: 'team 1',
          bio: 'this is team 1',
          inviteEmails: ['will.thomas@c4cneu.com'],
        });

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'Name taken';

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.CREATE_TEAM)
          .reply(400, response);

        const result = await ProtectedApiClient.createTeam({
          name: 'team 1',
          bio: 'this is team 1',
          inviteEmails: ['will.thomas@c4cneu.com'],
        }).catch((err) => err.response.data);

        expect(result).toEqual(response);
      });
    });

    describe('getTeams', () => {
      it('makes the right request', async () => {
        const response: TeamResponse[] = [
          {
            id: 1,
            name: 'team 1',
            bio: 'this is team 1',
            members: [
              {
                userId: 1,
                username: 'will.thomas',
                teamRole: TeamRole.MEMBER,
              },
            ],
            goals: [
              {
                goalId: 1,
                goal: 2,
                progress: 3,
                startDate: 1615420800000,
                completeBy: 1617148800000,
                completionDate: 1617148800000,
              },
            ],
            finished: false,
            createdAt: '2/19/2021',
          },
          {
            id: 2,
            name: 'team 2',
            bio: 'this is team 2',
            members: [
              {
                userId: 1,
                username: 'jack.blanc',
                teamRole: TeamRole.PENDING,
              },
            ],
            goals: [
              {
                goalId: 2,
                goal: 10,
                progress: 3,
                startDate: 1615420800000,
                completeBy: 1617148800000,
                completionDate: 1617148800000,
              },
            ],
            finished: true,
            createdAt: '2/18/2021',
            deletedAt: '2/22/2021',
          },
        ];

        nock(BASE_URL)
          .get(ProtectedApiClientRoutes.GET_TEAMS)
          .reply(200, response);

        const result = await ProtectedApiClient.getTeams();

        expect(result).toEqual(response);
      });
    });

    describe('getTeam', () => {
      it('makes the right request', async () => {
        const response: TeamResponse = {
          id: 1,
          name: 'team 1',
          bio: 'this is team 1',
          members: [
            {
              userId: 1,
              username: 'will.thomas',
              teamRole: TeamRole.MEMBER,
            },
          ],
          goals: [
            {
              goalId: 1,
              goal: 2,
              progress: 3,
              startDate: 1615420800000,
              completeBy: 1617148800000,
              completionDate: 1617148800000,
            },
          ],
          finished: false,
          createdAt: '2/19/2021',
        };

        nock(BASE_URL)
          .get(ParameterizedApiRoutes.GET_TEAM(1))
          .reply(200, response);

        const result = await ProtectedApiClient.getTeam(1);

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'No such team';

        nock(BASE_URL)
          .get(ParameterizedApiRoutes.GET_TEAM(5))
          .reply(400, response);

        const result = await ProtectedApiClient.getTeam(5).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });
    });

    describe('addGoal', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.ADD_GOAL(1))
          .reply(200, response);

        const result = await ProtectedApiClient.addGoal(1, {
          goal: 1,
          startAt: '2/20/2021',
          completeBy: '2/22/2021',
        });

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'Bad request';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.ADD_GOAL(-1))
          .reply(400, response);

        const result = await ProtectedApiClient.addGoal(-1, {
          goal: -1,
          startAt: '2/20/2021',
          completeBy: '2/22/2021',
        }).catch((err) => err.response.data);

        expect(result).toEqual(response);
      });

      it('makes an unauthorized request', async () => {
        const response = 'Must be team leader';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.ADD_GOAL(-1))
          .reply(401, response);

        const result = await ProtectedApiClient.addGoal(-1, {
          goal: -1,
          startAt: '2/20/2021',
          completeBy: '2/22/2021',
        }).catch((err) => err.response.data);

        expect(result).toEqual(response);
      });
    });

    describe('deleteGoal', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.DELETE_GOAL(1, 2))
          .reply(200, response);

        const result = await ProtectedApiClient.deleteGoal(1, 2);

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'No such goal';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.DELETE_GOAL(1, 2))
          .reply(400, response);

        const result = await ProtectedApiClient.deleteGoal(1, 2).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });

      it('makes an unauthorized request', async () => {
        const response = 'Must be team leader';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.DELETE_GOAL(1, 2))
          .reply(401, response);

        const result = await ProtectedApiClient.deleteGoal(1, 2).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });
    });

    describe('inviteUser', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.INVITE_USER(1))
          .reply(200, response);

        const result = await ProtectedApiClient.inviteUser(1, {
          invites: [
            {
              name: 'person1',
              email: 'person.1@c4cneu.com',
            },
            {
              name: 'person 2',
              email: 'person.1@c4cneu.com',
            },
          ],
        });

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'No such team';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.INVITE_USER(1))
          .reply(400, response);

        const result = await ProtectedApiClient.inviteUser(1, {
          invites: [
            {
              name: 'person1',
              email: 'person.1@c4cneu.com',
            },
            {
              name: 'person 2',
              email: 'person.1@c4cneu.com',
            },
          ],
        }).catch((err) => err.response.data);

        expect(result).toEqual(response);
      });
    });

    describe('getApplicants', () => {
      it('makes the right request', async () => {
        const response = [
          {
            userId: 1,
            username: 'person 1',
          },
          {
            userId: 2,
            username: 'person 2',
          },
        ];

        nock(BASE_URL)
          .get(ParameterizedApiRoutes.GET_APPLICANTS(1))
          .reply(200, response);

        const result = await ProtectedApiClient.getApplicants(1);

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'No such team';

        nock(BASE_URL)
          .get(ParameterizedApiRoutes.GET_APPLICANTS(1))
          .reply(400, response);

        const result = await ProtectedApiClient.getApplicants(1).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });

      it('makes an unauthorized request', async () => {
        const response = 'Must be team leader';

        nock(BASE_URL)
          .get(ParameterizedApiRoutes.GET_APPLICANTS(1))
          .reply(401, response);

        const result = await ProtectedApiClient.getApplicants(1).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });
    });

    describe('applyToTeam', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.APPLY_TO_TEAM(1))
          .reply(200, response);

        const result = await ProtectedApiClient.applyToTeam(1);

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'No such team';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.APPLY_TO_TEAM(1))
          .reply(400, response);

        const result = await ProtectedApiClient.applyToTeam(1).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });
    });

    describe('approveUser', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.APPROVE_USER(1, 2))
          .reply(200, response);

        const result = await ProtectedApiClient.approveUser(1, 2);

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'No such user';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.APPROVE_USER(1, 2))
          .reply(400, response);

        const result = await ProtectedApiClient.approveUser(1, 2).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });

      it('makes an unauthorized request', async () => {
        const response = 'Must be team leader';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.APPROVE_USER(1, 2))
          .reply(401, response);

        const result = await ProtectedApiClient.approveUser(1, 2).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });
    });

    describe('rejectUser', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.REJECT_USER(1, 2))
          .reply(200, response);

        const result = await ProtectedApiClient.rejectUser(1, 2);

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'No such user';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.REJECT_USER(1, 2))
          .reply(400, response);

        const result = await ProtectedApiClient.rejectUser(1, 2).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });

      it('makes an unauthorized request', async () => {
        const response = 'Must be team leader';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.REJECT_USER(1, 2))
          .reply(401, response);

        const result = await ProtectedApiClient.rejectUser(1, 2).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });
    });

    describe('kickUser', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.KICK_USER(1, 2))
          .reply(200, response);

        const result = await ProtectedApiClient.kickUser(1, 2);

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'No such user';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.KICK_USER(1, 2))
          .reply(400, response);

        const result = await ProtectedApiClient.kickUser(1, 2).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });

      it('makes an unauthorized request', async () => {
        const response = 'Must be team leader';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.KICK_USER(1, 2))
          .reply(401, response);

        const result = await ProtectedApiClient.kickUser(1, 2).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });
    });

    describe('leaveTeam', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.LEAVE_TEAM(1))
          .reply(200, response);

        const result = await ProtectedApiClient.leaveTeam(1);

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'Must be another leader';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.LEAVE_TEAM(1))
          .reply(400, response);

        const result = await ProtectedApiClient.leaveTeam(1).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });
    });

    describe('disbandTeam', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.DISBAND_TEAM(1))
          .reply(200, response);

        const result = await ProtectedApiClient.disbandTeam(1);

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'No such team';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.DISBAND_TEAM(1))
          .reply(400, response);

        const result = await ProtectedApiClient.disbandTeam(1).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });

      it('makes an unauthorized request', async () => {
        const response = 'Must be team leader';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.DISBAND_TEAM(1))
          .reply(401, response);

        const result = await ProtectedApiClient.disbandTeam(1).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });
    });

    describe('transferOwnership', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.TRANSFER_OWNERSHIP(1))
          .reply(200, response);

        const result = await ProtectedApiClient.transferOwnership(1, {
          newLeaderId: 2,
        });

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'No such user';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.TRANSFER_OWNERSHIP(1))
          .reply(400, response);

        const result = await ProtectedApiClient.transferOwnership(1, {
          newLeaderId: 2,
        }).catch((err) => err.response.data);

        expect(result).toEqual(response);
      });

      it('makes an unauthorized request', async () => {
        const response = 'Must be team leader';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.TRANSFER_OWNERSHIP(1))
          .reply(401, response);

        const result = await ProtectedApiClient.transferOwnership(1, {
          newLeaderId: 2,
        }).catch((err) => err.response.data);

        expect(result).toEqual(response);
      });
    });
  });

  // Site tests
  describe('Protected Site Tests', () => {
    describe('addSite', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.ADD_SITE)
          .reply(200, response);

        const testGoodAddSiteRequest = {
          blockId: 1,
          address: 'address',
          city: 'city',
          zip: '02115',
          lat: 0,
          lng: 0,
          neighborhoodId: 1,
          owner: 'ROW' as SiteOwner,
          treePresent: null,
          status: null,
          genus: null,
          species: null,
          commonName: null,
          confidence: null,
          diameter: null,
          circumference: null,
          multistem: null,
          coverage: null,
          pruning: null,
          condition: null,
          discoloring: null,
          leaning: null,
          constrictingGrate: null,
          wounds: null,
          pooling: null,
          stakesWithWires: null,
          stakesWithoutWires: null,
          light: null,
          bicycle: null,
          bagEmpty: null,
          bagFilled: null,
          tape: null,
          suckerGrowth: null,
          siteType: null,
          sidewalkWidth: null,
          siteWidth: null,
          siteLength: null,
          material: null,
          raisedBed: null,
          fence: null,
          trash: null,
          wires: null,
          grate: null,
          stump: null,
          treeNotes: null,
          siteNotes: null,
          plantingDate: null,
        };
        const result = await ProtectedApiClient.addSite(testGoodAddSiteRequest);

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'No such site';

        nock(BASE_URL)
          .post(ProtectedApiClientRoutes.ADD_SITE)
          .reply(400, response);

        const testBadAddSiteRequest = {
          blockId: -2,
          address: '',
          city: '',
          zip: '-21312',
          lat: 999999,
          lng: 999999,
          neighborhoodId: 1,
          owner: 'Private' as SiteOwner,
          treePresent: null,
          status: null,
          genus: null,
          species: null,
          commonName: null,
          confidence: null,
          diameter: null,
          circumference: null,
          multistem: null,
          coverage: null,
          pruning: null,
          condition: null,
          discoloring: null,
          leaning: null,
          constrictingGrate: null,
          wounds: null,
          pooling: null,
          stakesWithWires: null,
          stakesWithoutWires: null,
          light: null,
          bicycle: null,
          bagEmpty: null,
          bagFilled: null,
          tape: null,
          suckerGrowth: null,
          siteType: null,
          sidewalkWidth: null,
          siteWidth: null,
          siteLength: null,
          material: null,
          raisedBed: null,
          fence: null,
          trash: null,
          wires: null,
          grate: null,
          stump: null,
          treeNotes: null,
          siteNotes: null,
          plantingDate: null,
        };
        const result = await ProtectedApiClient.addSite(
          testBadAddSiteRequest,
        ).catch((err) => err.response.data);

        expect(result).toEqual(response);
      });
    });

    describe('addSites', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(AdminApiClientRoutes.ADD_SITES)
          .reply(200, response);

        const testGoodAddSitesRequest = {
          csvText:
            'lat,lng,city,zip,address,neighborhood,treePresent,status,genus,species,commonName,confidence,diameter,circumference,multistem,coverage,pruning,condition,discoloring,leaning,constrictingGrate,wounds,pooling,stakesWithWires,stakesWithoutWires,light,bicycle,bagEmpty,bagFilled,tape,suckerGrowth,siteType,sidewalkWidth,siteWidth,siteLength,material,raisedBed,fence,trash,wires,grate,stump,treeNotes,siteNotes\n' +
            '48.58903249,-75.2434242,Boston,12345,Columbus Ave,Back Bay,TRUE,Alive,Genus,Species,Common Name,Confidence,10.2,92,TRUE,coverage,pruning,very good condition,TRUE,TRUE,TRUE,TRUE,TRUE,TRUE,TRUE,TRUE,TRUE,TRUE,TRUE,TRUE,TRUE,Site type,sidewalk width,193.233,1023,material,TRUE,TRUE,TRUE,TRUE,TRUE,TRUE,Notes on trees,Notes on sites',
        };
        const result = await ProtectedApiClient.addSites(
          testGoodAddSitesRequest,
        );

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'No such site';

        nock(BASE_URL)
          .post(AdminApiClientRoutes.ADD_SITES)
          .reply(400, response);

        const testBadAddSitesRequest = {
          csvText:
            'lat,lng,city,zip,address,neighborhood,treePresent,status,genus,species,commonName,confidence,diameter,circumference,multistem,coverage,pruning,condition,discoloring,leaning,constrictingGrate,wounds,pooling,stakesWithWires,stakesWithoutWires,light,bicycle,bagEmpty,bagFilled,tape,suckerGrowth,siteType,sidewalkWidth,siteWidth,siteLength,material\n' +
            '48.58903249,-75.2434242,Boston,12345,Columbus Ave,Back Bay,TRUE,Alive,Genus,Species,Common Name,Confidence,10.2,92,TRUE,TRUE,Site type,sidewalk width,193.233,1023,material,TRUE,TRUE,TRUE,TRUE,TRUE,TRUE,Notes on trees,Notes on sites',
        };
        const result = await ProtectedApiClient.addSites(
          testBadAddSitesRequest,
        ).catch((err) => err.response.data);

        expect(result).toEqual(response);
      });
    });

    describe('adoptSite', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.ADOPT_SITE(1))
          .reply(200, response);

        const result = await ProtectedApiClient.adoptSite(1);

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'No such site';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.ADOPT_SITE(1))
          .reply(400, response);

        const result = await ProtectedApiClient.adoptSite(1).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });
    });

    describe('unadoptSite', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.UNADOPT_SITE(1))
          .reply(200, response);

        const result = await ProtectedApiClient.unadoptSite(1);

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'Was not adopted';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.UNADOPT_SITE(1))
          .reply(400, response);

        const result = await ProtectedApiClient.unadoptSite(1).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });
    });

    describe('forceUnadoptSite', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.FORCE_UNADOPT_SITE(1))
          .reply(200, response);

        const result = await ProtectedApiClient.forceUnadoptSite(1);

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'Was not adopted';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.FORCE_UNADOPT_SITE(1))
          .reply(400, response);

        const result = await ProtectedApiClient.forceUnadoptSite(1).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });
    });

    describe('recordStewardship', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.RECORD_STEWARDSHIP(1))
          .reply(200, response);

        const result = await ProtectedApiClient.recordStewardship(1, {
          date: '10/12/2020',
          watered: true,
          mulched: false,
          cleaned: true,
          weeded: false,
          installedWateringBag: false,
        });

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'all false';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.RECORD_STEWARDSHIP(1))
          .reply(400, response);

        const result = await ProtectedApiClient.recordStewardship(1, {
          date: '10/12/2020',
          watered: false,
          mulched: false,
          cleaned: false,
          weeded: false,
          installedWateringBag: false,
        }).catch((err) => err.response.data);

        expect(result).toEqual(response);
      });
    });

    describe('editStewardship', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.EDIT_STEWARDSHIP(1))
          .reply(200, response);

        const result = await ProtectedApiClient.editStewardship(1, {
          date: '10/12/2020',
          watered: true,
          mulched: false,
          cleaned: true,
          weeded: false,
          installedWateringBag: false,
        });

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'all false';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.EDIT_STEWARDSHIP(1))
          .reply(400, response);

        const result = await ProtectedApiClient.editStewardship(1, {
          date: '10/12/2020',
          watered: false,
          mulched: false,
          cleaned: false,
          weeded: false,
          installedWateringBag: false,
        }).catch((err) => err.response.data);

        expect(result).toEqual(response);
      });

      it('makes an unauthorized request', async () => {
        const response = 'Must be admin or author';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.EDIT_STEWARDSHIP(1))
          .reply(401, response);

        const result = await ProtectedApiClient.editStewardship(1, {
          date: '10/12/2020',
          watered: true,
          mulched: false,
          cleaned: true,
          weeded: false,
          installedWateringBag: false,
        }).catch((err) => err.response.data);

        expect(result).toEqual(response);
      });
    });

    describe('deleteStewardship', () => {
      it('makes the right request', async () => {
        const response = '';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.DELETE_STEWARDSHIP(1))
          .reply(200, response);

        const result = await ProtectedApiClient.deleteStewardship(1);

        expect(result).toEqual(response);
      });

      it('makes a bad request', async () => {
        const response = 'No such activity';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.DELETE_STEWARDSHIP(1))
          .reply(400, response);

        const result = await ProtectedApiClient.deleteStewardship(1).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });

      it('makes an unauthorized request', async () => {
        const response = 'Must be admin or author';

        nock(BASE_URL)
          .post(ParameterizedApiRoutes.DELETE_STEWARDSHIP(1))
          .reply(401, response);

        const result = await ProtectedApiClient.deleteStewardship(1).catch(
          (err) => err.response.data,
        );

        expect(result).toEqual(response);
      });
    });

    describe('getAdoptedSites', () => {
      it('makes the right request', async () => {
        const response = {
          adoptedSites: [1, 2, 3],
        };

        nock(BASE_URL)
          .get(ProtectedApiClientRoutes.GET_ADOPTED_SITES)
          .reply(200, response);

        const result = await ProtectedApiClient.getAdoptedSites();

        expect(result).toEqual(response);
      });
    });
  });

  describe('updateSite', () => {
    it('makes the right request', async () => {
      const response = {};

      nock(BASE_URL)
        .post(ParameterizedApiRoutes.UPDATE_SITE(1))
        .reply(200, response);

      const result = await ProtectedApiClient.updateSite(1, {
        treePresent: null,
        status: null,
        genus: null,
        species: null,
        commonName: null,
        confidence: null,
        diameter: null,
        circumference: null,
        multistem: null,
        coverage: null,
        pruning: null,
        condition: null,
        discoloring: null,
        leaning: null,
        constrictingGrate: null,
        wounds: null,
        pooling: null,
        stakesWithWires: null,
        stakesWithoutWires: null,
        light: null,
        bicycle: null,
        bagEmpty: null,
        bagFilled: null,
        tape: null,
        suckerGrowth: null,
        siteType: null,
        sidewalkWidth: null,
        siteWidth: null,
        siteLength: null,
        material: null,
        raisedBed: null,
        fence: null,
        trash: null,
        wires: null,
        grate: null,
        stump: null,
        treeNotes: null,
        siteNotes: null,
        plantingDate: null,
      });

      expect(result).toEqual(response);
    });
    it('makes a bad request', async () => {
      const response = 'Bad request!';

      nock(BASE_URL)
        .post(ParameterizedApiRoutes.UPDATE_SITE(-1))
        .reply(400, response);

      const result = await ProtectedApiClient.updateSite(-1, {
        treePresent: null,
        status: null,
        genus: null,
        species: null,
        commonName: null,
        confidence: null,
        diameter: null,
        circumference: null,
        multistem: null,
        coverage: null,
        pruning: null,
        condition: null,
        discoloring: null,
        leaning: null,
        constrictingGrate: null,
        wounds: null,
        pooling: null,
        stakesWithWires: null,
        stakesWithoutWires: null,
        light: null,
        bicycle: null,
        bagEmpty: null,
        bagFilled: null,
        tape: null,
        suckerGrowth: null,
        siteType: null,
        sidewalkWidth: null,
        siteWidth: null,
        siteLength: null,
        material: null,
        raisedBed: null,
        fence: null,
        trash: null,
        wires: null,
        grate: null,
        stump: null,
        treeNotes: null,
        siteNotes: null,
        plantingDate: null,
      }).catch((err) => err.response.data);

      expect(result).toEqual(response);
    });
  });
});

describe('Admin Protected Client Routes', () => {
  describe('changePrivilegeLevel', () => {
    it('makes the right request', async () => {
      const response = new Promise((res) => res);

      nock(BASE_URL)
        .post(AdminApiClientRoutes.CHANGE_PRIVILEGE)
        .reply(200, response);

      const result = ProtectedApiClient.changePrivilegeLevel({
        targetUserEmail: 'jblanc222@gmail.com',
        newLevel: PrivilegeLevel.STANDARD,
        password: 'password',
      });

      expect(result).toEqual(response);
    });

    it('makes a bad request', async () => {
      const response = 'Given user already standard';

      nock(BASE_URL)
        .post(AdminApiClientRoutes.CHANGE_PRIVILEGE)
        .reply(400, response);

      const result = await ProtectedApiClient.changePrivilegeLevel({
        targetUserEmail: 'jblanc222@gmail.com',
        newLevel: PrivilegeLevel.STANDARD,
        password: 'password',
      }).catch((err) => err.response.data);

      expect(result).toEqual(response);
    });

    it('makes an unauthorized request', async () => {
      const response = 'Given password is not correct';

      nock(BASE_URL)
        .post(AdminApiClientRoutes.CHANGE_PRIVILEGE)
        .reply(401, response);

      const result = await ProtectedApiClient.changePrivilegeLevel({
        targetUserEmail: 'jblanc222@gmail.com',
        newLevel: PrivilegeLevel.STANDARD,
        password: 'password',
      }).catch((err) => err.response.data);

      expect(result).toEqual(response);
    });
  });

  describe('createChild', () => {
    it('makes the right request', async () => {
      const response = new Promise((res) => res);

      nock(BASE_URL)
        .post(AdminApiClientRoutes.CREATE_CHILD)
        .reply(200, response);

      const result = ProtectedApiClient.createChild({
        firstName: 'Test',
        lastName: 'Last',
        email: 'test@test.com',
        username: 'test',
        password: 'test',
      });

      expect(result).toEqual(response);
    });

    it('makes a bad request', async () => {
      const response = 'Invalid email';

      nock(BASE_URL)
        .post(AdminApiClientRoutes.CREATE_CHILD)
        .reply(400, response);

      const result = await ProtectedApiClient.createChild({
        firstName: 'Test',
        lastName: 'Last',
        email: 'aterribleemail',
        username: 'test',
        password: 'test',
      }).catch((err) => err.response.data);

      expect(result).toEqual(response);
    });

    it('makes an unauthorized request', async () => {
      const response = 'Given password is not correct';

      nock(BASE_URL)
        .post(AdminApiClientRoutes.CREATE_CHILD)
        .reply(401, response);

      const result = await ProtectedApiClient.createChild({
        firstName: 'Test',
        lastName: 'Last',
        email: 'test@test.com',
        username: 'test',
        password: 'test',
      }).catch((err) => err.response.data);

      expect(result).toEqual(response);
    });
  });

  describe('editSite', () => {
    it('makes the right request', async () => {
      const response = new Promise((res) => res);

      nock(BASE_URL)
        .post(ParameterizedAdminApiRoutes.EDIT_SITE(1))
        .reply(200, response);

      const result = ProtectedApiClient.editSite(1, {
        address: 'address',
        city: 'city',
        zip: '02115',
        lat: 0,
        lng: 0,
        neighborhoodId: 1,
        owner: 'ROW',
      });

      expect(result).toEqual(response);
    });

    it('makes a bad request', async () => {
      const response = 'Bad request!';

      nock(BASE_URL)
        .post(ParameterizedAdminApiRoutes.EDIT_SITE(1))
        .reply(400, response);

      const result = await ProtectedApiClient.editSite(1, {
        address: 'address',
        city: 'city',
        zip: '02115',
        lat: 0,
        lng: 0,
        neighborhoodId: -1,
        owner: 'Federal',
      }).catch((err) => err.response.data);

      expect(result).toEqual(response);
    });
  });

  describe('getAdoptionReport', () => {
    it('makes the right request', async () => {
      const response = [
        {
          siteId: 0,
          address: 'address',
          name: 'A Doe',
          email: 'adoe@email.com',
          dateAdopted: '01-01-2021',
          activityCount: 1,
          neighborhood: 'South End',
        },
      ];

      nock(BASE_URL)
        .get(AdminApiClientRoutes.GET_ADOPTION_REPORT)
        .reply(200, response);

      const result = await ProtectedApiClient.getAdoptionReport();

      expect(result).toEqual(response);
    });

    it('makes an unauthorized request ', async () => {
      const response = 'Must be an admin';

      nock(BASE_URL)
        .get(AdminApiClientRoutes.GET_ADOPTION_REPORT)
        .reply(401, response);

      const result = await ProtectedApiClient.getAdoptionReport().catch(
        (err) => err.response.data,
      );

      expect(result).toEqual(response);
    });
  });

  describe('getAdoptionReportCsv', () => {
    it('makes the right request without previousDays', async () => {
      const response =
        'Site ID, Address, Name, Email, Date Adopted, Activity Count, ' +
        'Neighborhood 1, 123 Real St, Jane Doe, janedoe@email.com, ' +
        '2021-01-31, 1, East Boston';

      nock(BASE_URL)
        .get(AdminApiClientRoutes.GET_ADOPTION_REPORT_CSV)
        .reply(200, response);

      const result = await ProtectedApiClient.getAdoptionReportCsv(null);

      expect(result).toEqual(response);
    });

    it('makes the right request with previousDays', async () => {
      const response =
        'Site ID, Address, Name, Email, Date Adopted, Activity Count, ' +
        'Neighborhood 1, 123 Real St, Jane Doe, janedoe@email.com, ' +
        '2021-01-31, 1, East Boston';

      nock(BASE_URL)
        .get(ParameterizedAdminApiRoutes.GET_ADOPTION_REPORT_CSV(10))
        .reply(200, response);

      const result = await ProtectedApiClient.getAdoptionReportCsv(10);

      expect(result).toEqual(response);
    });

    it('makes an unauthorized request ', async () => {
      const response = 'Must be an admin';

      nock(BASE_URL)
        .get(ParameterizedAdminApiRoutes.GET_ADOPTION_REPORT_CSV(10))
        .reply(401, response);

      const result = await ProtectedApiClient.getAdoptionReportCsv(10).catch(
        (err) => err.response.data,
      );

      expect(result).toEqual(response);
    });
  });

  describe('getStewardshipReport', () => {
    it('makes the right request', async () => {
      const response = [
        {
          siteId: 0,
          address: 'address',
          name: 'A Doe',
          email: 'adoe@email.com',
          datePerformed: '01-01-2021',
          watered: true,
          mulched: true,
          cleaned: false,
          weeded: false,
          neighborhood: 'South End',
        },
      ];

      nock(BASE_URL)
        .get(AdminApiClientRoutes.GET_STEWARDSHIP_REPORT)
        .reply(200, response);

      const result = await ProtectedApiClient.getStewardshipReport();

      expect(result).toEqual(response);
    });

    it('makes an unauthorized request ', async () => {
      const response = 'Must be an admin';

      nock(BASE_URL)
        .get(AdminApiClientRoutes.GET_STEWARDSHIP_REPORT)
        .reply(401, response);

      const result = await ProtectedApiClient.getStewardshipReport().catch(
        (err) => err.response.data,
      );

      expect(result).toEqual(response);
    });
  });

  describe('getStewardshipReportCsv', () => {
    it('makes the right request without previousDays', async () => {
      const response =
        'Site ID, Address, Name, Email, Date Performed, ' +
        'Watered, Mulched, Cleaned, Weeded 1, 123 Real St, Jane Doe, ' +
        'janedoe@email.com, 2021-01-31, TRUE, FALSE, FALSE, FALSE';

      nock(BASE_URL)
        .get(AdminApiClientRoutes.GET_STEWARDSHIP_REPORT_CSV)
        .reply(200, response);

      const result = await ProtectedApiClient.getStewardshipReportCsv(null);

      expect(result).toEqual(response);
    });

    it('makes the right request with previousDays', async () => {
      const response =
        'Site ID, Address, Name, Email, Date Performed, ' +
        'Watered, Mulched, Cleaned, Weeded 1, 123 Real St, Jane Doe, ' +
        'janedoe@email.com, 2021-01-31, TRUE, FALSE, FALSE, FALSE';

      nock(BASE_URL)
        .get(ParameterizedAdminApiRoutes.GET_STEWARDSHIP_REPORT_CSV(10))
        .reply(200, response);

      const result = await ProtectedApiClient.getStewardshipReportCsv(10);

      expect(result).toEqual(response);
    });

    it('makes an unauthorized request ', async () => {
      const response = 'Must be an admin';

      nock(BASE_URL)
        .get(ParameterizedAdminApiRoutes.GET_STEWARDSHIP_REPORT_CSV(10))
        .reply(401, response);

      const result = await ProtectedApiClient.getStewardshipReportCsv(10).catch(
        (err) => err.response.data,
      );

      expect(result).toEqual(response);
    });
  });

  describe('nameSiteEntry', () => {
    it('makes the right request', async () => {
      const response = '';

      nock(BASE_URL)
        .post(ParameterizedApiRoutes.NAME_SITE_ENTRY(1))
        .reply(200, response);

      const result = await ProtectedApiClient.nameSiteEntry(1, {
        name: 'New name',
      });

      expect(result).toEqual(response);
    });

    it('makes a bad request', async () => {
      const response = 'Name too long';

      nock(BASE_URL)
        .post(ParameterizedApiRoutes.NAME_SITE_ENTRY(1))
        .reply(400, response);

      const result = await ProtectedApiClient.nameSiteEntry(1, {
        name: 'A'.repeat(61),
      }).catch((err) => err.response.data);

      expect(result).toEqual(response);
    });

    it('makes an unauthorized request ', async () => {
      const response = 'Must be an admin';

      nock(BASE_URL)
        .post(ParameterizedApiRoutes.NAME_SITE_ENTRY(1))
        .reply(401, response);

      const result = await ProtectedApiClient.nameSiteEntry(1, {
        name: 'New name',
      }).catch((err) => err.response.data);

      expect(result).toEqual(response);
    });
  });

  describe('sendEmail', () => {
    it('makes the right request', async () => {
      const response = '';

      nock(BASE_URL).post(AdminApiClientRoutes.SEND_EMAIL).reply(200, response);

      const result = await ProtectedApiClient.sendEmail({
        emails: ['email@email.com'],
        emailSubject: 'Some subject',
        emailBody: 'Some body',
      });

      expect(result).toEqual(response);
    });

    it('makes a bad request', async () => {
      const response = 'Invalid email given!';

      nock(BASE_URL).post(AdminApiClientRoutes.SEND_EMAIL).reply(400, response);

      const result = await ProtectedApiClient.sendEmail({
        emails: ['notAnEmail'],
        emailSubject: 'Some subject',
        emailBody: 'Some body',
      }).catch((err) => err.response.data);

      expect(result).toEqual(response);
    });

    it('makes an unauthorized request ', async () => {
      const response = 'Must be an admin';

      nock(BASE_URL).post(AdminApiClientRoutes.SEND_EMAIL).reply(401, response);

      const result = await ProtectedApiClient.sendEmail({
        emails: [],
        emailSubject: 'Subject',
        emailBody: 'Body',
      }).catch((err) => err.response.data);

      expect(result).toEqual(response);
    });
  });

  describe('filterSites', () => {
    it('makes the right request', async () => {
      const response = '';

      const params = {
        treeCommonNames: null,
        adoptedStart: null,
        adoptedEnd: null,
        lastActivityStart: null,
        lastActivityEnd: null,
        neighborhoodIds: null,
        activityCountMin: 0,
        activityCountMax: null,
      };

      nock(BASE_URL)
        .get(ParameterizedAdminApiRoutes.FILTER_SITES(params))
        .reply(200, response);

      const result = await ProtectedApiClient.filterSites(params);

      expect(result).toEqual(response);
    });

    it('makes a bad request', async () => {
      const response = 'Invalid dates given!';

      const params = {
        treeCommonNames: null,
        adoptedStart: 'wrongDate',
        adoptedEnd: 'weirdDate',
        lastActivityStart: null,
        lastActivityEnd: null,
        neighborhoodIds: null,
        activityCountMin: 0,
        activityCountMax: null,
      };

      nock(BASE_URL)
        .get(ParameterizedAdminApiRoutes.FILTER_SITES(params))
        .reply(400, response);

      const result = await ProtectedApiClient.filterSites(params).catch(
        (err) => err.response.data,
      );

      expect(result).toEqual(response);
    });

    it('makes an unauthorized request ', async () => {
      const response = 'Must be an admin';

      const params = {
        treeCommonNames: null,
        adoptedStart: null,
        adoptedEnd: null,
        lastActivityStart: null,
        lastActivityEnd: null,
        neighborhoodIds: null,
        activityCountMin: 0,
        activityCountMax: null,
      };

      nock(BASE_URL)
        .get(ParameterizedAdminApiRoutes.FILTER_SITES(params))
        .reply(401, response);

      const result = await ProtectedApiClient.filterSites(params).catch(
        (err) => err.response.data,
      );

      expect(result).toEqual(response);
    });
  });
});
