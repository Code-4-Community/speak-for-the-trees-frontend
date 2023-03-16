import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import StewardshipReportTable from '../../components/tables/stewardshipReportTable';
import ProtectedApiClient from '../../api/protectedApiClient';
import { Form, message, Skeleton, Tabs, Typography } from 'antd';
import { site } from '../../App';
import { AdoptionReport, StewardshipReport } from './ducks/types';
import { Helmet } from 'react-helmet';
import PageLayout from '../../components/pageLayout';
import styled from 'styled-components';
import PageHeader from '../../components/pageHeader';
import FeaturedStats from '../../components/featuredStats';
import AdoptionReportTable from '../../components/tables/adoptionReportTable';
import { getDotDateString, getErrorMessage, n } from '../../utils/stringFormat';
import {
  getCountAdoptedInPastWeek,
  getStewardshipTableReport,
} from './ducks/selectors';
import { PaddedPageContainer } from '../../components/themedComponents';
import { CSVLink } from 'react-csv';
import { AppError } from '../../auth/axios';
import ExportDataForm from '../../components/forms/exportDataForm';

const FeaturedStatsSection = styled.div`
  margin-bottom: 20px;
`;

const ExportDataSection = styled.div`
  margin-top: 25px;
`;

export enum ReportTypes {
  ADOPTION = 'Adoption Report',
  STEWARDSHIP = 'Stewardship Report',
}

const Reports: React.FC = () => {
  const { t } = useTranslation(n(site, ['reports']), { nsMode: 'fallback' });

  const [adoptionReport, setAdoptionReport] = useState<AdoptionReport>();
  const [stewardshipReport, setStewardshipReport] =
    useState<StewardshipReport>();
  const [reportCsvData, setReportCsvData] = useState<string>();
  const [reportCsvName, setReportCsvName] = useState<string>();

  const [exportDataForm] = Form.useForm();

  useEffect(() => {
    ProtectedApiClient.getAdoptionReport()
      .then((adoptionRes: AdoptionReport) => {
        setAdoptionReport(adoptionRes);
        ProtectedApiClient.getStewardshipReport()
          .then((stewardshipRes: StewardshipReport) =>
            setStewardshipReport(stewardshipRes),
          )
          .catch((err) =>
            message.error(
              t('messages.stewardship_error', { error: getErrorMessage(err) }),
            ),
          );
      })
      .catch((err) =>
        message.error(
          t('messages.adoption_error', { error: getErrorMessage(err) }),
        ),
      );
  }, []);

  const onClickExportData = () => {
    const today = new Date();
    // if no input has been given, get report data for all time
    const previousDays = exportDataForm.getFieldValue('previousDays') || null;

    switch (exportDataForm.getFieldValue('type')) {
      case ReportTypes.ADOPTION:
        // get the appropriate data
        ProtectedApiClient.getAdoptionReportCsv(previousDays)
          .then((res) => {
            // name the csv file with today's date
            setReportCsvName(`adoption.report.${getDotDateString(today)}.csv`);
            // save the fetched data
            setReportCsvData(res);
          })
          .catch((err: AppError) =>
            message.error(
              t('messages.adoption_error', { error: getErrorMessage(err) }),
            ),
          );
        break;
      case ReportTypes.STEWARDSHIP:
        ProtectedApiClient.getStewardshipReportCsv(previousDays)
          .then((res) => {
            setReportCsvName(
              `stewardship.report.${getDotDateString(today)}.csv`,
            );
            setReportCsvData(res);
          })
          .catch((err: AppError) =>
            message.error(
              t('messages.stewardship_error', { error: getErrorMessage(err) }),
            ),
          );
    }
  };

  const onClearReport = () => {
    setReportCsvData(undefined);
    setReportCsvName(undefined);
  };

  return (
    <>
      <Helmet>
        <title>{t('reports')}</title>
        <meta
          name="description"
          content="A page where admins can see and download the latest adoption and stewardship reports."
        />
      </Helmet>
      <PageLayout>
        <PaddedPageContainer>
          <PageHeader pageTitle={t('site_report')} />
          <FeaturedStatsSection>
            <FeaturedStats
              featuredStats={[
                {
                  title: t('stats.adopted_trees'),
                  stat: adoptionReport?.adoptionReport.length,
                },
                {
                  title: t('stats.adopted_trees_last_week'),
                  stat: getCountAdoptedInPastWeek(adoptionReport),
                },
                {
                  title: t('stats.stewardships_performed'),
                  stat: stewardshipReport?.stewardshipReport.length,
                },
              ]}
            />
          </FeaturedStatsSection>
          <Tabs defaultActiveKey={'1'} type={'card'} size={'large'}>
            <Tabs.TabPane tab={t('table_name.adoption')} key={'1'}>
              <Skeleton active loading={adoptionReport === undefined}>
                {adoptionReport && (
                  <AdoptionReportTable
                    adoptionReportEntries={adoptionReport.adoptionReport}
                  />
                )}
              </Skeleton>
            </Tabs.TabPane>
            <Tabs.TabPane tab={t('table_name.stewardship')} key={'2'}>
              <Skeleton active loading={stewardshipReport === undefined}>
                {stewardshipReport && (
                  <StewardshipReportTable
                    stewardshipReportTableEntries={getStewardshipTableReport(
                      stewardshipReport,
                    )}
                  />
                )}
              </Skeleton>
            </Tabs.TabPane>
          </Tabs>

          <ExportDataSection>
            <Typography.Title level={3}>
              {t('download_reports')}
            </Typography.Title>
            <ExportDataForm
              formInstance={exportDataForm}
              onFinish={onClickExportData}
              onUpdate={onClearReport}
            />
            {reportCsvData && (
              <CSVLink
                data={reportCsvData}
                filename={reportCsvName}
                target="_blank"
              >
                {reportCsvName}
              </CSVLink>
            )}
          </ExportDataSection>
        </PaddedPageContainer>
      </PageLayout>
    </>
  );
};

export default Reports;
