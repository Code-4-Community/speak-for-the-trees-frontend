import React, { useState, useRef } from 'react';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const AccordionButton = styled.button`
  background-color: #61802e;
  padding: 5px;
  border: none;
  outline: none;
  transition: background-color 0.4s ease;
`;

const AccordionTextDiv = styled.div`
  padding: 18px;
`;

const AccordionContentDiv = styled.div`
  overflow: auto;
  transition: height 0.4s ease;
`;

const AccordionSectionDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Accordion: React.FC = ({ children }) => {
  const [setActive, setActiveState] = useState(false);
  const content = useRef(document.createElement('div'));

  return (
    <AccordionSectionDiv>
      <AccordionButton onClick={() => setActiveState(!setActive)}>
        {
          setActive ? <CaretDownOutlined style={{color: 'white'}} /> : <CaretUpOutlined style={{color: 'white'}} />
        }
      </AccordionButton>
      <AccordionContentDiv
        ref={content}
        style={{ height: setActive ? `${content.current.scrollHeight}px` : '0px' }}
      >
        <AccordionTextDiv>
          {children}
        </AccordionTextDiv>
      </AccordionContentDiv>
    </AccordionSectionDiv>
  );
};

export default Accordion;
