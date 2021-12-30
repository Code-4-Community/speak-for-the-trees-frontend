import React, { useEffect, useState } from 'react';
import StewardshipReportTable from '../../components/tables/stewardshipReportTable';
import ProtectedApiClient from '../../api/protectedApiClient';
import { message, Skeleton, Tabs } from 'antd';
import { AdoptionReport, StewardshipReport } from './ducks/types';
import { Helmet } from 'react-helmet';
import PageLayout from '../../components/pageLayout';
import styled from 'styled-components';
import PageHeader from '../../components/pageHeader';
import FeaturedStats from '../../components/featuredStats';
import AdoptionReportTable from '../../components/tables/adoptionReportTable';
import { getErrorMessage } from '../../utils/stringFormat';

const { TabPane } = Tabs;

const ReportsContainer = styled.div`
  padding: 5vh 5vw;
`;

const FeaturedStatsSection = styled.div`
  margin-bottom: 20px;
`;

const Reports: React.FC = () => {
  const [adoptionReport, setAdoptionReport] = useState<AdoptionReport>();
  const [stewardshipReport, setStewardshipReport] = useState<
    StewardshipReport
  >();

  useEffect(() => {
    ProtectedApiClient.getAdoptionReport()
      .then((res: AdoptionReport) => setAdoptionReport(res))
      .catch((err) =>
        message.error(`Could not get adoption report: ${getErrorMessage(err)}`),
      );

    ProtectedApiClient.getStewardshipReport()
      .then((res: StewardshipReport) => setStewardshipReport(res))
      .catch((err) =>
        message.error(
          `Could not get stewardship report: ${getErrorMessage(err)}`,
        ),
      );
  }, []);

  return (
    <>
      <Helmet>
        <title>Reports</title>
        <meta
          name="description"
          content="A page where admins can see the latest adoption and stewardship reports."
        />
      </Helmet>
      <PageLayout>
        <ReportsContainer>
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
                  stat: adoptionReport?.adoptionReport.filter(
                    (entry) =>
                      new Date(entry.dateAdopted).getDate() >
                      new Date().getDate() - 7,
                  ).length,
                },
                {
                  title: 'Stewardship Activities Performed',
                  stat: stewardshipReport?.stewardshipReport.length,
                },
              ]}
            />
          </FeaturedStatsSection>
          <Tabs defaultActiveKey={'1'} type={'card'} size={'large'}>
            <TabPane tab={'Adoption Report'} key={'1'}>
              <Skeleton active loading={adoptionReport === undefined}>
                {adoptionReport && (
                  <AdoptionReportTable
                    adoptionReportEntries={adoptionReport.adoptionReport}
                  />
                )}
              </Skeleton>
            </TabPane>
            <TabPane tab={'Stewardship Report'} key={'2'}>
              <Skeleton active loading={stewardshipReport === undefined}>
                {stewardshipReport && (
                  <StewardshipReportTable
                    stewardshipReportEntries={
                      stewardshipReport.stewardshipReport
                    }
                  />
                )}
              </Skeleton>
            </TabPane>
          </Tabs>
        </ReportsContainer>
      </PageLayout>
    </>
  );
};

export default Reports;
