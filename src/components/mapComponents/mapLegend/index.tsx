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
import { MAP_GREEN, MAP_RED, MAP_YELLOW, RED } from '../../../utils/colors';
import { MapViews } from '../ducks/types';
import {
  DESKTOP_FONT_SIZE,
  MOBILE_FONT_SIZE,
  InlineImage,
} from '../../themedComponents';
import { BREAKPOINT_TABLET } from '../../windowDimensions';
import { Languages } from '../../../App';
import { site } from '../../../constants';
import { SITE_OPTIONS_ROADMAP } from '../constants';
import { useTranslation } from 'react-i18next';
import { n } from '../../../utils/stringFormat';

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
  readonly icons?: string[];
}

const MapLegend: React.FC<MapLegendProps> = ({ view, canHide, icons }) => {
  const [showLegend, setShowLegend] = useState(true);

  const { t } = useTranslation(n(site, ['maps']), {
    keyPrefix: 'mapLegend',
    nsMode: 'fallback',
  });

  const toggleShowLegend = () => {
    setShowLegend((prevState) => !prevState);
  };

  const [youngIcon, standardIcon, adoptedIcon, openIcon] =
    icons ?? SITE_OPTIONS_ROADMAP.map((option) => option.image);

  return (
    <MapLegendContainer>
      {(() => {
        switch (view) {
          case MapViews.TREES:
            return (
              <>
                {showLegend && (
                  <>
                    <LegendHeader strong>{t('header')}</LegendHeader>
                    <br />
                    <LegendItem>
                      <LegendImage src={youngIcon} preview={false} />
                      <FlexibleParagraph>
                        {t('legendDescription.young')}
                      </FlexibleParagraph>
                    </LegendItem>
                    <LegendItem>
                      <LegendImage src={standardIcon} preview={false} />
                      <FlexibleParagraph>
                        {t('legendDescription.older')}
                      </FlexibleParagraph>
                    </LegendItem>
                    <LegendItem>
                      <LegendImage src={adoptedIcon} preview={false} />
                      <FlexibleParagraph>
                        {t('legendDescription.adopted')}
                      </FlexibleParagraph>
                    </LegendItem>
                    <LegendItem>
                      <LegendImage src={openIcon} preview={false} />
                      <FlexibleParagraph>
                        {t('legendDescription.open')}
                      </FlexibleParagraph>
                    </LegendItem>
                  </>
                )}
              </>
            );
          // case MapViews.BLOCKS:
          //   return (
          //     <>
          //       {showLegend && (
          //         <>
          //           <LegendHeader strong>Blocks that are colored</LegendHeader>
          //           <br />
          //           <LegendItem>
          //             <ColorBlock color={MAP_GREEN} />
          //             <FlexibleParagraph>
          //               {OPEN_BLOCK_DESCRIPTION[lang]}
          //             </FlexibleParagraph>
          //           </LegendItem>
          //           <LegendItem>
          //             <ColorBlock color={MAP_YELLOW} />
          //             <FlexibleParagraph>
          //               {RESERVED_BLOCK_DESCRIPTION[lang]}
          //             </FlexibleParagraph>
          //           </LegendItem>
          //           <LegendItem>
          //             <ColorBlock color={MAP_RED} />
          //             <FlexibleParagraph>
          //               {CLOSED_BLOCK_DESCRIPTION[lang]}
          //             </FlexibleParagraph>
          //           </LegendItem>
          //         </>
          //       )}
          //     </>
          //   );
        }
      })()}
      {showLegend && (
        <>
          <LegendHeader strong>{t('warning')}</LegendHeader>
          <br />
          <LegendItem>
            <RedLineContainer>
              <RedLine />
            </RedLineContainer>
            <FlexibleParagraph>
              {t('legendDescription.privateStreet')}
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
