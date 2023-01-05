import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { DARK_GREEN, MID_GREEN, TEXT_GREY } from '../../utils/colors';
import { EditOutlined } from '@ant-design/icons';
import { TitleProps } from 'antd/lib/typography/Title';
import styled from 'styled-components';

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
`;

interface CareEntryProps {
  readonly activity: TreeCare;
  readonly key: number;
}

const CareEntry: React.FC<CareEntryProps> = ({ activity, key }) => {
  return (
    <>
      <Entry key={key}>
        <Row>
          <Col span={5}>
            <EntryDate>{activity.month + ' ' + activity.day}</EntryDate>
          </Col>
          <Col span={1} />
          <Col span={18}>
            <EntryMessage>{activity.message}</EntryMessage>
            <EditButton type="primary">
              <EditOutlined />
            </EditButton>
          </Col>
        </Row>
      </Entry>
    </>
  );
};

export default CareEntry;
