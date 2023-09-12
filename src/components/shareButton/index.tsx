import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'antd/es/button';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import ShareMenu from '../shareMenu';
import ShareWhite from '../../assets/images/sharewhite-small.png';
import { useTranslation } from 'react-i18next';
import { site } from '../../constants';
import { n } from '../../utils/stringFormat';

const StyledShareButton = styled(Button)`
  margin: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

const StyledImg = styled.img`
  max-height: 25px;
  margin-bottom: 4px;
`;

// link prop is primarily for facebook as the post can only be prefilled with a link, no body text
interface ShareButtonProps {
  readonly size: SizeType;
  readonly defaultText: string;
  readonly link: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  size,
  defaultText,
  link,
}) => {
  const { t } = useTranslation(n(site, ['shareMenu']), { nsMode: 'fallback' });
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <StyledShareButton
        type="primary"
        size={size}
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        <StyledImg src={ShareWhite} alt={t('title')} />
      </StyledShareButton>
      {showMenu && (
        <ShareMenu defaultText={defaultText} link={link}></ShareMenu>
      )}
    </>
  );
};

export default ShareButton;
