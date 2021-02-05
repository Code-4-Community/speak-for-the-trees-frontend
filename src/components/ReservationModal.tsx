import React from 'react';
import styled from 'styled-components';
import { WHITE, BLACK } from '../colors';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export enum ReservationModalType {
  OPEN = 'OPEN',
  TAKEN = 'TAKEN',
  RESERVED = 'RESERVED'
}

interface ReservationModalProps {
  readonly status: ReservationModalType;
  readonly blockID: number;
  readonly onOk: () => void;
  readonly onCancel: () => void;
  isVisible: boolean;
}

const StyledModal = styled(Modal)`
    height: 40px;
    background: ${WHITE};
    color: ${BLACK};
    font-size: 15px;
    font-weight: 400;
`;

const ReservationModal: React.FC<ReservationModalProps> = ({ 
  status, blockID, onOk, onCancel, isVisible}) => {

    const getOkText = (): string => {
      switch (status) {
        case ReservationModalType.OPEN : 
          return 'Reserve'
        case ReservationModalType.TAKEN : 
          return 'Release'
        case ReservationModalType.RESERVED : 
          return 'Ok'
      }
    };

    const handleCancel = (): any => {
      //onCancel();
      isVisible = false;
    }

    const getModalContent = (): string => {
      switch (status) {
        case ReservationModalType.OPEN : 
          return `Are you sure? You want to reserve block ${blockID}`
        case ReservationModalType.TAKEN : 
          return `Are you sure? You want to release block ${blockID}`
        case ReservationModalType.RESERVED : 
          return `Sorry. Block ${blockID} is not available to reserve/release`
      }
    };

    return (
      <div>
        <StyledModal
          visible={isVisible}
          title = ''
          onOk={onOk}
          okText={getOkText()}
          onCancel={handleCancel}
          closable={false}
        >
          {getModalContent()}
        </StyledModal>
      </div>
    );
};


export default ReservationModal;
