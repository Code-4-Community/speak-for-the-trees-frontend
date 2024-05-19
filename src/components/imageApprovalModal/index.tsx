import { Modal, Space, Button, Row, Col } from 'antd';
import React, { CSSProperties, useEffect, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { FilterImageTableData } from '../../containers/reviewImages/types';

interface ImageApprovalModal {
  visible: boolean;
  onClose: () => void;
  tableData: FilterImageTableData | null;
}

const ImageApprovalModal: React.FC<ImageApprovalModal> = (props) => {
  const [open, setOpen] = useState(props.visible);
  const [data, setData] = useState(props.tableData);

  const close = () => {
    setOpen(false);
    props.onClose();
  };

  const footer = (
    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
      <Button style={{ color: 'gray' }}>
        <LeftOutlined /> Back to List
      </Button>
      <Button style={{ color: 'gray' }}>
        Next Submission <RightOutlined />
      </Button>
    </Space>
  );

  const StatusHeader = () => {
    return (
      <>
        <h1 style={{ color: 'black', marginBottom: '-8px' }}>Status</h1>
        <div
          style={{
            display: 'flex',
            width: '100%',
            backgroundColor: 'rgb(232, 240, 215)',
            padding: '2%',
            borderRadius: '5px',
          }}
        >
          <Button
            type="primary"
            style={{ flex: 1, marginRight: '8px', color: 'black' }}
          >
            Accept
          </Button>
          <Button type="primary" style={{ flex: 1, color: 'black' }}>
            Reject
          </Button>
        </div>
      </>
    );
  };

  if (!data) {
    return null;
  }

  // const treeSummaryTextStyle = {
  //   color: 'black',
  //   fontSize: '12px',
  // };

  const treeSummaryTextStyle: CSSProperties = {
    whiteSpace: 'nowrap', // Prevent text from wrapping
    // overflow: 'hidden', // Hide overflowing text
    // textOverflow: 'ellipsis', // Show ellipsis for overflow
  };

  const TreeSummaryDisplay = () => {
    return (
      <div style={{ marginTop: '5%' }}>
        <Row gutter={[24, 25]}>
          <Col span={24}>
            <Row gutter={25}>
              <Col span={12}>
                <b>
                  <p style={treeSummaryTextStyle}>Site ID</p>
                </b>
              </Col>
              <Col span={12}>
                <p style={treeSummaryTextStyle}>{data.siteId}</p>
              </Col>
            </Row>
            <Row gutter={25}>
              <Col span={12}>
                <b>
                  <p style={treeSummaryTextStyle}>Date Submitted</p>
                </b>
              </Col>
              <Col span={12}>
                <p style={treeSummaryTextStyle}>{data.dateSubmitted}</p>
              </Col>
              <Col span={12}>
                <b>
                  <p style={treeSummaryTextStyle}>Submitted By</p>
                </b>
              </Col>
              <Col span={12}>
                <p style={treeSummaryTextStyle}>{data.submittedBy}</p>
              </Col>
              <Col span={12}>
                <b>
                  <p style={treeSummaryTextStyle}>Species</p>
                </b>
              </Col>
              <Col span={12}>
                <p style={treeSummaryTextStyle}>{data.species}</p>
              </Col>
              <Col span={12}>
                <b>
                  <p style={treeSummaryTextStyle}>Neighborhood</p>
                </b>
              </Col>
              <Col span={12}>
                <p style={treeSummaryTextStyle}>{data.neighborhood}</p>
              </Col>
              <Col span={12}>
                <b>
                  <p style={treeSummaryTextStyle}>Address</p>
                </b>
              </Col>
              <Col span={12}>
                <p style={treeSummaryTextStyle}>{data.address}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  };

  useEffect(() => {
    setOpen(open);
  }, [props.visible]);

  return (
    <Modal
      open={open}
      onOk={close}
      onCancel={close}
      footer={footer}
      width={'40%'}
    >
      <Row gutter={[15, 0]}>
        <Col span={12}>
          <img
            src={data.preview}
            alt="Submission"
            style={{
              width: '100%',
              border: '3px SOLID rgb(141, 164, 113)',
              borderRadius: '5px',
            }}
          />
        </Col>
        <Col span={12}>
          <StatusHeader />
          <TreeSummaryDisplay />
        </Col>
      </Row>
    </Modal>
  );
};

export default ImageApprovalModal;
