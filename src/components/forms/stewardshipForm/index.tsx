import React from 'react';
import moment from 'moment';
import { Form, Checkbox, Typography, DatePicker, FormInstance } from 'antd';
import styled from 'styled-components';
import { activitiesDateRules, activitiesRules } from '../../../utils/formRules';
import { SubmitButton } from '../../themedComponents';

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
  initialDate?: moment.Moment;
}

const StewardshipForm: React.FC<StewardshipFormProps> = ({
  onFinish,
  form,
  initialDate,
}) => {
  const stewardshipOptions = [
    'Watered',
    'Mulched',
    'Weeded',
    'Cleared Waste & Litter',
  ];

  const disabledDate = (current: moment.Moment): boolean => {
    // Can not select future days
    return current > moment().endOf('day');
  };

  return (
    <>
      <Form
        name="recordStewardship"
        onFinish={onFinish}
        form={form}
        initialValues={{ activityDate: initialDate }}
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
          <SubmitButton htmlType="submit">Submit</SubmitButton>
        </Form.Item>
      </Form>
    </>
  );
};

StewardshipForm.defaultProps = {
  initialDate: moment(),
};

export default StewardshipForm;
