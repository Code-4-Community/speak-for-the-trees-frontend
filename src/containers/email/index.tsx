import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Select, Typography } from 'antd';
import { Routes } from '../../App';
import PageLayout from '../../components/pageLayout';
import { ReturnButton } from '../../components/themedComponents';
import PageHeader from '../../components/pageHeader';
import { EmailType, EmailerFilters } from './types';
import EmailerFilterControls from '../../components/emailerFilterControls';
import SendEmailForm from '../../components/forms/sendEmailForm';
// import protectedApiClient from '../../api/protectedApiClient';

const EmailPageContainer = styled.div`
  width: 90vw;
  margin: 30px auto auto;
`;

const selectStyles = { marginTop: 20, minWidth: 150 };

const Email: React.FC = () => {
  const [emailType, setEmailType] = useState<EmailType>(EmailType.INACTIVE);
  const [filters, setFilters] = useState<EmailerFilters>({
    activityCountMin: 0,
    neighborhoods: [],
    commonNames: [],
  });

  const selectedEmails = [''];

  // const treeCommonNames = ['Northern red oak', 'Zelkova'];
  const neighborhoodIds = [34];

  // const handleFilterSites = () => {
  //   return protectedApiClient
  //     .filterSites(null, null, null, null, null, neighborhoodIds)
  //     .then((res: FilterSitesResponse) => console.log(res.filteredSites));
  // };

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

          <EmailerFilterControls filters={filters} setFilters={setFilters} />

          <SendEmailForm emails={selectedEmails} />
        </EmailPageContainer>
      </PageLayout>
    </>
  );
};

export default Email;
