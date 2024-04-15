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
import { Typography } from 'antd';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { site } from '../../constants';
import { n } from '../../utils/stringFormat';

const DashboardContent = styled.div`
  font-size: 20px;
`;

const ReviewImages: React.FC = () => {
  const { t } = useTranslation(n(site, ['admin']), {
    nsMode: 'fallback',
  });
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
        </PaddedPageContainer>
      </PageLayout>
    </>
  );
};

export default ReviewImages;
