import React from 'react';
import { Card } from 'antd';
import './general-component-style/map-card.less';

type MapCardProps = {
  cardHeader: string;
  cardBody: string;
};

const MapCard: React.FC<MapCardProps> = (props) => {
  return (
    <div>
      <Card>
        <p className="card-header">{props.cardHeader}</p>
        <h2 className="card-body">{props.cardBody}</h2>
      </Card>
    </div>
  );
};

export default MapCard;
