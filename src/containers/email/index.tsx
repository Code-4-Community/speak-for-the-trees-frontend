import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Select, Typography, Row, Col, message, Button } from 'antd';
import { Routes } from '../../App';
import PageLayout from '../../components/pageLayout';
import { ReturnButton } from '../../components/themedComponents';
import PageHeader from '../../components/pageHeader';
import {
  EmailType,
  EmailerFilters,
  EmailerTableData,
  FilterSitesRequest,
} from './types';
import EmailerFilterControls from '../../components/emailerFilterControls';
import AdoptedSitesTable from '../../components/adoptedSitesTable';
import protectedApiClient from '../../api/protectedApiClient';
import { ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';

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

const selectStyles = { marginTop: 20, minWidth: 150 };

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

//TODO: rename this please
function generateContents(loadingState: LoadingState, data: EmailerTableData[]) {
  switch (loadingState) {
    case LoadingState.LOADING:
      return (
        <>
          <LoadingOutlined />
          <Typography.Title level={4}>Retrieving data...</Typography.Title>
        </>
      );
    case LoadingState.SUCCESS:
      return <AdoptedSitesTable fetchData={data} />;
    case LoadingState.ERROR:
      return (
        <>
          <ExclamationCircleOutlined color="red" />
          <Typography.Title level={4}>
            Error fetching data! Please try again
          </Typography.Title>
        </>
      );
  }
}

const Email: React.FC = () => {
  const [emailType, setEmailType] = useState<EmailType>(EmailType.INACTIVE);
  const [filters, setFilters] = useState<EmailerFilters>(defaultFilters);
  const [fetchData, setFetchData] = useState<EmailerTableData[]>([]);
  const [fetchSitesState, setFetchSitesState] =
    useState<LoadingState>('success');

  function onClickSearch() {
    setFetchSitesState(LoadingState.LOADING);
    const req: FilterSitesRequest = {
      treeSpecies:
        filters.commonNames.length > 0 ? filters.commonNames : undefined,
      adoptedStart: filters.adoptedStart,
      adoptedEnd: filters.adoptedEnd,
      lastActivityStart: filters.lastActivityStart,
      lastActivityEnd: filters.lastActivityEnd,
      neighborhoodIds:
        filters.neighborhoods.length > 0 ? filters.neighborhoods : undefined,
    };
    protectedApiClient
      .getFilteredSites(req)
      .then((res) => {
        setFetchSitesState(LoadingState.SUCCESS);
        setFetchData(res.filteredSites);
      })
      .catch((err) => {
        setFetchSitesState(LoadingState.ERROR);
        message.error(`Unable to fetch adopted sites: ${err.message}`);
      });
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
              <EmailerFilterControls
                filters={filters}
                setFilters={setFilters}
              />
              <Button type="primary" onClick={onClickSearch}>
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
