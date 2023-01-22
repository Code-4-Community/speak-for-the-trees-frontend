import React, { useState } from 'react';
import moment from 'moment';
import { TreeCare } from '../../containers/treePage/ducks/types';
import { Row, Col, Typography, Button, Form, Modal } from 'antd';
import {
  DARK_GREEN,
  TEXT_GREY,
  LIGHT_RED,
  LIGHT_GREY,
} from '../../utils/colors';
import { EditOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import { TitleProps } from 'antd/lib/typography/Title';
import { useSelector } from 'react-redux';
import { isAdmin, getUserID } from '../../auth/ducks/selectors';
import styled from 'styled-components';
import StewardshipForm from '../forms/stewardshipForm';
import { LinkButton } from '../linkButton';
import { useParams } from 'react-router-dom';

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
  float: right;
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
  readonly onFinishEditStewardship: (
    activityId: number,
    form: FormInstance<RecordStewardshipRequest>,
  ) => (values: RecordStewardshipRequest) => void;
}

function treeCareToMoment(month: string, day: string, year: number) {
  return moment(`${month} ${day} ${year}`, 'MMM Do YYYY');
}

const CareEntry: React.FC<CareEntryProps> = ({
  activity,
  onFinishEditStewardship,
}) => {
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [showDeleteForm, setShowDeleteForm] = useState<boolean>(false);
  const [stewardshipFormInstance] = Form.useForm();

  const id = Number(useParams<TreeParams>().id);
  console.log(id);

  const userIsAdmin: boolean = useSelector((state: C4CState) =>
    isAdmin(state.authenticationState.tokens),
  );

  const userId: number = useSelector((state: C4CState) =>
    getUserID(state.authenticationState.tokens),
  );

  function showButtons(activityOwner) {
    return userIsAdmin || userId == activityOwner;
  }

  return (
    <>
      <Entry>
        <Row>
          <Col span={5}>
            <EntryDate>{activity.month + ' ' + activity.day}</EntryDate>
          </Col>
          <Col span={1} />
          <Col span={16}>
            <EntryMessage>{activity.message}</EntryMessage>
          </Col>
          <Col span={2}>
            {showButtons(activity.ownerId) && (
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
          onFinish={onFinishEditStewardship(
            activity.activityId,
            stewardshipFormInstance,
          )}
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
        <ConfirmDelete
          onClick={() => {
            onClickDeleteActivity(activityToDelete);
          }}
        >
          Delete
        </ConfirmDelete>
      </Modal>
    </>
  );
};

export default CareEntry;
