import React from 'react';
import { ParameterizedRouteBases } from '../../../App';
import { Typography } from 'antd';

interface SiteLinkProps {
  readonly siteId: number;
}

const SiteLink: React.FC<SiteLinkProps> = ({ siteId }) => {
  return (
    <Typography.Link
      href={`${ParameterizedRouteBases.TREE}${siteId}`}
      target={'_blank'}
    >
      {siteId}
    </Typography.Link>
  );
};

export default SiteLink;
