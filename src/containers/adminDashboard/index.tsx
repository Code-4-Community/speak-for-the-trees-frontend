import React from 'react';
import { Helmet } from 'react-helmet';
import { Row, Typography, Menu, Dropdown, Button, Form, Input } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';
import { DownOutlined } from '@ant-design/icons';
import PageHeader from '../../components/pageHeader';
import styled from 'styled-components';

const { Title } = Typography;

const AdminContentContainer = styled.div`
  padding: 100px 134px;
`;

const EditUser = styled.div`
  margin: 80px 0px 40px;
  width: 370px;
`;

const RoleDropdown = styled(Dropdown)<DropDownProps>`
  width: 100%;
  height: 36px;
`;

type DropdownItem = {
  key: number;
  label: string;
};

const AdminDashboard: React.FC = () => {
  const isSuperAdmin = true;

  const roleList: DropdownItem[] = [
    { key: 1, label: 'Standard user' },
    { key: 2, label: 'Admin' },
    { key: 3, label: 'Super admin' },
  ];

  const roleMenuItems = getMenuItems(roleList);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
        <meta
          name="Admin Dashboard"
          content="The page for admin users to modify accounts and download team data."
        />
      </Helmet>

      <AdminContentContainer>
        <PageHeader
          pageTitle="Admin Dashboard"
          pageSubtitle=""
          subtitleColor=""
        />

        {isSuperAdmin && (
          <EditUser>
            <Form>
              <Row>
                <Title level={4}>Edit Admins</Title>
              </Row>

              <Form.Item name="email">
                <Input placeholder="User Email" />
              </Form.Item>

              <Form.Item name="role">
                <RoleDropdown overlay={roleMenuItems} trigger={['click']}>
                  <Button>
                    <span style={{ float: 'left' }}>New Role</span>{' '}
                    <span style={{ float: 'right' }}>
                      <DownOutlined />
                    </span>
                  </Button>
                </RoleDropdown>
              </Form.Item>

              <Form.Item name="password">
                <Input placeholder="Password" />
              </Form.Item>

              <Row className="row">
                <Button type="primary">Confirm</Button>
              </Row>
            </Form>
          </EditUser>
        )}

        <Row>
          <Title level={4}>Download All Team Data</Title>
        </Row>
        <Row className="row">
          <Button type="primary">Download</Button>
        </Row>
      </AdminContentContainer>
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
