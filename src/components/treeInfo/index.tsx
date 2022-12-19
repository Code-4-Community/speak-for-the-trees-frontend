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
import ShareButton from '../../components/shareButton';
import TreePageHeader from '../treePageHeader';
import { C4CState } from '../../store';
import { isAdmin } from '../../auth/ducks/selectors';

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

interface TreeProps {
  readonly siteData: SiteProps;
  readonly loggedIn: boolean;
  readonly userOwnsTree: boolean;
  readonly mobile?: boolean;
  readonly onClickAdopt: () => void;
  readonly onClickUnadopt: () => void;
  readonly onFinishRecordStewardship: (
    values: RecordStewardshipRequest,
  ) => void;
  readonly stewardshipFormInstance: FormInstance;
  readonly editTreeNameFormInstance: FormInstance<NameSiteEntryRequest>;
  readonly onClickEditTreeName: (values: NameSiteEntryRequest) => void;
}

const TreeInfo: React.FC<TreeProps> = ({
  siteData,
  loggedIn,
  userOwnsTree,
  mobile,
  onClickAdopt,
  onClickUnadopt,
  onFinishRecordStewardship,
  stewardshipFormInstance,
  editTreeNameFormInstance,
  onClickEditTreeName,
}) => {
  const history = useHistory();
  const location = useLocation<RedirectStateProps>();

  const adopted = siteData.entries[0] && siteData.entries[0].adopter !== null;

  const userIsAdmin: boolean = useSelector((state: C4CState) =>
    isAdmin(state.authenticationState.tokens),
  );

  const getSiteLocation = (): string => {
    // TODO change to siteData.city and remove check for zip after data is cleaned
    let baseLocation = `Boston`;
    if (siteData.zip) {
      baseLocation += ` ${siteData.zip}`;
    }

    if (siteData.address) {
      return `${siteData.address}, ${baseLocation}`;
    } else {
      return baseLocation;
    }
  };

  const shareButton = (
    <ShareButton
      size={mobile ? 'middle' : 'large'}
      defaultText={
        userOwnsTree
          ? 'Check out this tree I adopted!'
          : adopted
          ? 'Check out this tree near you!'
          : `This tree${
              siteData.address ? ' at ' + siteData.address : ''
            } needs someone to take care of it!`
      }
      link={`map.treeboston.org/tree/${siteData.siteId}`}
    />
  );

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
                  : 'Unknown Species'
                : 'Open Planting Site'
            }
            pageSubtitle={getSiteLocation()}
            isMobile={mobile}
            canEditTreeName={userIsAdmin || userOwnsTree}
            subtitlecolor={MID_GREEN}
            editTreeNameForm={editTreeNameFormInstance}
            onClickEditTreeName={onClickEditTreeName}
            treeName={siteData.entries[0].treeName || 'Name this tree!'}
          />
        }
      </TreeHeader>

      {(() => {
        switch (loggedIn) {
          case true:
            return (
              <>
                {userOwnsTree ? (
                  <>
                    <UnadoptButton
                      danger
                      size={mobile ? 'middle' : 'large'}
                      onClick={onClickUnadopt}
                    >
                      Unadopt
                    </UnadoptButton>
                    {shareButton}
                    <StewardshipContainer>
                      <Typography.Title level={3}>
                        Record your tree care activity below.
                      </Typography.Title>
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
                      size={mobile ? 'middle' : 'large'}
                      onClick={onClickAdopt}
                      disabled={adopted}
                    >
                      {adopted ? 'Already Adopted' : 'Adopt'}
                    </Button>
                    {shareButton}
                  </>
                )}
              </>
            );
          case false:
            return (
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
                  Log in to adopt this tree!
                </ToggleTextButton>
                {shareButton}
              </>
            );
        }
      })()}
    </>
  );
};

export default TreeInfo;
