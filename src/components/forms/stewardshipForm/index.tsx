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
import { useTranslation } from 'react-i18next';
import { site } from '../../../constants';
import { n } from '../../../utils/stringFormat';

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
  const { t } = useTranslation(n(site, ['forms']), {
    nsMode: 'fallback',
  });

  const stewardshipOptions = [
    t('stewardship.activities.watered'),
    t('stewardship.activities.mulched'),
    t('stewardship.activities.weeded'),
    t('stewardship.activities.cleaned'),
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
        <ItemLabel>{t('stewardship.date_label')}</ItemLabel>
        <Form.Item name="activityDate" rules={activitiesDateRules}>
          <TreeDatePicker format={'MM/DD/YYYY'} disabledDate={disabledDate} />
        </Form.Item>
        <ItemLabel>{t('stewardship.activity_label')}</ItemLabel>
        <Form.Item name="stewardshipActivities" rules={activitiesRules}>
          <Checkbox.Group options={stewardshipOptions} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t('submit')}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

StewardshipForm.defaultProps = {
  initialDate: moment(),
};

export default StewardshipForm;
