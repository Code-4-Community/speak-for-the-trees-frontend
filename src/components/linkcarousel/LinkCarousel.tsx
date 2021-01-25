import React from 'react';
import { Carousel } from 'antd';
import styled from 'styled-components';
import { LIGHT_GREEN } from '../../colors';
import LinkCard from '../linkcard/LinkCard';
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
          <LinkCard text="My Blocks" path="/" background="img1" />
        </CarouselSlide>
        <CarouselSlide>
          <LinkCard text="View Teams" path="/" background="img2" />
        </CarouselSlide>
        <CarouselSlide>
<<<<<<< HEAD
          <LinkCard text="Volunteer Leaderboard" path="/" background="img3" />
=======
          <LinkCard
            text="Volunteer Leaderboard"
            path="/volunteer"
            background="img3"
          />
>>>>>>> 50f8b52... connected routes to volunteer lederboard and made a team leaderboard page based on that
        </CarouselSlide>
        <CarouselSlide>
          <LinkCard
            text="Team Leaderboard"
            path="/team-leaderboard"
            background="img4"
          />
        </CarouselSlide>
        <CarouselSlide>
          <LinkCard text="5th Card" path="/" background="img1" />
        </CarouselSlide>
        <CarouselSlide>
          <LinkCard text="6th Card" path="/" background="img2" />
        </CarouselSlide>
      </StyledCarousel>
    </>
  );
};

export default LinkCarousel;
