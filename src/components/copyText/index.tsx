import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import styled from 'styled-components';

interface CopyTextProps {
  readonly text: string;
  readonly onCopy?: (text: string) => Promise<void>;
}

/**
 * Writes to the system clipboard using the [Clipboard Api](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API).
 * @param text the string to copy to the clipboard
 */
export const copyToClipboard = (text: string): Promise<void> => {
  return navigator.clipboard.writeText(text);
};

const ClickableText = styled(Button)`
  border: none;
  padding: 0;
  background: inherit;
  box-shadow: none;

  &:hover {
    background: inherit;
  }
`;

const CopyText: React.FC<CopyTextProps> = ({
  text,
  onCopy = copyToClipboard,
}) => {
  const [copiedFeedback, setCopiedFeedback] = useState('Copied to clipboard!');

  const onClick = () => {
    onCopy(text).catch(() => {
      setCopiedFeedback('Browser does not support copying to clipboard.');
    });
  };

  return (
    <Tooltip title={copiedFeedback} trigger={'click'}>
      <ClickableText onClick={onClick}>{text}</ClickableText>
    </Tooltip>
  );
};

export default CopyText;
