import React, { useState, useEffect } from 'react';
import { MapGeoDataReducerState } from '../../components/mapComponents/ducks/types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
  Block,
  Flex,
  MapContainer,
  PaddedPageContainer,
  ReturnButton,
} from '../../components/themedComponents';
import { Routes } from '../../App';
import { ArrowLeftOutlined } from '@ant-design/icons';
import PageHeader from '../../components/pageHeader';
import PageLayout from '../../components/pageLayout';
import { Button, Col, Row, Typography } from 'antd';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { site } from '../../constants';
import { n } from '../../utils/stringFormat';
import UnapprovedFilterImageControls from '../../components/unapprovedFilterImageControls';
import { ReviewImageFilters, FilterSiteImagesParams } from './types';
import protectedApiClient from '../../api/protectedApiClient';
import { NEIGHBORHOOD_OPTS, Neighborhoods } from '../../assets/content';

const DashboardContent = styled.div`
  font-size: 20px;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const defaultFilters: ReviewImageFilters = {
  submittedStart: null,
  submittedEnd: null,
  neighborhoods: [],
  sites: [],
};

function neighborhoodToId(neighborhood: Neighborhoods): number {
  return (
    NEIGHBORHOOD_OPTS.find((opt) => opt.label === neighborhood)?.value ?? -1
  );
}

const ReviewImages: React.FC = () => {
  const { t } = useTranslation(n(site, ['admin']), {
    nsMode: 'fallback',
  });
  const [filters, setFilters] = useState<ReviewImageFilters>(defaultFilters);

  function onClickSearch() {
    // setFetchSitesState(LoadingState.LOADING);
    // display some loading thing here
    const req: FilterSiteImagesParams = {
      submittedStart: filters.submittedStart,
      submittedEnd: filters.submittedEnd,
      neighborhoods:
        filters.neighborhoods.length > 0
          ? filters.neighborhoods.map(neighborhoodToId)
          : null,
      sites: [],
    };

    protectedApiClient
      .filterSiteImages(req)
      .then((res) => {
        // setFetchSitesState(LoadingState.SUCCESS);
        // setFetchData(res.filteredSites);
      })
      .catch((err) => {
        // setFetchSitesState(LoadingState.ERROR);
      });
  }

  return (
    <>
      <Helmet>
        <title>Tree Photo Review</title>
        <meta
          name="description"
          content="The page for admin users add and update site information"
        />
      </Helmet>
      <PageLayout>
        <PaddedPageContainer>
          <ReturnButton to={Routes.ADMIN}>
            <ArrowLeftOutlined /> Back to Dashboard
          </ReturnButton>
          <PageHeader pageTitle={t('review_images.review_image_title')} />
          <DashboardContent>
            <Typography.Text>
              {t('review_images.review_image_description')}
            </Typography.Text>
          </DashboardContent>
          <Row>
            <Col span={6}>
              <FilterHeader>
                <Typography.Title level={3}>Filter By</Typography.Title>
                <Button
                  type="link"
                  onClick={(e) => {
                    e.preventDefault();
                    // set use state hook for filters here
                  }}
                >
                  Clear Filters
                </Button>
              </FilterHeader>
              <UnapprovedFilterImageControls
                filters={filters}
                setFilters={setFilters}
              />
              <br />
              <Button type="primary" size="large" onClick={onClickSearch}>
                Search
              </Button>
            </Col>
          </Row>
        </PaddedPageContainer>
      </PageLayout>
    </>
  );
};

export default ReviewImages;
