import React from 'react';
import { Form, Input, Select } from 'antd';
import { FormInstance } from 'antd/es/form';
import { requiredRule, zipCodeRules } from '../../../utils/formRules';
import { EditSiteRequest } from '../ducks/types';
import { NEIGHBORHOOD_OPTS } from '../../../assets/content';
import { Flex, FullInputNumber } from '../../themedComponents';
import TitleStack from '../../titleStack';

interface EditSiteFormProps {
  readonly formInstance: FormInstance<EditSiteRequest>;
}

const EditSiteForm: React.FC<EditSiteFormProps> = ({ formInstance }) => {
  return (
    <>
      <Form name="basic" form={formInstance}>
        <Flex>
          <TitleStack title={'Address'}>
            <Form.Item
              name={'address'}
              rules={requiredRule('Please enter an address!')}
            >
              <Input placeholder={'Address'} />
            </Form.Item>
          </TitleStack>
          <TitleStack title={'City'}>
            <Form.Item
              name={'city'}
              rules={requiredRule('Please enter a city!')}
            >
              <Input placeholder={'City'} />
            </Form.Item>
          </TitleStack>
          <TitleStack title={'Zip Code'}>
            <Form.Item name={'zip'} rules={zipCodeRules}>
              <Input placeholder={'Zip Code'} />
            </Form.Item>
          </TitleStack>
        </Flex>

        <Flex>
          <TitleStack title={'Block Id'}>
            <Form.Item name={'blockId'}>
              <FullInputNumber placeholder={'Block ID'} />
            </Form.Item>
          </TitleStack>
          <TitleStack title={'Neighborhood'}>
            <Form.Item
              name={'neighborhoodId'}
              rules={requiredRule('Please enter a neighborhood!')}
            >
              <Select options={NEIGHBORHOOD_OPTS} />
            </Form.Item>
          </TitleStack>
          <TitleStack title={'Latitude'}>
            <Form.Item
              name={'lat'}
              rules={requiredRule('Please enter a latitude!')}
            >
              <FullInputNumber placeholder={'Latitude'} />
            </Form.Item>
          </TitleStack>
          <TitleStack title={'Longitude'}>
            <Form.Item
              name={'lng'}
              rules={requiredRule('Please enter a longitude!')}
            >
              <FullInputNumber placeholder={'Longitude'} />
            </Form.Item>
          </TitleStack>
        </Flex>
      </Form>
    </>
  );
};

export default EditSiteForm;
