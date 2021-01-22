import React from 'react';
import styled from 'styled-components';
import { WHITE, BLACK } from '../colors';
import { Modal } from 'antd';

interface ReservationModalProps {
    readonly status: string;
    readonly blockID: number;
}

const StyledModal = styled(Modal)`
    height: 40px;
    background: ${WHITE};
    color: ${BLACK};
    font-size: 18px;
    font-weight: 400;
`;

function error(blockID: number) {
    StyledModal.confirm({
        title: 'Are you sure?',
        content: 'You want to release block ' + blockID,
      onOk() {
        console.log('Release');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

function warning(blockID: number) {
    StyledModal.confirm({
        title: 'Are you sure?',
        content: 'You want to reserve block ' + blockID,
      onOk() {
        console.log('Reserve');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

function info(blockID: number) {
    StyledModal.warning({
        title: 'Sorry',
        content: 'Block ' + blockID + ' is not available to reserve/release',
    });
  }

const ReservationModal: React.FC<ReservationModalProps> = ({ status, blockID }) => {

    if (status === 'reserved') {
        error(blockID);
    }

    if (status === 'open') {
        warning(blockID);
    }

    if (status === 'taken') {
        info(blockID);
    }

    return (
        <StyledModal></StyledModal>
    );
};


export default ReservationModal;
