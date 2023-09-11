import React from 'react';
import Form from 'antd/es/form';
import type { FormInstance, Rule } from 'antd/es/form';
import Input from 'antd/es/input';
import Radio from 'antd/es/radio';
import type { CheckboxOptionType } from 'antd/es/checkbox/Group';
import Row from 'antd/es/row';
import Space from 'antd/es/space';
import DatePicker from 'antd/es/date-picker';
import {
  BOOL_RADIO_OPTS,
  STATUS_RADIO_OPTS,
  UpdateSiteRequest,
} from '../ducks/types';
import { Flex, SubmitButton } from '../../themedComponents';
import TitleStack from '../../titleStack';
import {
  SiteEntry,
  SiteEntryFields,
} from '../../../containers/treePage/ducks/types';
import { stringNumberRules } from '../../../utils/formRules';
import { getSEFieldDisplayName } from '../../../utils/stringFormat';
import { useTranslation } from 'react-i18next';
import { n } from '../../../utils/stringFormat';
import { site } from '../../../constants';
import moment from 'moment';

interface RadioInputProps {
  readonly name: string;
  readonly options?: CheckboxOptionType[];
}

interface StringInputProps extends RadioInputProps {
  readonly placeholder: string;
  readonly rules?: Rule[];
}

interface DateSelectorProps {
  readonly name: string;
}

interface UpdateSiteFormProps {
  readonly formInstance: FormInstance;
  readonly onFinish: (request: UpdateSiteRequest) => void;
  readonly initialSiteEntry?: SiteEntry;
}

