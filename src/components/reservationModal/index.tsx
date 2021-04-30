import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { WHITE, BLACK } from '../../utils/colors';
import { Spin, Alert, Select, Modal } from 'antd';
import protectedApiClient from '../../api/protectedApiClient';
import {
  AsyncRequest,
  AsyncRequestNotStarted,
  AsyncRequestLoading,
  AsyncRequestCompleted,
  AsyncRequestFailed,
  asyncRequestIsComplete,
  AsyncRequestKinds,
  asyncRequestIsLoading,
} from '../../utils/asyncRequest';
import { TeamResponse } from '../../containers/teamPage/ducks/types';

export enum ReservationModalType {
  OPEN = 'OPEN',
  TAKEN = 'TAKEN',
  RESERVED = 'RESERVED',
}

interface ReservationModalProps {
  readonly status: ReservationModalType;
  readonly blockID: number;
  readonly onOk: (teamId: number | undefined) => void;
  readonly onCancel: () => void;
  readonly isVisible: boolean;
}

const StyledModal = styled(Modal)`
  height: 40px;
  background: ${WHITE};
  color: ${BLACK};
  font-size: 5px;
  font-weight: 400;
`;

const ReservationModal: React.FC<ReservationModalProps> = ({
  status,
  blockID,
  onOk,
  onCancel,
  isVisible,
}) => {
  const getOkText = (): string => {
    switch (status) {
      case ReservationModalType.OPEN:
        return 'Reserve';
      case ReservationModalType.RESERVED:
        return 'Release';
      case ReservationModalType.TAKEN:
        return 'Ok';
    }
  };

  const [team, setTeam] = useState<number | undefined>(undefined);
  const [teamsRequest, setTeamsRequest] = useState<
    AsyncRequest<TeamResponse[], Error>
  >(AsyncRequestNotStarted());

  useEffect(() => {
    setTeamsRequest(AsyncRequestLoading());
    protectedApiClient
      .getTeams()
      .then((teams) => {
        setTeamsRequest(AsyncRequestCompleted(teams));
      })
      .catch((e) => setTeamsRequest(AsyncRequestFailed(e)));
  }, [setTeamsRequest]);
  const getModalContent = () => {
    //handle data (getTeams) fails, form fails (form submission)
    switch (status) {
      case ReservationModalType.OPEN:
        //add type guard to asyncRequestIsFailed
        return (
          <>
          {asyncRequestIsLoading(teamsRequest) && (<Spin/>)}
            {asyncRequestIsComplete(teamsRequest) && (
              <>
                <b>{`Are you sure?`}</b>
                <br /> {`You want to reserve block ${blockID}`}
                <Select onChange={(chosen) => setTeam(Number(chosen))}>
                  {teamsRequest.result.map((team, i) => (
                    <Select.Option key={i} value={team.id}>
                      {team.name}
                    </Select.Option>
                  ))}
                </Select>
              </>
            )}
            {teamsRequest.kind === AsyncRequestKinds.Failed && (
              <Alert
                message="Error"
                description={teamsRequest.error.message}
                type="error"
                showIcon
              />
            )}
          </>
        );

      case ReservationModalType.RESERVED:
        return (
          <text>
            <b>{`Are you sure?`}</b>
            <br /> {`You want to release block ${blockID}`}
          </text>
        );
      case ReservationModalType.TAKEN:
        return (
          <text>
            <b>{`Sorry!`}</b>
            <br /> {`Block ${blockID} is not available to reserve/release`}
          </text>
        );
    }
  };

  return (
    <StyledModal
      visible={isVisible}
      title=""
      onOk={() => onOk(team)}
      okText={getOkText()}
      onCancel={onCancel}
      closable={false}
    >
      {getModalContent()}
    </StyledModal>
  );
};

export default ReservationModal;
