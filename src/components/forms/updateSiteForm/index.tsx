import React from 'react';
import { Col, Form, Input, Radio, Row } from 'antd';
import { FormInstance, Rule } from 'antd/es/form';
import { BOOL_RADIO_OPTS, UpdateSiteRequest } from '../ducks/types';
import { Flex, SubmitButton } from '../../themedComponents';
import TitleStack from '../../titleStack';
import {
  ExtraSiteEntryNames,
  MainSiteEntryNames,
} from '../../../containers/treePage/ducks/types';
import { stringNumberRules } from '../../../utils/formRules';

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
        <TitleStack title={ExtraSiteEntryNames.treePresent} minWidth={'15%'}>
          <BoolRadioCol name={'treePresent'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.stump} minWidth={'15%'}>
          <BoolRadioCol name={'stump'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.multistem} minWidth={'15%'}>
          <BoolRadioCol name={'multistem'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.discoloring} minWidth={'15%'}>
          <BoolRadioCol name={'discoloring'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.leaning} minWidth={'15%'}>
          <BoolRadioCol name={'leaning'} />
        </TitleStack>
        <TitleStack
          title={ExtraSiteEntryNames.constrictingGrate}
          minWidth={'15%'}
        >
          <BoolRadioCol name={'constrictingGrate'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.wounds} minWidth={'15%'}>
          <BoolRadioCol name={'wounds'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.pooling} minWidth={'15%'}>
          <BoolRadioCol name={'pooling'} />
        </TitleStack>
        <TitleStack
          title={ExtraSiteEntryNames.stakesWithWires}
          minWidth={'15%'}
        >
          <BoolRadioCol name={'stakesWithWires'} />
        </TitleStack>
        <TitleStack
          title={ExtraSiteEntryNames.stakesWithoutWires}
          minWidth={'15%'}
        >
          <BoolRadioCol name={'stakesWithoutWires'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.light} minWidth={'15%'}>
          <BoolRadioCol name={'light'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.bicycle} minWidth={'15%'}>
          <BoolRadioCol name={'bicycle'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.bagEmpty} minWidth={'15%'}>
          <BoolRadioCol name={'bagEmpty'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.bagFilled} minWidth={'15%'}>
          <BoolRadioCol name={'bagFilled'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.tape} minWidth={'15%'}>
          <BoolRadioCol name={'tape'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.suckerGrowth} minWidth={'15%'}>
          <BoolRadioCol name={'suckerGrowth'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.raisedBed} minWidth={'15%'}>
          <BoolRadioCol name={'raisedBed'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.fence} minWidth={'15%'}>
          <BoolRadioCol name={'fence'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.trash} minWidth={'15%'}>
          <BoolRadioCol name={'trash'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.wires} minWidth={'15%'}>
          <BoolRadioCol name={'wires'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.grate} minWidth={'15%'}>
          <BoolRadioCol name={'grate'} />
        </TitleStack>
      </Flex>

      <Flex>
        <TitleStack title={MainSiteEntryNames.status} minWidth={'20%'}>
          <StringInput placeholder={'Status'} name={'status'} />
        </TitleStack>
        <TitleStack title={MainSiteEntryNames.genus} minWidth={'20%'}>
          <StringInput placeholder={'Genus'} name={'genus'} />
        </TitleStack>
        <TitleStack title={MainSiteEntryNames.species} minWidth={'20%'}>
          <StringInput placeholder={'Species'} name={'species'} />
        </TitleStack>
        <TitleStack title={MainSiteEntryNames.commonName} minWidth={'20%'}>
          <StringInput placeholder={'Common Name'} name={'commonName'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.confidence} minWidth={'20%'}>
          <StringInput placeholder={'Confidence'} name={'confidence'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.coverage} minWidth={'20%'}>
          <StringInput placeholder={'Coverage'} name={'coverage'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.pruning} minWidth={'20%'}>
          <StringInput placeholder={'Pruning'} name={'pruning'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.condition} minWidth={'20%'}>
          <StringInput placeholder={'Condition'} name={'condition'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.siteType} minWidth={'20%'}>
          <StringInput placeholder={'Site Type'} name={'siteType'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.sidewalkWidth} minWidth={'20%'}>
          <StringInput
            placeholder={'Sidewalk Width'}
            name={'sidewalkWidth'}
            rules={stringNumberRules}
          />
        </TitleStack>
        <TitleStack title={MainSiteEntryNames.diameter} minWidth={'20%'}>
          <StringInput
            placeholder={'Diameter'}
            name={'diameter'}
            rules={stringNumberRules}
          />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.circumference} minWidth={'20%'}>
          <StringInput
            placeholder={'Circumference'}
            name={'circumference'}
            rules={stringNumberRules}
          />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.siteWidth} minWidth={'20%'}>
          <StringInput
            placeholder={'Site Width'}
            name={'siteWidth'}
            rules={stringNumberRules}
          />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.siteLength} minWidth={'20%'}>
          <StringInput
            placeholder={'Site Length'}
            name={'siteLength'}
            rules={stringNumberRules}
          />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.material} minWidth={'45%'}>
          <StringInput placeholder={'Material'} name={'material'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.treeNotes} minWidth={'45%'}>
          <StringInput placeholder={'Tree Notes'} name={'treeNotes'} />
        </TitleStack>
        <TitleStack title={ExtraSiteEntryNames.siteNotes} minWidth={'45%'}>
          <StringInput placeholder={'Site Notes'} name={'siteNotes'} />
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
