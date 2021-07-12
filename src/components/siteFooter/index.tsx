import React from 'react';
import { Layout, Typography } from 'antd';
import { BugOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Footer } = Layout;
const { Text, Link } = Typography;

const StyledFooter = styled(Footer)`
  padding-top: 12px;
  padding-bottom: 12px;
  margin: auto;
`;

const SiteFooter: React.FC = () => {
  return (
    <>
      <StyledFooter>
        <BugOutlined />
        <Text> Notice something off? </Text>
        <Link href="https://forms.gle/4dLLYX4z5MMsgaAq7" target="_blank">
          Submit a Bug Report!
        </Link>
      </StyledFooter>
    </>
  );
};

export default SiteFooter;
