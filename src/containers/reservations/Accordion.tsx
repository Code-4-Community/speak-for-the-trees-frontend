import React, { useState, useRef } from 'react';
import { CaretUpOutlined } from '@ant-design/icons';
import './Accordion.css';

const Accordion: React.FC = ({ children }) => {
  const [setActive, setActiveState] = useState('');
  const [setHeight, setHeightState] = useState('0px');
  const [setRotate, setRotateState] = useState('accordion__icon');

  const content = useRef(document.createElement('div'));

  function toggleAccordion() {
    setActiveState(setActive === '' ? 'active' : '');
    setHeightState(
      setActive === 'active' ? '0px' : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === 'active' ? 'accordion__icon' : 'accordion__icon rotate'
    );
  }

  return (
    <div className="accordion__section">
      <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
        <CaretUpOutlined className={setRotate} style={{color: 'white'}} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: setHeight }}
        className="accordion__content"
      >
        <div
          className="accordion__text"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
