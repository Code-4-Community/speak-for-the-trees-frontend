import styled from 'styled-components';
import { Button, Col, Form, Space } from 'antd';
import { FormItemProps } from 'antd/es/form';
import { BLACK, LIGHT_GREY } from '../../utils/colors';

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
