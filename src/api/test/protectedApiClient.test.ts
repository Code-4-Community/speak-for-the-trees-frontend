import ProtectedApiClient, {
  AdminApiClientRoutes,
  ParameterizedApiRoutes,
  ProtectedApiClientRoutes,
} from '../protectedApiClient';
import { TeamResponse, TeamRole } from '../../containers/teamPage/ducks/types';
import nock from 'nock';
import { PrivilegeLevel, UserData } from '../../auth/ducks/types';

const BASE_URL = 'http://localhost';

// TODO: handle invalid cases

describe('Protected API Client Tests', () => {
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
        username: 'user',
      };

      nock(BASE_URL)
        .get(ProtectedApiClientRoutes.GET_USER_DATA)
        .reply(200, response);

      const result = await ProtectedApiClient.getUserData();

      expect(result).toEqual(response);
    });
  });

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
  });

  // Teams tests

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
  });

  // Site tests
  describe('Adopt a site', () => {
    it('makes the right request', async () => {
      const response = '';

      nock(BASE_URL)
        .post(ParameterizedApiRoutes.ADOPT_SITE(1))
        .reply(200, response);

      const result = await ProtectedApiClient.adoptSite(1);

      expect(result).toEqual(response);
    });
  });

  describe('Unadopt a site', () => {
    it('makes the right request', async () => {
      const response = '';

      nock(BASE_URL)
        .post(ParameterizedApiRoutes.UNADOPT_SITE(1))
        .reply(200, response);

      const result = await ProtectedApiClient.unadoptSite(1);

      expect(result).toEqual(response);
    });
  });

  describe('Get adopted sites', () => {
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

  // Site tests
  describe('Adopt a site', () => {
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
      });

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

    it('makes a bad request, user already has privilege level', async () => {
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

    it('makes a bad request, wrong password', async () => {
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

  describe('uncompleteReservation', () => {
    it('makes the right request', async () => {
      const response = '';

      nock(BASE_URL)
        .post(AdminApiClientRoutes.UNCOMPLETE_RESERVATION)
        .reply(200, response);

      const result = await ProtectedApiClient.uncompleteReservation(5);

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
  });
});
