import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Typography, Form, FormInstance, Select } from 'antd';
import { SubmitButton } from '../../themedComponents';
import { requiredRule } from '../../../utils/formRules';
import { ReportSiteRequest } from '../../../containers/treePage/ducks/types';
import { useTranslation } from 'react-i18next';
import { site } from '../../../constants';
import { n } from '../../../utils/stringFormat';

const ItemLabel = styled(Typography.Paragraph)`
  line-height: 0px;
`;

interface ReportSiteFormProps {
  form: FormInstance;
  onFinish: (reportInfo: ReportSiteRequest) => void;
}

const ReportSiteForm: React.FC<ReportSiteFormProps> = ({ form, onFinish }) => {
  const { t } = useTranslation(n(site, ['forms']), {
    nsMode: 'fallback',
  });

  const reasonOptions = [
    {
      value: 'Inappropriate Content',
      label: t('report_site.options.inappropriate'),
    },
    {
      value: 'Incorrect Information',
      label: t('report_site.options.incorrect'),
    },
  ];

  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  return (
    <Form
      name="reportSite"
      onFinish={onFinish}
      form={form}
      onValuesChange={(_, allValues) => setSubmitDisabled(!allValues.reason)}
    >
      <ItemLabel>{t('report_site.reason_label')}</ItemLabel>
      <Form.Item
        name="reason"
        rules={requiredRule(t('report_site.reason_rule'))}
      >
        <Select options={reasonOptions} placeholder="Select a reason" />
      </Form.Item>
      <ItemLabel style={{ marginTop: '15px' }}>
        {t('report_site.description_label')}
      </ItemLabel>
      <Form.Item name="description" initialValue="">
        <Input.TextArea
          rows={3}
          placeholder={t('report_site.description_placeholder')}
          maxLength={500}
          showCount
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: '0px;' }}>
        <SubmitButton htmlType="submit" disabled={submitDisabled}>
          {t('submit')}
        </SubmitButton>
      </Form.Item>
    </Form>
  );
};

export default ReportSiteForm;
