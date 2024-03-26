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

const EmailerFilterControls: React.FC<EmailerFilterControlsProps> = ({

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

  return <p></p>;
};

export default EmailerFilterControls;
