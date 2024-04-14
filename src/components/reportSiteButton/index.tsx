import React, { useCallback, useState } from 'react';
import protectedApiClient from '../../api/protectedApiClient';
import { StyledClose } from '../themedComponents';
import { ReportSiteRequest } from '../../containers/treePage/ducks/types';
import { Button, message, Modal, Form } from 'antd';
import { FlagOutlined } from '@ant-design/icons';
import ReportSiteForm from '../forms/reportSiteForm';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { site } from '../../constants';
import { n } from '../../utils/stringFormat';

const StyledReportButton = styled(Button)`
  padding: 0 10px;
  border: none;

  & :hover {
    background-color: #fff1f1;
  }
`;

const ReportIcon = styled(FlagOutlined)`
  max-height: 25px;
  font-size: 20px;
  vertical-align: middle;
`;

interface ReportSiteButtonProps {
  siteId: number;
  mobile?: boolean;
}

const ReportSiteButton: React.FC<ReportSiteButtonProps> = ({
  siteId,
  mobile,
}) => {
  const { t } = useTranslation(n(site, ['treePage']), {
    nsMode: 'fallback',
  });

  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [reportSiteForm] = Form.useForm();

  const reportSite = useCallback(
    (reportInfo: ReportSiteRequest) => {
      protectedApiClient
        .reportSiteForIssues(siteId, reportInfo)
        .then(() => {
          message.success(t('messages.report_success'));
          setShowReportModal(false);
        })
        .catch((err) => {
          message.error(
            t('messages.report_failure', { error: err.response.data }),
          );
        });
    },
    [setShowReportModal],
  );

  return (
    <>
      <StyledReportButton
        danger
        size="middle"
        onClick={() => setShowReportModal(!showReportModal)}
        title={t('report_sites.hover_title')}
      >
        <ReportIcon />
        {/* Report Site */}
      </StyledReportButton>

      <Modal
        open={showReportModal}
        title={t('report_sites.modal_title')}
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
