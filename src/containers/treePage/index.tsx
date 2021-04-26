import React from 'react';
import PageLayout from '../../components/pageLayout';
import ReturnButton from '../../components/returnButton';
import { Row, Col, Image, Typography, Button, Card } from 'antd';
import { Routes } from '../../App';
import { Helmet } from 'react-helmet';
import { SiteProps, SiteEntry, TreeCare, SiteEntryNames } from './ducks/types';
import PageHeader from '../../components/pageHeader';
import { TitleProps } from 'antd/lib/typography/Title';
import StewardshipForm from '../../components/stewardshipForm';
import placeholder from '../../assets/images/placeholder.png';
import { connect } from 'react-redux';
import { LIGHT_GREY, DARK_GREEN, TEXT_GREY } from '../../utils/colors';
import { Gap } from '../../components/themedComponents';
import styled from 'styled-components';

const { Paragraph, Title } = Typography;

const StyledCard = styled(Card)`
  width: 250px;
  height: 100px;
  border: solid 1px ${LIGHT_GREY};
  margin: 7px;
`;

const TreePageContainer = styled.div`
  width: 95vw;
  margin: 30px auto auto;
`;

const TreeMainContainer = styled.div`
  margin: 50px 30px 30px;
`;

const TreeImage = styled(Image)`
  margin-top: 20px;
`;

const TreeInfoContainer = styled.div`
  width: 90%;
  margin: auto;
`;

const EntrySpace = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TreeCareTitle = styled(Paragraph)`
  margin: 15px 15px 50px;
  font-size: 24px;
  font-weight: bold;
  color: ${DARK_GREEN};
`;

const TreeCareContainer = styled.div`
  border: solid 1px ${LIGHT_GREY};
  height: 80%;
  margin-top: 80px;
  overflow: auto;
`;

const CareEntry = styled.div`
  margin: 15px;
`;

const StewardshipContainer = styled.div`
  margin-top: 40px;
`;

const EntryDate = styled(Paragraph)<TitleProps>`
  display: inline;
  text-align: center;
  line-height: 0px;
  font-size: 18px;
  font-weight: bold;
  color: ${DARK_GREEN};
`;

const EntryMessage = styled(Paragraph)`
  display: inline;
  text-align: center;
  line-height: 0px;
  color: ${TEXT_GREY};
`;

const dummyCare: TreeCare[] = [
  {
    date: 'March 28th',
    message: 'Was cleared of waste and weeded',
  },
  {
    date: 'March 27th',
    message: 'Was cleared of waste and weeded',
  },
  {
    date: 'March 26th',
    message: 'Was cleared of waste and weeded',
  },
  {
    date: 'March 25th',
    message: 'Was cleared of waste and weeded',
  },
  {
    date: 'March 24th',
    message: 'Was cleared of waste and weeded',
  },
  {
    date: 'March 23rd',
    message: 'Was cleared of waste and weeded',
  },
];

const dummyTree: SiteProps = {
  siteId: 1,
  blockId: 1,
  lat: 2,
  lng: 2,
  city: 'Boston',
  zip: '02115',
  address: '100 Super Tree Way',
  entries: [
    {
      updatedAt: 100000000,
      status: 'good',
      genus: 'biggus treebus',
      species: 'larggeus',
      commonName: 'large tree',
      confidence: 'good',
      diameter: 1000000,
      circumference: 3140000,
      coverage: 'leaves',
      discoloring: true,
      pooling: false,
      light: true,
      bicycle: true,
      fence: 'yes',
      treeNotes: 'I think it looks pretty good',
      siteNotes: 'dirty',
    },
  ],
};

const TreePage: React.FC<SiteProps> = ({ address, entries }) => {
  const latestEntry: SiteEntry = entries[entries.length - 1];

  return (
    <>
      <Helmet>
        <title>Tree</title>
        <meta
          name="Individual Tree Page"
          content="Description of a particular tree site, allows users to adopt a tree and monitor their stewardship activities."
        />
      </Helmet>
      <PageLayout>
        <TreePageContainer>
          {/*Change to tree map route once that page is finished*/}
          <ReturnButton to={Routes.HOME}>{`<`} Return to Tree Map</ReturnButton>
          <TreeMainContainer>
            <Row>
              <Col span={7}>
                <TreeInfoContainer>
                  <TreeImage src={placeholder} />
                </TreeInfoContainer>
              </Col>
              <Col span={10}>
                <TreeInfoContainer>
                  {latestEntry.commonName && (
                    <PageHeader pageTitle={latestEntry.commonName} />
                  )}
                  <Title level={2}>{address}</Title>
                  <Button type="primary" size="large">
                    Adopt
                  </Button>
                  <StewardshipContainer>
                    <Title level={3}>Record Tree Care</Title>
                    <StewardshipForm />
                  </StewardshipContainer>
                </TreeInfoContainer>
              </Col>
              <Col span={7}>
                <TreeCareContainer>
                  <TreeCareTitle>Tree Care Activity</TreeCareTitle>
                  {dummyCare.map((value: TreeCare, key) => {
                    return (
                      <CareEntry key={key}>
                        <EntryDate>{value.date}</EntryDate>
                        <Gap />
                        <EntryMessage>{value.message}</EntryMessage>
                      </CareEntry>
                    );
                  })}
                </TreeCareContainer>
              </Col>
            </Row>
          </TreeMainContainer>
          <Row>
            <EntrySpace>
              {Object.entries(latestEntry).map(([key, value]) => {
                return (
                  <StyledCard key={key}>
                    <Title level={3}>{SiteEntryNames[key]}</Title>
                    <EntryMessage>{value.toString()}</EntryMessage>
                  </StyledCard>
                );
              })}
            </EntrySpace>
          </Row>
        </TreePageContainer>
      </PageLayout>
    </>
  );
};

const mapStateToProps = (): SiteProps => {
  return dummyTree;
};

export default connect(mapStateToProps)(TreePage);
