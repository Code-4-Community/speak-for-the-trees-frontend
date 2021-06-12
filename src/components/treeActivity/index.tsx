import React from 'react';
import { Row, Col, Typography, List } from 'antd';
import { TreeCare } from '../../containers/treePage/ducks/types';
import { TitleProps } from 'antd/lib/typography/Title';
import { DARK_GREEN, TEXT_GREY } from '../../utils/colors';
import styled from 'styled-components';

const { Paragraph } = Typography;

const TreeCareTitle = styled(Paragraph)`
  margin: 0px 5px;
  font-size: 26px;
  font-weight: bold;
  line-height: 26px;
  color: ${DARK_GREEN};
`;

const CareEntry = styled.div`
  margin: 15px;
`;

const EntryDate = styled(Paragraph)<TitleProps>`
  display: inline;
  text-align: center;
  line-height: 0px;
  font-size: 18px;
  font-weight: bold;
  color: ${DARK_GREEN};
`;

const EntryMessage = styled(Paragraph)`
  display: inline;
  text-align: center;
  line-height: 0px;
  color: ${TEXT_GREY};
`;

interface TreeActivityProps {
  readonly stewardship: TreeCare[];
  readonly limit?: number;
}

const TreeActivity: React.FC<TreeActivityProps> = ({ stewardship, limit }) => {
  return (
    <>
      <TreeCareTitle>Recent Tree Care Activity</TreeCareTitle>
      <List
        dataSource={
          limit ? stewardship.splice(stewardship.length - limit) : stewardship
        }
        itemLayout="vertical"
        locale={{
          emptyText: 'No Stewardship Activities Recorded for this Tree',
        }}
        renderItem={(value, key) => (
          <CareEntry key={key}>
            <Row>
              <Col span={5}>
                <EntryDate>{value.date}</EntryDate>
              </Col>
              <Col span={1} />
              <Col span={18}>
                <EntryMessage>{value.message}</EntryMessage>
              </Col>
            </Row>
          </CareEntry>
        )}
      />
    </>
  );
};

export default TreeActivity;
