import React, { useState } from 'react';
import {Button, Carousel, message, Modal, Space} from 'antd';
import LeftOutlined from '@ant-design/icons/lib/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/lib/icons/RightOutlined';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { getLatestEntrySiteImages } from '../../containers/treePage/ducks/selectors';
import { C4CState } from '../../store';
import { n } from '../../utils/stringFormat';
import { site } from '../../constants';
import { ConfirmDelete } from '../careEntry';
// import { DeleteOutlined } from '@ant-design/icons';
// import {GreenButton, StyledClose} from '../themedComponents';
import { LinkButton } from '../linkButton';
import { LIGHT_GREY, LIGHT_RED, WHITE } from '../../utils/colors';
import protectedApiClient from "../../api/protectedApiClient";
import {getSiteData} from "../../containers/treePage/ducks/thunks";

const CarouselContainer = styled.div`
  margin-top: 20px;
`;

// Adding additional styles to the carousel: https://github.com/ant-design/ant-design/issues/12479
const StyledCarousel = styled(Carousel)`
  &:hover,
  &:focus {
    cursor: grab;
  }

  > .slick-prev,
  > .slick-prev:focus {
    font-size: 1.5em;
    left: 10px;
    z-index: 2;
    color: #aaa;
  }

  > .slick-next,
  > .slick-next:focus {
    font-size: 1.5em;
    right: 10px;
    z-index: 2;
    color: #aaa;
  }
`;

const SiteImage = styled.img`
  max-height: 300px;
  margin: 0 auto;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const DeleteSiteImageButton = styled(LinkButton)`
  color: ${LIGHT_RED};
  margin: 10px;
  padding: 0px 10px;
  border: none;
  background-color: ${LIGHT_GREY};

  & :hover {
    color: ${LIGHT_GREY};
    background-color: ${LIGHT_RED};
  }
`;



export const SiteImageCarousel: React.FC = () => {
  const { t } = useTranslation(n(site, 'treePage'), { nsMode: 'fallback' });

  const [showDeleteForm, setShowDeleteForm] = useState<boolean>(false);

  const latestEntrySiteImages = useSelector((state: C4CState) => {
    return getLatestEntrySiteImages(state.siteState.siteData);
  });

  const [currSlideIndex, setCurrSlideIndex] = useState<number>(0);

  const onAfterChange = (currentSlide: number) =>
    setCurrSlideIndex(currentSlide);
  function onClickDeleteImage(imageId: number) {
    protectedApiClient.deleteImage(imageId).then((ok) => {
      message.success('success');
      setShowDeleteForm(false);
    });
  }

  return (
    <>
      {latestEntrySiteImages.length > 0 && (
        <CarouselContainer>
          <StyledCarousel
            arrows
            prevArrow={<LeftOutlined />}
            nextArrow={<RightOutlined />}
            afterChange={onAfterChange}
          >
            {latestEntrySiteImages.map((siteImage) => (
              <div key={siteImage.imageUrl}>
                <SiteImage src={siteImage.imageUrl} />
              </div>
            ))}
          </StyledCarousel>
          <FooterContainer>
            <div>
              {t('site_image.uploaded_by', {
                uploader:
                  latestEntrySiteImages[currSlideIndex].uploaderUsername ||
                  'Anonymous',
              })}
            </div>
            <Space size={15}>
              <div>
                {latestEntrySiteImages[currSlideIndex].uploadedAt ||
                  t('site_image.no_upload_date')}
                {/*<td width="20%"></td>*/}
              </div>
              <div>
                <DeleteSiteImageButton
                  type="primary"
                  onClick={() => setShowDeleteForm(!showDeleteForm)}
                >
                  Delete
                  {/*<DeleteOutlined />*/}
                </DeleteSiteImageButton>
              </div>
            </Space>
          </FooterContainer>
          <Modal
            title="Delete Site Image"
            visible={showDeleteForm}
            onOk={() => setShowDeleteForm(false)}
            onCancel={() => setShowDeleteForm(false)}
            footer={null}
            // closeIcon={<StyledClose />}
          >
            <p>Are you sure you want to delete this image?</p>
            <ConfirmDelete
                onClick={() => onClickDeleteImage(latestEntrySiteImages[currSlideIndex].imageId)}>Delete</ConfirmDelete>
          </Modal>
        </CarouselContainer>
      )}
    </>
  );
};
