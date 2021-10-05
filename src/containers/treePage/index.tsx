import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/pageLayout';
import { Col, Form, message, Row, Typography } from 'antd';
import { Routes } from '../../App';
import { Helmet } from 'react-helmet';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';
import { isLoggedIn } from '../../auth/ducks/selectors';
import {
  ActivityRequest,
  ProtectedSitesReducerState,
  SiteReducerState,
  SplitSiteEntries,
  TreeCare,
} from './ducks/types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { LIGHT_GREY } from '../../utils/colors';
import styled from 'styled-components';
import {
  getLatestSplitEntry,
  isTreeAdoptedByUser,
  mapStewardshipToTreeCare,
} from './ducks/selectors';
import {
  asyncRequestIsComplete,
  asyncRequestIsFailed,
} from '../../utils/asyncRequest';
import { C4CState } from '../../store';
import { getAdoptedSites, getSiteData } from './ducks/thunks';
import protectedApiClient from '../../api/protectedApiClient';
import TreeBackground from '../../assets/images/grey-logo.png';
import { RecordStewardshipRequest } from '../../components/forms/ducks/types';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import TreeInfo from '../../components/treeInfo';
import TreeActivity from '../../components/treeActivity';
import EntryList from '../../components/entryList';
import { CenterDiv, ReturnButton } from '../../components/themedComponents';
import { STREET_ZOOM } from '../../components/mapPageComponents/constants';

const { Title } = Typography;

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
  max-height: 70vh;
  padding: 30px 15px 5px;
  overflow: auto;
`;

const MobileTreeCareContainer = styled.div`
  margin-top: 5vh;
  border: solid 1px ${LIGHT_GREY};
  max-height: 50vh;
  padding: 30px 15px 5px;
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
        dispatch(getSiteData(id));
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
      return isTreeAdoptedByUser(state.adoptedSitesState.adoptedSites, id);
    } else {
      return false;
    }
  });

  const latestEntry: SplitSiteEntries = useSelector((state: C4CState) => {
    return getLatestSplitEntry(state.siteState.siteData);
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
          {asyncRequestIsComplete(siteData) && (
            <>
              <ReturnButton
                to={Routes.LANDING}
                state={{
                  zoom: STREET_ZOOM,
                  lat: siteData.result.lat,
                  lng: siteData.result.lng,
                  activeId: siteData.result.siteId,
                }}
              >
                {`<`} Return to Tree Map
              </ReturnButton>

              {(() => {
                switch (windowType) {
                  case WindowTypes.Desktop:
                  case WindowTypes.NarrowDesktop:
                    return (
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
                                stewardshipFormInstance={
                                  stewardshipFormInstance
                                }
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
                    );
                  case WindowTypes.Tablet:
                    return (
                      <TreeMainContainer>
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
                        <TreeCareContainer>
                          <TreeActivity stewardship={stewardship} />
                        </TreeCareContainer>
                      </TreeMainContainer>
                    );
                  case WindowTypes.Mobile:
                    return (
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
                          <TreeActivity stewardship={stewardship} limit={4} />
                        </MobileTreeCareContainer>
                      </MobileTreeMainContainer>
                    );
                }
              })()}
              {/* Display main entries if there are any. Otherwise, display message that no entries have been collected */}
              {latestEntry.main.length ? (
                <>
                  <CenterDiv>
                    <EntryList
                      entries={latestEntry.main}
                      canHide={false}
                      title="About This Tree"
                    />
                  </CenterDiv>
                  {/* Display extra entries if there are any, given that there are main entries */}
                  {latestEntry.extra.length !== 0 && (
                    <CenterDiv>
                      <EntryList
                        entries={latestEntry.extra}
                        canHide={true}
                        hideText="Hide Extra Tree Details"
                        showText="Click to Read More About This Tree"
                        title="Additional Information"
                      />
                    </CenterDiv>
                  )}
                </>
              ) : (
                <Title level={2}>
                  No data has been collected about this site.
                </Title>
              )}
            </>
          )}
          {asyncRequestIsFailed(siteData) && (
            <TreeMainContainer>
              <Title level={2}>Tree could not be found.</Title>
            </TreeMainContainer>
          )}
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
      state.siteState.stewardshipActivityData,
    ),
    adoptedSites: state.adoptedSitesState.adoptedSites,
  };
};

export default connect(mapStateToProps)(TreePage);
