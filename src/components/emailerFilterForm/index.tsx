import React, { useState } from 'react';
import moment from 'moment';
import { EmailerFilters } from '../../containers/email/types';
import {
  Collapse,
  Slider,
  DatePicker,
  AutoComplete,
  Button,
  message,
} from 'antd';
import { SliderMarks } from 'antd/lib/slider';
import styled from 'styled-components';
import { Neighborhoods } from '../../assets/content';

const StyledCollapse = styled(Collapse)`
  max-width: 500px;
`;

const StyledAutoComplete = styled(AutoComplete)`
  width: 200px;
  margin-right: 15px;
`;

interface EmailerFilterFormProps {
  filters: EmailerFilters;
  setFilters: React.Dispatch<React.SetStateAction<EmailerFilters>>;
}

const MAX_COUNT = 10;

function activityCountRange(
  filters: EmailerFilters,
): [number, number | undefined] {
  return [filters.activityCountMin, filters.activityCountMax || MAX_COUNT + 1];
}

const activityCountLabels: SliderMarks = {
  0: '0',
  [MAX_COUNT + 1]: `${MAX_COUNT}+`,
};

const disabledDate = (current: moment.Moment): boolean => {
  // Can not select future days
  return current > moment().endOf('day');
};

const neighborhoodOptions = Object.values(Neighborhoods)
  .map((value) => {
    return { value };
  })
  .sort();

const EmailerFilterForm: React.FC<EmailerFilterFormProps> = ({
  filters,
  setFilters,
}) => {
  const [neighborhoodSearch, setNeighborhoodSearch] = useState<string>('');
  const onNeighborhoodAdd = () => {
    // console.log(neighborhoodSearch in ['Mattapan']);
    if (Object.values(Neighborhoods).find((s) => s === neighborhoodSearch)) {
      setFilters({
        ...filters,
        neighborhoods: [...filters.neighborhoods, neighborhoodSearch],
      });
      setNeighborhoodSearch('');
    } else {
      message.warn('Must add a valid neighborhood');
    }
  };

  return (
    <StyledCollapse ghost={true}>
      <Collapse.Panel header="Activity Count">
        <p>{`${filters.activityCountMin} - ${
          filters.activityCountMax || MAX_COUNT + '+'
        }`}</p>
        <Slider
          range={true}
          marks={activityCountLabels}
          tooltip={{ open: false }}
          min={0}
          max={MAX_COUNT + 1}
          value={activityCountRange(filters)}
          onChange={([min, max]) => {
            setFilters({
              ...filters,
              activityCountMin: min,
              activityCountMax: max > MAX_COUNT ? undefined : max,
            });
          }}
        />
      </Collapse.Panel>
      <Collapse.Panel header="Adoption Date">
        <DatePicker.RangePicker
          onChange={(_, dateStrings) =>
            setFilters({
              ...filters,
              adoptedStart: dateStrings[0],
              adoptedEnd: dateStrings[1],
            })
          }
          disabledDate={disabledDate}
        />
      </Collapse.Panel>
      <Collapse.Panel header="Last Activity Date">
        <DatePicker.RangePicker
          onChange={(_, dateStrings) =>
            setFilters({
              ...filters,
              lastActivityStart: dateStrings[0],
              lastActivityEnd: dateStrings[1],
            })
          }
          disabledDate={disabledDate}
        />
      </Collapse.Panel>
      <Collapse.Panel header="Neighborhood">
        <StyledAutoComplete
          placeholder="Enter a neighborhood"
          options={neighborhoodOptions}
          value={neighborhoodSearch}
          onChange={(text) => setNeighborhoodSearch(text)}
          onSelect={(value: string) => setNeighborhoodSearch(value)}
          filterOption={(input: string, option) =>
            option?.value.toLowerCase().includes(input.toLowerCase())
          }
        />
        <Button type="primary" onClick={onNeighborhoodAdd}>
          Add
        </Button>
      </Collapse.Panel>
      <Collapse.Panel header="Common Name">
        <p>baso</p>
      </Collapse.Panel>
    </StyledCollapse>
  );
};

export default EmailerFilterForm;