const UpdateSiteForm: React.FC<UpdateSiteFormProps> = ({
  formInstance,
  onFinish,
  initialSiteEntry,
}) => {
  const { t } = useTranslation(n(site, ['treeInfoTypes', 'forms']), {
    nsMode: 'fallback',
  });

  const RadioInput: React.FC<RadioInputProps> = ({ name, options }) => {
    const radioOptions = options ?? BOOL_RADIO_OPTS;
    return (
      <Form.Item name={name}>
        <Radio.Group>
          <Space direction="vertical">
            {radioOptions.map((option: CheckboxOptionType) => (
              <Radio key={option.label as string} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>
    );
  };

  const StringInput: React.FC<StringInputProps> = ({
    name,
    placeholder,
    rules,
  }) => {
    return (
      <Form.Item name={name} rules={rules}>
        <Input placeholder={placeholder} />
      </Form.Item>
    );
  };

  const DateSelector: React.FC<DateSelectorProps> = ({ name }) => {
    return (
      <Form.Item name={name}>
        <DatePicker format={'MM/DD/YYYY'} />
      </Form.Item>
    );
  };

  return (
    <Form
      name="basic"
      form={formInstance}
      onFinish={onFinish}
      style={{ width: '100%' }}
      initialValues={{
        ...initialSiteEntry,
        plantingDate: initialSiteEntry?.plantingDate
          ? moment(initialSiteEntry?.plantingDate)
          : null,
      }}
    >
      <Flex>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.TREE_PRESENT)}
          minWidth={'150px'}
        >
          <RadioInput name={SiteEntryFields.TREE_PRESENT} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.STATUS)}
          minWidth={'150px'}
        >
          <RadioInput
            name={SiteEntryFields.STATUS}
            options={STATUS_RADIO_OPTS}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.STUMP)}
          minWidth={'150px'}
        >
          <RadioInput name={SiteEntryFields.STUMP} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.MULTISTEM)}
          minWidth={'150px'}
        >
          <RadioInput name={SiteEntryFields.MULTISTEM} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.DISCOLORING)}
          minWidth={'150px'}
        >
          <RadioInput name={SiteEntryFields.DISCOLORING} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.LEANING)}
          minWidth={'150px'}
        >
          <RadioInput name={SiteEntryFields.LEANING} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.CONSTRICTING_GRATE)}
          minWidth={'150px'}
        >
          <RadioInput name={SiteEntryFields.CONSTRICTING_GRATE} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.WOUNDS)}
          minWidth={'150px'}
        >
          <RadioInput name={SiteEntryFields.WOUNDS} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.POOLING)}
          minWidth={'150px'}
        >
          <RadioInput name={SiteEntryFields.POOLING} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.STAKES_WITH_WIRES)}
          minWidth={'150px'}
        >
          <RadioInput name={SiteEntryFields.STAKES_WITH_WIRES} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.STAKES_WITHOUT_WIRES)}
          minWidth={'150px'}
        >
          <RadioInput name={SiteEntryFields.STAKES_WITHOUT_WIRES} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.LIGHT)}
          minWidth={'150px'}
        >
          <RadioInput name={SiteEntryFields.LIGHT} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.BICYCLE)}
          minWidth={'150px'}
        >
          <RadioInput name={SiteEntryFields.BICYCLE} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.BAG_EMPTY)}
          minWidth={'150px'}
        >
          <RadioInput name={SiteEntryFields.BAG_EMPTY} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.BAG_FILLED)}
          minWidth={'150px'}
        >
          <RadioInput name={SiteEntryFields.BAG_FILLED} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.TAPE)}
          minWidth={'150px'}
        >
          <RadioInput name={SiteEntryFields.TAPE} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.SUCKER_GROWTH)}
          minWidth={'150px'}
        >
          <RadioInput name={SiteEntryFields.SUCKER_GROWTH} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.RAISED_BED)}
          minWidth={'150px'}
        >
          <RadioInput name={SiteEntryFields.RAISED_BED} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.FENCE)}
          minWidth={'150px'}
        >
          <RadioInput name={SiteEntryFields.FENCE} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.TRASH)}
          minWidth={'150px'}
        >
          <RadioInput name={SiteEntryFields.TRASH} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.WIRES)}
          minWidth={'150px'}
        >
          <RadioInput name={SiteEntryFields.WIRES} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.GRATE)}
          minWidth={'150px'}
        >
          <RadioInput name={SiteEntryFields.GRATE} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.PLANTING_DATE)}
          minWidth={'150px'}
        >
          <DateSelector name={SiteEntryFields.PLANTING_DATE} />
        </TitleStack>
      </Flex>

      <Flex>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.GENUS)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={t('main.genus')}
            name={SiteEntryFields.GENUS}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.SPECIES)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={t('main.species')}
            name={SiteEntryFields.SPECIES}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.COMMON_NAME)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={t('main.commonName')}
            name={SiteEntryFields.COMMON_NAME}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.CONFIDENCE)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={t('sftt.confidence')}
            name={SiteEntryFields.CONFIDENCE}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.COVERAGE)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={t('sftt.coverage')}
            name={SiteEntryFields.COVERAGE}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.PRUNING)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={t('update_site.placeholder.pruning')}
            name={SiteEntryFields.PRUNING}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.CONDITION)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={t('sftt.condition')}
            name={SiteEntryFields.CONDITION}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.SITE_TYPE)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={t('sftt.siteType')}
            name={SiteEntryFields.SITE_TYPE}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.SIDEWALK_WIDTH)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={t('sftt.sidewalkWidth')}
            name={SiteEntryFields.SIDEWALK_WIDTH}
            rules={stringNumberRules}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.DIAMETER)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={t('update_site.placeholder.diameter')}
            name={SiteEntryFields.DIAMETER}
            rules={stringNumberRules}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.CIRCUMFERENCE)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={t('update_site.placeholder.circumference')}
            name={SiteEntryFields.CIRCUMFERENCE}
            rules={stringNumberRules}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.SITE_WIDTH)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={t('update_site.placeholder.site_width')}
            name={SiteEntryFields.SITE_WIDTH}
            rules={stringNumberRules}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.SITE_LENGTH)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={t('update_site.placeholder.site_length')}
            name={SiteEntryFields.SITE_LENGTH}
            rules={stringNumberRules}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.MATERIAL)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={t('update_site.placeholder.material')}
            name={SiteEntryFields.MATERIAL}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.TREE_NOTES)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={t('sftt.treeNotes')}
            name={SiteEntryFields.TREE_NOTES}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.SITE_NOTES)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={t('sftt.siteNotes')}
            name={SiteEntryFields.SITE_NOTES}
          />
        </TitleStack>
      </Flex>

      <Row justify={'end'}>
        <SubmitButton htmlType="submit">{t('submit')}</SubmitButton>
      </Row>
    </Form>
  );
};

export default UpdateSiteForm;
