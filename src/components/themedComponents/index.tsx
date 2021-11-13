import styled from 'styled-components';
import { Button, Col, Form, Space, List, Image } from 'antd';
import { FormItemProps } from 'antd/es/form';
import {
  BLACK,
  LIGHT_GREY,
  MID_GREEN,
  WHITE,
  LIGHT_GREEN,
} from '../../utils/colors';
import { LinkButton } from '../linkButton';

export const ContentContainer = styled.div`
  display: block;
  padding: 3vw;
  width: 70vw;
  margin: auto;
`;

export const CenterDiv = styled.div`
  margin: auto;
`;

export const InputContainer = styled(Col)`
  height: 60vh;
  width: 60vw;
  padding: 30px 120px 0 50px;
  background: ${LIGHT_GREY};
  box-shadow: 2px 3px 6px ${BLACK}25;
  border-radius: 6px;
  overflow: auto;
`;

export const TabletPageContainer = styled.div`
  margin: auto;
  width: 70vw;
`;

export const FormRow = styled.div`
  width: 100%;
`;

export const Gap = styled.div`
  width: 8%;
  display: inline-block;
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

export const FullWidthForm = styled(Form)`
  width: 100%;
`;
