import React from 'react';
import styled from 'styled-components';
import { Checkbox, Typography } from 'antd';
import { WHITE } from '../../../utils/colors';
import { MapViews } from '../ducks/types';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import SlideDown from '../../slideDown';
import MapLegend from '../mapLegend';
import { ALL_SITES_VISIBLE, SITE_OPTIONS } from '../constants';

const LegendContainer = styled.div`
  min-width: 200px;
  width: 15vw;
  position: absolute;
  z-index: 2;
  bottom: 0;
  background: ${WHITE};
`;

const StyledCheckbox = styled(Checkbox.Group)`
  background: ${WHITE};
`;

interface SiteLegendProps {
  readonly onCheck: (values: CheckboxValueType[]) => void;
}

const SiteLegend: React.FC<SiteLegendProps> = ({ onCheck }) => {
  return (
    <LegendContainer>
      <SlideDown defaultOpen={true}>
        <MapLegend view={MapViews.TREES} mobile={false} />
        <Typography.Text strong>Show</Typography.Text>
        <StyledCheckbox
          options={SITE_OPTIONS}
          defaultValue={ALL_SITES_VISIBLE}
          onChange={onCheck}
        />
      </SlideDown>
    </LegendContainer>
  );
};

export default SiteLegend;
