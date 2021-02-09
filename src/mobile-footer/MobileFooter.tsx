import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { BACKGROUND_GREY, TEXT_GREY, MID_GREEN } from '../colors';
import Logo from '../nav-bar-icon.png'

const { Paragraph } = Typography;

const FooterContainer = styled.div`
  height: 200px;
  padding: 20px;
  background: ${BACKGROUND_GREY};
`;

const LogoNameContainer = styled.div`
  display: flex;
  height: 100px;
  align-items: center;
`;

const InlineContainer = styled.div`
  display: inline-block;
  margin-right: 10px;
`;

const FooterTitle = styled(Paragraph)`
  color: ${MID_GREEN};
  font-size: 22px;
  font-weight: bold;
`;

const FooterSubtitle = styled(Paragraph)`
  margin-top: -25px;
  font-size: 7px;
`;

const Line = styled.div`
  height: 1px;
  margin: 10px 0px 20px 0px;
  background: ${TEXT_GREY};
`;

const GreyParagraph = styled(Paragraph)`
  color: ${TEXT_GREY};
`;

const MobileFooter: React.FC = () => {
  return (
    <>
      <FooterContainer>
        <LogoNameContainer>
          <InlineContainer>
            <img src={Logo} alt="logo" style={{ height: '80px' }} />
          </InlineContainer>
          <div>
            <FooterTitle>Speak For The Trees</FooterTitle>
            <FooterSubtitle>Dreamcatcher kogi taiyaki keytar.</FooterSubtitle>
          </div>
        </LogoNameContainer>
        <Line />
        <GreyParagraph>Speak For The Trees | C4C © 2020</GreyParagraph>
      </FooterContainer>
    </>
  );
};

export default MobileFooter;
