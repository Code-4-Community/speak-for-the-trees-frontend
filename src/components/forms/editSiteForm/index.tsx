import React from 'react';
import { Form, Input, Select } from 'antd';
import { FormInstance } from 'antd/es/form';
import { requiredRule, zipCodeRules } from '../../../utils/formRules';
import { EditSiteRequest } from '../ducks/types';
import { NEIGHBORHOOD_OPTS } from '../../../assets/content';
import { Flex, FullInputNumber } from '../../themedComponents';
import TitleStack from '../../titleStack';
import styled from 'styled-components';
import { SITE_OPTIONS_OWNER } from '../../mapComponents/constants';
import { useTranslation } from 'react-i18next';
import { n } from '../../../utils/stringFormat';
import { site } from '../../../constants';

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
  const { t } = useTranslation(n(site, ['site', 'forms']), {
    nsMode: 'fallback',
  });

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
          <TitleStack title={t('edit_site.address')} flexGrow={'1'}>
            <Form.Item
              name={'address'}
              rules={requiredRule(t('validation.address_required'))}
            >
              <Input placeholder={t('edit_site.address')} />
            </Form.Item>
          </TitleStack>
          <TitleStack title={t('edit_site.city')} flexGrow={'1'}>
            <Form.Item
              name={'city'}
              rules={requiredRule(t('validation.city_required'))}
            >
              <Input placeholder={t('edit_site.city')} />
            </Form.Item>
          </TitleStack>
        </Flex>

        <Flex>
          <TitleStack title={t('edit_site.zip')} flexGrow={'1'}>
            <Form.Item name={'zip'} rules={zipCodeRules}>
              <Input placeholder={t('edit_site.zip')} />
            </Form.Item>
          </TitleStack>
          {/* <TitleStack title={'Block Id'} flexGrow={'1'}>
            <Form.Item name={'blockId'}>
              <FullInputNumber placeholder={'Block ID'} />
            </Form.Item>
          </TitleStack> */}
          <TitleStack title={t('edit_site.neighborhood')} flexGrow={'1'}>
            <Form.Item
              name={'neighborhoodId'}
              rules={requiredRule(t('validation.neighborhood_required'))}
            >
              <Select options={NEIGHBORHOOD_OPTS} />
            </Form.Item>
          </TitleStack>
        </Flex>

        <Flex>
          <TitleStack title={t('edit_site.latitude')} flexGrow={'1'}>
            <Form.Item
              name={'lat'}
              rules={requiredRule(t('validation.latitude_required'))}
            >
              <FullInputNumber placeholder={t('edit_site.latitude')} />
            </Form.Item>
          </TitleStack>
          <TitleStack title={t('edit_site.longitude')} flexGrow={'1'}>
            <Form.Item
              name={'lng'}
              rules={requiredRule(t('validation.longitude_required'))}
            >
              <FullInputNumber placeholder={t('edit_site.longitude')} />
            </Form.Item>
          </TitleStack>
        </Flex>

        <Flex>
          <TitleStack title={t('edit_site.owner')} flexGrow={'1'}>
            <Form.Item
              name={'owner'}
              rules={requiredRule(t('validation.owner_required'))}
            >
              <Select options={SITE_OPTIONS_OWNER} />
            </Form.Item>
          </TitleStack>
        </Flex>
      </EditForm>
    </>
  );
};

export default EditSiteForm;
