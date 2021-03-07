import React from 'react';
import { Routes } from '../../App';
import { Carousel } from 'antd';
import styled from 'styled-components';
import { LIGHT_GREEN } from '../../utils/colors';
import LinkCard from '../linkCard';
import useWindowDimensions, { WindowTypes } from '../window-dimensions';

const StyledCarousel = styled(Carousel)`
  max-width: 1350px;
  margin: auto;
  border: solid;
  border-radius: 10px;
  border-width: 5px 5px 5px 5px;
  border-color: ${LIGHT_GREEN};
`;

const CarouselSlide = styled.div`
  padding: 10px;
  border: solid;
  border-width: 0px 0px 50px 0px;
  border-color: ${LIGHT_GREEN};
  text-align: center;
`;

const LinkCarousel: React.FC = () => {
  const { windowType } = useWindowDimensions();
  const slidesPerPage = Number(
    `${
      windowType === WindowTypes.Desktop
        ? 4
        : `${
            windowType === WindowTypes.NarrowDesktop
              ? 3
              : `${windowType === WindowTypes.Mobile ? 1 : 2}`
          }`
    }`,
  );
  return (
    <>
      <StyledCarousel
        {...{
          slidesToShow: slidesPerPage,
          slidesToScroll: slidesPerPage,
          autoplay: true,
        }}
      >
        <CarouselSlide>
          <LinkCard
            text="My Blocks"
            path={Routes.NOT_FOUND}
            background="img1"
          />
        </CarouselSlide>
        <CarouselSlide>
          <LinkCard
            text="View Teams"
            path={Routes.AVAILABLE_TEAMS}
            background="img2"
          />
        </CarouselSlide>
        <CarouselSlide>
          <LinkCard
            text="Volunteer Leaderboard"
            path={Routes.VOLUNTEER}
            background="img3"
          />
        </CarouselSlide>
        <CarouselSlide>
          <LinkCard
            text="Team Leaderboard"
            path={Routes.TEAM_LEADERBOARD}
            background="img4"
          />
        </CarouselSlide>
        <CarouselSlide>
          <LinkCard text="5th Card" path={Routes.NOT_FOUND} background="img1" />
        </CarouselSlide>
        <CarouselSlide>
          <LinkCard text="6th Card" path={Routes.NOT_FOUND} background="img2" />
        </CarouselSlide>
      </StyledCarousel>
    </>
  );
};

export default LinkCarousel;
