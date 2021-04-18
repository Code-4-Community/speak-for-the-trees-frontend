import React from 'react';
import PageLayout from '../../components/pageLayout';
import ReturnButton from '../../components/returnButton';
import { Row, Col, Image, Typography, Button, Space, Card } from 'antd';
import { Routes } from '../../App';
import { Helmet } from 'react-helmet';
import { SiteProps, SiteEntry, TreeCare } from './ducks/types';
import PageHeader from '../../components/pageHeader';
import { TitleProps } from 'antd/lib/typography/Title';
import StewardshipForm from '../../components/stewardshipForm';
import placeholder from '../../assets/images/placeholder.png';
import { connect } from 'react-redux';
import { LIGHT_GREY } from '../../utils/colors';
import styled from 'styled-components';

const { Paragraph, Title } = Typography;

const StyledCard = styled(Card)`
  width: 250px;
  height: 100px;
  border: solid 1px ${LIGHT_GREY};
  margin: 7px;
`;

const TreePageContainer = styled.div`
  width: 90vw;
  margin: auto;
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

const TreeCareTitle = styled(Title)`
  margin: 15px 15px 50px;
`;

const TreeCareContainer = styled.div`
  border: solid 1px ${LIGHT_GREY};
  height: 90%;
  margin-top: 20px;
`;

const EntryDate = styled(Title)<TitleProps>`
  display: inline;
  text-align: center;
  line-height: 0px;
  margin: 5px 15px;
`;

const EntryMessage = styled(Paragraph)`
  display: inline;
  text-align: center;
  line-height: 0px;
  color: ${LIGHT_GREY};
  margin: 5px 15px;
`;

const dummyCare: TreeCare[] = [
  {
    date: "March 28th",
    message: "Was cleared of waste and weeded"
  },
  {
    date: "March 27th",
    message: "Was cleared of waste and weeded"
  },
  {
    date: "March 26th",
    message: "Was cleared of waste and weeded"
  },
  {
    date: "March 25th",
    message: "Was cleared of waste and weeded"
  },
  {
    date: "March 24th",
    message: "Was cleared of waste and weeded"
  },
  {
    date: "March 23rd",
    message: "Was cleared of waste and weeded"
  },
]

const dummyTree: SiteProps = {
  siteId: 1,
  blockId: 1,
  lat: 2,
  lng: 2,
  city: 'Boston',
  zip: '02115',
  address: '100 Super Tree Way',
  entries: [{
    id: 1,
    username: 'Speak for the trees user',
    updatedAt: 100000000,
    treePresent: true,
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
  }]
}

const TreePage: React.FC<SiteProps> = ({
  siteId,
  blockId,
  lat,
  lng,
  city,
  zip,
  address,
  entries
}) => {

  const latestEntry: SiteEntry = entries[entries.length - 1];

  const description = "Dreamcatcher kogi taiyaki keytar. Swag typewriter craft beer cronut pok pok gentrify flannel salvia deep v pork belly"

  return(
    <>
      <Helmet>
        <title>Tree</title>
        <meta
          name="Individual Tree Page"
          content="Description of a particular tree site, allows users to adopt a tree and monitor their stewardship activities."
        />
      </Helmet>
      <PageLayout>
        {/*Change to tree map route once that page is finished*/}
        <ReturnButton to={Routes.HOME}> 
          {`<`} Return to Tree Map
        </ReturnButton>
        <TreePageContainer>  
          <Row>
            <Col span={7}>
              <TreeInfoContainer>
                <TreeImage
                  src={placeholder}
                />
              </TreeInfoContainer>
            </Col>
            <Col span={10}>
              <TreeInfoContainer>
                { latestEntry.commonName && 
                  <PageHeader 
                    pageTitle={ latestEntry.commonName }
                  />
                }
                <Title level={2}>
                  { address }
                </Title>  
                <Paragraph>
                  { description }
                </Paragraph>
                <Button type="primary">
                  Adopt
                </Button>  
                <Title level={3}>Record Tree Care</Title>
                <StewardshipForm />
              </TreeInfoContainer>
            </Col>
            <Col span={7}>
              <TreeCareContainer>   
                <TreeCareTitle level={3}>
                  Tree Care Activity
                </TreeCareTitle>
                {
                  dummyCare.map((value: TreeCare) => {
                    return (
                      <div>
                        <EntryDate level={4}>
                          {value.date}
                        </EntryDate>
                        <EntryMessage>
                          {value.message}
                        </EntryMessage>
                      </div>
                    )
                  })
                }
              </TreeCareContainer>
            </Col>
          </Row>
          <Row>
            <EntrySpace>
              {
                Object.entries(latestEntry).map(([key, value]) => {
                  return (
                    <StyledCard>
                      <Title level={3}>{ key }</Title>
                      <Paragraph>{ value }</Paragraph>
                    </StyledCard>
                  )
                })
              }
            </EntrySpace> 
          </Row>
        </TreePageContainer>
      </PageLayout>
    </>
  ); 
}

const mapStateToProps = (): SiteProps => {
  return dummyTree
};

export default connect(mapStateToProps)(TreePage);