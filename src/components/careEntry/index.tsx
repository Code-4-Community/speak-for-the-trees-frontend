import React, { useState } from 'react';
import { Row, Col, Typography, Button, Form } from 'antd';
import { DARK_GREEN, MID_GREEN, TEXT_GREY } from '../../utils/colors';
import { EditOutlined } from '@ant-design/icons';
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

interface CareEntryProps {
  readonly activity: TreeCare;
  readonly onFinishEditStewardship: (
    activityId: number,
    form: FormInstance<RecordStewardshipRequest>,
  ) => (values: RecordStewardshipRequest) => void;
}

const CareEntry: React.FC<CareEntryProps> = ({
  activity,
  onFinishEditStewardship,
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
            <EditButton type="primary" onClick={() => setShowForm(!showForm)}>
              <EditOutlined />
            </EditButton>
          </Col>
        </Row>
        {showForm && (
          <StewardshipForm
            onFinish={onFinishEditStewardship(
              activity.id,
              stewardshipFormInstance,
            )}
            form={stewardshipFormInstance}
          />
        )}
      </Entry>
    </>
  );
};

export default CareEntry;
