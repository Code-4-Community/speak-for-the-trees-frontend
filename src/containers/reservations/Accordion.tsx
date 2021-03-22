import React, { useState, useRef } from 'react';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { MID_GREEN } from '../../utils/colors';

const AccordionButton = styled.button`
  background-color: ${MID_GREEN};
  padding: 5px;
  border: none;
  outline: none;
  transition: background-color 0.4s ease;
`;

const AccordionTextDiv = styled.div`
  padding: 18px;
`;

interface AccordionStyleProps {
  setActive: boolean;
  scrollHeight: number;
}

const AccordionContentDiv = styled.div`
  overflow: auto;
  transition: height 0.4s ease;
  height: ${({ setActive, scrollHeight }: AccordionStyleProps) => setActive ? scrollHeight : 0}px;
`;

const AccordionSectionDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const CaretDownStyled = styled(CaretDownOutlined)`
  color: white;
`;

const CaretUpStyled = styled(CaretUpOutlined)`
  color: white;
`;

const Accordion: React.FC = ({ children }) => {
  const [setActive, setActiveState] = useState(false);
  const content = useRef(document.createElement('div'));
  function handleClick() {
    setActiveState((prevState) => !prevState);
  }

  return (
    <AccordionSectionDiv>
      <AccordionButton onClick={handleClick}>
        {setActive ? <CaretDownStyled /> : <CaretUpStyled />}
      </AccordionButton>
      <AccordionContentDiv
        ref={content}
        setActive={setActive}
        scrollHeight={content.current.scrollHeight}
      >
        <AccordionTextDiv>{children}</AccordionTextDiv>
      </AccordionContentDiv>
    </AccordionSectionDiv>
  );
};

export default Accordion;
