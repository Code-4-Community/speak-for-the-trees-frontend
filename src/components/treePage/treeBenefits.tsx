import React, { useEffect, useState } from 'react';
import { Typography, message } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import useWindowDimensions, { WindowTypes } from '../windowDimensions';
import { getMoneyString, n } from '../../utils/stringFormat';
import Client from '../../api/apiClient';
import { TreeParams } from '../../containers/treePage';
import {
  Entry,
  TreeBenefitCategory,
} from '../../containers/treePage/ducks/types';
import ListSection from './listSection';
import { site } from '../../constants';

const TreeStatsContainer = styled.div`
  margin-top: 20px;
`;

const MobileTreeStatsContainer = styled.div`
  margin: 20px auto;
`;

const TreeBenefits: React.FC = () => {
  const { t } = useTranslation(n(site, 'treePage'), { nsMode: 'fallback' });

  const { windowType } = useWindowDimensions();

  const siteId = Number(useParams<TreeParams>().id);

  const [treeBenefits, setTreeBenefits] = useState<Entry[]>();

  useEffect(() => {
    Client.calculateTreeBenefits(siteId)
      .then((benefits) =>
        setTreeBenefits(
          Object.values(TreeBenefitCategory).map((category) => {
            const amount = benefits[category].toFixed(2);
            const money = getMoneyString(benefits[`${category}Money`]);

            return {
              title: t(`tree_benefits.categories.${category}.name`),
              value: `${amount} ${t(
                `tree_benefits.categories.${category}.unit`,
              )} saving ${money}`,
            };
          }),
        ),
      )
      .catch((err) => message.error(err.response.data));
  }, []);

  return treeBenefits ? (
    <>
      {(() => {
        switch (windowType) {
          case WindowTypes.Mobile:
            return (
              <MobileTreeStatsContainer>
                <ListSection
                  title={t('tree_benefits.header')}
                  entries={treeBenefits}
                  canHide={false}
                />

                <LearnMore />
              </MobileTreeStatsContainer>
            );

          case WindowTypes.Tablet:
          case WindowTypes.NarrowDesktop:
          case WindowTypes.Desktop:
            return (
              <TreeStatsContainer>
                <ListSection
                  title={t('tree_benefits.header')}
                  entries={treeBenefits}
                  canHide={false}
                />

                <LearnMore />
              </TreeStatsContainer>
            );

          default:
            return (
              <Typography.Paragraph>
                {t('tree_benefits.unsupported_browser')}
              </Typography.Paragraph>
            );
        }
      })()}
    </>
  ) : (
    <></>
  );
};

const LearnMore: React.FC = () => (
  <Typography.Paragraph>
    <Trans
      ns={n(site, 'treePage')}
      i18nKey="tree_benefits.learn_more"
      components={{
        learnMore: (
          <Typography.Link
            href="http://www.treebenefits.com/calculator/"
            target="_blank"
            underline
          >
            {' '}
          </Typography.Link>
        ),
      }}
    />
  </Typography.Paragraph>
);

export default TreeBenefits;
