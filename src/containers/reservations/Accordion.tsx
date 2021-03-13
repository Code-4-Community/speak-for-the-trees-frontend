import React, { useState, useRef } from 'react';
import { CaretUpOutlined } from '@ant-design/icons';
import './Accordion.css';

const Accordion: React.FC = ({ children }) => {
  const [setActive, setActiveState] = useState(false);
  const content = useRef(document.createElement('div'));

  return (
    <div className="accordion__section">
      <button className={`accordion ${setActive}`} onClick={() => setActiveState(!setActive)}>
        <CaretUpOutlined className={setActive ? 'accordion__icon' : 'accordion__icon rotate'} style={{color: 'white'}} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: setActive ? '0px' : `${content.current.scrollHeight}px` }}
        className="accordion__content"
      >
        <div className="accordion__text">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
