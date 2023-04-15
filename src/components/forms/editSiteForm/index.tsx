import React from 'react';
import { Form, Input, Select } from 'antd';
import { FormInstance } from 'antd/es/form';
import { requiredRule, zipCodeRules } from '../../../utils/formRules';
import { EditSiteRequest } from '../ducks/types';
import { NEIGHBORHOOD_OPTS } from '../../../assets/content';
import { Flex, FullInputNumber } from '../../themedComponents';
import TitleStack from '../../titleStack';
import styled from 'styled-components';

interface EditSiteFormProps {
  readonly formInstance: FormInstance<EditSiteRequest>;
  readonly onEdit: (latLng: google.maps.LatLng) => void;
}

const EditForm = styled(Form)`
  width: 100%;
`;

const EditSiteForm: React.FC<EditSiteFormProps> = ({
  formInstance,
  onEdit,
}) => {
  const onValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues.lat || changedValues.lng) {
      const values = allValues as EditSiteRequest;
      onEdit(new google.maps.LatLng(values.lat, values.lng));
    }
  };
  return (
    <>
      <EditForm
        name="basic"
        form={formInstance}
        onValuesChange={onValuesChange}
      >
        <Flex>
          <TitleStack title={'Address'} flexGrow={'1'}>
            <Form.Item
              name={'address'}
              rules={requiredRule('Please enter an address!')}
            >
              <Input placeholder={'Address'} />
            </Form.Item>
          </TitleStack>
          <TitleStack title={'City'} flexGrow={'1'}>
            <Form.Item
              name={'city'}
              rules={requiredRule('Please enter a city!')}
            >
              <Input placeholder={'City'} />
            </Form.Item>
          </TitleStack>
        </Flex>

        <Flex>
          <TitleStack title={'Zip Code'} flexGrow={'1'}>
            <Form.Item name={'zip'} rules={zipCodeRules}>
              <Input placeholder={'Zip Code'} />
            </Form.Item>
          </TitleStack>
          {/* <TitleStack title={'Block Id'} flexGrow={'1'}>
            <Form.Item name={'blockId'}>
              <FullInputNumber placeholder={'Block ID'} />
            </Form.Item>
          </TitleStack> */}
          <TitleStack title={'Neighborhood'} flexGrow={'1'}>
            <Form.Item
              name={'neighborhoodId'}
              rules={requiredRule('Please enter a neighborhood!')}
            >
              <Select options={NEIGHBORHOOD_OPTS} />
            </Form.Item>
          </TitleStack>
        </Flex>

        <Flex>
          <TitleStack title={'Latitude'} flexGrow={'1'}>
            <Form.Item
              name={'lat'}
              rules={requiredRule('Please enter a latitude!')}
            >
              <FullInputNumber placeholder={'Latitude'} />
            </Form.Item>
          </TitleStack>
          <TitleStack title={'Longitude'} flexGrow={'1'}>
            <Form.Item
              name={'lng'}
              rules={requiredRule('Please enter a longitude!')}
            >
              <FullInputNumber placeholder={'Longitude'} />
            </Form.Item>
          </TitleStack>
        </Flex>
      </EditForm>
    </>
  );
};

export default EditSiteForm;
