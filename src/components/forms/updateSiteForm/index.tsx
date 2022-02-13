import React from 'react';
import { Col, Form, Input, Radio, Row } from 'antd';
import { FormInstance, Rule } from 'antd/es/form';
import { BOOL_RADIO_OPTS, UpdateSiteRequest } from '../ducks/types';
import { Flex, SubmitButton } from '../../themedComponents';
import TitleStack from '../../titleStack';
import { SiteEntryFields } from '../../../containers/treePage/ducks/types';
import { stringNumberRules } from '../../../utils/formRules';
import { getSEFieldDisplayName } from '../../../containers/treePage/ducks/selectors';

interface BoolRadioProps {
  readonly name: string;
}

interface StringInputProps extends BoolRadioProps {
  readonly placeholder: string;
  readonly rules?: Rule[];
}

interface UpdateSiteFormProps {
  readonly formInstance: FormInstance;
  readonly onFinish: (request: UpdateSiteRequest) => void;
}

const UpdateSiteForm: React.FC<UpdateSiteFormProps> = ({
  formInstance,
  onFinish,
}) => {
  const BoolRadioCol: React.FC<BoolRadioProps> = ({ name }) => {
    return (
      <Col span={6}>
        <Form.Item name={name}>
          <Radio.Group options={BOOL_RADIO_OPTS} />
        </Form.Item>
      </Col>
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

  return (
    <Form
      name="basic"
      form={formInstance}
      onFinish={onFinish}
      style={{ width: '100%' }}
      initialValues={{
        treePresent: false,
        multistem: false,
        discoloring: false,
        leaning: false,
        constrictingGrate: false,
        wounds: false,
        pooling: false,
        stakesWithWires: false,
        stakesWithoutWires: false,
        light: false,
        bicycle: false,
        bagEmpty: false,
        bagFilled: false,
        tape: false,
        suckerGrowth: false,
        raisedBed: false,
        fence: false,
        trash: false,
        wires: false,
        grate: false,
        stump: false,
      }}
    >
      <Flex>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.TREE_PRESENT)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.TREE_PRESENT} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.STUMP)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.STUMP} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.MULTISTEM)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.MULTISTEM} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.DISCOLORING)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.DISCOLORING} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.LEANING)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.LEANING} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.CONSTRICTING_GRATE)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.CONSTRICTING_GRATE} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.WOUNDS)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.WOUNDS} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.POOLING)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.POOLING} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.STAKES_WITH_WIRES)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.STAKES_WITH_WIRES} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.STAKES_WITHOUT_WIRES)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.STAKES_WITHOUT_WIRES} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.LIGHT)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.LIGHT} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.BICYCLE)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.BICYCLE} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.BAG_EMPTY)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.BAG_EMPTY} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.BAG_FILLED)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.BAG_FILLED} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.TAPE)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.TAPE} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.SUCKER_GROWTH)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.SUCKER_GROWTH} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.RAISED_BED)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.RAISED_BED} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.FENCE)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.FENCE} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.TRASH)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.TRASH} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.WIRES)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.WIRES} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.GRATE)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.GRATE} />
        </TitleStack>
      </Flex>

      <Flex>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.STATUS)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput placeholder={'Status'} name={SiteEntryFields.STATUS} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.GENUS)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput placeholder={'Genus'} name={SiteEntryFields.GENUS} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.SPECIES)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput placeholder={'Species'} name={SiteEntryFields.SPECIES} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.COMMON_NAME)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={'Common Name'}
            name={SiteEntryFields.COMMON_NAME}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.CONFIDENCE)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={'Confidence'}
            name={SiteEntryFields.CONFIDENCE}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.COVERAGE)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={'Coverage'}
            name={SiteEntryFields.COVERAGE}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.PRUNING)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput placeholder={'Pruning'} name={SiteEntryFields.PRUNING} />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.CONDITION)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={'Condition'}
            name={SiteEntryFields.CONDITION}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.SITE_TYPE)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={'Site Type'}
            name={SiteEntryFields.SITE_TYPE}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.SIDEWALK_WIDTH)}
          minWidth={'20%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={'Sidewalk Width'}
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
            placeholder={'Diameter'}
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
            placeholder={'Circumference'}
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
            placeholder={'Site Width'}
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
            placeholder={'Site Length'}
            name={SiteEntryFields.SITE_LENGTH}
            rules={stringNumberRules}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.MATERIAL)}
          minWidth={'45%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={'Material'}
            name={SiteEntryFields.MATERIAL}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.TREE_NOTES)}
          minWidth={'45%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={'Tree Notes'}
            name={SiteEntryFields.TREE_NOTES}
          />
        </TitleStack>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.SITE_NOTES)}
          minWidth={'45%'}
          flexGrow={'1'}
        >
          <StringInput
            placeholder={'Site Notes'}
            name={SiteEntryFields.SITE_NOTES}
          />
        </TitleStack>
      </Flex>

      <Row justify={'end'}>
        <SubmitButton type="primary" htmlType="submit" size="large">
          Submit
        </SubmitButton>
      </Row>
    </Form>
  );
};

export default UpdateSiteForm;
