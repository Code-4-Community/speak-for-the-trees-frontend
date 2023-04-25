import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { EmailerFilters } from '../../containers/email/types';
import { Collapse, Slider, DatePicker, Select, message } from 'antd';
import { SliderMarks } from 'antd/lib/slider';
import { Neighborhoods } from '../../assets/content';
import apiClient from '../../api/apiClient';
import { formatActivityCountRange } from '../../utils/stringFormat';

const selectStyles = { minWidth: 200, maxWidth: 500 };

interface EmailerFilterControlsProps {
  filters: EmailerFilters;
  setFilters: React.Dispatch<React.SetStateAction<EmailerFilters>>;
}

const MAX_ACTIVITY_COUNT = 10;

function activityCountRange(filters: EmailerFilters): [number, number] {
  return [
    filters.activityCountMin ?? MAX_ACTIVITY_COUNT + 1,
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

const EmailerFilterControls: React.FC<EmailerFilterControlsProps> = ({
  filters,
  setFilters,
}) => {
  const [commonNameOptions, setCommonNameOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    apiClient
      .getAllCommonNames()
      .then((res) =>
        setCommonNameOptions(
          res.names.map((name) => {
            return { label: name, value: name };
          }),
        ),
      )
      .catch((err) =>
        message.error(`Unable to fetch existing tree names: ${err.message}`),
      );
  }, []);

  return (
    <Collapse ghost>
      <Collapse.Panel header="Activity Count" key="activityCount">
        <p>
          {formatActivityCountRange(
            filters.activityCountMin,
            filters.activityCountMax,
            MAX_ACTIVITY_COUNT,
          )}
        </p>
        <Slider
          range={true}
          marks={activityCountLabels}
          tooltip={{ open: false }}
          min={0}
          max={MAX_ACTIVITY_COUNT + 1}
          value={activityCountRange(filters)}
          onChange={([min, max]) => {
            setFilters({
              ...filters,
              activityCountMin: min > MAX_ACTIVITY_COUNT ? null : min,
              activityCountMax: max > MAX_ACTIVITY_COUNT ? null : max,
            });
          }}
        />
      </Collapse.Panel>
      <Collapse.Panel header="Adoption Date" key="adoptionDate">
        <DatePicker.RangePicker
          allowEmpty={[true, true]}
          value={formatDates(filters.adoptedStart, filters.adoptedEnd)}
          onChange={(_, dateStrings) =>
            setFilters({
              ...filters,
              adoptedStart: dateStrings[0] || null,
              adoptedEnd: dateStrings[1] || null,
            })
          }
          disabledDate={disabledDate}
        />
      </Collapse.Panel>
      <Collapse.Panel header="Last Activity Date" key="lastActivityDate">
        <DatePicker.RangePicker
          allowEmpty={[true, true]}
          value={formatDates(
            filters.lastActivityStart,
            filters.lastActivityEnd,
          )}
          onChange={(_, dateStrings) =>
            setFilters({
              ...filters,
              lastActivityStart: dateStrings[0] || null,
              lastActivityEnd: dateStrings[1] || null,
            })
          }
          disabledDate={disabledDate}
        />
      </Collapse.Panel>
      <Collapse.Panel header="Neighborhood" key="neighborhood">
        <Select
          style={selectStyles}
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
      <Collapse.Panel header="Common Name" key="commonName">
        <Select
          style={selectStyles}
          value={filters.commonNames}
          mode="multiple"
          allowClear
          placeholder="Enter a tree name"
          onChange={(value: string[]) =>
            setFilters({ ...filters, commonNames: value })
          }
          options={commonNameOptions}
        />
      </Collapse.Panel>
    </Collapse>
  );
};

export default EmailerFilterControls;
