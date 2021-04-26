import React from 'react';
import moment from 'moment';
import { Button, Form, Checkbox, Typography, DatePicker } from 'antd';
import styled from 'styled-components';

const { Paragraph } = Typography;

const ItemLabel = styled(Paragraph)`
  line-height: 0px;
`;

const TreeDatePicker = styled(DatePicker)`
  width: 50%;
`;

const StewardshipForm: React.FC = () => {

const stewardshipOptions = ['Watered', 'Mulched', 'Weeded', 'Cleared Waste & Litter'];
  
  return (
    <>
      <Form>
        <ItemLabel>
          Activity Date
        </ItemLabel>
        <Form.Item
          name="Activity Date"
          rules={[
            {
              required: true,
              message: 'Please input the date of the activity!',
            },
          ]}
        >
          <TreeDatePicker defaultValue={moment()} format={'MM/DD/YYYY'} />
        </Form.Item>
        <ItemLabel>
          Stewardship Activites
        </ItemLabel>
        <Form.Item
          name="Stewardship Activites"
          rules={[
            {
              required: true,
              message: 'Please select at least one activity',
            },
          ]}
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

}

export default StewardshipForm;