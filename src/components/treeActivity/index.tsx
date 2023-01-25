import React, { useState } from 'react';
import { Typography, List, Select, Pagination } from 'antd';
import {
  MonthYearOption,
  TreeCare,
} from '../../containers/treePage/ducks/types';
import { DARK_GREEN, MID_GREEN } from '../../utils/colors';
import { UNABBREVIATED_MONTHS } from '../../assets/content';
import styled from 'styled-components';
import CareEntry from '../careEntry';

const TreeCareTitle = styled(Typography.Paragraph)`
  margin: 0px 5px;
  font-size: 26px;
  font-weight: bold;
  line-height: 26px;
  color: ${DARK_GREEN};
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
  readonly monthYearOptions: MonthYearOption[];
  readonly onFinishEditStewardship: (
    activityId: number,
    form: FormInstance<RecordStewardshipRequest>,
  ) => (values: RecordStewardshipRequest) => void;
}

const TreeActivity: React.FC<TreeActivityProps> = ({
  stewardship,
  monthYearOptions,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString('default', { month: 'short' }),
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const selectedMonthYearStewardship: TreeCare[] = stewardship.filter(
    (entry) => entry.month === selectedMonth && entry.year === selectedYear,
  );
  const selectOptions: {
    label: string;
    value: string;
  }[] = monthYearOptions.map((monthYear) => {
    return {
      label: UNABBREVIATED_MONTHS[monthYear.month] + ' ' + monthYear.year,
      value: monthYear.month + ' ' + monthYear.year,
    };
  });

  const [pageNumber, setPageNumber] = useState(0);

  return (
    <>
      {/* {console.log(selectOptions)} */}
      <TreeCareTitle>Recent Tree Care Activity</TreeCareTitle>
      <StewardshipActivityDropdownContainer>
        <StewardshipActivityDropdown>
          Month and year to display activities for:{' '}
          <Select
            showSearch
            style={{ width: 200 }}
            onChange={(value: string) => {
              setSelectedMonth(value.substring(0, 3));
              setSelectedYear(parseInt(value.slice(-4), 10));
            }}
            defaultValue={selectedMonth + ' ' + selectedYear}
            options={selectOptions}
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
        renderItem={(activity, key) => (
          <CareEntry key={key} activity={activity} />
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
