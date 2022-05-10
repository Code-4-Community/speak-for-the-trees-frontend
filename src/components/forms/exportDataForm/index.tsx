import React from 'react';
import {
  Button,
  Form,
  FormInstance,
  InputNumber,
  Select,
  Typography,
} from 'antd';
import { positiveNumberRules, requiredRule } from '../../../utils/formRules';
import { InlineFormItem } from '../../themedComponents';
import { ReportTypes } from '../../../containers/reports';

interface ExportDataFormProps {
  readonly formInstance: FormInstance;
  readonly onFinish: () => void;
  readonly onUpdate: () => void;
}

const ExportDataForm: React.FC<ExportDataFormProps> = ({
  formInstance,
  onFinish,
  onUpdate,
}) => {
  return (
    <Form name="downloadCsv" form={formInstance} onFinish={onFinish}>
      <Form.Item name="type" rules={requiredRule('Must pick a report!')}>
        <Select
          placeholder={'Select the report to download.'}
          onSelect={onUpdate}
        >
          <Select.Option value={ReportTypes.ADOPTION}>
            {ReportTypes.ADOPTION}
          </Select.Option>
          <Select.Option value={ReportTypes.STEWARDSHIP}>
            {ReportTypes.STEWARDSHIP}
          </Select.Option>
        </Select>
      </Form.Item>
      <Typography.Paragraph>
        Export data from the past
        <InlineFormItem
          name="previousDays"
          rules={positiveNumberRules(formInstance, 'previousDays')}
        >
          <InputNumber defaultValue={undefined} onChange={onUpdate} />
        </InlineFormItem>
        days (leave empty to export all data).
      </Typography.Paragraph>
      <Form.Item>
        <Button htmlType={'submit'} size="middle">
          Load Report
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ExportDataForm;
