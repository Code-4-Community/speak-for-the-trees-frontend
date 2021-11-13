import React from 'react';
import { Col, Form, Input, Radio, Row } from 'antd';
import styled from 'styled-components';
import { FormInstance } from 'antd/es/form';
import { BOOL_RADIO_OPTS, UpdateSiteRequest } from '../ducks/types';
import { SubmitButton } from '../../themedComponents';

const TitleCol = styled(Col)`
  font-weight: bold;
  font-size: 16px;
`;

interface BoolRadioProps {
  readonly name: string;
}

interface StringInputProps extends BoolRadioProps {
  readonly placeholder: string;
  readonly span?: number;
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

  const StringInputCol: React.FC<StringInputProps> = ({
    name,
    placeholder,
    span,
  }) => {
    return (
      <Col span={span || 6}>
        <Form.Item name={name}>
          <Input placeholder={placeholder} />
        </Form.Item>
      </Col>
    );
  };

  return (
    <Form
      name="basic"
      form={formInstance}
      onFinish={onFinish}
      style={{ width: '100%' }}
    >
      <Row gutter={[16, 8]}>
        <TitleCol span={6}>Is there a tree present?</TitleCol>
        <TitleCol span={6}>Is the tree multi-stem?</TitleCol>
        <TitleCol span={6}>Is the tree discolored?</TitleCol>
        <TitleCol span={6}>Is the tree leaning?</TitleCol>
      </Row>
      <Row gutter={[16, 8]}>
        <BoolRadioCol name={'treePresent'} />
        <BoolRadioCol name={'multistem'} />
        <BoolRadioCol name={'discoloring'} />
        <BoolRadioCol name={'leaning'} />
      </Row>

      <Row gutter={[16, 8]}>
        <TitleCol span={6}>Is there a constricting grate?</TitleCol>
        <TitleCol span={6}>Is the tree wounded?</TitleCol>
        <TitleCol span={6}>Is there pooling?</TitleCol>
        <TitleCol span={6}>Are there stakes with wires?</TitleCol>
      </Row>
      <Row gutter={[16, 8]}>
        <BoolRadioCol name={'constrictingGrate'} />
        <BoolRadioCol name={'wounds'} />
        <BoolRadioCol name={'pooling'} />
        <BoolRadioCol name={'stakesWithWires'} />
      </Row>

      <Row gutter={[16, 8]}>
        <TitleCol span={6}>Are there stakes without wires?</TitleCol>
        <TitleCol span={6}>Is there light?</TitleCol>
        <TitleCol span={6}>Is there a bicycle tied to the tree?</TitleCol>
        <TitleCol span={6}>Is the bag empty?</TitleCol>
      </Row>
      <Row gutter={[16, 8]}>
        <BoolRadioCol name={'stakesWithoutWires'} />
        <BoolRadioCol name={'light'} />
        <BoolRadioCol name={'bicycle'} />
        <BoolRadioCol name={'bagEmpty'} />
      </Row>

      <Row gutter={[16, 8]}>
        <TitleCol span={6}>Is the bag filled?</TitleCol>
        <TitleCol span={6}>Is there tape?</TitleCol>
        <TitleCol span={6}>Is there sucker growth?</TitleCol>
        <TitleCol span={6}>Is the bed raised?</TitleCol>
      </Row>
      <Row gutter={[16, 8]}>
        <BoolRadioCol name={'bagFilled'} />
        <BoolRadioCol name={'tape'} />
        <BoolRadioCol name={'suckerGrowth'} />
        <BoolRadioCol name={'raisedBed'} />
      </Row>

      <Row gutter={[16, 8]}>
        <TitleCol span={6}>Tree Status</TitleCol>
        <TitleCol span={6}>Tree Genus</TitleCol>
        <TitleCol span={6}>Tree Species</TitleCol>
        <TitleCol span={6}>Common Name</TitleCol>
      </Row>
      <Row gutter={[16, 8]}>
        <StringInputCol placeholder={'Status'} name={'status'} />
        <StringInputCol placeholder={'Genus'} name={'genus'} />
        <StringInputCol placeholder={'Species'} name={'species'} />
        <StringInputCol placeholder={'Common Name'} name={'commonName'} />
      </Row>

      <Row gutter={[16, 8]}>
        <TitleCol span={6}>Confidence</TitleCol>
        <TitleCol span={6}>Coverage</TitleCol>
        <TitleCol span={6}>Pruning</TitleCol>
        <TitleCol span={6}>Condition</TitleCol>
      </Row>
      <Row gutter={[16, 8]}>
        <StringInputCol placeholder={'Confidence'} name={'confidence'} />
        <StringInputCol placeholder={'Coverage'} name={'coverage'} />
        <StringInputCol placeholder={'Pruning'} name={'pruning'} />
        <StringInputCol placeholder={'Condition'} name={'condition'} />
      </Row>

      <Row gutter={[16, 8]}>
        <TitleCol span={6}>Site Type</TitleCol>
        <TitleCol span={6}>Sidewalk Width</TitleCol>
        <TitleCol span={6}>Site Width</TitleCol>
        <TitleCol span={6}>Site Length</TitleCol>
      </Row>
      <Row gutter={[16, 8]}>
        <StringInputCol placeholder={'Site Type'} name={'siteType'} />
        <StringInputCol placeholder={'Sidewalk Width'} name={'sidewalkWidth'} />
        <StringInputCol placeholder={'Site Width'} name={'siteWidth'} />
        <StringInputCol placeholder={'Site Length'} name={'siteLength'} />
      </Row>

      <Row gutter={[16, 8]}>
        <TitleCol span={6}>Fence</TitleCol>
        <TitleCol span={6}>Trash</TitleCol>
        <TitleCol span={6}>Wires</TitleCol>
        <TitleCol span={6}>Grate</TitleCol>
      </Row>
      <Row gutter={[16, 8]}>
        <StringInputCol placeholder={'Fence'} name={'fence'} />
        <StringInputCol placeholder={'Trash'} name={'trash'} />
        <StringInputCol placeholder={'Wires'} name={'wires'} />
        <StringInputCol placeholder={'Grate'} name={'grate'} />
      </Row>

      <Row gutter={[16, 8]}>
        <TitleCol span={6}>Stump</TitleCol>
        <TitleCol span={9}>Tree Notes</TitleCol>
        <TitleCol span={9}>Site Notes</TitleCol>
      </Row>
      <Row gutter={[16, 8]}>
        <StringInputCol placeholder={'Stump'} name={'stump'} />
        <StringInputCol
          placeholder={'Tree Notes'}
          name={'treeNotes'}
          span={9}
        />
        <StringInputCol
          placeholder={'Site Notes'}
          name={'siteNotes'}
          span={9}
        />
      </Row>

      <Row justify={'end'}>
        <SubmitButton type="primary" htmlType="submit" size="large">
          Submit
        </SubmitButton>
      </Row>
    </Form>
  );
};

export default UpdateSiteForm;
