import React from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col, Typography, Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './admin-dashboard.less';
const { Title } = Typography;

type DropdownItem = {
  key: number;
  label: string;
};

const AdminDashboard: React.FC = () => {
  const isSuperAdmin = true;

  const teamList: DropdownItem[] = [
    { key: 1, label: 'team 1' },
    { key: 4, label: 'team 2' },
    { key: 7, label: 'team 3' },
  ];

  const teamMenuItems = getMenuItems(teamList);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
        <meta
          name="description"
          content="The page for admin users to modify accounts and download tree data."
        />
      </Helmet>

      <div className="grid-content-container">
        <Col>
          <Row>
            <Title type="secondary">Admin Dashboard</Title>
          </Row>

          {isSuperAdmin && (
            <div className="create-admin-container">
              <Row>
                <Title level={4}>Add an admin</Title>
              </Row>

              <Row className="row">
                <Dropdown
                  className="dropdown"
                  overlay={teamMenuItems}
                  trigger={['click']}
                >
                  <Button>
                    <span style={{ float: 'left' }}>Select Team</span>{' '}
                    <span style={{ float: 'right' }}>
                      <DownOutlined />
                    </span>
                  </Button>
                </Dropdown>
              </Row>

              <Row className="row">
                <Dropdown overlay={teamMenuItems} trigger={['click']}>
                  <Button className="dropdown">
                    <span style={{ float: 'left' }}>Select Team Member</span>{' '}
                    <span style={{ float: 'right' }}>
                      <DownOutlined />
                    </span>
                  </Button>
                </Dropdown>
              </Row>

              <Row className="row">
                <Button type="primary">Confirm</Button>
              </Row>
            </div>
          )}

          <Row>
            <Title level={4}>Download All Team Data</Title>
          </Row>
          <Row className="row">
            <Button type="primary">Download</Button>
          </Row>
        </Col>
      </div>
    </>
  );

  /**
   * Converts a list of dropdown items to a menu format that can be used
   * in an antd dropdown component
   * @param items the list of items that will be in the dropdown
   */
  function getMenuItems(items: DropdownItem[]): JSX.Element {
    return (
      <Menu>
        {items.map((item: DropdownItem) => {
          return <Menu.Item key={item.key}>{item.label}</Menu.Item>;
        })}
      </Menu>
    );
  }
};

export default AdminDashboard;
