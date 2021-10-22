import React, { useState } from 'react';
import { Row, Col, Typography, List, Select, Pagination } from 'antd';
import { TreeCare } from '../../containers/treePage/ducks/types';
import { TitleProps } from 'antd/lib/typography/Title';
import { DARK_GREEN, MID_GREEN, TEXT_GREY } from '../../utils/colors';
import styled from 'styled-components';

const { Paragraph } = Typography;
const { Option } = Select;

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

const StewardshipActivityDropdownContainer = styled.div`
  margin: -10px 0 -5px 5px;
`;

const StewardshipActivityDropdown = styled.div`
  font-size: 15px;
  color: ${MID_GREEN};
`;

const CenteredPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  & .ant-pagination-item-active {
    background-color: white;
  }
  & .ant-pagination-item-active :hover {
    background-color: ${DARK_GREEN};
  }
`;

interface TreeActivityProps {
  readonly stewardship: TreeCare[];
  readonly limit?: number;
}

const TreeActivity: React.FC<TreeActivityProps> = ({ stewardship }) => {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString('default', {
      month: 'long',
    }),
  );
  const [pageNumber, setPageNumber] = useState(0);
  const selectedMonthStewardship: TreeCare[] = stewardship.filter(
    (entry) => entry.date.substring(0, 3) === selectedMonth.substring(0, 3),
  );

  return (
    <>
      <TreeCareTitle>Recent Tree Care Activity</TreeCareTitle>
      <StewardshipActivityDropdownContainer>
        <StewardshipActivityDropdown>
          Month to display activities for:{' '}
          <Select
            showSearch
            style={{ width: 200 }}
            onChange={(value: string) => {
              setSelectedMonth(value);
            }}
            defaultValue={selectedMonth}
          >
            <Option value="Jan">January</Option>
            <Option value="Feb">February</Option>
            <Option value="Mar">March</Option>
            <Option value="Apr">April</Option>
            <Option value="May">May</Option>
            <Option value="Jun">June</Option>
            <Option value="Jul">July</Option>
            <Option value="Aug">August</Option>
            <Option value="Sep">September</Option>
            <Option value="Oct">October</Option>
            <Option value="Nov">November</Option>
            <Option value="Dec">December</Option>
          </Select>
        </StewardshipActivityDropdown>
      </StewardshipActivityDropdownContainer>
      <List
        dataSource={selectedMonthStewardship.slice(
          10 * pageNumber,
          10 * pageNumber + 10,
        )}
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
      <CenteredPagination
        defaultCurrent={1}
        total={selectedMonthStewardship.length}
        onChange={(page: number) => {
          setPageNumber(page - 1);
        }}
        hideOnSinglePage={true}
        pageSize={10}
      />
    </>
  );
};

export default TreeActivity;
