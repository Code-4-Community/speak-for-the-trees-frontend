import React, { useState } from 'react';
import { Row, Col, Typography, List, Select, Pagination } from 'antd';
import { TreeCare } from '../../containers/treePage/ducks/types';
import { TitleProps } from 'antd/lib/typography/Title';
import { DARK_GREEN, MID_GREEN, TEXT_GREY } from '../../utils/colors';
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
}

const TreeActivity: React.FC<TreeActivityProps> = ({ stewardship }) => {
  const monthShortToLong = (shortMonth: string): string => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    months.forEach((month) => {
      if (shortMonth.substring(0, 3) === month.substring(0, 3)) {
        return month;
      }
    });
    return '';
  };

  const [selectedMonthYear, setSelectedMonthYear] = useState(
    new Date().toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    }),
  );
  const selectedMonthYearStewardship: TreeCare[] = stewardship.filter(
    (entry) =>
      // compare each entry's month and year
      entry.date.substring(0, 3) === selectedMonthYear.substring(0, 3) &&
      entry.year === parseInt(selectedMonthYear.slice(-4)),
  );
  const monthYearOptions = stewardship
    // remove activities with duplicate year and date
    .filter(
      (entry, index, self) =>
        index ===
        self.findIndex(
          (e) =>
            e.year === entry.year &&
            e.date.substring(0, 3) === entry.date.substring(0, 3),
        ),
    )
    // turn the filtered array into an array of labels and values
    .map((entry) => {
      {
        // TODO modify monthShortToLong so that it converts the month correctly
        console.log(monthShortToLong(entry.date));
      }
      return {
        label: entry.date.substring(0, 3) + ' ' + entry.year,
        value: entry.date.substring(0, 3) + ' ' + entry.year,
      };
    })
    // append the current month and year to the options list
    .concat([
      {
        label: new Date().toLocaleString('default', {
          month: 'long',
          year: 'numeric',
        }),
        value: new Date().toLocaleString('default', {
          month: 'short',
          year: 'numeric',
        }),
      },
    ])
    // TODO: implement sort by year-month
    .sort();

  const [pageNumber, setPageNumber] = useState(0);

  return (
    <>
      {console.log(monthYearOptions)}
      <TreeCareTitle>Recent Tree Care Activity</TreeCareTitle>
      <StewardshipActivityDropdownContainer>
        <StewardshipActivityDropdown>
          Month and year to display activities for:{' '}
          <Select
            showSearch
            style={{ width: 200 }}
            onChange={(value: string) => {
              setSelectedMonthYear(value); // TODO: check if this needs to be changed
            }}
            defaultValue={selectedMonthYear}
            options={monthYearOptions}
          />
        </StewardshipActivityDropdown>
      </StewardshipActivityDropdownContainer>
      <List
        dataSource={selectedMonthYearStewardship.slice(
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
        total={selectedMonthYearStewardship.length}
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
