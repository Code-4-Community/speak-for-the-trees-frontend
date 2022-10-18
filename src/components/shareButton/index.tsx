import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import ShareMenu from '../shareMenu';
import ShareWhite from '../../assets/images/sharewhite-small.png';

const StyledShareButton = styled(Button)`
  && {
    margin: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const StyledImg = styled.img`
  max-height: 25px;
  margin-bottom: 4px;
`;

// link prop is primarily for facebook as the post can only be prefilled with a link, no body text
interface ShareButtonProps {
  readonly size: string;
  readonly defaultText: string;
  readonly link: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  size,
  defaultText,
  link,
}) => {
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
        <StyledImg src={ShareWhite} alt="Share this site!" />
      </StyledShareButton>
      {showMenu && (
        <ShareMenu defaultText={defaultText} link={link}></ShareMenu>
      )}
    </>
  );
};

export default ShareButton;
