import React from 'react';
import { Button, Modal } from 'antd';
import { StyledClose } from '../themedComponents';
import styled from 'styled-components';
import { LIGHT_GREY } from '../../utils/colors';

const ConfirmDeleteButton = styled(Button)`
  margin: 10px;
  padding-left: 10px;

  & :hover {
    background-color: ${LIGHT_GREY};
  }
`;

interface ConfirmationModelProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  title: string;
  confirmationMessage: string;
  onConfirm: () => void;
}

const ConfirmationModel: React.FC<ConfirmationModelProps> = ({
  visible,
  onOk,
  onCancel,
  confirmationMessage,
  title,
  onConfirm,
}) => {
  return (
    <>
      <Modal
        title={title}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        footer={null}
        closeIcon={<StyledClose />}
      >
        <p>{confirmationMessage}</p>
        <ConfirmDeleteButton onClick={onConfirm}>Delete</ConfirmDeleteButton>
      </Modal>
    </>
  );
};

export default ConfirmationModel;
