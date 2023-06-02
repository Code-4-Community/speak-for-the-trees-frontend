import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import {
  Select,
  Typography,
  Row,
  Col,
  Button,
  Spin,
  Alert,
  Divider,
  SelectProps,
} from 'antd';
import { Routes } from '../../App';
import PageLayout from '../../components/pageLayout';
import { ReturnButton } from '../../components/themedComponents';
import PageHeader from '../../components/pageHeader';
import {
  EmailType,
  EmailerFilters,
  FilteredSite,
  FilterSitesParams,
} from './types';
import EmailerFilterControls from '../../components/emailerFilterControls';
import AdoptedSitesTable from '../../components/adoptedSitesTable';
import protectedApiClient from '../../api/protectedApiClient';
import { NEIGHBORHOOD_OPTS, Neighborhoods } from '../../assets/content';
import SendEmailForm from '../../components/forms/sendEmailForm';

const EmailPageContainer = styled.div`
  width: 90vw;
  margin: 30px auto auto;
  padding-bottom: 50px;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const FetchInfoContainer = styled.div`
  text-align: center;
  padding: 30px;
`;

const EmailTypeSelect = styled((props: SelectProps) => <Select {...props} />)`
  margin: 20px 0px;
  min-width: 150px;
`;

const defaultFilters: EmailerFilters = {
  activityCountMin: 0,
  activityCountMax: null,
  neighborhoods: [],
  commonNames: [],
  adoptedStart: null,
  adoptedEnd: null,
  lastActivityStart: null,
  lastActivityEnd: null,
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

const Email: React.FC = () => {
  const [emailType, setEmailType] = useState<EmailType>(EmailType.INACTIVE);
  const [filters, setFilters] = useState<EmailerFilters>(defaultFilters);
  const [fetchData, setFetchData] = useState<FilteredSite[]>([]);
  const [fetchSitesState, setFetchSitesState] = useState<LoadingState>(
    LoadingState.SUCCESS,
  );
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  function onClickSearch() {
    setFetchSitesState(LoadingState.LOADING);
    const req: FilterSitesParams = {
      treeCommonNames:
        filters.commonNames.length > 0 ? filters.commonNames : null,
      adoptedStart: filters.adoptedStart,
      adoptedEnd: filters.adoptedEnd,
      lastActivityStart: filters.lastActivityStart,
      lastActivityEnd: filters.lastActivityEnd,
      neighborhoodIds:
        filters.neighborhoods.length > 0
          ? filters.neighborhoods.map(neighborhoodToId)
          : null,
      activityCountMin: filters.activityCountMin,
      activityCountMax: filters.activityCountMax,
    };

    protectedApiClient
      .filterSites(req)
      .then((res) => {
        setFetchSitesState(LoadingState.SUCCESS);
        setFetchData(res.filteredSites);
      })
      .catch((err) => {
        setFetchSitesState(LoadingState.ERROR);
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
          <ReturnButton to={Routes.ADMIN}>{`<`} Back to Dashboard</ReturnButton>
          <PageHeader pageTitle="Volunteer Emailer" />
          <Row>
            <Col span={6}>
              <FilterHeader>
                <Typography.Title level={3}>Filter By</Typography.Title>
                <Button
                  type="link"
                  onClick={(e) => {
                    e.preventDefault();
                    setFilters(defaultFilters);
                  }}
                >
                  Clear Filters
                </Button>
              </FilterHeader>
              <EmailerFilterControls
                filters={filters}
                setFilters={setFilters}
              />
              <br />
              <Button type="primary" size="large" onClick={onClickSearch}>
                Search
              </Button>
            </Col>
            <Col span={1}></Col>
            <Col span={17}>
              {(() => {
                switch (fetchSitesState) {
                  case LoadingState.LOADING:
                    return (
                      <FetchInfoContainer>
                        <Spin size="large" />
                      </FetchInfoContainer>
                    );
                  case LoadingState.SUCCESS:
                    return (
                      <AdoptedSitesTable
                        fetchData={fetchData}
                        setSelectedEmails={setSelectedEmails}
                      />
                    );
                  case LoadingState.ERROR:
                    return (
                      <FetchInfoContainer>
                        <Alert
                          message="Error"
                          description="Failed to fetch site data!"
                          type="error"
                          showIcon
                        />
                      </FetchInfoContainer>
                    );
                }
              })()}
            </Col>
          </Row>
          <Divider />
          <Typography.Title level={3}>
            Select a type of email to send volunteers or write an email below
          </Typography.Title>
          <EmailTypeSelect
            value={emailType}
            defaultValue={EmailType.INACTIVE}
            options={Object.entries(EmailType).map(([key, value]) => ({
              value: key,
              label: value,
            }))}
            onChange={(value: EmailType) => setEmailType(value)}
            disabled // TODO uncomment when ready
          />
          <Typography.Title level={3}>Email</Typography.Title>
          <SendEmailForm emails={selectedEmails} />
        </EmailPageContainer>
      </PageLayout>
    </>
  );
};

export default Email;
