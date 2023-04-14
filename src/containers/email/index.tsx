import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Select, Typography, Button } from 'antd';
import { Routes } from '../../App';
import PageLayout from '../../components/pageLayout';
import { ReturnButton } from '../../components/themedComponents';
import PageHeader from '../../components/pageHeader';
import { EmailType, EmailerFilters } from './types';
import EmailerFilterControls from '../../components/emailerFilterControls';
import { CloseOutlined } from '@ant-design/icons';

const EmailPageContainer = styled.div`
  width: 90vw;
  margin: 30px auto auto;
`;

const selectStyles = { marginTop: 20, minWidth: 150 };

const NeighborhoodFilter = styled(Button)`
  padding: 1px 8px;
  margin: 0px 5px;
  line-height: 0.8;
`;

const Email: React.FC = () => {
  const [emailType, setEmailType] = useState<EmailType>(EmailType.INACTIVE);
  const [filters, setFilters] = useState<EmailerFilters>({
    activityCountMin: 0,
    neighborhoods: [],
    commonNames: [],
  });

  function generateFilterButtons(key: 'neighborhoods' | 'commonNames') {
    return filters[key].map((n) => {
      return (
        <NeighborhoodFilter
          key={n}
          onClick={() =>
            setFilters({
              ...filters,
              [key]: filters[key].filter((v) => v !== n),
            })
          }
        >
          <CloseOutlined />
          {n}
        </NeighborhoodFilter>
      );
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
          {generateFilterButtons('neighborhoods')}
          <br />
          {generateFilterButtons('commonNames')}
        </EmailPageContainer>
      </PageLayout>
    </>
  );
};

export default Email;
