import React, { useEffect, useState } from 'react';
import { Typography, FormInstance } from 'antd';
import styled from 'styled-components';
import { SiteProps } from '../../containers/treePage/ducks/types';
import EditSiteForm from '../../components/forms/editSiteForm';
import { getNeighborhoodName } from '../../utils/stringFormat';
import { EditSiteRequest } from '../forms/ducks/types';
import { Flex, GreenButton, WhiteButton } from '../themedComponents';
import TitleStack from '../titleStack';

const Content = styled(Typography.Text)`
  font-size: 15px;
`;

interface SiteFeaturesProps {
  readonly site: SiteProps;
  readonly editSiteForm: FormInstance<EditSiteRequest>;
  readonly onSubmit: (request: EditSiteRequest) => void;
}

const SiteFeatures: React.FC<SiteFeaturesProps> = ({
  site,
  editSiteForm,
  onSubmit,
}) => {
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
    });
  });

  switch (editingFeatures) {
    case true:
      return (
        <>
          <EditSiteForm formInstance={editSiteForm} />

          <Flex justifyContent={'flex-end'}>
            <WhiteButton onClick={() => setEditingFeatures(false)}>
              Cancel
            </WhiteButton>
            <GreenButton
              onClick={() => {
                onSubmit(editSiteForm.getFieldsValue());
                setEditingFeatures(false);
              }}
            >
              Submit
            </GreenButton>
          </Flex>
        </>
      );
    case false:
      return (
        <>
          <Flex>
            <TitleStack title={'Address'}>
              <Content>{site.address || 'No Recorded Address'}</Content>
            </TitleStack>
            <TitleStack title={'City'}>
              <Content>{site.city}</Content>
            </TitleStack>
            <TitleStack title={'Zip Code'}>
              <Content>{site.zip}</Content>
            </TitleStack>
            {/* <TitleStack title={'Block ID'}>
              <Content>{site.blockId || 'No Recorded Block ID'}</Content>
            </TitleStack> */}
            <TitleStack title={'Neighborhood'}>
              <Content>
                {getNeighborhoodName(site.neighborhoodId || -1)}
              </Content>
            </TitleStack>
            <TitleStack title={'Latitude'}>
              <Content>{site.lat}</Content>
            </TitleStack>
            <TitleStack title={'Longitude'}>
              <Content>{site.lng}</Content>
            </TitleStack>
          </Flex>

          <Flex justifyContent={'flex-end'}>
            <GreenButton
              onClick={() => {
                setEditingFeatures(true);
              }}
            >
              Edit Site Features
            </GreenButton>
          </Flex>
        </>
      );
  }
};

export default SiteFeatures;
