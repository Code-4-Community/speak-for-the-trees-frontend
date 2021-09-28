import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Typography, Button, FormInstance } from 'antd';
import { RedirectStateProps, Routes } from '../../App';
import PageHeader from '../../components/pageHeader';
import StewardshipForm from '../forms/stewardshipForm';
import styled from 'styled-components';
import { SiteProps } from '../../containers/treePage/ducks/types';
import { RecordStewardshipRequest } from '../forms/ducks/types';
import { MID_GREEN } from '../../utils/colors';

const { Title } = Typography;

const TreeHeader = styled.div`
  text-transform: capitalize;
`;

const StewardshipContainer = styled.div`
  margin-top: 40px;
`;

const ToggleTextButton = styled(Button)`
  padding: 0px;
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
}) => {
  const history = useHistory();
  const location = useLocation<RedirectStateProps>();

  const adopted = siteData.entries[0].adopter !== null;

  const getSiteLocation = (): string => {
    // TODO change to siteData.city and remove check for zip after data is cleaned
    let baseLocation = `Boston`;
    if (siteData.zip) {
      baseLocation += ` 0${siteData.zip}`;
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
          <PageHeader
            // Either commonName or 'Unknown Species' if no commonName exists
            pageTitle={
              siteData.entries[0].commonName
                ? siteData.entries[0].commonName
                : 'Unknown Species'
            }
            isMobile={mobile}
            pageSubtitle={getSiteLocation()}
            subtitlecolor={MID_GREEN}
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
                    <Button
                      type="primary"
                      size={mobile ? 'middle' : 'large'}
                      onClick={onClickUnadopt}
                    >
                      Unadopt
                    </Button>
                    <StewardshipContainer>
                      <Title level={3}>
                        Record your tree care activity below.
                      </Title>
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
                  </>
                )}
              </>
            );
          case false:
            return (
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
            );
        }
      })()}
    </>
  );
};

export default TreeInfo;
