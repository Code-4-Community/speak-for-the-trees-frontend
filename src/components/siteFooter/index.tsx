import React from 'react';
import { Layout, Typography } from 'antd';
import { BugOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const { Text, Link } = Typography;

const SiteFooter: React.FC = () => {
  return (
    <>
      <Footer>
        <BugOutlined />
        <Text> Notice something off? </Text>
        <Link href="https://forms.gle/4dLLYX4z5MMsgaAq7" target="_blank">
          Submit a Bug Report!
        </Link>
      </Footer>
    </>
  );
};

export default SiteFooter;
