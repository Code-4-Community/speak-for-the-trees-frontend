import styled from 'styled-components';
import { Col } from 'antd';
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
  padding: 30px 20px 0 50px;
  background: ${LIGHT_GREY};
  box-shadow: 2px 3px 6px ${BLACK}25;
  border-radius: 6px;
  overflow: auto;
`;

export const TabletPageContainer = styled.div`
  margin: auto;
  width: 70vw;
`;
