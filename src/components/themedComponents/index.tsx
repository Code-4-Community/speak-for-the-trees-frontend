import styled from 'styled-components';
import {
  Button,
  Form,
  Space,
  List,
  Image,
  InputNumber,
  Typography,
} from 'antd';
import { FormItemProps } from 'antd/es/form';
import {
  BLACK,
  LIGHT_GREY,
  MID_GREEN,
  WHITE,
  LIGHT_GREEN,
  DARK_GREEN,
  DARK_GREY,
} from '../../utils/colors';
import { LinkButton } from '../linkButton';
import { BREAKPOINT_TABLET } from '../windowDimensions';

export const MOBILE_FONT_SIZE = '15px';
export const DESKTOP_FONT_SIZE = '12px';

export const PaddedPageContainer = styled.div`
  padding: 5vh 5vw;
`;

export const ContentContainer = styled.div`
  display: block;
  padding: 3vw;
  width: 70vw;
  margin: auto;
`;

export const CenterDiv = styled.div`
  margin: auto;
`;

export const InputGreetingContainer = styled.div`
  width: 100vw;
  min-height: 575px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  align-content: center;
  gap: 20px;

  @media (max-width: ${BREAKPOINT_TABLET}px) {
    min-height: 900px;
  }
`;

export const InputContainer = styled.div`
  height: 525px;
  width: 550px;
  padding: 30px 120px 0 50px;
  background: ${LIGHT_GREY};
  box-shadow: 2px 3px 6px ${BLACK}25;
  border-radius: 6px;
  overflow: hidden;

  @media (max-width: ${BREAKPOINT_TABLET}px) {
    width: 90%;
  }
`;

export const FormRow = styled.div`
  width: 100%;
`;

export const Gap = styled.div`
  width: 8%;
  display: inline-block;
`;

export const InlineFormItem = styled(Form.Item)<FormItemProps>`
  display: inline-block;
  margin: 0 5px;
  height: 14px;
`;

export const FormHalfItem = styled(Form.Item)<FormItemProps>`
  width: 46%;
  display: inline-block;
`;

export const FullWidthSpace = styled(Space)`
  width: 100%;
`;

export const SubmitButton = styled(Button)`
  min-width: 96px;
  height: 40px;
  font-size: 16px;
`;

export const GreenButton = styled(Button)`
  margin-top: 10px;
  background: ${LIGHT_GREEN};
  border: ${LIGHT_GREEN};
  color: ${WHITE};
  font-size: 16px;
  height: 36px;
`;

export const WhiteButton = styled(Button)`
  margin-top: 10px;
  background: ${WHITE};
  border: 1px solid ${LIGHT_GREEN};
  font-size: 16px;
  height: 36px;
`;

export const ReturnButton = styled(LinkButton)`
  margin-top: 20px;
  margin-left: 30px;
  height: 45px;
  border-color: ${MID_GREEN};
  font-size: 18px;
  color: ${MID_GREEN};
`;

export const GreenLinkButton = styled(LinkButton)`
  background-color: ${LIGHT_GREEN};
  border-color: ${LIGHT_GREEN};
  color: ${WHITE};
`;

export const MainContent = styled.div`
  height: 100%;
`;

export const ScrollableListContainer = styled.div`
  max-height: 57vh;
  overflow: auto;
`;

export const StyledListItem = styled(List.Item)`
  padding: 3px;
`;

export const CardInfo = styled.div`
  display: inline-block;
  width: 90%;
`;

export const InlineImage = styled(Image)`
  display: inline-block;
`;

export interface FlexProps {
  margin?: string;
  gap?: string;
  justifyContent?: string;
}

export const Flex = styled.div`
  margin: ${({ margin }: FlexProps) => (margin ? margin : '0')};
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: ${({ gap }: FlexProps) => (gap ? gap : '50px')};
  justify-content: ${({ justifyContent }: FlexProps) =>
    justifyContent ? justifyContent : 'flex-start'};
`;

export const FullInputNumber = styled(InputNumber)`
  width: 100%;
`;

export interface BlockProps {
  maxWidth?: string;
  minWidth?: string;
  flexGrow?: string;
}

export const Block = styled.div`
  display: block;
  max-width: ${({ maxWidth }: BlockProps) => (maxWidth ? maxWidth : 'auto')};
  min-width: ${({ minWidth }: BlockProps) => (minWidth ? minWidth : 'auto')};
  flex-grow: ${({ flexGrow }: BlockProps) => (flexGrow ? flexGrow : '0')};
`;

export const MapContainer = styled.div`
  display: block;
  flex-grow: 1;
  min-width: 35%;
  min-height: 475px;
`;

export interface MarginLeftSpanProps {
  marginLeft?: number;
}

export const MarginLeftSpan = styled.span`
  margin-left: ${({ marginLeft }: MarginLeftSpanProps) => marginLeft ?? 0.1}rem;
`;

export interface StyledTitleProps {
  readonly isMobile?: boolean;
}

export const StyledTitle = styled(Typography.Paragraph)`
  font-size: ${(props: StyledSubtitleProps) =>
    props.isMobile ? '30px' : '44px'};
  line-height: ${(props: StyledSubtitleProps) =>
    props.isMobile ? '48px' : '76px'};
  color: ${DARK_GREEN};
  font-weight: bold;
`;

export interface StyledSubtitleProps {
  readonly subtitlecolor?: string;
  readonly isMobile?: boolean;
}

export const StyledSubtitle = styled(Typography.Paragraph)`
  font-weight: normal;
  font-size: ${(props: StyledSubtitleProps) =>
    props.isMobile ? '14px' : '24px'};
  line-height: ${(props: StyledSubtitleProps) =>
    props.isMobile ? '14px' : '32px'};
  margin-top: ${(props: StyledSubtitleProps) =>
    props.isMobile ? '-20px' : '-40px'};
  color: ${(props: StyledSubtitleProps) =>
    props.subtitlecolor || { DARK_GREY }};
`;
