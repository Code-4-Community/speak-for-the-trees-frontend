import React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Checkbox, CheckboxOptionType, Typography } from 'antd';
import { WHITE } from '../../../../utils/colors';
import { MapViews, SiteOption } from '../../ducks/types';
import { FullWidthSpace, InlineImage } from '../../../themedComponents';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import SlideDown from '../../../slideDown';
import MapLegend from '../../mapLegend';
import { ALL_SITES_VISIBLE, DESKTOP_SLIDE_HEIGHT } from '../../constants';

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
  const options: CheckboxOptionType[] = siteOptions.map((option) => {
    return { label: treeSpan(option.image, option.label), value: option.value };
  });

  const icons: string[] = siteOptions.map((option) => option.image);

  return (
    <LegendContainer>
      <SlideDown defaultOpen={true} slideHeight={DESKTOP_SLIDE_HEIGHT}>
        <MapLegend view={MapViews.TREES} icons={icons} />
        <Typography.Text strong>Show</Typography.Text>
        <StyledCheckbox
          options={options}
          defaultValue={ALL_SITES_VISIBLE}
          onChange={onCheck}
        />
      </SlideDown>
    </LegendContainer>
  );
};

export default SiteLegend;
