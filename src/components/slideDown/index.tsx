import React, { useState, useRef } from 'react';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { MID_GREEN } from '../../utils/colors';

const SlideDownButton = styled.button`
  background-color: ${MID_GREEN};
  padding: 5px;
  border: none;
  outline: none;
  transition: background-color 0.4s ease;
`;

const SlideDownTextDiv = styled.div`
  padding: 18px;
`;

interface SlideDownStyleProps {
  setActive: boolean;
  scrollHeight: number;
}

const SlideDownContentDiv = styled.div`
  overflow: auto;
  transition: height 0.4s ease;
  height: ${({ setActive, scrollHeight }: SlideDownStyleProps) => setActive ? scrollHeight : 0}px;
`;

const SlideDownSectionDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const CaretDownStyled = styled(CaretDownOutlined)`
  color: white;
`;

const CaretUpStyled = styled(CaretUpOutlined)`
  color: white;
`;

const SlideDown: React.FC = ({ children }) => {
  const [setActive, setActiveState] = useState(false);
  const content = useRef(document.createElement('div'));
  function handleClick() {
    setActiveState((prevState) => !prevState);
  }

  return (
    <SlideDownSectionDiv>
      <SlideDownButton onClick={handleClick}>
        {setActive ? <CaretDownStyled /> : <CaretUpStyled />}
      </SlideDownButton>
      <SlideDownContentDiv
        ref={content}
        setActive={setActive}
        scrollHeight={content.current.scrollHeight}
      >
        <SlideDownTextDiv>{children}</SlideDownTextDiv>
      </SlideDownContentDiv>
    </SlideDownSectionDiv>
  );
};

export default SlideDown;
