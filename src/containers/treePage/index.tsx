import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import PageLayout from '../../components/pageLayout';
import ReturnButton from '../../components/returnButton';
import { Row, Col, Typography, Button, Card, message, Form } from 'antd';
import { RedirectStateProps, Routes } from '../../App';
import { Helmet } from 'react-helmet';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';
import { isLoggedIn } from '../../auth/ducks/selectors';
import { TreeCare, ActivityRequest } from './ducks/types';
import PageHeader from '../../components/pageHeader';
import { TitleProps } from 'antd/lib/typography/Title';
import StewardshipForm from '../../components/stewardshipForm';
import { connect, useDispatch, useSelector } from 'react-redux';
import { LIGHT_GREY, DARK_GREEN, TEXT_GREY } from '../../utils/colors';
import { Gap } from '../../components/themedComponents';
import styled from 'styled-components';
import {
  SiteReducerState,
  ProtectedSitesReducerState,
  Entry,
} from './ducks/types';
import {
  mapStewardshipToTreeCare,
  isTreeAdopted,
  getLatestEntry,
} from './ducks/selectors';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
import { C4CState } from '../../store';
import { getAdoptedSites, getSiteData } from './ducks/thunks';
import protectedApiClient from '../../api/protectedApiClient';

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

const TreePage: React.FC<TreeProps> = ({ siteData, stewardShip, tokens }) => {
  const dispatch = useDispatch();
  const id = Number(useParams<TreeParams>().id);
  const history = useHistory();
  const location = useLocation<RedirectStateProps>();

  const [stewardshipFormInstance] = Form.useForm();

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
    const activities: ActivityRequest = {
      date: values.activityDate.format('L'),
      watered: values.stewardshipActivities.includes('Watered'),
      mulched: values.stewardshipActivities.includes('Mulched'),
      cleaned: values.stewardshipActivities.includes('Cleared Waste & Litter'),
      weeded: values.stewardshipActivities.includes('Weeded'),
    };
    protectedApiClient
      .recordStewardship(id, activities)
      .then(() => {
        message.success('Stewardship Recorded');
        stewardshipFormInstance.resetFields();
        dispatch(getSiteData(id));
      })
      .catch((err) =>
        message.error(`Failed to record stewardship: ${err.response.data}`),
      );
  };

  const onClickAdopt = () => {
    protectedApiClient
      .adoptSite(id)
      .then(() => {
        message.success('Adopted site!');
        dispatch(getAdoptedSites());
      })
      .catch((err) => {
        message.error(`Failed to adopt site: ${err.response.data}`);
      });
  };

  const onClickUnadopt = () => {
    protectedApiClient
      .unadoptSite(id)
      .then(() => {
        message.success('Unadopted site!');
        dispatch(getAdoptedSites());
      })
      .catch((err) => {
        message.error(`Failed to unadopt site: ${err.response.data}`);
      });
  };

  const loggedIn: boolean = useSelector((state: C4CState) =>
    isLoggedIn(state.authenticationState.tokens),
  );

  const doesUserOwnTree: boolean = useSelector((state: C4CState) => {
    if (loggedIn) {
      return isTreeAdopted(state.adoptedSitesState.adoptedSites, id);
    } else {
      return false;
    }
  });

  const latestEntry: Entry[] = useSelector((state: C4CState) => {
    return getLatestEntry(state.siteState.siteData);
  });

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
        {asyncRequestIsComplete(siteData) && (
          <TreePageContainer>
            <ReturnButton to={Routes.LANDING}>
              {`<`} Return to Tree Map
            </ReturnButton>
            <TreeMainContainer>
              <Row>
                <Col span={17}>
                  <TreeInfoContainer>
                    {siteData.result.entries[0].commonName && (
                      <PageHeader
                        pageTitle={siteData.result.entries[0].commonName}
                      />
                    )}
                    {siteData.result.address && (
                      <Title level={2}>{siteData.result.address}</Title>
                    )}
                    {loggedIn ? (
                      <>
                        {doesUserOwnTree ? (
                          <>
                            <Button
                              type="primary"
                              size="large"
                              onClick={onClickUnadopt}
                            >
                              Unadopt
                            </Button>
                            <StewardshipContainer>
                              <Title level={3}>Record Tree Care</Title>
                              <StewardshipForm
                                onFinish={onFinishRecordStewardship}
                                form={stewardshipFormInstance}
                              />
                            </StewardshipContainer>
                          </>
                        ) : (
                          <>
                            <Button
                              type="primary"
                              size="large"
                              onClick={onClickAdopt}
                            >
                              Adopt
                            </Button>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <Paragraph>Log in to adopt this tree!</Paragraph>
                        <Button
                          type="primary"
                          size={'large'}
                          onClick={() =>
                            history.push(Routes.LOGIN, {
                              destination: location.pathname,
                            })
                          }
                        >
                          Log In
                        </Button>
                      </>
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
    stewardShip: mapStewardshipToTreeCare(
      state.siteState.stewarshipActivityData,
    ),
    adoptedSites: state.adoptedSitesState.adoptedSites,
  };
};

export default connect(mapStateToProps)(TreePage);
