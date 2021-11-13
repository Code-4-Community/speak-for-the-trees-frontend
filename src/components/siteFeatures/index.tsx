import React, { useEffect, useState } from 'react';
import { Col, FormInstance, Row } from 'antd';
import styled from 'styled-components';
import { SiteProps } from '../../containers/treePage/ducks/types';
import EditSiteForm from '../../components/forms/editSiteForm';
import { getNeighborhoodName } from '../../utils/stringFormat';
import { EditSiteRequest } from '../forms/ducks/types';
import { GreenButton, WhiteButton } from '../themedComponents';

const TitleCol = styled(Col)`
  font-weight: bold;
  font-size: 16px;
`;

const ContentCol = styled(Col)`
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

          <Row gutter={[16, 8]} justify={'end'}>
            <Col>
              <WhiteButton onClick={() => setEditingFeatures(false)}>
                Cancel
              </WhiteButton>
            </Col>
            <Col>
              <GreenButton
                onClick={() => {
                  onSubmit(editSiteForm.getFieldsValue());
                  setEditingFeatures(false);
                }}
              >
                Submit
              </GreenButton>
            </Col>
          </Row>
        </>
      );
    case false:
      return (
        <>
          <Row gutter={[16, 8]}>
            <TitleCol span={12}>Address</TitleCol>
            <TitleCol span={6}>City</TitleCol>
            <TitleCol span={6}>Zip Code</TitleCol>
          </Row>
          <Row gutter={[16, 8]}>
            <ContentCol span={12}>
              {site.address || 'No Recorded Address'}
            </ContentCol>
            <ContentCol span={6}>{site.city}</ContentCol>
            <ContentCol span={6}>0{site.zip}</ContentCol>
          </Row>

          <Row>
            <TitleCol span={6}>Block ID</TitleCol>
            <TitleCol span={6}>Neighborhood</TitleCol>
            <TitleCol span={6}>Latitude</TitleCol>
            <TitleCol span={6}>Longitude</TitleCol>
          </Row>
          <Row>
            <ContentCol span={6}>
              {site.blockId || 'No Recorded Block ID'}
            </ContentCol>
            <ContentCol span={6}>
              {getNeighborhoodName(site.neighborhoodId || -1)}
            </ContentCol>
            <ContentCol span={6}>{site.lat}</ContentCol>
            <ContentCol span={6}>{site.lng}</ContentCol>
          </Row>

          <Row justify={'end'}>
            <GreenButton
              onClick={() => {
                setEditingFeatures(true);
              }}
            >
              Edit Site Features
            </GreenButton>
          </Row>
        </>
      );
  }
};

export default SiteFeatures;
