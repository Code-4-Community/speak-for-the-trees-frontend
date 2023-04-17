import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Select, Typography, Row, Col, message, Button, Spin } from 'antd';
import { Routes } from '../../App';
import PageLayout from '../../components/pageLayout';
import { ReturnButton } from '../../components/themedComponents';
import PageHeader from '../../components/pageHeader';
import {
  EmailType,
  EmailerFilters,
  EmailerTableData,
  FilterSitesData,
  FilterSitesRequest,
} from './types';
import EmailerFilterControls from '../../components/emailerFilterControls';
import AdoptedSitesTable from '../../components/adoptedSitesTable';
import protectedApiClient from '../../api/protectedApiClient';
import { ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { NEIGHBORHOOD_OPTS, Neighborhoods } from '../../assets/content';
import dummyResponse from '../../components/adoptedSitesTable/dummyData';

const EmailPageContainer = styled.div`
  width: 90vw;
  margin: 30px auto auto;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;

  a {
    font-size: 1.1em;
    text-decoration: underline;
  }
`;

// TODO: rename this please
const ContentContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  // align-items: center;
  height: 500px;
`;

const selectStyles = { marginTop: 20, minWidth: 150, marginBottom: 20 };

const defaultFilters: EmailerFilters = {
  activityCountMin: 0,
  neighborhoods: [],
  commonNames: [],
};

enum LoadingState {
  SUCCESS = 'success',
  LOADING = 'loading',
  ERROR = 'error',
}

function neighborhoodToId(neighborhood: Neighborhoods): number {
  return (
    NEIGHBORHOOD_OPTS.find((opt) => opt.label === neighborhood)?.value ?? -1
  );
}

//TODO: rename this please
function generateContents(loadingState: LoadingState, data: FilterSitesData[]) {
  switch (loadingState) {
    case LoadingState.LOADING:
      return (
        <ContentContainer>
          <Spin size="large" />
        </ContentContainer>
      );
    case LoadingState.SUCCESS:
      return <AdoptedSitesTable fetchData={data} />;
    case LoadingState.ERROR:
      return (
        <ContentContainer>
          <ExclamationCircleOutlined style={{ color: 'red' }} />
          <br />
          <Typography.Title level={4}>
            Error fetching data! Please try again
          </Typography.Title>
        </ContentContainer>
      );
  }
}

const Email: React.FC = () => {
  const [emailType, setEmailType] = useState<EmailType>(EmailType.INACTIVE);
  const [filters, setFilters] = useState<EmailerFilters>(defaultFilters);
  const [fetchData, setFetchData] = useState<FilterSitesData[]>([]);
  const [fetchSitesState, setFetchSitesState] = useState<LoadingState>(
    LoadingState.SUCCESS,
  );

  // function onClickSearch() {
  //   setFetchSitesState(LoadingState.LOADING);
  //   // const req: FilterSitesRequest = {
  //   //   treeSpecies: filters.commonNames.length > 0 ? filters.commonNames : null,
  //   //   adoptedStart: filters.adoptedStart ?? null,
  //   //   adoptedEnd: filters.adoptedEnd ?? null,
  //   //   lastActivityStart: filters.lastActivityStart ?? null,
  //   //   lastActivityEnd: filters.lastActivityEnd ?? null,
  //   //   neighborhoodIds:
  //   //     filters.neighborhoods.length > 0
  //   //       ? filters.neighborhoods.map(neighborhoodToId)
  //   //       : null,
  //   // };
  //   const req: FilterSitesRequest = {
  //     treeSpecies: null,
  //     adoptedStart: null,
  //     adoptedEnd: null,
  //     lastActivityStart: null,
  //     lastActivityEnd: null,
  //     neighborhoodIds: null,
  //   };
  //   // if (filters.commonNames.length > 0) req.treeSpecies = filters.commonNames;
  //   // if (filters.neighborhoods.length > 0)
  //   //   req.neighborhoodIds = filters.neighborhoods.map(neighborhoodToId);

  //   console.log(req);

  //   protectedApiClient
  //     .getFilteredSites(req)
  //     .then((res) => {
  //       setFetchSitesState(LoadingState.SUCCESS);
  //       setFetchData(res.filteredSites);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setFetchSitesState(LoadingState.ERROR);
  //       message.error(`Unable to fetch adopted sites: ${err.message}`);
  //     });
  // }

  function onClickSearchTest() {
    setFetchSitesState(LoadingState.LOADING);
    setTimeout(() => {
      setFetchSitesState(LoadingState.SUCCESS);
      setFetchData(dummyResponse);
    }, 2000);
  }

  return (
    <>
      <Helmet>
        <title>Send Emails</title>
        <meta
          name="description"
          content="The page for admin users to filter users based on various criteria and send emails to them"
        />
      </Helmet>
      <PageLayout>
        <EmailPageContainer>
          <ReturnButton to={Routes.LANDING}>
            {`<`} Return to Tree Map
          </ReturnButton>
          <PageHeader pageTitle="Volunteer Emailer" />
          <Typography.Title level={4}>
            Select a type of email to send volunteers
          </Typography.Title>
          <Row>
            <Col span={6}>
              <Select
                value={emailType}
                style={selectStyles}
                defaultValue={EmailType.INACTIVE}
                options={Object.entries(EmailType).map(([key, value]) => ({
                  value: key,
                  label: value,
                }))}
                onChange={(value: EmailType) => setEmailType(value)}
              />
              <FilterHeader>
                <Typography.Title level={3}>Filter By</Typography.Title>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setFilters(defaultFilters);
                  }}
                >
                  Clear All
                </a>
              </FilterHeader>
              <EmailerFilterControls
                filters={filters}
                setFilters={setFilters}
              />
              <br />
              <Button type="primary" onClick={onClickSearchTest}>
                Search
              </Button>
            </Col>
            <Col span={1}></Col>
            <Col span={17}>{generateContents(fetchSitesState, fetchData)}</Col>
          </Row>
        </EmailPageContainer>
      </PageLayout>
    </>
  );
};

export default Email;
