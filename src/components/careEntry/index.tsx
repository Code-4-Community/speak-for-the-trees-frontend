import React, { useState } from 'react';
import { TreeCare } from '../../containers/treePage/ducks/types';
import { Row, Col, Typography, Button, Form, Modal } from 'antd';
import { DARK_GREEN, TEXT_GREY } from '../../utils/colors';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import { TitleProps } from 'antd/lib/typography/Title';
import styled from 'styled-components';
import StewardshipForm from '../forms/stewardshipForm';

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
  const [showForm, setShowForm] = useState<boolean>(false);
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
              <EditButton type="primary" onClick={() => setShowForm(!showForm)}>
                <EditOutlined />
              </EditButton>
            )}
          </Col>
        </Row>
        <Modal
          bodyStyle={{ height: '220px', paddingBottom: '15px' }}
          title="Edit stewardship"
          visible={showForm}
          onCancel={() => setShowForm(false)}
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
      </Entry>
    </>
  );
};

export default CareEntry;
