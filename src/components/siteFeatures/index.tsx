import React, { useEffect, useState } from 'react';
import Typography from 'antd/es/typography';
import type { FormInstance } from 'antd/es/form';
import styled from 'styled-components';
import { SiteProps } from '../../containers/treePage/ducks/types';
import EditSiteForm from '../../components/forms/editSiteForm';
import { getNeighborhoodName, n } from '../../utils/stringFormat';
import { EditSiteRequest } from '../forms/ducks/types';
import { Flex, GreenButton, WhiteButton } from '../themedComponents';
import TitleStack from '../titleStack';
import { useTranslation } from 'react-i18next';
import { site as website } from '../../constants';

const Content = styled(Typography.Text)`
  font-size: 15px;
`;

interface SiteFeaturesProps {
  readonly site: SiteProps;
  readonly editSiteForm: FormInstance<EditSiteRequest>;
  readonly onSubmit: (request: EditSiteRequest) => void;
  readonly onEdit: (latLng: google.maps.LatLng) => void;
}

const SiteFeatures: React.FC<SiteFeaturesProps> = ({
  site,
  editSiteForm,
  onSubmit,
  onEdit,
}) => {
  const { t } = useTranslation(n(website, ['site', 'forms']), {
    nsMode: 'fallback',
  });

  const [editingFeatures, setEditingFeatures] = useState(false);

  useEffect(() => {
    editSiteForm.setFieldsValue({
      address: site.address,
      city: site.city,
      zip: site.zip,
      blockId: site.blockId,
      neighborhoodId: site.neighborhoodId,
      lat: site.lat,
      lng: site.lng,
      owner: site.owner,
    });
  });

  return editingFeatures ? (
    <>
      <EditSiteForm formInstance={editSiteForm} onEdit={onEdit} />

      <Flex justifyContent={'flex-end'}>
        <GreenButton
          onClick={() => {
            onSubmit(editSiteForm.getFieldsValue());
            setEditingFeatures(false);
          }}
        >
          {t('submit')}
        </GreenButton>
        <WhiteButton onClick={() => setEditingFeatures(false)}>
          {t('cancel')}
        </WhiteButton>
      </Flex>
    </>
  ) : (
    <>
      <Flex>
        <TitleStack title={t('edit_site.address')}>
          <Content>{site.address || t('site_features.no_address')}</Content>
        </TitleStack>
        <TitleStack title={t('edit_site.city')}>
          <Content>{site.city}</Content>
        </TitleStack>
        <TitleStack title={t('edit_site.zip')}>
          <Content>{site.zip}</Content>
        </TitleStack>
        {/* <TitleStack title={'Block ID'}>
              <Content>{site.blockId || 'No Recorded Block ID'}</Content>
            </TitleStack> */}
        <TitleStack title={t('edit_site.neighborhood')}>
          <Content>{getNeighborhoodName(site.neighborhoodId || -1)}</Content>
        </TitleStack>
        <TitleStack title={t('edit_site.latitude')}>
          <Content>{site.lat}</Content>
        </TitleStack>
        <TitleStack title={t('edit_site.longitude')}>
          <Content>{site.lng}</Content>
        </TitleStack>
        <TitleStack title={t('edit_site.owner')}>
          <Content>{site.owner}</Content>
        </TitleStack>
      </Flex>

      <Flex justifyContent={'flex-end'}>
        <GreenButton
          onClick={() => {
            setEditingFeatures(true);
          }}
        >
          {t('edit_site.submit')}
        </GreenButton>
      </Flex>
    </>
  );
};

export default SiteFeatures;
