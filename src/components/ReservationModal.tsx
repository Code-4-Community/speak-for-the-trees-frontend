import React from 'react';
import styled from 'styled-components';
import { WHITE, BLACK } from '../colors';
import { Modal } from 'antd';

export enum ReservationModalType {
  OPEN = 'OPEN',
  TAKEN = 'TAKEN',
  RESERVED = 'RESERVED',
}

interface ReservationModalProps {
  readonly status: ReservationModalType;
  readonly blockID: number;
  readonly onOk: () => void;
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
      case ReservationModalType.TAKEN:
        return 'Release';
      case ReservationModalType.RESERVED:
        return 'Ok';
    }
  };

  const getModalContent = () => {
    switch (status) {
      case ReservationModalType.OPEN:
        return (
          <text>
            <b>{`Are you sure?`}</b>
            <br /> {`You want to reserve block ${blockID}`}
          </text>
        );
      case ReservationModalType.TAKEN:
        return (
          <text>
            <b>{`Are you sure?`}</b>
            <br /> {`You want to release block ${blockID}`}
          </text>
        );
      case ReservationModalType.RESERVED:
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
      onOk={onOk}
      okText={getOkText()}
      onCancel={onCancel}
      closable={false}
    >
      {getModalContent()}
    </StyledModal>
  );
};

export default ReservationModal;
