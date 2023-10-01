import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
//import { SizeType } from 'antd/es/config-provider/SizeContext';
import ShareMenu from '../shareMenu';
import ShareWhite from '../../assets/images/share-green.png';
import { useTranslation } from 'react-i18next';
import { site } from '../../constants';
import { n } from '../../utils/stringFormat';
import { GreenButton, StyledClose, SubmitButton } from '../themedComponents';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd/lib/upload/interface';
import { LIGHT_GREY } from '../../utils/colors';
import protectedApiClient from '../../api/protectedApiClient';
import { getSiteData } from '../../containers/treePage/ducks/thunks';

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
// const StyledUploadImageButton = Button`
//   margin: 5px;
//   padding-left: 10px;
//   padding-right: 10px;
// `;

// link prop is primarily for facebook as the post can only be prefilled with a link, no body text
// interface ShareButtonProps {
//   readonly size: SizeType;
//   readonly defaultText: string;
//   readonly link: string;
// }

function UploadSiteImageButton() {
  const { t } = useTranslation(n(site, ['uploadImageMenu']), {
    nsMode: 'fallback',
  });
  const [showMenu, setShowMenu] = useState(false);

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
      const t = 1;
    },
    onDrop(e) {
      const t = 1;
    },
  };

  function onClickUploadSiteImage() {
    const t = 1;
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
        onOk={() => {
          const t = 1;
        }}
        closeIcon={<StyledClose />}
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <StyledInboxOutline />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
        <ConfirmUpload onClick={onClickUploadSiteImage}>Upload</ConfirmUpload>
      </Modal>
    </>
  );
}

export default UploadSiteImageButton;
