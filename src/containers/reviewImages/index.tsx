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
import {
  ArrowLeftOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import PageHeader from '../../components/pageHeader';
import PageLayout from '../../components/pageLayout';
import { DARK_GREEN, MID_GREEN } from '../../utils/colors';
import { Alert, Button, Col, message, Row, Spin, Typography } from 'antd';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { site } from '../../constants';
import { n } from '../../utils/stringFormat';
import UnapprovedFilterImageControls from '../../components/unapprovedFilterImageControls';
import {
  ReviewImageFilters,
  FilterSiteImagesParams,
  FilteredSiteImage,
} from './types';
import protectedApiClient from '../../api/protectedApiClient';
import { NEIGHBORHOOD_OPTS, Neighborhoods } from '../../assets/content';
import UnapprovedImagesTable from '../../components/unapprovedImagesTable';
import { FetchInfoContainer, LoadingState } from '../email';

const DashboardContent = styled.div`
  font-size: 20px;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const ApproveRejectDialogue = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid ${DARK_GREEN};
  padding: 3px;
  margin: 5px;
  max-width: 280px;
  border-radius: 6px;
  align-items: center;
`;

const TableViewSelect = styled.div`
  display: flex;
  margin: 5px;
  justify-content: flex-end;
`;

const TableViewIcon = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
  align-items: center;
  padding: 1px;
  border: 1px solid;
  border-radius: 6px;
`;

const ApproveRejectStyling = {
  padding: '3px',
  margin: '5px',
  color: `${DARK_GREEN}`,
  width: '90px',
};

const defaultFilters: ReviewImageFilters = {
  submittedStart: null,
  submittedEnd: null,
  neighborhoods: [],
  siteIds: [],
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
  const [useGridView, setUseGridView] = useState<boolean>(false);
  const [filters, setFilters] = useState<ReviewImageFilters>(defaultFilters);
  const [fetchData, setFetchData] = useState<FilteredSiteImage[]>([]);
  const [selectedImageIds, setSelectedImageIds] = useState<number[]>([]);
  const [fetchSiteImagesState, setFetchSiteImagesState] =
    useState<LoadingState>(LoadingState.SUCCESS);
  const [approvedOrRejectedImageIds, setApprovedOrRejectedImageIds] = useState<
    number[]
  >([]);

  useEffect(() => {
    onClickSearch();
  }, []);

  function switchToTable() {
    setUseGridView(false);
  }

  function switchToGrid() {
    setUseGridView(true);
  }

  function onClickSearch() {
    setFetchSiteImagesState(LoadingState.LOADING);
    // display some loading thing here
    const req: FilterSiteImagesParams = {
      submittedStart: filters.submittedStart,
      submittedEnd: filters.submittedEnd,
      neighborhoods:
        filters.neighborhoods.length > 0
          ? filters.neighborhoods.map(neighborhoodToId)
          : null,
      siteIds: filters.siteIds.length > 0 ? filters.siteIds : null,
    };

    protectedApiClient
      .filterSiteImages(req)
      .then((res) => {
        setFetchSiteImagesState(LoadingState.SUCCESS);
        setFetchData(res.filteredSiteImages);
      })
      .catch((err) => {
        setFetchSiteImagesState(LoadingState.ERROR);
        message.error(t('review_images.message.search_error'));
      });
  }

  async function onClickAccept() {
    const toApprove: Promise<void>[] = [];
    selectedImageIds.forEach((id) => {
      toApprove.push(protectedApiClient.approveImage(id));
    });
    setFetchSiteImagesState(LoadingState.LOADING);
    Promise.all(toApprove)
      .then(() => {
        onClickSearch();
        setSelectedImageIds([]);
        message.success(t('review_images.message.approve_success'));
      })
      .catch((err) => {
        message.error(
          t('review_images.message.approve_error', {
            error: err.response.data,
          }),
        );
      });
  }

  async function onClickReject() {
    const toReject: Promise<void>[] = [];
    selectedImageIds.forEach((id) => {
      toReject.push(
        protectedApiClient.rejectImage(
          id,
          'Your image upload was rejected by an admin',
        ),
      );
    });
    setFetchSiteImagesState(LoadingState.LOADING);
    Promise.all(toReject)
      .then(() => {
        onClickSearch();
        setSelectedImageIds([]);
        message.success(t('review_images.message.reject_success'));
      })
      .catch((err) => {
        message.error(
          t('review_images.message.reject_error', {
            error: err.response.data,
          }),
        );
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
            <ArrowLeftOutlined /> {t('back')}
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
                <Typography.Title level={3}>
                  {t('review_images.search.header')}
                </Typography.Title>
                <Button
                  type="link"
                  onClick={(e) => {
                    e.preventDefault();
                    setFilters(defaultFilters);
                  }}
                >
                  {t('review_images.search.clear')}
                </Button>
              </FilterHeader>
              <UnapprovedFilterImageControls
                filters={filters}
                setFilters={setFilters}
              />
              <br />
              <Button type="primary" size="large" onClick={onClickSearch}>
                {t('review_images.search.search')}
              </Button>
            </Col>
            <Col span={17}>
              {(() => {
                switch (fetchSiteImagesState) {
                  case LoadingState.LOADING:
                    return (
                      <FetchInfoContainer>
                        <Spin size="large" />
                      </FetchInfoContainer>
                    );
                  case LoadingState.SUCCESS:
                    return (
                      <>
                        {selectedImageIds.length > 0 && (
                          <ApproveRejectDialogue>
                            <p
                              style={ApproveRejectStyling}
                            >{`${selectedImageIds.length} selected`}</p>
                            <Button
                              style={ApproveRejectStyling}
                              type="primary"
                              onClick={onClickAccept}
                            >
                              {t('review_images.modal.approve')}
                            </Button>
                            <Button
                              style={ApproveRejectStyling}
                              type="primary"
                              onClick={onClickReject}
                            >
                              {t('review_images.modal.reject')}
                            </Button>
                          </ApproveRejectDialogue>
                        )}
                        <TableViewSelect>
                          <TableViewIcon
                            onClick={switchToTable}
                            style={{
                              color: !useGridView ? '#6d8e33' : '#b4bba4',
                            }}
                          >
                            <UnorderedListOutlined />
                          </TableViewIcon>
                          <TableViewIcon
                            onClick={switchToGrid}
                            style={{
                              color: useGridView ? '#6d8e33' : '#b4bba4',
                            }}
                          >
                            <AppstoreOutlined />
                          </TableViewIcon>
                        </TableViewSelect>
                        <UnapprovedImagesTable
                          fetchData={fetchData}
                          setSelectedImageIds={setSelectedImageIds}
                          useGridView={useGridView}
                          approvedOrRejectedImageIds={
                            approvedOrRejectedImageIds
                          }
                          setApprovedOrRejectedImageIds={
                            setApprovedOrRejectedImageIds
                          }
                        ></UnapprovedImagesTable>
                      </>
                    );
                  case LoadingState.ERROR:
                    return (
                      <FetchInfoContainer>
                        <Alert
                          message={t('review_images.search.error_header')}
                          description={t(
                            'review_images.search.error_description',
                          )}
                          type="error"
                          showIcon
                        />
                      </FetchInfoContainer>
                    );
                }
              })()}
            </Col>
          </Row>
        </PaddedPageContainer>
      </PageLayout>
    </>
  );
};

export default ReviewImages;
