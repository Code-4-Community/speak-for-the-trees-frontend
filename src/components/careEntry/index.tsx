import React, { useState } from 'react';
import { TreeCare } from '../../containers/treePage/ducks/types';
import { Row, Col, Typography, Button, Form, Modal, message } from 'antd';
import {
  DARK_GREEN,
  TEXT_GREY,
  LIGHT_RED,
  LIGHT_GREY,
  WHITE,
  RED,
  PINK,
} from '../../utils/colors';
import { treeCareToMoment } from '../../utils/treeFunctions';
import { EditOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { isAdmin, getUserID } from '../../auth/ducks/selectors';
import styled from 'styled-components';
import StewardshipForm from '../forms/stewardshipForm';
import { LinkButton } from '../linkButton';
import { useParams } from 'react-router-dom';
import { RecordStewardshipRequest } from '../forms/ducks/types';
import { getSiteData } from '../../containers/treePage/ducks/thunks';
import protectedApiClient from '../../api/protectedApiClient';
import { TreeParams } from '../../containers/treePage';
import { ActivityRequest } from '../../containers/treePage/ducks/types';
import { C4CState } from '../../store';

const Entry = styled.div`
  margin: 15px;
`;

const EntryDate = styled(Typography.Paragraph)`
  display: inline;
  text-align: center;
  line-height: 0px;
  font-size: 18px;
  font-weight: bold;
  color: ${DARK_GREEN};
`;

const EntryMessage = styled(Typography.Paragraph)`
  display: inline;
  text-align: center;
  line-height: 0px;
  color: ${TEXT_GREY};
`;

const EditButton = styled(Button)`
  color: ${WHITE};
  font-size: 20px;
  padding: 0px 10px;
  line-height: 0px;
`;

const StyledClose = styled(CloseOutlined)`
  color: ${RED};
  padding: 5px;
  border-radius: 3px;

  & :hover {
    background-color: ${PINK};
  }
`;

const DeleteActivityButton = styled(LinkButton)`
  color: ${WHITE};
  margin: 10px;
  padding: 0px 10px;
  background: ${LIGHT_RED};
  border: none;

  & :hover {
    color: ${LIGHT_RED};
    background-color: ${LIGHT_GREY};
  }
`;

const ConfirmDelete = styled(Button)`
  margin: 10px;
  padding-left: 10px;

  & :hover {
    background-color: ${LIGHT_GREY};
  }
`;

interface CareEntryProps {
  readonly activity: TreeCare;
}

const CareEntry: React.FC<CareEntryProps> = ({ activity }) => {
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [showDeleteForm, setShowDeleteForm] = useState<boolean>(false);
  const [stewardshipFormInstance] = Form.useForm();

  const id = Number(useParams<TreeParams>().id);
  const dispatch = useDispatch();

  function onFinishEditStewardship(values: RecordStewardshipRequest) {
    const activities: ActivityRequest = {
      date: values.activityDate.format('L'),
      watered: values.stewardshipActivities.includes('Watered'),
      mulched: values.stewardshipActivities.includes('Mulched'),
      cleaned: values.stewardshipActivities.includes('Cleared Waste & Litter'),
      weeded: values.stewardshipActivities.includes('Weeded'),
    };
    protectedApiClient
      .editStewardship(activity.activityId, activities)
      .then(() => {
        message.success('Stewardship modified');
        stewardshipFormInstance.resetFields();
        dispatch(getSiteData(id));
      })
      .catch((err) =>
        message.error(`Failed to record stewardship: ${err.response.data}`),
      );
  }

  function onClickDeleteActivity() {
    protectedApiClient
      .deleteStewardship(activity.activityId)
      .then(() => {
        message.success('Stewardship Activity Deleted');
        dispatch(getSiteData(id));
      })
      .catch((err) => {
        message.error(
          `Failed to delete stewardship activity: ${err.response.data}`,
        );
      });
  }

  const userIsAdmin: boolean = useSelector((state: C4CState) =>
    isAdmin(state.authenticationState.tokens),
  );

  const userId: number = useSelector((state: C4CState) =>
    getUserID(state.authenticationState.tokens),
  );

  const showButtons = userIsAdmin || userId === activity.userId;

  return (
    <>
      <Entry>
        <Row>
          <Col span={5}>
            <EntryDate>{activity.month + ' ' + activity.day}</EntryDate>
          </Col>
          <Col span={showButtons ? 13 : 18}>
            <EntryMessage>{activity.message}</EntryMessage>
          </Col>
          {showButtons && (
            <Col span={5}>
              <div style={{ float: 'right' }}>
                <EditButton
                  type="primary"
                  onClick={() => setShowEditForm(!showEditForm)}
                >
                  <EditOutlined />
                </EditButton>
                <DeleteActivityButton
                  type="primary"
                  onClick={() => setShowDeleteForm(!showDeleteForm)}
                >
                  <DeleteOutlined />
                </DeleteActivityButton>
              </div>
            </Col>
          )}
        </Row>
      </Entry>
      <Modal
        bodyStyle={{ paddingBottom: '5px' }}
        title="Edit stewardship"
        visible={showEditForm}
        onCancel={() => setShowEditForm(false)}
        footer={null}
        closeIcon={<StyledClose />}
      >
        <StewardshipForm
          onFinish={onFinishEditStewardship}
          form={stewardshipFormInstance}
          initialDate={treeCareToMoment(activity)}
        />
      </Modal>
      <Modal
        title="Confirm Stewardship Deletion"
        visible={showDeleteForm}
        onOk={() => setShowDeleteForm(false)}
        onCancel={() => setShowDeleteForm(false)}
        footer={null}
        closeIcon={<StyledClose />}
      >
        <p>Are you sure you want to delete this stewardship activity? </p>
        <ConfirmDelete onClick={onClickDeleteActivity}>Delete</ConfirmDelete>
      </Modal>
    </>
  );
};

export default CareEntry;
