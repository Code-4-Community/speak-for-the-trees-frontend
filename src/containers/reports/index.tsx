import React, { useEffect, useState } from 'react';
import StewardshipReportTable from '../../components/tables/stewardshipReportTable';
import ProtectedApiClient from '../../api/protectedApiClient';
import { Form, message, Skeleton, Tabs, Typography } from 'antd';
import { AdoptionReport, StewardshipReport } from './ducks/types';
import { Helmet } from 'react-helmet';
import PageLayout from '../../components/pageLayout';
import styled from 'styled-components';
import PageHeader from '../../components/pageHeader';
import FeaturedStats from '../../components/featuredStats';
import AdoptionReportTable from '../../components/tables/adoptionReportTable';
import { getDotDateString, getErrorMessage } from '../../utils/stringFormat';
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
  const [adoptionReport, setAdoptionReport] = useState<AdoptionReport>();
  const [stewardshipReport, setStewardshipReport] = useState<
    StewardshipReport
  >();
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
              `Could not get stewardship report: ${getErrorMessage(err)}`,
            ),
          );
      })
      .catch((err) =>
        message.error(`Could not get adoption report: ${getErrorMessage(err)}`),
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
              `Could not get adoption report: ${getErrorMessage(err)}`,
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
              `Could not get stewardship report: ${getErrorMessage(err)}`,
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
        <title>Reports</title>
        <meta
          name="description"
          content="A page where admins can see and download the latest adoption and stewardship reports."
        />
      </Helmet>
      <PageLayout>
        <PaddedPageContainer>
          <PageHeader pageTitle={'Site Report'} />
          <FeaturedStatsSection>
            <FeaturedStats
              featuredStats={[
                {
                  title: 'Adopted Trees',
                  stat: adoptionReport?.adoptionReport.length,
                },
                {
                  title: 'Trees Adopted Since Last Week',
                  stat: getCountAdoptedInPastWeek(adoptionReport),
                },
                {
                  title: 'Stewardship Activities Performed',
                  stat: stewardshipReport?.stewardshipReport.length,
                },
              ]}
            />
          </FeaturedStatsSection>
          <Tabs defaultActiveKey={'1'} type={'card'} size={'large'}>
            <Tabs.TabPane tab={'Adoption Report'} key={'1'}>
              <Skeleton active loading={adoptionReport === undefined}>
                {adoptionReport && (
                  <AdoptionReportTable
                    adoptionReportEntries={adoptionReport.adoptionReport}
                  />
                )}
              </Skeleton>
            </Tabs.TabPane>
            <Tabs.TabPane tab={'Stewardship Report'} key={'2'}>
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
            <Typography.Title level={3}>Download Reports</Typography.Title>
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
