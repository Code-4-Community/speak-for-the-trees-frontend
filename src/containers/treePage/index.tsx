import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import PageLayout from '../../components/pageLayout';
import { Col, Form, message, Row, Typography, Alert } from 'antd';
import { RedirectStateProps, Routes } from '../../App';
import { Helmet } from 'react-helmet';
import { UserAuthenticationReducerState } from '../../auth/ducks/types';
import { isLoggedIn } from '../../auth/ducks/selectors';
import {
  ActivityRequest,
  MonthYearOption,
  ProtectedSitesReducerState,
  SiteReducerState,
  SplitSiteEntries,
  TreeCare,
} from './ducks/types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { LIGHT_GREY, DARK_GREEN } from '../../utils/colors';
import styled from 'styled-components';
import {
  getLatestSplitEntry,
  isTreeAdoptedByUser,
  mapStewardshipToMonthYearOptions,
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
import {
  NameSiteEntryRequest,
  RecordStewardshipRequest,
} from '../../components/forms/ducks/types';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import TreeInfo from '../../components/treeInfo';
import TreeActivity from '../../components/treeActivity';
import EntryList from '../../components/entryList';
import { CenterDiv, ReturnButton } from '../../components/themedComponents';
import { STREET_ZOOM } from '../../components/mapComponents/constants';
import { CITY_PLANTING_REQUEST_LINK } from '../../assets/links';
import { Trans, useTranslation } from 'react-i18next';
import { site } from '../../App';
import { n } from '../../utils/stringFormat';

const EntryDiv = styled(CenterDiv)`
  margin: 10px 0;
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
  max-height: 70vh;
  padding: 30px 15px 5px;
  overflow: auto;
`;

const MobileTreeCareContainer = styled.div`
  margin-top: 5vh;
  border: solid 1px ${LIGHT_GREY};
  padding: 30px 15px 5px;
`;

const PlantInstructionContainer = styled(Alert)`
  color: ${DARK_GREEN};
  font-weight: bold;
  margin-top: 40px;
`;

const NoTreeMessage = styled.div`
  font-size: 25px;
  line-height: 30px;
  margin-bottom: 20px;
`;

const TreePlantingRequest = styled.div`
  font-size: 20px;
  line-height: 30px;
`;

interface TreeProps {
  readonly tokens: UserAuthenticationReducerState['tokens'];
  readonly siteData: SiteReducerState['siteData'];
  readonly stewardship: TreeCare[];
  readonly monthYearOptions: MonthYearOption[];
  readonly adoptedSites: ProtectedSitesReducerState['adoptedSites'];
}

export interface TreeParams {
  id: string;
}

const TreePage: React.FC<TreeProps> = ({
  siteData,
  stewardship,
  monthYearOptions,
  tokens,
}) => {
  const { t } = useTranslation(n(site, ['myTrees']), { nsMode: 'fallback' });

  const location = useLocation<RedirectStateProps>();

  const dispatch = useDispatch();
  const id = Number(useParams<TreeParams>().id);
  const { windowType } = useWindowDimensions();

  const [stewardshipFormInstance] = Form.useForm();
  const [editTreeNameFormInstance] = Form.useForm();

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
        message.success(t('messages.stewardship_success'));
        stewardshipFormInstance.resetFields();
        dispatch(getSiteData(id));
      })
      .catch((err) =>
        message.error(
          t('messages.stewardship_failure', { error: err.response.data }),
        ),
      );
  };

  const onClickAdopt = () => {
    protectedApiClient
      .adoptSite(id)
      .then(() => {
        message.success(t('messages.adopt_success'));
        dispatch(getAdoptedSites());
      })
      .catch((err) => {
        message.error(
          t('messages.adopt_failure', { error: err.response.data }),
        );
      });
  };

  const onClickUnadopt = () => {
    protectedApiClient
      .unadoptSite(id)
      .then(() => {
        message.success(t('messages.unadopt_success'));
        dispatch(getSiteData(id));
        dispatch(getAdoptedSites());
      })
      .catch((err) => {
        message.error(
          t('messages.unadopt_failure', { error: err.response.data }),
        );
      });
  };

  const onClickEditTreeName = (values: NameSiteEntryRequest) => {
    protectedApiClient
      .nameSiteEntry(id, values)
      .then(() => {
        message.success(t('messages.edit_name_success'));
      })
      .catch((err) =>
        message.error(
          t('messages.edit_name_failure', { error: err.response.data }),
        ),
      );
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

  const noTreeMessage: JSX.Element = asyncRequestIsComplete(siteData) ? (
    <NoTreeMessage>
      {t('no_tree_message', {
        location:
          siteData.result.address ||
          `${siteData.result.lat}° N, ${Math.abs(siteData.result.lng)}° W`,
      })}
    </NoTreeMessage>
  ) : (
    <></>
  );

  const treePlantingRequest: JSX.Element = (
    <TreePlantingRequest>
      <Trans t={t} i18nKey={'tree_planting_request'}>
        The city of Boston plants new trees in the spring and fall primarily on
        resident requests. Ask the city to plant a tree here at{' '}
        <Typography.Link href={CITY_PLANTING_REQUEST_LINK} target="_blank">
          this city tree planting request form
        </Typography.Link>
        !
      </Trans>
    </TreePlantingRequest>
  );

  const returnDestination = location.state
    ? location.state.destination
    : Routes.LANDING;

  return (
    <>
      <Helmet>
        <title>Tree</title>
        <meta
          name="description"
          content="Description of a particular tree site, allows users to adopt a tree and monitor their stewardship activities."
        />
      </Helmet>
      <PageLayout>
        <TreePageContainer>
          {asyncRequestIsComplete(siteData) && (
            <>
              <ReturnButton
                to={returnDestination}
                state={{
                  zoom: STREET_ZOOM,
                  lat: siteData.result.lat,
                  lng: siteData.result.lng,
                  activeId: siteData.result.siteId,
                }}
              >
                {`< ${t('return')}`}
              </ReturnButton>

              {(!siteData.result.entries[0] ||
                !siteData.result.entries[0].treePresent) && (
                <PlantInstructionContainer
                  message={noTreeMessage}
                  description={treePlantingRequest}
                  type="success"
                />
              )}
              {(() => {
                switch (windowType) {
                  case WindowTypes.Desktop:
                  case WindowTypes.NarrowDesktop:
                    return (
                      <TreeMainContainer>
                        <Row>
                          <Col span={11}>
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
                                editTreeNameFormInstance={
                                  editTreeNameFormInstance
                                }
                                onClickEditTreeName={onClickEditTreeName}
                              />
                            </TreeInfoContainer>
                          </Col>
                          <Col span={2} />
                          <Col span={11}>
                            <TreeCareContainer>
                              <TreeActivity
                                stewardship={stewardship}
                                monthYearOptions={monthYearOptions}
                              />
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
                            editTreeNameFormInstance={editTreeNameFormInstance}
                            onClickEditTreeName={onClickEditTreeName}
                          />
                        </TreeInfoContainer>
                        <TreeCareContainer>
                          <TreeActivity
                            stewardship={stewardship}
                            monthYearOptions={monthYearOptions}
                          />
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
                          editTreeNameFormInstance={editTreeNameFormInstance}
                          onClickEditTreeName={onClickEditTreeName}
                        />
                        <MobileTreeCareContainer>
                          <TreeActivity
                            stewardship={stewardship}
                            monthYearOptions={monthYearOptions}
                          />
                        </MobileTreeCareContainer>
                      </MobileTreeMainContainer>
                    );
                }
              })()}
              {/* Display main or extra entries, if there are any. Otherwise, display a message that no entries have been collected. */}
              {latestEntry.main.length !== 0 && (
                <EntryDiv>
                  <EntryList
                    entries={latestEntry.main}
                    canHide={false}
                    title={t('tree_info.about')}
                  />
                </EntryDiv>
              )}
              {latestEntry.extra.length !== 0 && (
                <EntryDiv>
                  <EntryList
                    entries={latestEntry.extra}
                    canHide={true}
                    hideText={t('tree_info.hide_text')}
                    showText={t('tree_info.show_text')}
                    title={t('tree_info.additional_information')}
                  />
                </EntryDiv>
              )}
              {latestEntry.main.length === 0 &&
                latestEntry.extra.length === 0 && (
                  <Typography.Title level={2}>{t('no_data')}</Typography.Title>
                )}
            </>
          )}
          {asyncRequestIsFailed(siteData) && (
            <TreeMainContainer>
              <Typography.Title level={2}>
                {t('tree_not_found')}
              </Typography.Title>
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
    monthYearOptions: mapStewardshipToMonthYearOptions(
      state.siteState.stewardshipActivityData,
    ),
    adoptedSites: state.adoptedSitesState.adoptedSites,
  };
};

export default connect(mapStateToProps)(TreePage);
