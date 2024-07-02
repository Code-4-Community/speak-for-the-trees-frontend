import { Modal, Space, Button, Row, Col, Input, message } from 'antd';
import React, {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { FilterImageTableData } from '../../containers/reviewImages/types';
import protectedApiClient from '../../api/protectedApiClient';
import { useTranslation } from 'react-i18next';
import { n } from '../../utils/stringFormat';
import { site } from '../../constants';
const { TextArea } = Input;

interface ImageApprovalModal {
  visible: boolean;
  onClose: () => void;
  tableData: FilterImageTableData | null;
  approvedOrRejectedImageIds: number[];
  setApprovedOrRejectedImageIds: Dispatch<SetStateAction<number[]>>;
  allData: FilterImageTableData[];
  setSelectedImage: Dispatch<SetStateAction<FilterImageTableData | null>>;
}

const ImageApprovalModal: React.FC<ImageApprovalModal> = (props) => {
  const { t } = useTranslation(n(site, ['admin']), {
    nsMode: 'fallback',
    keyPrefix: 'review_images',
  });

  const { t: tForms } = useTranslation(n(site, ['forms']), {
    nsMode: 'fallback',
  });

  const [open, setOpen] = useState(props.visible);
  const [data, setData] = useState(props.tableData);
  const [isRejectionTextOpen, setIsRejectionTextOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [allData, setAllData] = useState(props.allData);

  const close = () => {
    setOpen(false);
    props.onClose();
  };

  const openRejectionTextBox = () => {
    setIsRejectionTextOpen(true);
  };

  const handleNextSubmission = () => {
    const currentIndex = allData.findIndex(
      (siteData) => siteData.key === data?.key,
    );
    const nextIndex = (currentIndex + 1) % allData.length;
    const nextImage = allData[nextIndex];
    setData(nextImage);
  };

  const footer = (
    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
      <Button style={{ color: 'gray' }} onClick={close}>
        <LeftOutlined /> {t('modal.back')}
      </Button>
      <Button style={{ color: 'gray' }} onClick={handleNextSubmission}>
        {t('modal.next')} <RightOutlined />
      </Button>
    </Space>
  );

  const rejectionReasonStyle = {
    background: 'rgb(239, 239, 239)',
    borderRadius: '5px',
    marginTop: '5%',
    padding: '3%',
    paddingRight: '10%',
  };

  const StatusHeader = () => {
    return (
      <>
        <h1 style={{ color: 'black', marginBottom: '-8px' }}>
          {t('modal.status')}
        </h1>
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
            onClick={onClickAccept}
          >
            {t('modal.approve')}
          </Button>
          <Button
            type="primary"
            style={{ flex: 1, color: 'black' }}
            onClick={openRejectionTextBox}
          >
            {t('modal.reject')}
          </Button>
        </div>
      </>
    );
  };

  if (!data) {
    return null;
  }

  const treeSummaryTextStyle: CSSProperties = {
    whiteSpace: 'nowrap', // Prevent text from wrapping
  };

  async function onClickReject() {
    const toReject: Promise<void>[] = [];
    if (!data) {
      return null;
    }
    toReject.push(protectedApiClient.rejectImage(data.key, rejectionReason));
    Promise.all(toReject)
      .then(() => {
        props.setApprovedOrRejectedImageIds((prevIds) => [
          ...prevIds,
          data.key,
        ]);
        close();
      })
      .then(() => {
        message.success(t('message.reject_success'));
      })
      .catch((err) => {
        message.error(t('message.reject_error', { error: err.response.data }));
      });
  }

  async function onClickAccept() {
    const toApprove: Promise<void>[] = [];
    if (!data) {
      return null;
    }
    toApprove.push(protectedApiClient.approveImage(data.key));
    Promise.all(toApprove)
      .then(() => {
        props.setApprovedOrRejectedImageIds((prevIds) => [
          ...prevIds,
          data.key,
        ]);
        close();
      })
      .then(() => {
        message.success(t('message.approve_success'));
      })
      .catch((err) => {
        message.error(t('message.approve_error', { error: err.response.data }));
      });
  }

  function treeSummaryLine(lineName: string, lineItem: number | string) {
    return (
      <>
        <Col span={12}>
          <b>
            <p style={treeSummaryTextStyle}>{lineName}</p>
          </b>
        </Col>
        <Col span={12}>
          <p style={treeSummaryTextStyle}>{lineItem}</p>
        </Col>
      </>
    );
  }

  const TreeSummaryDisplay = () => {
    return (
      <div style={{ marginTop: '5%' }}>
        <Row gutter={[24, 25]}>
          <Col span={24}>
            <Row gutter={25}>
              {isRejectionTextOpen ? (
                <></>
              ) : (
                <>
                  {treeSummaryLine(t('summary.id'), data.siteId)}
                  {treeSummaryLine(t('summary.date'), data.dateSubmitted)}
                  {treeSummaryLine(t('summary.submitted'), data.submittedBy)}
                </>
              )}
              {treeSummaryLine(t('summary.species'), data.species)}
              {treeSummaryLine(t('summary.neighborhood'), data.neighborhood)}
              {treeSummaryLine(t('summary.address'), data.address)}
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
          {isRejectionTextOpen ? (
            <div style={rejectionReasonStyle}>
              <h3 style={{ color: 'black' }}>{t('modal.form.prompt')}</h3>
              <TextArea
                placeholder={t('modal.form.placeholder')}
                style={{ height: 50 }}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
              <Button
                type="primary"
                style={{ marginTop: '3%' }}
                onClick={onClickReject}
              >
                {tForms('submit')}
              </Button>
            </div>
          ) : (
            <></>
          )}
          <TreeSummaryDisplay />
        </Col>
      </Row>
    </Modal>
  );
};

export default ImageApprovalModal;
