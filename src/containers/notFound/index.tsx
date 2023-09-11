import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Routes } from '../../App';
import { site } from '../../constants';
import { ContentContainer } from '../../components/themedComponents';
import Typography from 'antd/es/typography';
import { n } from '../../utils/stringFormat';

const NotFound: React.FC = () => {
  const { t } = useTranslation(n(site, ['notFound']), { nsMode: 'fallback' });

  return (
    <>
      <Helmet>
        <title>Not Found</title>
        <meta
          name="description"
          content="The page users are directed to after entering a route that does not exist."
        />
      </Helmet>
      <ContentContainer>
        <Typography.Title>{t('title')}</Typography.Title>
        <Link to={Routes.HOME}>
          <Typography.Link>{t('home_redirect')}</Typography.Link>
        </Link>
      </ContentContainer>
    </>
  );
};

export default NotFound;
