import * as React from 'react';
import { Collapse, Typography, Col } from 'antd';

const { Title, Paragraph } = Typography;

type LeaderboardTabProps = {
  tabItems: LeaderboardItem[],
  currentPage: number,
  itemsPerPage: number,
}

export type LeaderboardItem = {
  rank?: number,
  name: string,
  rightSide: React.ReactNode,
  collapseContent?: React.ReactNode,
}

const LeaderboardTab: React.FC<LeaderboardTabProps> = ({tabItems, currentPage, itemsPerPage}) => {

  const itemsOnPage = tabItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const panels = getPanels(itemsOnPage);

  return(
    <>
      <Col>
        The card
      </Col>
      <Col>
        { panels }
      </Col>
    </>
  );  
}

/**
 * Creates the antd Panel objects from the given items
 * @param items 
 */
function getPanels(items: LeaderboardItem[]): React.ReactNode {
  return (
    <Collapse>
      {items.map((item, index) => {
        return <Collapse.Panel 
          key={ index }
          header={ getPanelHeader(item.name, item.rank) }
          extra={ item.rightSide }
          showArrow={ false }
          disabled={ !!!item.collapseContent } //is disabled if collapse content does not exist
        >
          { item.collapseContent }
        </Collapse.Panel>
      })}
    </Collapse>
  );
}

function getPanelHeader(name: string, rank?: number): React.ReactNode {
  return <span>
      {
        rank && <Title level={2}>{ rank }</Title>
      }
      <Paragraph>{ name }</Paragraph>
    </span>
}

export default LeaderboardTab;