import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/pageLayout';
import ReturnButton from '../../components/returnButton';
import { Row, Col, Typography, Button, Card } from 'antd';
import { Routes } from '../../App';
import { Helmet } from 'react-helmet';
import {
  PrivilegeLevel,
  UserAuthenticationReducerState,
} from '../../auth/ducks/types';
import { getPrivilegeLevel } from '../../auth/ducks/selectors';
import { SiteProps, SiteEntry, TreeCare, SiteEntryNames, Activity } from './ducks/types';
import PageHeader from '../../components/pageHeader';
import { TitleProps } from 'antd/lib/typography/Title';
import StewardshipForm from '../../components/stewardshipForm';
import { connect, useDispatch, useSelector } from 'react-redux';
import { LIGHT_GREY, DARK_GREEN, TEXT_GREY } from '../../utils/colors';
import { Gap } from '../../components/themedComponents';
import styled from 'styled-components';
import { SiteReducerState, ProtectedSitesReducerState, Entry } from './ducks/types';
import { mapStewardshipToTreeCare, isTreeAdopted, getLatestEntry } from './ducks/selectors';  
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
import { C4CState } from '../../store';
import { getAdoptedSites, getSiteData } from './ducks/thunks';
import { stewardshipActivities } from './ducks/actions';

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
  max-height: 80%;
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

interface TreeProps {
  readonly tokens: UserAuthenticationReducerState['tokens'];
  readonly siteData: SiteReducerState['siteData'];
  readonly stewardShip: TreeCare[];
  readonly adoptedSites: ProtectedSitesReducerState['adoptedSites'];
}

interface TreeParams {
  id: string;
}

const TreePage: React.FC<TreeProps> = ({ siteData, stewardShip, adoptedSites, tokens }) => {
  const dispatch = useDispatch();
  const id = Number(useParams<TreeParams>().id);

  useEffect(() => {
    dispatch(getSiteData(id));
    if (asyncRequestIsComplete(tokens)) {
      dispatch(getAdoptedSites());
    }
  }, [dispatch, id, tokens]);

  const onFinishRecordStewardship = (values: {
    activityDate: moment.Moment;
    stewardshipActivities: string[];
  }) => {
    const activities: Activity = {
      watered: values.stewardshipActivities.includes('Watered'),
      mulched: values.stewardshipActivities.includes('Mulched'),
      cleaned: values.stewardshipActivities.includes('Cleaned'),
      weeded: values.stewardshipActivities.includes('Weeded'),
    }
    
  };

  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) => {
    return getPrivilegeLevel(state.authenticationState.tokens);
  });

  const doesUserOwnTree: boolean = useSelector((state: C4CState) => {
    return isTreeAdopted(state.adoptedSitesState.adoptedSites, id);
  });

  const latestEntry: Entry[] = useSelector((state: C4CState) => {
    return getLatestEntry(state.siteState.siteData);
  })

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
        { asyncRequestIsComplete(siteData) && (
          <TreePageContainer>
            {/*Change to tree map route once that page is finished*/}
            <ReturnButton to={Routes.HOME}>{`<`} Return to Tree Map</ReturnButton>
            <TreeMainContainer>
              <Row>
                <Col span={17}>
                  <TreeInfoContainer>
                    {siteData.result.entries[0].commonName && (
                      <PageHeader pageTitle={siteData.result.entries[0].commonName} />
                    )}
                    <Title level={2}>{siteData.result.address}</Title>
                    {privilegeLevel !== PrivilegeLevel.NONE ? (
                      <>
                        <Button type="primary" size="large">
                          { doesUserOwnTree ? "Unadopt" : "Adopt" }
                        </Button>
                        <StewardshipContainer>
                          <Title level={3}>Record Tree Care</Title>
                          <StewardshipForm onFinish={onFinishRecordStewardship}/>
                        </StewardshipContainer>
                      </>
                    ) : (
                      <Paragraph>
                        Log in to adopt this tree!
                      </Paragraph>
                    )}
                  </TreeInfoContainer>
                </Col>
                <Col span={7}>
                  <TreeCareContainer>
                    <TreeCareTitle>Tree Care Activity</TreeCareTitle>
                    {stewardShip.map((value: TreeCare, key) => {
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
                {latestEntry.map((entry: Entry) => {
                  return (
                    <StyledCard key={entry.title}>
                      <Title level={3}>{entry.title}</Title>
                      <EntryMessage>{entry.value}</EntryMessage>
                    </StyledCard>
                    );
                })}
              </EntrySpace>
            </Row>
          </TreePageContainer>
        )}
      </PageLayout>
    </>
  );
};

const mapStateToProps = (state: C4CState): TreeProps => {
  return {
    tokens: state.authenticationState.tokens,
    siteData: state.siteState.siteData,
    stewardShip: mapStewardshipToTreeCare(state.siteState.stewarshipActivityData),
    adoptedSites: state.adoptedSitesState.adoptedSites,
  }
};

export default connect(mapStateToProps)(TreePage);
