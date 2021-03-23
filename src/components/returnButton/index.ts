import styled from 'styled-components';
import { LinkButton } from '../LinkButton';
import { MID_GREEN } from '../../utils/colors';

const ReturnButton = styled(LinkButton)`
  height: 45px;
  border-color: ${MID_GREEN};
  font-size: 18px;
  color: ${MID_GREEN};
`;

export default ReturnButton;
