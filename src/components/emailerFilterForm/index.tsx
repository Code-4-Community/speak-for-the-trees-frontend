import React, { useCallback, useState } from 'react';
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
import apiClient from '../../api/apiClient';

const StyledCollapse = styled(Collapse)`
  max-width: 400px;
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

function activityCountRange(filters: EmailerFilters): [number, number] {
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

let commonNameOptions: { value: string }[] = [];
apiClient.getAllCommonNames().then((res) => {
  commonNameOptions = res.map((name) => {
    return { value: name };
  });
});

const EmailerFilterForm: React.FC<EmailerFilterFormProps> = ({
  filters,
  setFilters,
}) => {
  const [neighborhoodSearch, setNeighborhoodSearch] = useState<string>('');
  const [namesSearch, setNamesSearch] = useState<string>('');

  const onAddFilter = useCallback(
    (
      key: 'neighborhoods' | 'commonNames',
      options: { value: string }[],
      searchValue: string,
      warning: string,
    ) => {
      return () => {
        if (options.map((option) => option.value).includes(searchValue)) {
          if (!filters[key].includes(searchValue)) {
            setFilters({ ...filters, [key]: [...filters[key], searchValue] });
          }
        } else {
          message.warn(warning);
        }
      };
    },
    [filters, setFilters],
  );

  return (
    <StyledCollapse ghost={true}>
      <Collapse.Panel header="Activity Count" key="activityCount">
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
      <Collapse.Panel header="Adoption Date" key="adoptionDate">
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
      <Collapse.Panel header="Last Activity Date" key="lastActivityDate">
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
      <Collapse.Panel header="Neighborhood" key="neighborhood">
        <StyledAutoComplete
          placeholder="Enter a neighborhood"
          options={neighborhoodOptions}
          value={neighborhoodSearch}
          onChange={(text: string) => setNeighborhoodSearch(text)}
          onSelect={(value: string) => setNeighborhoodSearch(value)}
          filterOption={(input: string, option) =>
            option?.value.toLowerCase().includes(input.toLowerCase())
          }
        />
        <Button
          type="primary"
          onClick={onAddFilter(
            'neighborhoods',
            neighborhoodOptions,
            neighborhoodSearch,
            'Must add a valid neighborhood',
          )}
        >
          Add
        </Button>
      </Collapse.Panel>
      <Collapse.Panel header="Common Name" key="commonName">
        <StyledAutoComplete
          placeholder="Enter a tree name"
          options={commonNameOptions}
          value={namesSearch}
          onChange={(text: string) => setNamesSearch(text)}
          onSelect={(value: string) => setNamesSearch(value)}
          filterOption={(input: string, option) =>
            option?.value.toLowerCase().includes(input.toLowerCase())
          }
        />
        <Button
          type="primary"
          onClick={onAddFilter(
            'commonNames',
            commonNameOptions,
            namesSearch,
            'Must add a valid tree name',
          )}
        >
          Add
        </Button>
      </Collapse.Panel>
    </StyledCollapse>
  );
};

export default EmailerFilterForm;
