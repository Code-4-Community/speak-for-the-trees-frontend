import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Typography } from 'antd';
import { Routes } from '../../App';
import PageLayout from '../../components/pageLayout';
import { ReturnButton } from '../../components/themedComponents';
import PageHeader from '../../components/pageHeader';

const EmailPageContainer = styled.div`
  width: 90vw;
  margin: 30px auto auto;
`;

const Email: React.FC = () => {
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
        </EmailPageContainer>
      </PageLayout>
    </>
  );
};

export default Email;