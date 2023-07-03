import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import PageLayout from '../../components/pageLayout';
import { Form, message, Typography, Alert } from 'antd';
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
import {
  NameSiteEntryRequest,
  RecordStewardshipRequest,
} from '../../components/forms/ducks/types';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import {
  TreeInfo,
  LatestEntryInfo,
  SiteImageCarousel,
  TreeActivity,
} from '../../components/treePage';
import { Flex, ReturnButton } from '../../components/themedComponents';
import { STREET_ZOOM } from '../../components/mapComponents/constants';
import { CITY_PLANTING_REQUEST_LINK } from '../../assets/links';
import { Trans, useTranslation } from 'react-i18next';
import { site } from '../../constants';
import { n } from '../../utils/stringFormat';

const TreePageContainer = styled.div`
  width: 90vw;
  margin: 30px auto auto;
`;

const TreeMainContainer = styled.div`
  margin: 30px;
`;

const MobileTreeMainContainer = styled.div`
  margin: 50px 10px 30px;
`;

const TreeInfoContainer = styled.div``;

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

const NoTreeMessageContainer = styled.div`
  font-size: 25px;
  line-height: 30px;
  margin-bottom: 20px;
`;

const TreePlantingRequestContainer = styled.div`
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
  const { t } = useTranslation(n(site, ['treePage', 'forms']), {
    nsMode: 'fallback',
  });

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
      watered: values.stewardshipActivities.includes(
        t('stewardship.activities.watered'),
      ),
      mulched: values.stewardshipActivities.includes(
        t('stewardship.activities.mulched'),
      ),
      cleaned: values.stewardshipActivities.includes(
        t('stewardship.activities.cleaned'),
      ),
      weeded: values.stewardshipActivities.includes(
        t('stewardship.activities.weeded'),
      ),
      installedWateringBag: values.stewardshipActivities.includes(
        t('stewardship.activities.installedWateringBag'),
      ),
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
        dispatch(getSiteData(id));
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

  const onClickForceUnadopt = () => {
    protectedApiClient
      .forceUnadoptSite(id)
      .then(() => {
        message.success(t('messages.force_unadopt_success'));
        dispatch(getSiteData(id));
        dispatch(getAdoptedSites());
      })
      .catch((err) => {
        message.error(
          t('messages.force_unadopt_failure', { error: err.response.data }),
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
                  message={NoTreeMessage}
                  description={TreePlantingRequest}
                  type="success"
                />
              )}

              {(() => {
                switch (windowType) {
                  case WindowTypes.Desktop:
                  case WindowTypes.NarrowDesktop:
                    return (
                      <TreeMainContainer>
                        <Flex>
                          <div style={{ width: '45%' }}>
                            <TreeInfoContainer>
                              <TreeInfo
                                siteData={siteData.result}
                                loggedIn={loggedIn}
                                userOwnsTree={doesUserOwnTree}
                                onClickAdopt={onClickAdopt}
                                onClickUnadopt={onClickUnadopt}
                                onClickForceUnadopt={onClickForceUnadopt}
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

                            <LatestEntryInfo latestEntry={latestEntry} />
                          </div>

                          <div style={{ width: '45%' }}>
                            <TreeCareContainer>
                              <TreeActivity
                                stewardship={stewardship}
                                monthYearOptions={monthYearOptions}
                              />
                            </TreeCareContainer>
                          </div>
                        </Flex>
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
                            onClickForceUnadopt={onClickForceUnadopt}
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
                          onClickForceUnadopt={onClickForceUnadopt}
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

interface NoTreeMessageProps {
  readonly siteData: SiteReducerState['siteData'];
}

const NoTreeMessage: React.FC<NoTreeMessageProps> = ({ siteData }) => {
  const { t } = useTranslation(n(site, 'treePage'), {
    nsMode: 'fallback',
  });

  return asyncRequestIsComplete(siteData) ? (
    <NoTreeMessageContainer>
      {t('no_tree_message', {
        location:
          siteData.result.address ||
          `${siteData.result.lat}° N, ${Math.abs(siteData.result.lng)}° W`,
      })}
    </NoTreeMessageContainer>
  ) : (
    <></>
  );
};

const TreePlantingRequest: React.FC = () => {
  const { t } = useTranslation(n(site, 'treePage'), {
    nsMode: 'fallback',
  });

  return (
    <TreePlantingRequestContainer>
      <Trans
        t={t}
        i18nKey="tree_planting_request"
        components={{
          1: (
            <Typography.Link
              href={CITY_PLANTING_REQUEST_LINK}
              target="_blank"
            ></Typography.Link>
          ),
        }}
      />
    </TreePlantingRequestContainer>
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
