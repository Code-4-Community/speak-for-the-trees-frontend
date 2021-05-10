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
import { activitiesDateRules, activitiesRules } from '../../utils/formRules';

const { Paragraph } = Typography;

const ItemLabel = styled(Paragraph)`
  line-height: 0px;
`;

const TreeDatePicker = styled(DatePicker)`
  width: 50%;
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
          <TreeDatePicker format={'MM/DD/YYYY'} />
        </Form.Item>
        <ItemLabel>Stewardship Activites</ItemLabel>
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
