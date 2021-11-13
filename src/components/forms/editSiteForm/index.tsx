import React from 'react';
import { Col, Form, Input, InputNumber, Row, Select } from 'antd';
import styled from 'styled-components';
import { FormInstance } from 'antd/es/form';
import { requiredRule } from '../../../utils/formRules';
import { EditSiteRequest } from '../ducks/types';
import { NEIGHBORHOOD_OPTS } from '../../../assets/content';

const TitleCol = styled(Col)`
  font-weight: bold;
  font-size: 16px;
`;

const FullInputNumber = styled(InputNumber)`
  width: 100%;
`;

interface EditSiteFormProps {
  readonly formInstance: FormInstance<EditSiteRequest>;
}

const EditSiteForm: React.FC<EditSiteFormProps> = ({ formInstance }) => {
  return (
    <>
      <Form name="basic" form={formInstance}>
        <Row gutter={[16, 8]}>
          <TitleCol span={12}>Address</TitleCol>
          <TitleCol span={6}>City</TitleCol>
          <TitleCol span={6}>Zip Code</TitleCol>
        </Row>
        <Row gutter={[16, 8]}>
          <Col span={12}>
            <Form.Item
              name={'address'}
              rules={requiredRule('Please enter an address!')}
            >
              <Input placeholder={'Address'} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name={'city'}
              rules={requiredRule('Please enter a city!')}
            >
              <Input placeholder={'City'} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name={'zip'}
              rules={requiredRule('Please enter a zip code!')}
            >
              <Input placeholder={'Zip Code'} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 8]}>
          <TitleCol span={6}>Block ID</TitleCol>
          <TitleCol span={6}>Neighborhood</TitleCol>
          <TitleCol span={6}>Latitude</TitleCol>
          <TitleCol span={6}>Longitude</TitleCol>
        </Row>
        <Row gutter={[16, 8]}>
          <Col span={6}>
            <Form.Item name={'blockId'}>
              <FullInputNumber placeholder={'Block ID'} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name={'neighborhoodId'}
              rules={requiredRule('Please enter a neighborhood!')}
            >
              <Select options={NEIGHBORHOOD_OPTS} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name={'lat'}
              rules={requiredRule('Please enter a latitude!')}
            >
              <FullInputNumber placeholder={'Latitude'} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name={'lng'}
              rules={requiredRule('Please enter a longitude!')}
            >
              <FullInputNumber placeholder={'Longitude'} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default EditSiteForm;
