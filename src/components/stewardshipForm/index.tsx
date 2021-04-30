import React from 'react';
import moment from 'moment';
import { Button, Form, Checkbox, Typography, DatePicker } from 'antd';
import styled from 'styled-components';
import { activitiesDateRules, activitiesRules } from '../../utils/formRules';

const { Paragraph } = Typography;

const ItemLabel = styled(Paragraph)`
  line-height: 0px;
`;

const TreeDatePicker = styled(DatePicker)`
  width: 50%;
`;

const StewardshipForm: React.FC = () => {
  const stewardshipOptions = [
    'Watered',
    'Mulched',
    'Weeded',
    'Cleared Waste & Litter',
  ];

  const onFinishRecordStewardship = (values: {
    activityDate: moment.Moment;
    stewardshipActivities: string[];
  }) => {
    /*Placeholder */
  };

  return (
    <>
      <Form name="recordStewardship" onFinish={onFinishRecordStewardship}>
        <ItemLabel>Activity Date</ItemLabel>
        <Form.Item
          name="activityDate"
          rules={ activitiesDateRules }
        >
          <TreeDatePicker defaultValue={moment()} format={'MM/DD/YYYY'} />
        </Form.Item>
        <ItemLabel>Stewardship Activites</ItemLabel>
        <Form.Item
          name="stewardshipActivites"
          rules={ activitiesRules } 
        >
          <Checkbox.Group options={stewardshipOptions} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default StewardshipForm;
