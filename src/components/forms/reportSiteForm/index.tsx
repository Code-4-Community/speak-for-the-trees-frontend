import React from 'react';
import styled from 'styled-components';
import { Radio, Input, Typography, Form, FormInstance } from 'antd';
import { SubmitButton } from '../../themedComponents';
import { requiredRule } from '../../../utils/formRules';
import { ReportSiteRequest } from '../../../containers/treePage/ducks/types';

const ItemLabel = styled(Typography.Paragraph)`
  line-height: 0px;
`;

interface ReportSiteFormProps {
  form: FormInstance;
  onFinish: (reportInfo: ReportSiteRequest) => void;
}

const reasonOptions = ['Inappropriate Content', 'Incorrect Information'];

const ReportSiteForm: React.FC<ReportSiteFormProps> = ({ form, onFinish }) => {
  return (
    <Form name="reportSite" onFinish={onFinish} form={form}>
      <ItemLabel>Reason</ItemLabel>
      <Form.Item name="reason" rules={requiredRule('A reason is required!')}>
        <Radio.Group options={reasonOptions} />
      </Form.Item>
      <ItemLabel>Description (optional)</ItemLabel>
      <Form.Item name="description">
        <Input.TextArea
          rows={3}
          placeholder="Describe the issue in greater detail"
          maxLength={500}
          showCount
        />
      </Form.Item>
      <Form.Item>
        <SubmitButton htmlType="submit">Submit</SubmitButton>
      </Form.Item>
    </Form>
  );
};

export default ReportSiteForm;
