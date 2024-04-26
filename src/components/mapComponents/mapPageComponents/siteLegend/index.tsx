import React, { useState } from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Button, Checkbox, CheckboxOptionType, Typography } from 'antd';
import {
  WHITE,
  LIGHT_GREY,
  BLACK,
  LIGHT_GREEN,
  MID_GREEN,
} from '../../../../utils/colors';
import { MapViews, SiteOption } from '../../ducks/types';
import { FullWidthSpace, InlineImage, Flex } from '../../../themedComponents';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import SlideDown from '../../../slideDown';
import MapLegend from '../../mapLegend';
import { LinkButton } from '../../../linkButton';
import {
  ALL_SITES_VISIBLE_STATUS,
  ALL_SITES_VISIBLE_OWNER,
  DESKTOP_SLIDE_HEIGHT,
  SITE_OPTIONS_OWNER,
  MOBILE_SLIDE_HEIGHT,
} from '../../constants';
import { site } from '../../../../constants';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../../../../auth/ducks/selectors';
import LandingContent from '../../../landingContent';
import { useTranslation } from 'react-i18next';
import { n } from '../../../../utils/stringFormat';
import { Routes } from '../../../../App';
import { C4CState } from '../../../../store';
import { TFunction } from 'i18next';

// mobile is a transient prop that isn't passed to the DOM - passes tsc now
const LegendContainer = styled.div<{ $mobile: boolean }>`
  min-width: ${(props) => (props.$mobile ? '100%' : '300px')};
  width: 15vw;
  position: absolute;
  z-index: 2;
  bottom: 0;
  background: ${WHITE};
`;

const StyledCheckbox = styled(Checkbox.Group)<{ $mobile: boolean }>`
  background: ${WHITE};
  ${(props) => props.$mobile && 'display: flex; flex-wrap: wrap; gap: 20px;'}
`;

const ToggleTextButton = styled(Button)`
  padding: 0px;
`;

const LoginButton = styled(LinkButton)`
  width: 120px;
  height: 50px;
  background: ${WHITE};
  border-color: ${LIGHT_GREY};
  color: ${BLACK};
`;

const SignUpButton = styled(LinkButton)`
  width: 120px;
  height: 50px;
  background-color: ${LIGHT_GREEN};
  border-color: ${LIGHT_GREEN};
`;

const MobileTitle = styled(Typography.Paragraph)`
  color: ${MID_GREEN};
  font-size: 25px;
  font-weight: bold;
  line-height: 30px;
`;

const MobileParagraph = styled(Typography.Paragraph)`
  font-size: 15px;
`;

const treeSpan = (
  treeIcon: string,
  translationKey: string,
  t: TFunction,
): ReactNode => {
  return (
    <FullWidthSpace direction={'horizontal'} size={'small'}>
      <InlineImage src={treeIcon} preview={false} />
      <Typography.Text>
        {t(`mapLegend.statusOptions.${translationKey}`)}
      </Typography.Text>
    </FullWidthSpace>
  );
};

interface SiteLegendProps {
  readonly onCheck: (values: CheckboxValueType[]) => void;
  readonly siteOptions: SiteOption[];
  readonly mobile: boolean;
}

const SiteLegend: React.FC<SiteLegendProps> = ({
  onCheck,
  siteOptions,
  mobile,
}) => {
  const { t } = useTranslation(n(site, ['landing', 'maps', 'forms']), {
    nsMode: 'fallback',
  });

  const [statusOptions, setStatusOptions] = useState<CheckboxValueType[]>(
    ALL_SITES_VISIBLE_STATUS,
  );
  const [ownerOptions, setOwnerOptions] = useState<CheckboxValueType[]>(
    ALL_SITES_VISIBLE_OWNER,
  );
  const [showOwnerOptions, setShowOwnerOptions] = useState<boolean>(false);

  const statusCheckboxOptions: CheckboxOptionType[] = siteOptions.map(
    (option) => {
      return {
        label: treeSpan(option.image, option.translationKey, t),
        value: option.value,
      };
    },
  );

  const ownerCheckboxOptions: CheckboxOptionType[] = SITE_OPTIONS_OWNER.map(
    (option) => {
      return {
        label: t(`mapLegend.ownerOptions.${option.translationKey}`),
        value: option.value,
      };
    },
  );

  const icons: string[] = siteOptions.map((option) => option.image);

  const toggleShowOwnerOptions = () => setShowOwnerOptions(!showOwnerOptions);

  const loggedIn: boolean = useSelector((state: C4CState) =>
    isLoggedIn(state.authenticationState.tokens),
  );

  return (
    <LegendContainer $mobile={mobile}>
      <SlideDown
        // default open if on desktop, else closed on mobile
        defaultOpen={!mobile}
        slideHeight={mobile ? DESKTOP_SLIDE_HEIGHT : MOBILE_SLIDE_HEIGHT}
      >
        <Flex
          gap="5px"
          flexDirection="column"
          alignItems="start"
          width={mobile ? '90%' : '100%'}
          margin="auto"
        >
          {mobile && (
            <>
              <MobileTitle>{t('sidebar.title')}</MobileTitle>
              <MobileParagraph>
                <LandingContent />
              </MobileParagraph>
            </>
          )}
          <MapLegend view={MapViews.TREES} icons={icons} />
          <Typography.Text strong>{t('mapLegend.statusShow')}</Typography.Text>
          <StyledCheckbox
            $mobile={mobile}
            options={statusCheckboxOptions}
            value={statusOptions}
            onChange={(values: CheckboxValueType[]) => {
              setStatusOptions(values);
              onCheck([...ownerOptions, ...values]);
            }}
          />
          <ToggleTextButton type={'link'} onClick={toggleShowOwnerOptions}>
            {showOwnerOptions
              ? t('mapLegend.toggleHideOwner')
              : t('mapLegend.toggleShowOwner')}
          </ToggleTextButton>
          {showOwnerOptions && (
            <>
              <Typography.Text strong>
                {t('mapLegend.ownerShow')}
              </Typography.Text>
              <StyledCheckbox
                $mobile={mobile}
                options={ownerCheckboxOptions}
                value={ownerOptions}
                onChange={(values: CheckboxValueType[]) => {
                  setOwnerOptions(values);
                  onCheck([...statusOptions, ...values]);
                }}
              />
            </>
          )}
          {mobile && !loggedIn && (
            <Flex margin="15px 0px" justifyContent="center">
              <div>
                <LoginButton
                  type="primary"
                  htmlType="submit"
                  size="large"
                  to={Routes.LOGIN}
                >
                  {t('log_in')}
                </LoginButton>
              </div>
              <div>
                <SignUpButton
                  type="primary"
                  htmlType="submit"
                  size="large"
                  to={Routes.SIGNUP}
                >
                  {t('sign_up')}
                </SignUpButton>
              </div>
            </Flex>
          )}
        </Flex>
      </SlideDown>
    </LegendContainer>
  );
};

export default SiteLegend;
