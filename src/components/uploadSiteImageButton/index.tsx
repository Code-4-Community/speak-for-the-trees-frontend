import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Checkbox, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { site } from '../../constants';
import { n } from '../../utils/stringFormat';
import { GreenButton, StyledClose, SubmitButton } from '../themedComponents';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { UploadProps } from 'antd/lib/upload/interface';
import { LIGHT_GREEN, LIGHT_GREY } from '../../utils/colors';
import { useDispatch } from 'react-redux';
import protectedApiClient from '../../api/protectedApiClient';
import { getSiteData } from '../../containers/treePage/ducks/thunks';
import { TreeParams } from '../../containers/treePage';
import { useParams } from 'react-router-dom';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

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
  const { t } = useTranslation(n(site, ['treeInfo']), {
    nsMode: 'fallback',
  });
  const [showMenu, setShowMenu] = useState(false);
  type imageType = string | ArrayBuffer | null;
  const imageToUpload: imageType[] = [];
  const [anonymousUpload, setAnonymousUpload] = useState(false);
  const dispatch = useDispatch();
  const id = Number(useParams<TreeParams>().id);

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: async (file) => {
      const reader = new FileReader();
      reader.addEventListener(
        'loadend',
        () => {
          imageToUpload.push(reader.result);
        },
        false,
      );
      reader.readAsDataURL(file);
      return false;
    },
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file selected successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  function onClickUploadSiteImage() {
    if (imageToUpload.length > 0) {
      imageToUpload.forEach((image) => {
        if (image) {
          protectedApiClient
            .uploadImage(siteEntryId, image, anonymousUpload)
            .then(() => {
              message.success('Sent!');
              setShowMenu(!showMenu);
            });
        }
      });
      dispatch(getSiteData(id));
    }
  }

  return (
    <>
      <GreenButton
        type="primary"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        Upload Tree Images
      </GreenButton>
      <Modal
        title={t('uploadSiteImage.upload_title')}
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
            {t('uploadSiteImage.upload_drag_header')}
          </p>
          <p className="ant-upload-hint">
            {t('uploadSiteImage.upload_drag_description')}
          </p>
        </Dragger>
        <ConfirmUpload onClick={onClickUploadSiteImage}>
          {t('uploadSiteImage.upload_button_message')}
        </ConfirmUpload>
        <Checkbox
          onChange={async (e: CheckboxChangeEvent) => {
            await setAnonymousUpload(e.target.checked);
          }}
        >
          {t('uploadSiteImage.upload_anonymous_check')}
        </Checkbox>
      </Modal>
    </>
  );
};

export default UploadSiteImageButton;
