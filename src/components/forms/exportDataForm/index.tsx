import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Form,
  FormInstance,
  InputNumber,
  Select,
  Typography,
} from 'antd';
import { site } from '../../../App';
import { positiveNumberRules, requiredRule } from '../../../utils/formRules';
import { InlineFormItem } from '../../themedComponents';
import { ReportTypes } from '../../../containers/reports';
import { n } from '../../../utils/stringFormat';

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
  const { t } = useTranslation(n(site, ['forms']), { nsMode: 'fallback' });

  return (
    <Form name="downloadCsv" form={formInstance} onFinish={onFinish}>
      <Form.Item
        name="type"
        rules={requiredRule(t('export_data.report_required'))}
      >
        <Select
          placeholder={t('export_data.report_type_placeholder')}
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
        {t('export_data.export_data')}
      </Typography.Paragraph>
      <Form.Item>
        <Button htmlType="submit" size="middle">
          {t('export_data.load_report')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ExportDataForm;
