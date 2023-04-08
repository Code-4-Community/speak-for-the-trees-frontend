import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Select, Typography, Button } from 'antd';
import { Routes } from '../../App';
import PageLayout from '../../components/pageLayout';
import { ReturnButton } from '../../components/themedComponents';
import PageHeader from '../../components/pageHeader';
import { EmailType, EmailerFilters } from './types';
import EmailerFilterForm from '../../components/emailerFilterForm';
import { CloseOutlined } from '@ant-design/icons';

const EmailPageContainer = styled.div`
  width: 90vw;
  margin: 30px auto auto;
`;

const StyledSelect = styled(Select)`
  margin-top: 20px;
  min-width: 150px;
`;

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
    treeSpecies: [],
  });

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
          <StyledSelect
            defaultValue={EmailType.INACTIVE}
            options={Object.keys(EmailType).map((key) => ({
              value: key,
              label: EmailType[key],
            }))}
            onChange={(value) => setEmailType(value)}
          />
          <EmailerFilterForm filters={filters} setFilters={setFilters} />
          {filters.neighborhoods.map((n) => {
            return (
              <NeighborhoodFilter
                key={n}
                onClick={() =>
                  setFilters({
                    ...filters,
                    neighborhoods: filters.neighborhoods.filter((v) => v !== n),
                  })
                }
              >
                <CloseOutlined />
                {n}
              </NeighborhoodFilter>
            );
          })}
        </EmailPageContainer>
      </PageLayout>
    </>
  );
};

export default Email;
