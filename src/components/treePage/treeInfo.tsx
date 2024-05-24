import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Typography, Button, FormInstance } from 'antd';
import { RedirectStateProps, Routes } from '../../App';
import StewardshipForm from '../forms/stewardshipForm';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { SiteProps } from '../../containers/treePage/ducks/types';
import {
  NameSiteEntryRequest,
  RecordStewardshipRequest,
} from '../forms/ducks/types';
import { MID_GREEN } from '../../utils/colors';
import ShareButton from '../shareButton';
import { TreePageHeader } from './treePageHeader';
import { C4CState } from '../../store';
import { isAdmin } from '../../auth/ducks/selectors';
import { useTranslation } from 'react-i18next';
import { site } from '../../constants';
import { n } from '../../utils/stringFormat';
import { isSFTT } from '../../utils/isCheck';
import { getCommonName } from '../../utils/treeFunctions';
import UploadSiteImageButton from '../uploadSiteImageButton';
import ReportSiteButton from '../reportSiteButton';

const TreeHeader = styled.div`
  text-transform: capitalize;
`;

const StewardshipContainer = styled.div`
  margin-top: 40px;
`;

const ToggleTextButton = styled(Button)`
  padding: 0px;
`;

const UnadoptButton = styled(Button)`
  & :hover {
    background-color: #fff1f1;
  }
`;

const ForceUnadoptButton = styled(Button)`
  margin-left: 10px;
`;

interface TreeProps {
  readonly siteData: SiteProps;
  readonly loggedIn: boolean;
  readonly userOwnsTree: boolean;
  readonly mobile?: boolean;
  readonly onClickAdopt: () => void;
  readonly onClickUnadopt: () => void;
  readonly onClickForceUnadopt: () => void;
  readonly onFinishRecordStewardship: (
    values: RecordStewardshipRequest,
  ) => void;
  readonly stewardshipFormInstance: FormInstance;
  readonly editTreeNameFormInstance: FormInstance<NameSiteEntryRequest>;
  readonly onClickEditTreeName: (values: NameSiteEntryRequest) => void;
}

export const TreeInfo: React.FC<TreeProps> = ({
  siteData,
  loggedIn,
  userOwnsTree,
  mobile,
  onClickAdopt,
  onClickUnadopt,
  onClickForceUnadopt,
  onFinishRecordStewardship,
  stewardshipFormInstance,
  editTreeNameFormInstance,
  onClickEditTreeName,
}) => {
  const { t } = useTranslation(n(site, ['treeInfo']), { nsMode: 'fallback' });

  const history = useHistory();
  const location = useLocation<RedirectStateProps>();

  const isAdopted = !!siteData.entries?.[0]?.adopter;
  const treePresent = !!siteData.entries[0].treePresent;

  const userIsAdmin: boolean = useSelector((state: C4CState) =>
    isAdmin(state.authenticationState.tokens),
  );

  const getSiteLocation = (): string => {
    // TODO change to siteData.city and remove check for zip after data is cleaned
    let baseLocation = isSFTT() ? 'Boston' : 'Cambridge';
    if (siteData.zip) {
      baseLocation += ` ${siteData.zip}`;
    }

    if (siteData.address) {
      return `${siteData.address}, ${baseLocation}`;
    } else {
      return baseLocation;
    }
  };

  return (
    <>
      <TreeHeader>
        {
          <TreePageHeader
            // Display 'Open Planting Site' if no tree has been planted
            // Otherwise, display the tree's commonName or 'Unknown Species' if no commonName exists
            pageTitle={
              siteData.entries[0]?.treePresent
                ? siteData.entries[0].commonName
                  ? siteData.entries[0].commonName
                  : t('species_title.unknown')
                : t('species_title.open')
            }
            pageSubtitle={getSiteLocation()}
            isMobile={mobile}
            canEditTreeName={userIsAdmin || userOwnsTree}
            subtitlecolor={MID_GREEN}
            editTreeNameForm={editTreeNameFormInstance}
            onClickEditTreeName={onClickEditTreeName}
            treeName={siteData.entries[0].treeName || ''}
            treePresent={treePresent}
          />
        }
      </TreeHeader>

      {loggedIn ? (
        <>
          {treePresent && (
            <>
              {userOwnsTree ? (
                <UnadoptButton danger size="middle" onClick={onClickUnadopt}>
                  {t('actions.unadopt')}
                </UnadoptButton>
              ) : (
                <Button
                  type="primary"
                  size="middle"
                  onClick={onClickAdopt}
                  disabled={isAdopted}
                >
                  {isAdopted ? t('actions.adopted') : t('actions.adopt')}
                </Button>
              )}

              {userIsAdmin && (
                <ForceUnadoptButton
                  danger
                  size="middle"
                  onClick={onClickForceUnadopt}
                  disabled={!isAdopted}
                >
                  {t('actions.force_unadopt')}
                </ForceUnadoptButton>
              )}
            </>
          )}

          <TreePageShareButton
            siteData={siteData}
            mobile={mobile}
            userOwnsTree={userOwnsTree}
            isAdopted={isAdopted}
          />

          {/* {treePresent && (
            <UploadSiteImageButton siteEntryId={siteData.entries[0].id} />
          )} */}

          <ReportSiteButton siteId={siteData.siteId} />

          {userOwnsTree && treePresent && (
            <StewardshipContainer>
              <Typography.Title level={3}>
                {t('actions.record_activity')}
              </Typography.Title>
              <StewardshipForm
                onFinish={onFinishRecordStewardship}
                form={stewardshipFormInstance}
              />
            </StewardshipContainer>
          )}
        </>
      ) : (
        <>
          <ToggleTextButton
            type="link"
            size="large"
            onClick={() =>
              history.push(Routes.LOGIN, {
                destination: location.pathname,
              })
            }
          >
            {t('log_in')}
          </ToggleTextButton>

          <TreePageShareButton
            siteData={siteData}
            mobile={mobile}
            userOwnsTree={userOwnsTree}
            isAdopted={isAdopted}
          />
        </>
      )}
    </>
  );
};

interface TreePageShareButtonProps {
  readonly siteData: SiteProps;
  readonly mobile?: boolean;
  readonly userOwnsTree: boolean;
  readonly isAdopted: boolean;
}

const TreePageShareButton: React.FC<TreePageShareButtonProps> = ({
  siteData,
  mobile,
  userOwnsTree,
  isAdopted,
}) => {
  const { t } = useTranslation(n(site, 'treeInfo'), { nsMode: 'fallback' });

  const treeCommonName = getCommonName(siteData);

  return (
    <ShareButton
      size={mobile ? 'middle' : 'large'}
      defaultText={
        userOwnsTree
          ? t('share_messages.user_owns', { treeCommonName })
          : isAdopted
          ? t('share_messages.adopted', { treeCommonName })
          : t('share_messages.open', {
              treeCommonName,
              location: siteData.address ? `at ${siteData.address}` : '',
            })
      }
      link={`map.treeboston.org/tree/${siteData.siteId}`}
    />
  );
};
