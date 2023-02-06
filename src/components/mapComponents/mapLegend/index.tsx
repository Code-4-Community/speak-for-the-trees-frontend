import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Typography } from 'antd';
import {
  ADOPTED_TREE_ICON_DESCRIPTION,
  CLOSED_BLOCK_DESCRIPTION,
  OPEN_BLOCK_DESCRIPTION,
  OPEN_SITE_DESCRIPTION,
  PRIVATE_STREET_DESCRIPTION,
  RESERVED_BLOCK_DESCRIPTION,
  TREE_ICON_DESCRIPTION,
  YOUNG_TREE_ICON_DESCRIPTION,
} from './content';
import adoptedTreeIcon from '../../../assets/images/siteIcons/adoptedIcon.svg';
import treeIcon from '../../../assets/images/siteIcons/standardIcon.svg';
import youngTreeIcon from '../../../assets/images/siteIcons/youngIcon.svg';
import openSiteIcon from '../../../assets/images/siteIcons/openIcon.svg';
import { MAP_GREEN, MAP_RED, MAP_YELLOW, RED } from '../../../utils/colors';
import { MapViews } from '../ducks/types';
import {
  DESKTOP_FONT_SIZE,
  MOBILE_FONT_SIZE,
  InlineImage,
} from '../../themedComponents';
import { BREAKPOINT_TABLET } from '../../windowDimensions';
import { Languages } from '../../../App';

const MapLegendContainer = styled.div`
  margin-bottom: 5px;
  width: 100%;
`;

const FlexibleParagraph = styled(Typography.Paragraph)`
  line-height: 15px;
  font-size: ${DESKTOP_FONT_SIZE};
  display: inline-block;

  @media (max-width: ${BREAKPOINT_TABLET}px) {
    font-size: ${MOBILE_FONT_SIZE};
  }
`;

const LegendHeader = styled(Typography.Text)`
  font-size: ${DESKTOP_FONT_SIZE};

  @media (max-width: ${BREAKPOINT_TABLET}px) {
    font-size: ${MOBILE_FONT_SIZE};
  }
`;

const ToggleTextButton = styled(Button)`
  padding: 0px;
`;

const LegendItem = styled.div`
  width: 100%;
  display: flex;
  gap: 0 40px;

  @media (min-width: ${BREAKPOINT_TABLET}px) {
    gap: 0 20px;
  }
`;

const LegendImage = styled(InlineImage)`
  height: 20px;
  width: 20px;
`;

const RedLineContainer = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
`;

const RedLine = styled.div`
  width: 20px;
  height: 2px;
  display: inline-block;
  background: ${RED};
`;

const ColorBlock = styled.div`
  width: 20px;
  height: 20px;
  display: inline-block;
  background: ${(props: ColorBlockProps) => props.color};
`;

interface ColorBlockProps {
  readonly color: string;
}

interface MapLegendProps {
  readonly view: MapViews;
  readonly canHide?: boolean;
}

const MapLegend: React.FC<MapLegendProps> = ({ view, canHide }) => {
  const [showLegend, setShowLegend] = useState(true);

  // todo: replace this with prop when implementing languages
  const lang = Languages.ENGLISH;

  const toggleShowLegend = () => {
    setShowLegend((prevState) => !prevState);
  };

  return (
    <MapLegendContainer>
      {(() => {
        switch (view) {
          case MapViews.TREES:
            return (
              <>
                {showLegend && (
                  <>
                    <LegendHeader strong>
                      What does each icon mean?
                    </LegendHeader>
                    <br />
                    <LegendItem>
                      <LegendImage src={youngTreeIcon} preview={false} />
                      <FlexibleParagraph>
                        {YOUNG_TREE_ICON_DESCRIPTION[lang]}
                      </FlexibleParagraph>
                    </LegendItem>
                    <LegendItem>
                      <LegendImage src={treeIcon} preview={false} />
                      <FlexibleParagraph>
                        {TREE_ICON_DESCRIPTION[lang]}
                      </FlexibleParagraph>
                    </LegendItem>
                    <LegendItem>
                      <LegendImage src={adoptedTreeIcon} preview={false} />
                      <FlexibleParagraph>
                        {ADOPTED_TREE_ICON_DESCRIPTION[lang]}
                      </FlexibleParagraph>
                    </LegendItem>
                    <LegendItem>
                      <LegendImage src={openSiteIcon} preview={false} />
                      <FlexibleParagraph>
                        {OPEN_SITE_DESCRIPTION[lang]}
                      </FlexibleParagraph>
                    </LegendItem>
                  </>
                )}
              </>
            );
          case MapViews.BLOCKS:
            return (
              <>
                {showLegend && (
                  <>
                    <LegendHeader strong>Blocks that are colored</LegendHeader>
                    <br />
                    <LegendItem>
                      <ColorBlock color={MAP_GREEN} />
                      <FlexibleParagraph>
                        {OPEN_BLOCK_DESCRIPTION[lang]}
                      </FlexibleParagraph>
                    </LegendItem>
                    <LegendItem>
                      <ColorBlock color={MAP_YELLOW} />
                      <FlexibleParagraph>
                        {RESERVED_BLOCK_DESCRIPTION[lang]}
                      </FlexibleParagraph>
                    </LegendItem>
                    <LegendItem>
                      <ColorBlock color={MAP_RED} />
                      <FlexibleParagraph>
                        {CLOSED_BLOCK_DESCRIPTION[lang]}
                      </FlexibleParagraph>
                    </LegendItem>
                  </>
                )}
              </>
            );
        }
      })()}
      {showLegend && (
        <>
          <LegendHeader strong>Watch out!</LegendHeader>
          <br />
          <LegendItem>
            <RedLineContainer>
              <RedLine />
            </RedLineContainer>
            <FlexibleParagraph>
              {PRIVATE_STREET_DESCRIPTION[lang]}
            </FlexibleParagraph>
          </LegendItem>
        </>
      )}
      {canHide && (
        <ToggleTextButton type={'link'} onClick={toggleShowLegend}>
          {showLegend ? 'Hide Legend' : 'Show Legend'}
        </ToggleTextButton>
      )}
    </MapLegendContainer>
  );
};

export default MapLegend;
