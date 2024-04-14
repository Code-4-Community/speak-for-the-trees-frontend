import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { EmailerFilters } from '../../containers/email/types';
import {
  Collapse,
  Slider,
  DatePicker,
  Select,
  message,
  SelectProps,
} from 'antd';
import { SliderMarks } from 'antd/lib/slider';
import { Neighborhoods } from '../../assets/content';
import apiClient from '../../api/apiClient';
import { formatActivityCountRange } from '../../utils/stringFormat';
import styled from 'styled-components';
import { ReviewImageFilters } from '../../containers/reviewImages/types';
import { DefaultOptionType } from 'antd/es/select';

const AutoCompleteSelect = styled((props: SelectProps) => (
  <Select {...props} />
))`
  min-width: 200px;
  max-width: 500px;
`;

const MAX_ACTIVITY_COUNT = 10;

// convert emailer filter values to the slider's internal values
function activityCountRange(filters: EmailerFilters): [number, number] {
  return [
    filters.activityCountMin,
    filters.activityCountMax ?? MAX_ACTIVITY_COUNT + 1,
  ];
}

function formatDates(
  start: string | null,
  end: string | null,
): [moment.Moment | null, moment.Moment | null] {
  return [start ? moment(start) : null, end ? moment(end) : null];
}

function disabledDate(current: moment.Moment): boolean {
  // Can not select future days
  return current > moment().endOf('day');
}

const activityCountLabels: SliderMarks = {
  0: '0',
  [MAX_ACTIVITY_COUNT + 1]: `${MAX_ACTIVITY_COUNT}+`,
};

const neighborhoodOptions = Object.values(Neighborhoods)
  .sort()
  .map((value) => {
    return { label: value, value };
  });

interface UnapprovedFilterImageFilterControlsProps {
  filters: ReviewImageFilters;
  setFilters: React.Dispatch<React.SetStateAction<ReviewImageFilters>>;
}

const UnapprovedFilterImageControls: React.FC<
  UnapprovedFilterImageFilterControlsProps
> = ({ filters, setFilters }) => {
  const [siteIdOptions, setSiteIdOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const [siteIdInvalidOrNone, setSiteIdError] = useState<{
    status: '' | 'warning' | 'error' | undefined;
    value: string;
  }>({ status: '', value: 'Enter a site id' });

  // TODO: verify what Tree ID means
  return (
    <Collapse ghost>
      <Collapse.Panel header="Date Submitted" key="submittedDate">
        <DatePicker.RangePicker
          allowEmpty={[true, true]}
          value={formatDates(filters.submittedStart, filters.submittedEnd)}
          onChange={(_, dateStrings) =>
            setFilters({
              ...filters,
              submittedStart: dateStrings[0] || null,
              submittedEnd: dateStrings[1] || null,
            })
          }
          disabledDate={disabledDate}
        />
      </Collapse.Panel>
      <Collapse.Panel header="Neighborhood" key="neighborhood">
        <AutoCompleteSelect
          value={filters.neighborhoods}
          mode="multiple"
          allowClear
          placeholder="Enter a neighborhood"
          onChange={(value: Neighborhoods[]) =>
            setFilters({ ...filters, neighborhoods: value })
          }
          options={neighborhoodOptions}
        />
      </Collapse.Panel>
      <Collapse.Panel header="Tree ID" key="siteId">
        <AutoCompleteSelect
          value={filters.siteIds}
          mode="multiple"
          allowClear
          placeholder="Enter a site"
          onChange={(value: number[]) => {
            const valueInt = value.map((v) => Number(v) ?? -1);
            setFilters({ ...filters, siteIds: valueInt });
          }}
          status={siteIdInvalidOrNone.status}
          onSearch={(e) => {
            const numVal = Number(e);
            if (numVal) {
              setSiteIdError({
                status: '',
                value: '',
              });
            } else if (e === '') {
              setSiteIdError({
                status: '',
                value: 'Enter a site id',
              });
            } else {
              setSiteIdError({
                status: 'error',
                value: 'No data. Site IDs must be strings',
              });
            }
            if (e.length > 0) setSiteIdOptions([{ label: e, value: e }]);
          }}
          options={siteIdOptions}
          notFoundContent={siteIdInvalidOrNone.value}
        />
      </Collapse.Panel>
    </Collapse>
  );
};

export default UnapprovedFilterImageControls;
