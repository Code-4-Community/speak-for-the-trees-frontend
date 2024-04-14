import React, { useCallback, useState } from 'react';
import protectedApiClient from '../../api/protectedApiClient';
import { StyledClose } from '../themedComponents';
import { ReportSiteRequest } from '../../containers/treePage/ducks/types';
import { Button, message, Modal, Form } from 'antd';
import { FlagOutlined } from '@ant-design/icons';
import ReportSiteForm from '../forms/reportSiteForm';
import styled from 'styled-components';

const StyledReportButton = styled(Button)`
  padding-x: 10px;
  border: none;
`;

const UnadoptButton = styled(Button)`
  & :hover {
    background-color: #fff1f1;
  }
`;

const ReportIcon = styled(FlagOutlined)`
  max-height: 20px;
  font-size: 15px;
`;

interface ReportSiteButtonProps {
  siteId: number;
  mobile?: boolean;
}

const ReportSiteButton: React.FC<ReportSiteButtonProps> = ({
  siteId,
  mobile,
}) => {
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [reportSiteForm] = Form.useForm();

  const reportSite = useCallback(
    (reportInfo: ReportSiteRequest) => {
      protectedApiClient.reportSiteForIssues(siteId, reportInfo).then(() => {
        message.success('Thank you for your report! SFTT has been notified');
        setShowReportModal(false);
      });
    },
    [setShowReportModal],
  );

  return (
    <>
      <UnadoptButton
        danger
        size="middle"
        onClick={() => setShowReportModal(!showReportModal)}
      >
        <ReportIcon />
        Report Site
      </UnadoptButton>

      <Modal
        open={showReportModal}
        title="Report Site For Issues"
        onCancel={() => setShowReportModal(false)}
        footer={null}
        closeIcon={<StyledClose />}
      >
        <ReportSiteForm
          form={reportSiteForm}
          onFinish={reportSite}
        ></ReportSiteForm>
      </Modal>
    </>
  );
};

export default ReportSiteButton;
