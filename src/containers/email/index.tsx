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
  Form,
  message,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { Routes } from '../../App';
import PageLayout from '../../components/pageLayout';
import { ReturnButton } from '../../components/themedComponents';
import PageHeader from '../../components/pageHeader';
import {
  EmailerFilters,
  FilteredSite,
  FilterSitesParams,
  LoadTemplateResponse,
} from './types';
import EmailerFilterControls from '../../components/emailerFilterControls';
import AdoptedSitesTable from '../../components/adoptedSitesTable';
import protectedApiClient from '../../api/protectedApiClient';
import { NEIGHBORHOOD_OPTS, Neighborhoods } from '../../assets/content';
import SendEmailForm from '../../components/forms/sendEmailForm';
import { site } from '../../constants';
import { n } from '../../utils/stringFormat';
import { useTranslation } from 'react-i18next';

const EmailPageContainer = styled.div`
  width: 90vw;
  margin: 50px auto auto;
  padding-bottom: 50px;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

export const FetchInfoContainer = styled.div`
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

const defaultTemplate = 'Pick a Template';

export enum LoadingState {
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
  const [emailType, setEmailType] = useState<string>(defaultTemplate);
  const [templateNames, setTemplateNames] = useState<string[]>([]);
  const [filters, setFilters] = useState<EmailerFilters>(defaultFilters);
  const [fetchData, setFetchData] = useState<FilteredSite[]>([]);
  const [fetchSitesState, setFetchSitesState] = useState<LoadingState>(
    LoadingState.SUCCESS,
  );
  const { t } = useTranslation(n(site, ['forms', 'admin']), {
    nsMode: 'fallback',
  });

  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [sendEmailForm] = Form.useForm();

  function fetchTemplateNames() {
    protectedApiClient
      .getEmailTemplateNames()
      .then((res) => {
        setTemplateNames(res.templates);
      })
      .catch((err) => {
        setTemplateNames([defaultTemplate]);
        message.error(
          t('volunteer_emailer.template_names_error', {
            error: err.response.data,
          }),
        );
      });
  }

  function fetchTemplateData(templateName: string) {
    protectedApiClient
      .loadEmailTemplateContent(templateName)
      .then((res) => {
        sendEmailForm.setFieldValue('emailBody', res.template);
      })
      .catch((err) => {
        sendEmailForm.setFieldValue('emailBody', '');
        message.error(
          t('volunteer_emailer.template_content_error', {
            error: err.response.data,
          }),
        );
      });
  }

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
      .catch(() => {
        setFetchSitesState(LoadingState.ERROR);
      });
  }

  return (
    <>
      <Helmet>
        <title>{t('emailer.helmet_title')}</title>
        <meta
          name="description"
          content="The page for admin users to filter users based on various criteria and send emails to them"
        />
      </Helmet>
      <PageLayout>
        <EmailPageContainer>
          <ReturnButton to={Routes.ADMIN}>
            <ArrowLeftOutlined /> {t('back')}
          </ReturnButton>
          <PageHeader pageTitle={t('emailer.page_title')} />
          <Row>
            <Col span={6}>
              <FilterHeader>
                <Typography.Title level={3}>
                  {t('emailer.filter_header')}
                </Typography.Title>
                <Button
                  type="link"
                  onClick={(e) => {
                    e.preventDefault();
                    setFilters(defaultFilters);
                  }}
                >
                  {t('emailer.clear_filters')}
                </Button>
              </FilterHeader>
              <EmailerFilterControls
                filters={filters}
                setFilters={setFilters}
              />
              <br />
              <Button type="primary" size="large" onClick={onClickSearch}>
                {t('emailer.search_filters')}
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
                          message={t('emailer.search_error')}
                          description={t('emailer.search_error_description')}
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
            {t('emailer.email_header')}
          </Typography.Title>
          <EmailTypeSelect
            value={emailType}
            defaultValue={defaultTemplate}
            onClick={fetchTemplateNames}
            options={templateNames.map((e) => ({
              value: e,
              label: e,
            }))}
            onChange={(value: string) => {
              setEmailType(value);
              fetchTemplateData(value);
            }}
          />
          <Typography.Title level={3}>{t('emailer.email')}</Typography.Title>
          <SendEmailForm
            emails={selectedEmails}
            sendEmailForm={sendEmailForm}
          />
        </EmailPageContainer>
      </PageLayout>
    </>
  );
};

export default Email;
