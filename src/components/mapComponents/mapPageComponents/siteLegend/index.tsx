import React, { useState } from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Button, Checkbox, CheckboxOptionType, Typography } from 'antd';
import { WHITE } from '../../../../utils/colors';
import { MapViews, SiteOption } from '../../ducks/types';
import { FullWidthSpace, InlineImage } from '../../../themedComponents';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import SlideDown from '../../../slideDown';
import MapLegend from '../../mapLegend';
import {
  ALL_SITES_VISIBLE_STATUS,
  ALL_SITES_VISIBLE_OWNER,
  DESKTOP_SLIDE_HEIGHT,
  SITE_OPTIONS_OWNER,
} from '../../constants';

const LegendContainer = styled.div`
  min-width: 300px;
  width: 15vw;
  position: absolute;
  z-index: 2;
  bottom: 0;
  background: ${WHITE};
`;

const StyledCheckbox = styled(Checkbox.Group)`
  background: ${WHITE};
`;

const ToggleTextButton = styled(Button)`
  padding: 0px;
`;

const treeSpan = (treeIcon: string, labelString: string): ReactNode => {
  return (
    <FullWidthSpace direction={'horizontal'} size={'small'}>
      <InlineImage src={treeIcon} preview={false} />
      <Typography.Text>{labelString}</Typography.Text>
    </FullWidthSpace>
  );
};

interface SiteLegendProps {
  readonly onCheck: (values: CheckboxValueType[]) => void;
  readonly siteOptions: SiteOption[];
}

const SiteLegend: React.FC<SiteLegendProps> = ({ onCheck, siteOptions }) => {
  const [statusOptions, setStatusOptions] = useState<CheckboxValueType[]>(
    ALL_SITES_VISIBLE_STATUS,
  );
  const [ownerOptions, setOwnerOptions] = useState<CheckboxValueType[]>(
    ALL_SITES_VISIBLE_OWNER,
  );
  const [showOwnerOptions, setShowOwnerOptions] = useState<boolean>(false);

  const options: CheckboxOptionType[] = siteOptions.map((option) => {
    return { label: treeSpan(option.image, option.label), value: option.value };
  });

  const icons: string[] = siteOptions.map((option) => option.image);

  const toggleShowOwnerOptions = () => setShowOwnerOptions(!showOwnerOptions);

  return (
    <LegendContainer>
      <SlideDown defaultOpen={true} slideHeight={DESKTOP_SLIDE_HEIGHT}>
        <MapLegend view={MapViews.TREES} icons={icons} />
        <Typography.Text strong>Show based on Status</Typography.Text>
        <StyledCheckbox
          options={options}
          value={statusOptions}
          onChange={(values: CheckboxValueType[]) => {
            setStatusOptions(values);
            onCheck([...ownerOptions, ...values]);
          }}
        />
        <ToggleTextButton type={'link'} onClick={toggleShowOwnerOptions}>
          {showOwnerOptions ? 'Hide Owner Filter' : 'Show Owner Filter'}
        </ToggleTextButton>
        <br />
        {showOwnerOptions && (
          <>
            <Typography.Text strong>Show based on Owner</Typography.Text>
            <StyledCheckbox
              options={SITE_OPTIONS_OWNER}
              value={ownerOptions}
              onChange={(values: CheckboxValueType[]) => {
                setOwnerOptions(values);
                onCheck([...statusOptions, ...values]);
              }}
            />
          </>
        )}
      </SlideDown>
    </LegendContainer>
  );
};

export default SiteLegend;
