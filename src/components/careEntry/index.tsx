import React, { useState } from 'react';
import moment from 'moment';
import { TreeCare } from '../../containers/treePage/ducks/types';
import { Row, Col, Typography, Button, Form, Modal, message } from 'antd';
import {
  DARK_GREEN,
  TEXT_GREY,
  LIGHT_RED,
  LIGHT_GREY,
} from '../../utils/colors';
import { EditOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import { TitleProps } from 'antd/lib/typography/Title';
import { useDispatch, useSelector } from 'react-redux';
import { isAdmin, getUserID } from '../../auth/ducks/selectors';
import styled from 'styled-components';
import StewardshipForm from '../forms/stewardshipForm';
import { LinkButton } from '../linkButton';
import { useParams } from 'react-router-dom';
import { RecordStewardshipRequest } from '../forms/ducks/types';
import { getSiteData } from '../../containers/treePage/ducks/thunks';
import protectedApiClient from '../../api/protectedApiClient';

const Entry = styled.div`
  margin: 15px;
`;

const EntryDate = styled(Typography.Paragraph)<TitleProps>`
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
  color: white;
  font-size: 20px;
  padding: 0px 10px;
  line-height: 0px;
`;

const StyledClose = styled(CloseOutlined)`
  color: red;
  padding: 5px;
  border-radius: 3px;

  & :hover {
    background-color: #ffd1d1;
  }
`;

const DeleteActivityButton = styled(LinkButton)`
  color: white;
  margin: 10px;
  padding: 0px 10px;
  background: ${LIGHT_RED};
  border: none;
  &:hover {
    color: ${LIGHT_RED};
    background-color: ${LIGHT_GREY};
  }
`;

const ConfirmDelete = styled(Button)`
  margin: 10px;
  padding-left: 10px;
  &:hover {
    background-color: ${LIGHT_GREY};
  }
`;

interface CareEntryProps {
  readonly activity: TreeCare;
}

function treeCareToMoment(month: string, day: string, year: number) {
  return moment(`${month} ${day} ${year}`, 'MMM Do YYYY');
}

function generateActivityRequest(values: RecordStewardshipRequest) {
  return {
    date: values.activityDate.format('L'),
    watered: values.stewardshipActivities.includes('Watered'),
    mulched: values.stewardshipActivities.includes('Mulched'),
    cleaned: values.stewardshipActivities.includes('Cleared Waste & Litter'),
    weeded: values.stewardshipActivities.includes('Weeded'),
  };
}

const CareEntry: React.FC<CareEntryProps> = ({
  activity,
  onFinishEditStewardship,
}) => {
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [showDeleteForm, setShowDeleteForm] = useState<boolean>(false);
  const [stewardshipFormInstance] = Form.useForm();

  const id = Number(useParams<TreeParams>().id);
  const dispatch = useDispatch();

  function onFinishEditStewardship(values: RecordStewardshipRequest) {
    const activities = generateActivityRequest(values);
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

  const showButtons = userIsAdmin || userId === activity.ownerId;

  return (
    <>
      <Entry>
        <Row>
          <Col span={5}>
            <EntryDate>{activity.month + ' ' + activity.day}</EntryDate>
          </Col>
          <Col span={1} />
          <Col span={13}>
            <EntryMessage>{activity.message}</EntryMessage>
          </Col>
          <Col span={5}>
            {showButtons && (
              <>
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
              </>
            )}
          </Col>
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
          initialDate={treeCareToMoment(
            activity.month,
            activity.day,
            activity.year,
          )}
        />
      </Modal>
      <Modal
        title="Confirm Stewardship Deletion"
        visible={showDeleteForm}
        onOk={() => setShowDeleteForm(false)}
        onCancel={() => setShowDeleteForm(false)}
        footer={null}
      >
        <p>Are you sure you want to delete this stewardship activity? </p>
        <ConfirmDelete onClick={onClickDeleteActivity}>Delete</ConfirmDelete>
      </Modal>
    </>
  );
};

export default CareEntry;
