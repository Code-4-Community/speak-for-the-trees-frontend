import React, { useState } from 'react';
import { TreeCare } from '../../containers/treePage/ducks/types';
import { Row, Col, Typography, Button, Form, Modal } from 'antd';
import { DARK_GREEN, TEXT_GREY } from '../../utils/colors';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import { TitleProps } from 'antd/lib/typography/Title';
import styled from 'styled-components';
import StewardshipForm from '../forms/stewardshipForm';

interface CareEntryProps {
  readonly activity: TreeCare;
  readonly onFinishEditStewardship: (
    activityId: number,
    form: FormInstance<RecordStewardshipRequest>,
  ) => (values: RecordStewardshipRequest) => void;
  readonly showButtons: boolean;
}

const CareEntry: React.FC<CareEntryProps> = ({
  activity,
  onFinishEditStewardship,
  showButtons,
}) => {
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [stewardshipFormInstance] = Form.useForm();

  return (
    <>
      <Entry>
        <Row>
          <Col span={5}>
            <EntryDate>{activity.month + ' ' + activity.day}</EntryDate>
          </Col>
          <Col span={1} />
          <Col span={18}>
            <EntryMessage>{activity.message}</EntryMessage>
            {showButtons && (
              <EditButton
                type="primary"
                onClick={() => setShowEditForm(!showEditForm)}
              >
                <EditOutlined />
              </EditButton>
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
            activity.id,
            stewardshipFormInstance,
          )}
          form={stewardshipFormInstance}
        />
      </Modal>
    </>
  );
};

export default CareEntry;
