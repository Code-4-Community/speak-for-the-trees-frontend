import React, { useState } from 'react';
import { TreeCare } from '../../containers/treePage/ducks/types';
import { Row, Col, Typography, Button, Form, Modal, message } from 'antd';
import {
  DARK_GREEN,
  TEXT_GREY,
  LIGHT_RED,
  LIGHT_GREY,
  WHITE,
} from '../../utils/colors';
import { treeCareToMoment } from '../../utils/treeFunctions';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { isAdmin, getUserID } from '../../auth/ducks/selectors';
import styled from 'styled-components';
import { EditButton, StyledClose } from '../themedComponents';
import StewardshipForm from '../forms/stewardshipForm';
import { LinkButton } from '../linkButton';
import { useParams } from 'react-router-dom';
import { RecordStewardshipRequest } from '../forms/ducks/types';
import { getSiteData } from '../../containers/treePage/ducks/thunks';
import protectedApiClient from '../../api/protectedApiClient';
import { TreeParams } from '../../containers/treePage';
import { ActivityRequest } from '../../containers/treePage/ducks/types';
import { C4CState } from '../../store';
import { useTranslation } from 'react-i18next';
import { site } from '../../constants';
import { n } from '../../utils/stringFormat';

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
  const { t } = useTranslation(n(site, ['careEntry', 'forms']), {
    nsMode: 'fallback',
  });

  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [showDeleteForm, setShowDeleteForm] = useState<boolean>(false);
  const [stewardshipFormInstance] = Form.useForm();

  const id = Number(useParams<TreeParams>().id);
  const dispatch = useDispatch();

  function onFinishEditStewardship(values: RecordStewardshipRequest) {
    const activities: ActivityRequest = {
      date: values.activityDate.format('L'),
      watered: values.stewardshipActivities.includes(
        t('stewardship.activities.watered'),
      ),
      mulched: values.stewardshipActivities.includes(
        t('stewardship.activities.mulched'),
      ),
      cleaned: values.stewardshipActivities.includes(
        t('stewardship.activities.cleaned'),
      ),
      weeded: values.stewardshipActivities.includes(
        t('stewardship.activities.weeded'),
      ),
    };
    protectedApiClient
      .editStewardship(activity.activityId, activities)
      .then(() => {
        message.success(t('messages.edit_success'));
        stewardshipFormInstance.resetFields();
        dispatch(getSiteData(id));
      })
      .catch((err) =>
        message.error(t('messages.edit_failure', { error: err.response.data })),
      );
  }

  function onClickDeleteActivity() {
    protectedApiClient
      .deleteStewardship(activity.activityId)
      .then(() => {
        message.success(t('messages.delete_success'));
        dispatch(getSiteData(id));
      })
      .catch((err) => {
        message.error(
          t('messages.delete_failure', { error: err.response.data }),
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
        title={t('edit_title')}
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
        title={t('delete_title')}
        visible={showDeleteForm}
        onOk={() => setShowDeleteForm(false)}
        onCancel={() => setShowDeleteForm(false)}
        footer={null}
        closeIcon={<StyledClose />}
      >
        <p>{t('delete_message')}</p>
        <ConfirmDelete onClick={onClickDeleteActivity}>
          {t('delete')}
        </ConfirmDelete>
      </Modal>
    </>
  );
};

export default CareEntry;
