import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Checkbox, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { site } from '../../constants';
import { n } from '../../utils/stringFormat';
import { GreenButton, StyledClose, SubmitButton } from '../themedComponents';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { RcFile, UploadProps } from 'antd/lib/upload/interface';
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
  const [imageToUpload, setImageToUpload] = useState<imageType[]>([]);
  const [anonymousUpload, setAnonymousUpload] = useState(false);
  const dispatch = useDispatch();
  const id = Number(useParams<TreeParams>().id);

  function readAndPreview(f: RcFile): Promise<imageType> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener(
        'loadend',
        () => {
          resolve(reader.result);
        },
        false,
      );
      reader.readAsDataURL(f);
    });
  }

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: (_, fileList) => {
      const promises: Promise<imageType>[] = [];
      if (fileList) {
        fileList.forEach((f) => {
          promises.push(readAndPreview(f));
        });
      }
      Promise.all(promises).then((images) => {
        setImageToUpload(imageToUpload.concat(images));
      });
      return false;
    },
    onRemove(file) {
      const reader = new FileReader();
      reader.addEventListener(
        'loadend',
        () => {
          const imagesCopy = [...imageToUpload];
          const index = imagesCopy.indexOf(reader.result, 0);
          if (index > -1) {
            imagesCopy.splice(index, 1);
            setImageToUpload(imagesCopy);
          }
        },
        false,
      );
      if (file.originFileObj) {
        reader.readAsDataURL(file.originFileObj);
      }
    },
  };

  function onClickUploadSiteImage() {
    const requests: Promise<void>[] = [];
    imageToUpload.forEach((image) => {
      if (image) {
        const req = protectedApiClient.uploadImage(
          siteEntryId,
          image,
          anonymousUpload ?? true,
        );
        requests.push(req);
      }
    });
    Promise.allSettled(requests)
      .then(() => {
        message.success(t('uploadSiteImage.upload_success'));
        setShowMenu(!showMenu);
      })
      .finally(() => dispatch(getSiteData(id)));
  }

  return (
    <>
      <GreenButton
        type="primary"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        {t('actions.upload_image')}
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
          onChange={(e: CheckboxChangeEvent) => {
            setAnonymousUpload(e.target.checked);
          }}
        >
          {t('uploadSiteImage.upload_anonymous_check')}
        </Checkbox>
      </Modal>
    </>
  );
};

export default UploadSiteImageButton;
