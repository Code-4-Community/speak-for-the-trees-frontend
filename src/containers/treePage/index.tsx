import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/pageLayout';
import { Card, Col, Form, List, message, Row, Typography } from 'antd';
import { Routes } from '../../App';
import { Helmet } from 'react-helmet';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';
import { isLoggedIn } from '../../auth/ducks/selectors';
import {
  ActivityRequest,
  Entry,
  ProtectedSitesReducerState,
  SiteReducerState,
  TreeCare,
} from './ducks/types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { LIGHT_GREY, TEXT_GREY } from '../../utils/colors';
import styled from 'styled-components';
import {
  getLatestEntry,
  isTreeAdopted,
  mapStewardshipToTreeCare,
} from './ducks/selectors';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
import { C4CState } from '../../store';
import { getAdoptedSites, getSiteData } from './ducks/thunks';
import protectedApiClient from '../../api/protectedApiClient';
import TreeBackground from '../../assets/images/grey-logo.png';
import { RecordStewardshipRequest } from '../../components/forms/ducks/types';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import ReturnButton from '../../components/returnButton';
import TreeInfo from '../../components/treeInfo';
import TreeActivity from '../../components/treeActivity';

const { Paragraph, Title } = Typography;

const StyledCard = styled(Card)`
  height: 100px;
  line-height: 15px;
  border: solid 1px ${LIGHT_GREY};
  overflow: auto;
`;

const TreePageContainer = styled.div`
  width: 90vw;
  margin: 30px auto auto;
`;

const TreeMainContainer = styled.div`
  margin: 50px 30px 30px;
`;

const MobileTreeMainContainer = styled.div`
  margin: 50px 10px 30px;
`;

const TreeInfoContainer = styled.div`
  height: 100%;
  background: url(${TreeBackground}) no-repeat bottom right;
  background-size: contain;
  margin: auto;
`;

const TreeCareContainer = styled.div`
  margin-top: 5vh;
  border: solid 1px ${LIGHT_GREY};
  max-height: 80%;
  padding: 30px 15px 5px;
  overflow: auto;
`;

const MobileTreeCareContainer = styled.div`
  margin-top: 5vh;
  border: solid 1px ${LIGHT_GREY};
  max-height: 50vh;
  padding: 30px 15px 5px;
  overflow: auto;
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
  readonly stewardship: TreeCare[];
  readonly adoptedSites: ProtectedSitesReducerState['adoptedSites'];
}

interface TreeParams {
  id: string;
}

const TreePage: React.FC<TreeProps> = ({ siteData, stewardship, tokens }) => {
  const dispatch = useDispatch();
  const id = Number(useParams<TreeParams>().id);
  const { windowType } = useWindowDimensions();

  const [stewardshipFormInstance] = Form.useForm();

  useEffect(() => {
    dispatch(getSiteData(id));
    if (asyncRequestIsComplete(tokens)) {
      dispatch(getAdoptedSites());
    }
  }, [dispatch, id, tokens]);

  const onFinishRecordStewardship = (values: RecordStewardshipRequest) => {
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
        <TreePageContainer>
          <ReturnButton to={Routes.LANDING}>
            {`<`} Return to Tree Map
          </ReturnButton>
          {(() => {
            switch (windowType) {
              case WindowTypes.Desktop:
              case WindowTypes.NarrowDesktop:
                return (
                  asyncRequestIsComplete(siteData) && (
                    <TreeMainContainer>
                      <Row>
                        <Col span={14}>
                          <TreeInfoContainer>
                            <TreeInfo
                              siteData={siteData.result}
                              loggedIn={loggedIn}
                              userOwnsTree={doesUserOwnTree}
                              onClickAdopt={onClickAdopt}
                              onClickUnadopt={onClickUnadopt}
                              onFinishRecordStewardship={
                                onFinishRecordStewardship
                              }
                              stewardshipFormInstance={stewardshipFormInstance}
                            />
                          </TreeInfoContainer>
                        </Col>
                        <Col span={1} />
                        <Col span={9}>
                          <TreeCareContainer>
                            <TreeActivity stewardship={stewardship} />
                          </TreeCareContainer>
                        </Col>
                      </Row>
                    </TreeMainContainer>
                  )
                );
              case WindowTypes.Tablet:
                return (
                  asyncRequestIsComplete(siteData) && (
                    <TreeMainContainer>
                      <TreeInfoContainer>
                        <TreeInfo
                          siteData={siteData.result}
                          loggedIn={loggedIn}
                          userOwnsTree={doesUserOwnTree}
                          onClickAdopt={onClickAdopt}
                          onClickUnadopt={onClickUnadopt}
                          onFinishRecordStewardship={onFinishRecordStewardship}
                          stewardshipFormInstance={stewardshipFormInstance}
                        />
                      </TreeInfoContainer>
                      <TreeCareContainer>
                        <TreeActivity stewardship={stewardship} />
                      </TreeCareContainer>
                    </TreeMainContainer>
                  )
                );
              case WindowTypes.Mobile:
                return (
                  asyncRequestIsComplete(siteData) && (
                    <MobileTreeMainContainer>
                      <TreeInfo
                        siteData={siteData.result}
                        loggedIn={loggedIn}
                        userOwnsTree={doesUserOwnTree}
                        mobile={true}
                        onClickAdopt={onClickAdopt}
                        onClickUnadopt={onClickUnadopt}
                        onFinishRecordStewardship={onFinishRecordStewardship}
                        stewardshipFormInstance={stewardshipFormInstance}
                      />
                      <MobileTreeCareContainer>
                        <TreeActivity stewardship={stewardship} />
                      </MobileTreeCareContainer>
                    </MobileTreeMainContainer>
                  )
                );
            }
          })()}
          <Row>
            <List
              dataSource={latestEntry}
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 3,
                lg: 3,
                xl: 5,
                xxl: 5,
              }}
              renderItem={(entry: Entry) => (
                <List.Item>
                  <StyledCard key={entry.title}>
                    <Title level={4}>{entry.title}</Title>
                    <EntryMessage>{entry.value}</EntryMessage>
                  </StyledCard>
                </List.Item>
              )}
            />
          </Row>
        </TreePageContainer>
      </PageLayout>
    </>
  );
};

const mapStateToProps = (state: C4CState): TreeProps => {
  return {
    tokens: state.authenticationState.tokens,
    siteData: state.siteState.siteData,
    stewardship: mapStewardshipToTreeCare(
      state.siteState.stewarshipActivityData,
    ),
    adoptedSites: state.adoptedSitesState.adoptedSites,
  };
};

export default connect(mapStateToProps)(TreePage);
