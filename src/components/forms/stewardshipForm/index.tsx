import React from 'react';
import moment from 'moment';
import {
  Button,
  Form,
  Checkbox,
  Typography,
  DatePicker,
  FormInstance,
} from 'antd';
import styled from 'styled-components';
import { activitiesDateRules, activitiesRules } from '../../../utils/formRules';

const ItemLabel = styled(Typography.Paragraph)`
  line-height: 0px;
`;

const TreeDatePicker = styled(DatePicker)`
  width: 45%;
`;

interface StewardshipFormProps {
  onFinish: (values: {
    activityDate: moment.Moment;
    stewardshipActivities: string[];
  }) => void;
  form: FormInstance;
}

const StewardshipForm: React.FC<StewardshipFormProps> = ({
  onFinish,
  form,
}) => {
  const stewardshipOptions = [
    'Watered',
    'Mulched',
    'Weeded',
    'Cleared Waste & Litter',
  ];

  const disabledDate = (current: moment.Moment): boolean => {
    // Can not select future days or days more than two weeks ago
    return (
      current > moment().endOf('day') || current < moment().subtract(2, 'weeks')
    );
  };

  return (
    <>
      <Form
        name="recordStewardship"
        onFinish={onFinish}
        form={form}
        initialValues={{ activityDate: moment() }}
      >
        <ItemLabel>Activity Date</ItemLabel>
        <Form.Item name="activityDate" rules={activitiesDateRules}>
          <TreeDatePicker format={'MM/DD/YYYY'} disabledDate={disabledDate} />
        </Form.Item>
        <ItemLabel>Stewardship Activities</ItemLabel>
        <Form.Item name="stewardshipActivities" rules={activitiesRules}>
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
