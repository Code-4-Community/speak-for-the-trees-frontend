import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { site } from '../../constants';
import { n } from '../../utils/stringFormat';
import { GreenButton, StyledClose, SubmitButton } from '../themedComponents';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { UploadProps } from 'antd/lib/upload/interface';
import { LIGHT_GREEN, LIGHT_GREY } from '../../utils/colors';
import protectedApiClient from '../../api/protectedApiClient';

const { Dragger } = Upload;

const StyledInboxOutline = styled(InboxOutlined)`
  color: black;
`;

const ConfirmUpload = styled(SubmitButton)`
  margin: 10px;
  padding-left: 10px;

  & :hover {
    background-color: ${LIGHT_GREY};
  }
`;

interface UploadImageProps {
  readonly siteEntryId: number;
}

const UploadSiteImageButton: React.FC<UploadImageProps> = ({ siteEntryId }) => {
  const { t } = useTranslation(n(site, ['uploadImageMenu']), {
    nsMode: 'fallback',
  });
  const [showMenu, setShowMenu] = useState(false);
  let imageToUpload: string | ArrayBuffer | null;

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    beforeUpload: async (file) => {
      const reader = new FileReader();
      reader.addEventListener(
        'loadend',
        () => {
          imageToUpload = reader.result;
        },
        false,
      );
      reader.readAsDataURL(file);
      return false;
    },
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  function onClickUploadSiteImage() {
    if (imageToUpload) {
      protectedApiClient
        .uploadImage(siteEntryId, imageToUpload)
        .then(() => message.success('Sending Image'));
    }
  }

  return (
    <>
      <GreenButton
        type="text"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        Upload Tree Images
      </GreenButton>
      <Modal
        title={t('upload_title')} // pass on as input
        visible={showMenu}
        footer={null}
        onCancel={() => setShowMenu(false)}
        closeIcon={<StyledClose />}
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <StyledInboxOutline style={{ color: LIGHT_GREEN }} />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">Support for a single image upload.</p>
        </Dragger>
        <ConfirmUpload onClick={onClickUploadSiteImage}>Upload</ConfirmUpload>
      </Modal>
    </>
  );
};

export default UploadSiteImageButton;
