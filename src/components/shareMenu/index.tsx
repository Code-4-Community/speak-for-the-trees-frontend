import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button, Typography, message } from 'antd';
import TwitterIcon from '../../assets/images/twitter-icon.png';
import EmailIcon from '../../assets/images/email-icon.png';
import FBIcon from '../../assets/images/facebook-icon.png';
import CopyIcon from '../../assets/images/copy-icon.png';

const ShareMenuContainer = styled.div`
  max-width: 550px;
  margin: 20px 0px;
`;

const MediaShareButton = styled(Button)`
  margin-top: 10px;
  margin-right: 10px;
  width: 60px;

  &:hover {
    background-color: #e7ffc7;
  }
`;

const StyledImg = styled.img`
  max-height: 25px;
  margin-bottom: 3px;
`;

interface ShareMenuProps {
  defaultText: string;
  link: string;
}

const ShareMenu: React.FC<ShareMenuProps> = ({ defaultText, link }) => {
  const [formText, setFormText] = useState(`${defaultText} ${link}`);

  const onClickMailTo = () => {
    window.open(
      `mailto:?&subject=Check out this tree!&body=${formText}`,
      '_blank',
    );
  };

  const onClickCopy = () => {
    navigator.clipboard
      .writeText(formText)
      .then(() => {
        message.success('Copied to clipboard');
      })
      .catch(() => {
        message.error('Failed to copy to clipboard');
      });
  };

  return (
    <ShareMenuContainer>
      <Typography.Title level={4}>Share this site!</Typography.Title>
      <Input
        defaultValue={defaultText}
        value={formText}
        onChange={(e) => setFormText(e.target.value)}
      />
      <MediaShareButton name="email-button" onClick={onClickMailTo}>
        <StyledImg src={EmailIcon} alt="Share via email" />
      </MediaShareButton>
      <MediaShareButton
        name="twitter-button"
        href={`https://twitter.com/share?&text=${formText}`}
        rel="noreferrer"
        target="_blank"
      >
        <StyledImg src={TwitterIcon} alt="Share to Twitter" />
      </MediaShareButton>
      <MediaShareButton
        name="facebook-button"
        href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2F${link}`}
        rel="noreferrer"
        target="_blank"
      >
        <StyledImg src={FBIcon} alt="Share to Facebook" />
      </MediaShareButton>
      <MediaShareButton name="copy-button" onClick={onClickCopy}>
        <StyledImg src={CopyIcon} alt="Copy to clipboard" />
      </MediaShareButton>
    </ShareMenuContainer>
  );
};

export default ShareMenu;
