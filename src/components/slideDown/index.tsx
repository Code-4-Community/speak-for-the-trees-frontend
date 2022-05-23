import React, { useState, useRef } from 'react';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { MID_GREEN, WHITE } from '../../utils/colors';
import { BREAKPOINT_TABLET } from '../windowDimensions';

interface SlideDownButtonProps {
  readonly active: boolean;
}

const SlideDownButton = styled.button`
  background-color: ${MID_GREEN};
  padding: 5px;
  border: none;
  outline: none;
  transition: background-color 0.4s ease;

  @media (max-width: ${BREAKPOINT_TABLET}px) {
    padding: ${({ active }: SlideDownButtonProps) => (active ? '5px' : '20px')};
    transition: padding 0.4s ease;
  }
`;

const SlideDownTextDiv = styled.div`
  padding: 18px;
`;

interface SlideDownStyleProps {
  setActive: boolean;
  slideHeight: number;
}

const SlideDownContentDiv = styled.div`
  overflow: auto;
  transition: height 0.4s ease;
  height: ${({ setActive, slideHeight }: SlideDownStyleProps) =>
    setActive ? slideHeight : 0}vh;
`;

const SlideDownSectionDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const CaretDownStyled = styled(CaretDownOutlined)`
  color: ${WHITE};
`;

const CaretUpStyled = styled(CaretUpOutlined)`
  color: ${WHITE};
`;

interface SlideDownProps {
  readonly defaultOpen?: boolean;
  readonly slideHeight?: number;
}

const SlideDown: React.FC<SlideDownProps> = ({
  defaultOpen,
  slideHeight,
  children,
}) => {
  const [setActive, setActiveState] = useState<boolean>(defaultOpen || false);
  const content = useRef(document.createElement('div'));
  function handleClick() {
    setActiveState((prevState) => !prevState);
  }

  return (
    <SlideDownSectionDiv>
      <SlideDownButton onClick={handleClick} active={setActive}>
        {setActive ? <CaretDownStyled /> : <CaretUpStyled />}
      </SlideDownButton>
      <SlideDownContentDiv
        ref={content}
        setActive={setActive}
        slideHeight={slideHeight || 40}
      >
        <SlideDownTextDiv>{children}</SlideDownTextDiv>
      </SlideDownContentDiv>
    </SlideDownSectionDiv>
  );
};

export default SlideDown;
