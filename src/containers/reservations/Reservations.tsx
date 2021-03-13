import React, { useEffect } from 'react';
import MapPage from '../../components/mapPageComponents/mapPage/index';
import BlockTabs from '../../components/blockTabs/index';

import { Helmet } from 'react-helmet';
import { Collapse, Typography } from 'antd';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/window-dimensions';
import MobileMapPage from '../../components/mapPageComponents/mobileMapPage';
import { CaretRightOutlined } from '@ant-design/icons';
import { MapProps, mapStateToProps } from '../../store';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';
import { connect, useDispatch } from 'react-redux';
import { getMapGeoData } from '../../components/mapPageComponents/ducks/thunks';

const { Paragraph } = Typography;
const { Panel } = Collapse;

const Reservations: React.FC<MapProps> = ({ neighborhoods, blocks }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMapGeoData());
  }, [dispatch]);

  const { windowType } = useWindowDimensions();

  switch (windowType) {
    case WindowTypes.Mobile:
      return (
        <>
          <Helmet>
            <title>Reservations</title>
            <meta
              name="Speak for the Trees Reservations"
              content="Reserve blocks"
            />
          </Helmet>
          {asyncRequestIsComplete(blocks) &&
          asyncRequestIsComplete(neighborhoods) && (
            <MobileMapPage isPadding={false} blocks={blocks.result} neighborhoods={neighborhoods.result}>
              <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                className="site-collapse-custom-collapse"
              >
                <Panel key="1" header="Options">
                  <BlockTabs />
                </Panel>
              </Collapse>
            </MobileMapPage>
          )}

        </>
      );

    case WindowTypes.Tablet:
    case WindowTypes.NarrowDesktop:
    case WindowTypes.Desktop:
      return (
        <>
          <Helmet>
            <title>Reservations</title>
            <meta
              name="Speak for the Trees Reservations"
              content="Reserve blocks"
            />
          </Helmet>
          {asyncRequestIsComplete(blocks) &&
          asyncRequestIsComplete(neighborhoods) && (
            <MapPage
              blocks={blocks.result}
              neighborhoods={neighborhoods.result}
              sidebarHeader="My Blocks"
              sidebarDescription="Dreamcatcher kogi taiyaki keytar. Swag typewriter craft beer cronut pok pok gentrify flannel salvia deep v pork belly pitchfork. Swag fashion axe fam. Occupy biodiesel jean shorts affogato PBR&B freegan bushwick vegan four loko pickled."
            >
              <BlockTabs />
            </MapPage>
          )}
        </>
      );

    default:
      return <Paragraph>This browser type is not supported.</Paragraph>;
  }
};

export default connect(mapStateToProps)(Reservations);
